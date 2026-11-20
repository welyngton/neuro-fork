/**
 * @module state/GameState
 *
 * Estado global do jogo (progresso, opções e o desenho salvo de cada missão).
 *
 * - É a ÚNICA fonte de verdade: cenas leem daqui e gravam por métodos daqui.
 * - Persiste automaticamente em `localStorage` a cada mudança.
 * - Emite o evento `change` para quem quiser reagir (ex.: sincronização na nuvem
 *   em `app/services.ts`). Não conhece Phaser nem Firebase.
 */
import { Blueprint, Board, blueprintFor, emptyBoard, fitBoard } from '../core/missions/board';
import { MISSIONS, getMission } from '../core/missions/catalog';
import { Hyper, Params } from '../core/nn/network';
import { ACHIEVEMENTS, achievementLevels } from '../core/progression/achievements';
import { AvatarLook } from '../core/progression/avatars';
import { Caps, UPGRADES, capsFor } from '../core/progression/upgrades';
import { coinCeiling } from '../core/progression/resources';
import { Stars } from '../core/scoring';
import { Locale } from '../services/i18n';

export interface Settings {
  locale: Locale;
  /** Volume da música, 0..1. */
  music: number;
  /** Volume dos efeitos, 0..1. */
  sfx: number;
}

/** Desenho + treino em andamento de uma missão. */
export interface DesignSave {
  board: Board;
  /** Pesos atuais (null = ainda não sorteados). */
  params: Params | null;
  hyper: Hyper;
  /** Seed do sorteio de pesos; muda a cada "embaralhar". */
  seed: number;
  /** Épocas já treinadas com os pesos atuais. */
  epochs: number;
  /** Última perda medida — de validação, quando a missão tem (1 = não treinado). */
  loss: number;
  /** Melhores pesos já obtidos nesta missão (carta "transfer learning"). */
  bestParams?: Params | null;
  bestLoss?: number;
  /** Carta usada na última rodada de treino (id), se houve. */
  card?: string | null;
  /** Parada antecipada ligada (upgrade). */
  earlyStop?: boolean;
  /** Energia já gasta em treino (e cartas) com o desenho atual. */
  trainSpent?: number;
  /** Água restante no tanque (ausente = cheio). */
  water?: number;
  /** A última rodada terminou voltando aos melhores pesos da validação. */
  usedEarlyStop?: boolean;
  /** O assistente AUTO montou esta rede: nesta missão não se ganham conquistas. */
  assisted?: boolean;
}

export interface MissionSave {
  stars: Stars;
  /** Melhor resultado SEM o assistente AUTO (é o que conta para as conquistas). */
  clean?: Stars;
  attempts: number;
  design?: DesignSave;
}

export interface SaveData {
  version: 2;
  settings: Settings;
  missions: Record<string, MissionSave>;
  /** `true` depois de vencer a missão final. */
  finished: boolean;
  /** Ids dos upgrades comprados na loja. */
  upgrades: string[];
  /** Aparência escolhida para o robô. */
  look: AvatarLook;
  /**
   * Contadores para as conquistas. Chaves em uso: neurons_placed, bombs, shuffles,
   * sims, zero_sims, good_loss_lost, duck_wins, full_board_wins, sparse_wins,
   * feature_wins, bad_card_wins, earlystop_wins, transfer_wins, dropout_runs,
   * exploded_runs, stuck_runs, overfit_runs, epochs_total, cards_drawn,
   * avatar_changes, locale_changes, overheats.
   */
  stats: Record<string, number>;
  /** Nível já anunciado de cada conquista (para avisar só as novas). */
  achievements: Record<string, number>;
  /** Dicas educativas já mostradas ao menos uma vez. */
  tips: string[];
  /** Quantas "reformas" de missões já foram aplicadas a este save (ver `REDESIGNED`). */
  redesign?: number;
  /** Tour guiado da missão-tutorial (Berçário): passo atual e se está em andamento. */
  tour?: { step: number; active: boolean };
  updatedAt: number;
}

const STORAGE_KEY = 'neurobot.save.v2';

