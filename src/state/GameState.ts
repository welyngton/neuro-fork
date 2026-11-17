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
import { Board, emptyBoard } from '../core/missions/board';
import { MISSIONS, getMission } from '../core/missions/catalog';
import { Hyper, Params } from '../core/nn/network';
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
  /** Última perda medida (1 = não treinado). */
  loss: number;
}

export interface MissionSave {
  stars: Stars;
  attempts: number;
  design?: DesignSave;
}

export interface SaveData {
  version: 2;
  settings: Settings;
  missions: Record<string, MissionSave>;
  /** `true` depois de vencer a missão final. */
  finished: boolean;
  updatedAt: number;
}

const STORAGE_KEY = 'neurobot.save.v2';

function defaultSave(): SaveData {
  const lang = typeof navigator !== 'undefined' && !navigator.language.toLowerCase().startsWith('pt') ? 'en' : 'pt-BR';
  return { version: 2, settings: { locale: lang, music: 0.6, sfx: 0.8 }, missions: {}, finished: false, updatedAt: 0 };
}

type Listener = (save: SaveData) => void;

export class GameState {
  private data: SaveData;
  private listeners = new Set<Listener>();

  /** @param storage injetável para testes (padrão: `localStorage`, se existir). */
  constructor(private storage: Pick<Storage, 'getItem' | 'setItem'> | null = typeof localStorage !== 'undefined' ? localStorage : null) {
    this.data = this.load();
  }

  private load(): SaveData {
    try {
      const raw = this.storage?.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as SaveData) : null;
      if (parsed?.version === 2) return { ...defaultSave(), ...parsed, settings: { ...defaultSave().settings, ...parsed.settings } };
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
    return getMission(id).requires.every((r) => this.stars(r) > 0);
  }

  /** Desenho salvo da missão (cria um vazio com os padrões na primeira vez). */
  design(id: string): DesignSave {
    const ms = (this.data.missions[id] ??= { stars: 0, attempts: 0 });
    const m = getMission(id);
    ms.design ??= { board: emptyBoard(m), params: null, hyper: { ...m.defaults }, seed: 1, epochs: 0, loss: 1 };
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
    if (isFinal && stars > 0) this.data.finished = true;
    this.commit();
    return first;
  }

  /** Mescla um save remoto: fica com o melhor de cada missão e o desenho mais recente. */
  merge(remote: SaveData): void {
    if (remote?.version !== 2) return;
    const newer = remote.updatedAt > this.data.updatedAt;
    for (const [id, r] of Object.entries(remote.missions)) {
      const l = (this.data.missions[id] ??= { stars: 0, attempts: 0 });
      l.stars = Math.max(l.stars, r.stars) as Stars;
      l.attempts = Math.max(l.attempts, r.attempts);
      if (r.design && (newer || !l.design)) l.design = r.design;
    }
    this.data.finished ||= remote.finished;
    if (newer) this.data.settings = { ...this.data.settings, ...remote.settings };
    this.commit();
  }

  /** Apaga o progresso (mantém as opções). */
  reset(): void {
    this.data = { ...defaultSave(), settings: this.data.settings };
    this.commit();
  }
}