/** Missões da v3.3 que foram trocadas na v3.4 (os quatro "campos 2D" quase iguais) -> a missão nova no mesmo lugar do mapa. */
const RENAMED: Record<string, string> = { quadrantes: 'contagem', ilha: 'tangram', luas: 'origami', alvo: 'quebracabeca' };

/**
 * Missões cujos sensores e ações mudaram numa versão: o desenho e o treino salvos
 * (que ligavam sensores que não existem mais) são descartados UMA vez; as estrelas ficam.
 * Índice = nº da reforma. v3.5: Gêmeos, Contagem, Origami e Quebra-cabeça.
 */
const REDESIGNED: string[][] = [['xor', 'contagem', 'origami', 'quebracabeca']];

/** Leva as estrelas das missões trocadas para as novas (o desenho não serve mais e fica para trás). */
function migrateMissions(save: SaveData): void {
  for (const [from, to] of Object.entries(RENAMED)) {
    const old = save.missions[from];
    if (!old) continue;
    save.missions[to] ??= { stars: old.stars, attempts: old.attempts, ...(old.clean !== undefined ? { clean: old.clean } : {}) };
    delete save.missions[from];
  }
  for (let n = save.redesign ?? 0; n < REDESIGNED.length; n++) for (const id of REDESIGNED[n]) if (save.missions[id]) delete save.missions[id].design;
  save.redesign = REDESIGNED.length;
}

function defaultSave(): SaveData {
  const lang = typeof navigator !== 'undefined' && !navigator.language.toLowerCase().startsWith('pt') ? 'en' : 'pt-BR';
  return {
    version: 2,
    settings: { locale: lang, music: 0.6, sfx: 0.8 },
    missions: {},
    finished: false,
    upgrades: [],
    look: { avatar: 'neuro', color: 'ciano' },
    stats: {},
    achievements: {},
    tips: [],
    redesign: REDESIGNED.length,
    updatedAt: 0,
  };
}

type Listener = (save: SaveData) => void;

export class GameState {
  private data: SaveData;
  private listeners = new Set<Listener>();
  /**
   * Modo assistido ATIVO na cena atual (as cenas de missão ligam conforme o
   * desenho; o menu desliga). Enquanto ligado, contadores e conquistas não andam.
   */
  assisted = false;

  /** @param storage injetável para testes (padrão: `localStorage`, se existir). */
  constructor(private storage: Pick<Storage, 'getItem' | 'setItem'> | null = typeof localStorage !== 'undefined' ? localStorage : null) {
    this.data = this.load();
  }

  private load(): SaveData {
    try {
      const raw = this.storage?.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as SaveData) : null;
      // Saves antigos não têm os campos novos: completamos com os padrões.
      if (parsed?.version === 2) {
        // `redesign` ausente = save de antes das reformas (não vale o padrão de um save novo).
        const save = { ...defaultSave(), ...parsed, redesign: parsed.redesign ?? 0, settings: { ...defaultSave().settings, ...parsed.settings } };
        migrateMissions(save);
        return save;
      }
    } catch {
      /* save corrompido: começa do zero */
    }
    return defaultSave();
  }

  private commit(): void {
    this.data.updatedAt = Date.now();
    try {
      this.storage?.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      /* armazenamento cheio/bloqueado: segue só em memória */
    }
    this.listeners.forEach((l) => l(this.data));
  }

  /** Assina mudanças. Retorna a função para cancelar a assinatura. */
  onChange(l: Listener): () => void {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }

  /** Cópia serializável do save (para enviar à nuvem). */
  snapshot(): SaveData {
    return JSON.parse(JSON.stringify(this.data)) as SaveData;
  }

  get settings(): Readonly<Settings> {
    return this.data.settings;
  }

  get finished(): boolean {
    return this.data.finished;
  }

  updateSettings(patch: Partial<Settings>): void {
    Object.assign(this.data.settings, patch);
    this.commit();
  }

  stars(id: string): Stars {
    return this.data.missions[id]?.stars ?? 0;
  }

  get totalStars(): number {
    return MISSIONS.reduce((n, m) => n + this.stars(m.id), 0);
  }

  /** Uma missão está liberada quando todas as suas `requires` têm ao menos 1 estrela. */
  isUnlocked(id: string): boolean {
    const m = getMission(id);
    return m.requires.every((r) => this.stars(r) > 0) && this.totalStars >= (m.minStars ?? 0);
  }

  /** Moedas do Design: as da missão mais o bônus das estrelas ganhas (avançar rende dinheiro). */
  coinCeiling(m: { coins: number }): number {
    return coinCeiling(m.coins, this.totalStars);
  }

  /* ------------------------------------------------------------------ loja e upgrades */

  get upgrades(): readonly string[] {
    return this.data.upgrades;
  }

  /** Limites e ferramentas liberados pelos upgrades comprados. */
  get caps(): Caps {
    return capsFor(this.data.upgrades);
  }

  /** Estrelas disponíveis para gastar = ganhas − preço dos upgrades comprados. */
  get balance(): number {
    const spent = UPGRADES.filter((u) => this.data.upgrades.includes(u.id)).reduce((n, u) => n + u.cost, 0);
    return this.totalStars - spent;
  }

  /** Compra um upgrade. @returns `false` se já tem ou se faltam estrelas. */
  buy(id: string): boolean {
    const up = UPGRADES.find((u) => u.id === id);
    if (!up || this.data.upgrades.includes(id) || this.balance < up.cost) return false;
    this.data.upgrades.push(id);
    this.commit();
    return true;
  }

  /* ------------------------------------------------------------------ avatar */

  get look(): Readonly<AvatarLook> {
    return this.data.look;
  }

  setLook(patch: Partial<AvatarLook>): void {
    Object.assign(this.data.look, patch);
    this.bump('avatar_changes');
  }

  /* ------------------------------------------------------------------ conquistas e dicas */

  /** Soma `n` a um contador de conquistas. */
  bump(stat: string, n = 1): void {
    if (this.assisted) return;
    this.data.stats[stat] = (this.data.stats[stat] ?? 0) + n;
    this.commit();
  }

  /** Níveis atuais de todas as conquistas. */
  achievementLevels(): Record<string, number> {
    const stars: Record<string, number> = {};
    // Vitórias com o assistente AUTO não contam: usa o melhor resultado "limpo".
    for (const m of MISSIONS) {
      const ms = this.data.missions[m.id];
      stars[m.id] = ms ? (ms.clean ?? (ms.design?.assisted ? 0 : ms.stars)) : 0;
    }
    return achievementLevels({ stats: this.data.stats, stars, upgrades: this.data.upgrades.length, finished: this.data.finished });
  }

  /**
   * Confere se alguma conquista subiu de nível desde a última chamada.
   * @returns as recém-conquistadas (para a cena mostrar um aviso).
   */
  claimAchievements(): { id: string; level: number }[] {
    if (this.assisted) return [];
    const levels = this.achievementLevels();
    const fresh = ACHIEVEMENTS.filter((a) => levels[a.id] > (this.data.achievements[a.id] ?? 0)).map((a) => ({ id: a.id, level: levels[a.id] }));
    if (fresh.length) {
      for (const f of fresh) this.data.achievements[f.id] = f.level;
      this.commit();
    }
    return fresh;
  }

  /* ------------------------------------------------------------------ tour guiado */

  /** O tour guiado (missão-tutorial) está em andamento? */
  get tourActive(): boolean {
    return !!this.data.tour?.active;
  }

  get tourStep(): number {
    return this.data.tour?.step ?? 0;
  }

  setTourStep(step: number): void {
    this.data.tour = { step, active: true };
    this.commit();
  }

  /** Começa (ou recomeça) o tour: o Berçário volta a ficar em branco. */
  startTour(): void {
    this.data.tour = { step: 0, active: true };
    const ms = this.data.missions.bercario;
    if (ms) delete ms.design;
    if (!this.data.tips.includes('tour_started')) this.data.tips.push('tour_started');
    this.commit();
  }

  /** Encerra o tour (concluído ou pulado). */
  endTour(): void {
    this.data.tour = { step: this.tourStep, active: false };
    if (!this.data.tips.includes('tour_done')) this.data.tips.push('tour_done');
    this.commit();
  }

  /** A dica já foi vista? */
  hasTip(id: string): boolean {
    return this.data.tips.includes(id);
  }

  /** Marca uma dica como vista. @returns `true` se era a primeira vez. */
  markTip(id: string): boolean {
    if (this.data.tips.includes(id)) return false;
    this.data.tips.push(id);
    this.commit();
    return true;
  }

  /* ------------------------------------------------------------------ desenho das missões */

  /** Planta do editor para a missão, já com os upgrades do jogador. */
  blueprint(id: string): Blueprint {
    return blueprintFor(getMission(id), this.caps);
  }

  /** Desenho salvo da missão (cria um vazio com os padrões na primeira vez). */
  design(id: string): DesignSave {
    const ms = (this.data.missions[id] ??= { stars: 0, attempts: 0 });
    const m = getMission(id);
    const bp = this.blueprint(id);
    ms.design ??= { board: emptyBoard(bp), params: null, hyper: { ...m.defaults }, seed: 1, epochs: 0, loss: 1 };
    fitBoard(bp, ms.design.board);
    return ms.design;
  }

  /** Grava alterações no desenho/treino da missão. */
  saveDesign(id: string, patch: Partial<DesignSave>): void {
    Object.assign(this.design(id), patch);
    this.commit();
  }

  /**
   * Registra o resultado de uma simulação.
   * @returns `true` se foi a primeira vitória nesta missão (libera novas fases).
   */
  recordResult(id: string, stars: Stars, isFinal: boolean): boolean {
    const ms = (this.data.missions[id] ??= { stars: 0, attempts: 0 });
    ms.attempts++;
    const first = ms.stars === 0 && stars > 0;
    ms.stars = Math.max(ms.stars, stars) as Stars;
    // `clean` passa a existir no primeiro resultado; saves antigos (sem ele) contam as estrelas normais.
    ms.clean = (this.assisted ? (ms.clean ?? 0) : Math.max(ms.clean ?? 0, stars)) as Stars;
    if (isFinal && stars > 0) this.data.finished = true;
    this.commit();
    return first;
  }

  /** Mescla um save remoto: fica com o melhor de cada missão e o desenho mais recente. */
  merge(remote: SaveData): void {
    if (remote?.version !== 2) return;
    const newer = remote.updatedAt > this.data.updatedAt;
    // Desenhos de missões reformadas depois do save remoto ligam sensores que não existem mais.
    const stale = new Set(REDESIGNED.slice(remote.redesign ?? 0).flat());
    for (const [id, r] of Object.entries(remote.missions)) {
      const l = (this.data.missions[id] ??= { stars: 0, attempts: 0 });
      l.stars = Math.max(l.stars, r.stars) as Stars;
      l.attempts = Math.max(l.attempts, r.attempts);
      if (r.design && !stale.has(id) && (newer || !l.design)) l.design = r.design;
    }
    this.data.finished ||= remote.finished;
    this.data.upgrades = [...new Set([...this.data.upgrades, ...(remote.upgrades ?? [])])];
    for (const [k, v] of Object.entries(remote.stats ?? {})) this.data.stats[k] = Math.max(this.data.stats[k] ?? 0, v);
    for (const [k, v] of Object.entries(remote.achievements ?? {})) this.data.achievements[k] = Math.max(this.data.achievements[k] ?? 0, v);
    this.data.tips = [...new Set([...this.data.tips, ...(remote.tips ?? [])])];
    if (newer && remote.look) this.data.look = remote.look;
    if (newer) this.data.settings = { ...this.data.settings, ...remote.settings };
    this.commit();
  }

  /** Apaga o progresso (mantém as opções). */
  reset(): void {
    this.data = { ...defaultSave(), settings: this.data.settings };
    this.commit();
  }
}
