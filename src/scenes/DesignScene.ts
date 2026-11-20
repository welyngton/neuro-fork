/**
 * @module scenes/DesignScene
 *
 * FASE 1 — DESIGN: o jogador monta o cérebro do robô.
 *
 * Inspiração: Mario Maker / Mario Paint / Minecraft — ferramentas numa barra
 * inferior ("hotbar"), tudo responde na hora com som, pulo e estilhaços, e
 * cada bloco toca uma nota conforme a linha em que é colocado.
 *
 * Regra de ouro: sensor NÃO se liga direto em ação — todo sinal passa por um
 * neurônio ({@link isAllowedLink}).
 *
 * Ferramentas (igual no mouse e no toque):
 *  - CABO      : arraste de um bloco até outro — ou toque na origem e depois no destino;
 *  - NEURÔNIO  : toque num encaixe vazio (também funciona com a ferramenta CABO);
 *  - BORRACHA  : toque num neurônio ou cabo;
 *  - liberadas pelo mapa (`core/progression/tools.ts`):
 *      ATIVAÇÃO  troca a ativação de um neurônio (tanh → ReLU → sigmoide);
 *      SONDA     mostra o que um neurônio "enxerga" com os pesos atuais;
 *      PODA      corta o cabo de menor peso treinado (ação imediata);
 *      TRAVA     congela o peso de um cabo;
 *  - LIGAR TUDO (loja), DESFAZER e BOMBA;
 *  - ✦ AUTO: o assistente monta uma rede que funciona e explica cada escolha.
 *    Com ele, a missão fica "assistida" e não conta para as conquistas.
 *  - ? LEGENDA: explica cada sensor, as camadas ocultas e cada ação da missão
 *    (abre sozinha na primeira visita a cada missão).
 *
 * ENERGIA: cada peça tem preço (`PRICE` em `core/nn/network.ts`) e a missão tem
 * uma bateria que paga a rede E o treino: o que a rede não gasta vira reserva
 * para treinar. A cena recusa edições que estourem a bateria. O limiar de
 * eficiência que vale estrela NÃO aparece — é parte do desafio.
 *
 * Mudar a rede (neurônio, cabo, ativação) zera o treino: pesos, energia de
 * treino gasta e água voltam ao início. PODA e TRAVA são "cirurgias" pós-treino
 * e preservam pesos e recursos.
 *
 * A cena edita o {@link Board} salvo em `GameState` e nunca treina: quem cuida
 * dos pesos é a TrainScene.
 */
import Phaser from 'phaser';
import { analytics, audio, state } from '../app/services';
import { Blueprint, Board, autoWire, boardFromTopology, boardToTopology, emptyBoard, isAllowedLink, nodeColumn, slotId } from '../core/missions/board';
import { fullyConnected } from '../core/missions/catalog';
import { getMission } from '../core/missions/catalog';
import { fieldInputs } from '../core/missions/datasets';
import { MissionDef, toSamples } from '../core/missions/types';
import { PRICE, countHidden, energyCost, forward, initParams, linkKey, reconcileParams, toInputMap, validateTopology } from '../core/nn/network';
import { DESIGN_TOOLS, DesignToolDef } from '../core/progression/tools';
import { Robot } from '../entities/Robot';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { NetworkView } from '../ui/NetworkView';
import { celebrate, showToast, tip } from '../ui/Toast';
import { burst, floatText } from '../ui/fx';
import { C, body, css, regularPoly, title } from '../ui/theme';
import { runTour, tourBlocks, touring } from '../ui/Tour';
import { addPanel } from '../ui/widgets';
import { BaseScene, MissionSceneData } from './BaseScene';

type Tool = 'cable' | 'neuron' | 'eraser' | 'activation' | 'probe' | 'freeze';
type Icon = (g: Phaser.GameObjects.Graphics, c: number) => void;

/** Escala pentatônica menor (em semitons) — qualquer sequência de blocos soa bem. */
const PENTA = [0, 3, 5, 7, 10, 12, 15];

const ICONS: Record<string, Icon> = {
  cable: (g, c) => g.lineStyle(4, c).lineBetween(-18, 8, 18, -8).fillStyle(c).fillRect(-23, 3, 10, 10).fillRect(13, -13, 10, 10),
  neuron: (g, c) => g.lineStyle(4, c).strokePoints(regularPoly(6, 15, 0), true, true),
  eraser: (g, c) => g.lineStyle(5, c).lineBetween(-12, -12, 12, 12).lineBetween(12, -12, -12, 12),
  activation: (g, c) => g.lineStyle(4, c).lineBetween(-16, 8, 0, 8).lineBetween(0, 8, 14, -12),
  probe: (g, c) => g.lineStyle(4, c).strokeCircle(-3, -3, 10).lineBetween(4, 4, 14, 14),
  freeze: (g, c) => g.lineStyle(4, c).strokeRect(-11, -2, 22, 16).strokeRect(-6, -13, 12, 11),
  prune: (g, c) => g.lineStyle(4, c).lineBetween(-14, -12, 10, 12).lineBetween(-14, 12, 10, -12).fillStyle(c).fillCircle(-14, -12, 5).fillCircle(-14, 12, 5),
  auto: (g, c) => g.fillStyle(c).fillTriangle(-4, -16, -12, 4, 0, 2).fillTriangle(4, 16, 12, -4, 0, -2),
  assist: (g, c) => g.fillStyle(c).fillPoints(Array.from({ length: 8 }, (_, i) => new Phaser.Math.Vector2(Math.cos(-Math.PI / 2 + (i * Math.PI) / 4) * (i % 2 ? 6 : 16), Math.sin(-Math.PI / 2 + (i * Math.PI) / 4) * (i % 2 ? 6 : 16))), true),
};

const TOOL_COLOR: Record<string, number> = {
  cable: C.cyan,
  neuron: C.violet,
  eraser: C.orange,
  activation: C.green,
  probe: C.yellow,
  freeze: C.text,
  prune: C.red,
  auto: C.green,
  assist: C.magenta,
};

export class DesignScene extends BaseScene {
  protected accent = C.yellow;
  protected music = 'design' as const;

  private mission!: MissionDef;
  private bp!: Blueprint;
  private board!: Board;
  private ceiling = 0;
  private energyText!: Phaser.GameObjects.Text;
  private energyBar!: Phaser.GameObjects.Graphics;
  private view!: NetworkView;
  private tool: Tool = 'cable';
  private modes: Tool[] = [];
  private toolButtons: Partial<Record<Tool, NeonButton>> = {};
  private undoStack: string[] = [];
  private dragFrom: string | null = null;
  private armed: string | null = null;
  private hint!: Phaser.GameObjects.Text;
  private bot!: Robot;
  private nextBtn!: NeonButton;
  private legendBtn!: NeonButton;
  private boardRect!: { x: number; y: number; w: number; h: number };
  private popup: Phaser.GameObjects.Container | null = null;

  constructor() {
    super('Design');
  }

  init(data: MissionSceneData): void {
    this.mission = getMission(data.missionId);
  }

  /** Ferramentas do mapa já liberadas. */
  private get unlocked(): DesignToolDef[] {
    return DESIGN_TOOLS.filter((d) => state.stars(d.after) > 0);
  }

  protected build(): void {
    const m = this.mission;
    this.bp = state.blueprint(m.id);
    this.board = state.design(m.id).board;
    state.assisted = !!state.design(m.id).assisted;
    this.ceiling = state.coinCeiling(m);
    this.undoStack = [];
    this.dragFrom = this.armed = null;
    this.popup = null;
    this.tool = 'cable';

    const top = this.addTopBar(m, 'design');
    const barH = 96;
    const boardRect = { x: 16, y: top + 10, w: this.W - 32, h: this.H - top - barH - 82 };
    this.boardRect = boardRect;
    const tour = touring(m.id);
    this.data.set('touring', tour);
    addPanel(this, boardRect, C.panelEdge, 0.55);
    this.view = new NetworkView(this, this.bp, this.board, boardRect, { showSlots: true, showHeaders: true, labelPad: 200 });
    if (m.skin === 'field') this.addDataPreview(boardRect.x + boardRect.w - 150, boardRect.y + boardRect.h - 150);

    // LEGENDA, DESFAZER e BOMBA ficam no meio da barra superior.
    const tb = 104;
    this.legendBtn = new NeonButton(this, this.W / 2 - tb - 6, top / 2, tb, 42, t('design.legend'), () => this.openLegend(), { color: C.cyan, size: 13 });
    new NeonButton(this, this.W / 2, top / 2, tb, 42, `↶ ${t('design.tool.undo')}`, () => this.undo(), { color: C.text, size: 13 });
    new NeonButton(this, this.W / 2 + tb + 6, top / 2, tb, 42, `● ${t('design.tool.clear')}`, () => this.clearAll(), { color: C.red, size: 13 });

    // Faixa de dica com o mascote e a bateria de energia.
    const hintY = this.H - barH - 40;
    this.bot = new Robot(this, 56, hintY - 4, 0.42);
    this.hint = body(this, 100, hintY, '', 21, C.text).setOrigin(0, 0.5).setWordWrapWidth(this.W - 480);
    this.energyText = title(this, this.W - 24, hintY - 18, '', 21, C.green).setOrigin(1, 0.5);
    this.energyBar = this.add.graphics();
    body(this, this.W - 24, hintY + 24, t('design.prices', { c: state.caps.cablePrice, n: PRICE.neuron, d: PRICE.deepNeuron }), 15, C.dim).setOrigin(1, 0.5);

    this.buildHotbar(barH);
    this.bindPointer();
    this.refresh(false);
    if (tour) {
      this.startTour();
      return;
    }
    this.announceTools();
    // Primeira visita a esta missão: abre a legenda dos sensores e ações.
    if (state.markTip(`legend_${m.id}`)) this.time.delayedCall(350, () => this.openLegend());
  }

  /** Missão-tutorial: lições intercaladas com passos nesta tela (ver `ui/Tour.ts`). */
  private startTour(): void {
    state.markTip(`legend_${this.mission.id}`);
    const v = this.view;
    const r = v.radius;
    const box = (ids: string[], left: number, right: number) => {
      const ps = ids.map((id) => v.posOf(id));
      const xs = ps.map((p) => p.x);
      const ys = ps.map((p) => p.y);
      return { x: Math.min(...xs) - left, y: Math.min(...ys) - r - 6, w: Math.max(...xs) - Math.min(...xs) + left + right, h: Math.max(...ys) - Math.min(...ys) + 2 * r + 12 };
    };
    const slots = Array.from({ length: this.bp.slots }, (_, k) => slotId(0, k));
    runTour(this, 'Design', {
      targets: {
        board: () => this.boardRect,
        sensors: () => box(this.bp.inputs, 150, r + 6),
        actions: () => box(this.bp.outputs, r + 6, 160),
        slots: () => box(slots, r + 10, r + 10),
        tool_neuron: () => this.toolButtons.neuron!.rect(),
        tool_cable: () => this.toolButtons.cable!.rect(),
        energy: () => ({ x: this.W - 420, y: this.energyText.y - 22, w: 400, h: 70 }),
        help: () => this.legendBtn.rect(),
        next: () => this.nextBtn.rect(),
      },
      already: {
        neuron: () => this.board.hidden.some((col) => col.some(Boolean)),
        valid: () => validateTopology(boardToTopology(this.bp, this.board)).ok,
      },
    });
  }

  /** Avisa (uma vez) cada ferramenta recém-liberada pelo mapa. */
  private announceTools(): void {
    this.unlocked.forEach((d, i) => {
      if (!state.markTip(`tool_${d.id}`)) return;
      this.time.delayedCall(400 + i * 600, () => {
        audio.sfx('star', 5);
        showToast(this, { title: `★ ${t('design.newTool')} · ${t(`tool.${d.id}.t`)}`, text: t(`tool.${d.id}.d`), color: C.yellow, life: 8000 });
      });
    });
  }

  /* ------------------------------------------------------------------ hotbar */

  private buildHotbar(barH: number): void {
    const y = this.H - barH / 2 - 6;
    const extra = this.unlocked;
    this.modes = ['cable', 'neuron', 'eraser', ...extra.filter((d) => d.kind === 'mode').map((d) => d.id as Tool)];
    const actions: string[] = [...extra.filter((d) => d.kind === 'action').map((d) => d.id), ...(state.caps.autowire ? ['auto'] : []), 'assist'];
    const n = this.modes.length + actions.length;
    const groupGap = actions.length ? 14 : 0;
    const gap = 8;
    const avail = this.W - 40 - 246 - groupGap;
    const bw = Math.min(124, Math.floor((avail - gap * (n - 1)) / n));
    const size = bw >= 112 ? 14 : 12;
    let x = 20 + bw / 2;
    const add = (id: string, onClick: () => void) => {
      const label = id === 'assist' ? t('assist.btn') : t(`design.tool.${id}`);
      const b = new NeonButton(this, x, y, bw, 80, label, onClick, { color: TOOL_COLOR[id], size, icon: ICONS[id] });
      x += bw + gap;
      return b;
    };
    this.toolButtons = {};
    for (const id of this.modes) this.toolButtons[id] = add(id, () => this.setTool(id));
    x += groupGap;
    for (const id of actions) add(id, () => (id === 'prune' ? this.prune() : id === 'assist' ? this.openAssist() : this.autoWire()));

    this.nextBtn = new NeonButton(this, this.W - 130, y, 220, 80, `${t('design.next')} ▶`, () => this.toTrain(), { color: C.magenta, size: 24 });
    this.toolButtons.cable?.setSelected(true);

    this.input.keyboard?.on('keydown', (e: KeyboardEvent) => {
      const i = Number(e.key) - 1;
      if (i >= 0 && i < this.modes.length) this.setTool(this.modes[i]);
      else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) this.undo();
    });
  }

  private setTool(tool: Tool): void {
    this.tool = tool;
    this.events.emit(`tour:tool_${tool}`);
    this.armed = null;
    this.view.highlight = null;
    (Object.keys(this.toolButtons) as Tool[]).forEach((k) => this.toolButtons[k]?.setSelected(k === tool));
    if (tool === 'activation') tip(this, 'activation', true);
    if (tool === 'probe') tip(this, 'probe', true);
    if (tool === 'freeze') tip(this, 'freeze', true);
    this.setHint(`design.hint.${tool}`, 'think');
  }

  /* ------------------------------------------------------------------ ponteiro */

  private bindPointer(): void {
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => this.onDown(p.x, p.y));
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (!this.dragFrom) return;
      this.view.tempCable = { from: this.dragFrom, x: p.x, y: p.y };
      const over = this.view.nodeAt(p.x, p.y);
      this.view.highlight = over && over !== this.dragFrom ? over : this.dragFrom;
    });
    this.input.on('pointerup', (p: Phaser.Input.Pointer) => this.onUp(p.x, p.y));
  }

  private onDown(x: number, y: number): void {
    if (this.popup || tourBlocks(this, x, y)) return;
    const node = this.view.nodeAt(x, y);
    const slot = this.view.slotAt(x, y);
    const isNeuron = !!node && /^h/.test(node);

    switch (this.tool) {
      case 'eraser':
        if (isNeuron) this.removeNeuron(node!);
        else if (node) this.fail('design.hint.eraser');
        else {
          const li = this.view.linkAt(x, y);
          if (li >= 0) this.removeLink(li);
        }
        return;
      case 'activation':
        if (isNeuron) this.cycleActivation(node!);
        else if (node) this.fail('design.hint.activation');
        return;
      case 'probe':
        if (isNeuron || (node && this.bp.outputs.includes(node))) this.openProbe(node!);
        else if (node) this.fail('design.hint.probe');
        return;
      case 'freeze': {
        const li = this.view.linkAt(x, y);
        if (li >= 0) this.toggleFreeze(li);
        return;
      }
    }
    if (node) {
      // Segundo toque do modo "toque-toque": fecha o cabo armado.
      if (this.armed && this.armed !== node) {
        this.connect(this.armed, node);
        this.armed = null;
        this.view.highlight = null;
        return;
      }
      this.dragFrom = node;
      this.view.highlight = node;
      this.view.tempCable = { from: node, x, y };
      return;
    }
    if (slot) this.placeNeuron(slot.col, slot.row);
    else if (this.tool === 'cable' && this.view.linkAt(x, y) < 0) this.armed = this.view.highlight = null;
  }

  private onUp(x: number, y: number): void {
    if (!this.dragFrom) return;
    const from = this.dragFrom;
    const target = this.view.nodeAt(x, y);
    this.dragFrom = null;
    this.view.tempCable = null;
    if (target && target !== from) {
      this.connect(from, target);
      this.armed = this.view.highlight = null;
    } else if (target === from) {
      // Soltou no mesmo bloco: fica "armado" esperando o toque no destino.
      this.armed = from;
      this.view.highlight = from;
      audio.sfx('tick');
      this.setHint('design.hint.armed', 'think');
    } else {
      this.armed = this.view.highlight = null;
    }
  }

  /* ------------------------------------------------------------------ edições */

  private cost(): number {
    return energyCost(boardToTopology(this.bp, this.board), this.mission.extraInputs, state.caps.cablePrice);
  }

  /** Guarda o estado atual para o DESFAZER (máx. 40 passos). */
  private snapshot(): void {
    this.undoStack.push(JSON.stringify(this.board));
    if (this.undoStack.length > 40) this.undoStack.shift();
  }

  /** Aplica um tabuleiro inteiro (desfazer, auto, bomba) mantendo a mesma referência usada pela view. */
  private replaceBoard(b: Board): void {
    this.board.hidden = b.hidden;
    this.board.links = b.links;
    this.board.acts = b.acts ?? {};
    this.board.frozen = b.frozen ?? [];
  }

  /**
   * Confere a bateria depois de uma edição. Se estourou o teto, desfaz a
   * edição (o snapshot já foi tirado) e avisa. @returns `true` se coube.
   */
  private withinEnergy(): boolean {
    if (this.cost() <= this.ceiling) return true;
    const prev = this.undoStack.pop();
    if (prev) this.replaceBoard(JSON.parse(prev) as Board);
    this.fail('design.hint.noCoins');
    this.cameras.main.shake(120, 0.005);
    this.flashEnergy();
    return false;
  }

  private placeNeuron(col: number, row: number): void {
    this.snapshot();
    this.board.hidden[col][row] = true;
    if (!this.withinEnergy()) return;
    state.bump('neurons_placed');
    tip(this, col > 0 ? 'deep' : 'neuron', true);
    const p = this.view.posOf(slotId(col, row));
    audio.sfx('place', PENTA[(this.bp.slots - 1 - row + col * 2) % PENTA.length]);
    burst(this, p.x, p.y, C.violet, 12);
    this.popAt(p.x, p.y, C.violet);
    floatText(this, p.x, p.y - 30, `-${col > 0 ? PRICE.deepNeuron : PRICE.neuron}⚡`, css(C.yellow), 20);
    this.refresh(true);
    this.events.emit('tour:neuron');
  }

  private removeNeuron(id: string): void {
    this.snapshot();
    const [, c, r] = /^h(\d+)_(\d+)$/.exec(id)!;
    this.board.hidden[+c][+r] = false;
    this.board.links = this.board.links.filter(([a, b]) => a !== id && b !== id);
    if (this.board.acts) delete this.board.acts[id];
    const p = this.view.posOf(id);
    audio.sfx('erase');
    burst(this, p.x, p.y, C.orange, 16, 320);
    this.refresh(true);
  }

  private removeLink(index: number, keepTraining = false): void {
    this.snapshot();
    const [a, b] = this.board.links[index];
    const pa = this.view.posOf(a);
    const pb = this.view.posOf(b);
    this.board.links.splice(index, 1);
    this.board.frozen = (this.board.frozen ?? []).filter((k) => k !== linkKey(a, b));
    audio.sfx('erase');
    burst(this, (pa.x + pb.x) / 2, (pa.y + pb.y) / 2, C.orange, 8);
    this.refresh(true, keepTraining);
  }

  private connect(a: string, b: string): void {
    const ca = nodeColumn(this.bp, this.board, a);
    const cb = nodeColumn(this.bp, this.board, b);
    if (ca === cb) return this.fail('design.hint.backwards');
    // O jogador pode arrastar em qualquer sentido: orientamos o cabo para a direita.
    const [from, to] = ca < cb ? [a, b] : [b, a];
    if (!isAllowedLink(this.bp, this.board, from, to)) {
      tip(this, 'neuron', true);
      return this.fail('design.hint.direct');
    }
    if (this.board.links.some(([x, y]) => x === from && y === to)) {
      audio.sfx('tick');
      return;
    }
    this.snapshot();
    this.board.links.push([from, to]);
    if (!this.withinEnergy()) return;
    // Uma dica por ação, da mais específica para a mais geral.
    if (this.mission.extraInputs?.includes(from)) tip(this, 'feature', true);
    else if (Math.abs(cb - ca) > 1) tip(this, 'skip', true);
    else if (/^h/.test(from) && /^h/.test(to)) tip(this, 'deep', true);
    else tip(this, 'cable', true);
    const pf = this.view.posOf(from);
    const pt = this.view.posOf(to);
    audio.sfx('connect', PENTA[this.board.links.length % PENTA.length]);
    // Faísca que percorre o cabo novo.
    const spark = this.add.rectangle(pf.x, pf.y, 14, 14, 0xffffff).setBlendMode(Phaser.BlendModes.ADD).setDepth(50);
    this.tweens.add({
      targets: spark,
      x: pt.x,
      y: pt.y,
      angle: 180,
      duration: 220,
      onComplete: () => {
        spark.destroy();
        burst(this, pt.x, pt.y, C.cyan, 8, 180);
      },
    });
    this.refresh(true);
  }

  private cycleActivation(id: string): void {
    this.snapshot();
    const acts = (this.board.acts ??= {});
    const cycle = state.caps.activations;
    const next = cycle[(cycle.indexOf(acts[id] ?? 'tanh') + 1) % cycle.length];
    if (next === 'tanh') delete acts[id];
    else acts[id] = next;
    const p = this.view.posOf(id);
    audio.sfx('turn', cycle.indexOf(next) * 4);
    this.popAt(p.x, p.y, C.green);
    floatText(this, p.x, p.y - 34, next.toUpperCase(), css(C.green), 18);
    // Explicação didática de cada troca (sempre, não só na primeira vez).
    showToast(this, { title: t('act.title', { f: next.toUpperCase() }), text: t(`act.${next}`), color: C.green, life: 7000 });
    this.refresh(true);
  }

  private toggleFreeze(index: number): void {
    const [a, b] = this.board.links[index];
    const key = linkKey(a, b);
    this.snapshot();
    const frozen = (this.board.frozen ??= []);
    const on = !frozen.includes(key);
    this.board.frozen = on ? [...frozen, key] : frozen.filter((k) => k !== key);
    const pa = this.view.posOf(a);
    const pb = this.view.posOf(b);
    audio.sfx(on ? 'place' : 'erase', on ? -5 : 5);
    burst(this, (pa.x + pb.x) / 2, (pa.y + pb.y) / 2, 0xffffff, 8, 160);
    this.setHint(on ? 'design.hint.frozen' : 'design.hint.unfrozen', 'idle');
    // Congelar não muda a arquitetura: os pesos treinados continuam valendo.
    this.refresh(true, true);
  }

  /** PODA: corta o cabo (não congelado) de menor peso treinado. */
  private prune(): void {
    const topo = boardToTopology(this.bp, this.board);
    const params = state.design(this.mission.id).params;
    if (!params || !topo.links.some(([a, b]) => linkKey(a, b) in params.weights)) return this.fail('design.hint.pruneNeedsTrain');
    const frozen = new Set(topo.frozen ?? []);
    let best: [string, string] | null = null;
    let bestW = Infinity;
    for (const [a, b] of topo.links) {
      const k = linkKey(a, b);
      const w = Math.abs(params.weights[k] ?? Infinity);
      if (!frozen.has(k) && w < bestW) {
        bestW = w;
        best = [a, b];
      }
    }
    if (!best) return this.fail('design.hint.pruneNeedsTrain');
    const index = this.board.links.findIndex(([a, b]) => a === best![0] && b === best![1]);
    const pa = this.view.posOf(best[0]);
    const pb = this.view.posOf(best[1]);
    this.removeLink(index, true);
    tip(this, 'prune', true);
    floatText(this, (pa.x + pb.x) / 2, (pa.y + pb.y) / 2 - 20, `+${PRICE.cable}⚡`, css(C.green), 22);
    this.hint.setText(t('design.hint.pruned', { w: bestW.toFixed(2) }));
  }

  private autoWire(): void {
    if (!state.caps.autowire) return this.fail('design.autoLocked');
    if (!this.board.hidden.some((col) => col.some(Boolean))) return this.fail('design.hint.autoNeedsNeuron');
    this.snapshot();
    this.board.links = autoWire(this.bp, this.board);
    if (!this.withinEnergy()) return;
    tip(this, 'auto', true);
    audio.sfx('zap');
    this.cameras.main.flash(180, 57, 255, 136);
    this.refresh(true);
  }

  private undo(): void {
    const prev = this.undoStack.pop();
    if (!prev) return void audio.sfx('error');
    this.replaceBoard(JSON.parse(prev) as Board);
    audio.sfx('turn', -5);
    this.refresh(true);
  }

  private clearAll(): void {
    this.snapshot();
    this.replaceBoard(emptyBoard(this.bp));
    state.bump('bombs');
    // Começar do zero tira a marca de "assistida" desta missão.
    if (state.design(this.mission.id).assisted) {
      state.saveDesign(this.mission.id, { assisted: false });
      state.assisted = false;
      this.time.delayedCall(500, () => this.scene.restart());
    }
    audio.sfx('bomb');
    this.cameras.main.shake(260, 0.012);
    this.cameras.main.flash(200, 255, 51, 85);
    burst(this, this.W / 2, this.H / 2, C.red, 40, 600);
    this.refresh(true);
  }

  /* ------------------------------------------------------------------ legenda e assistente */

  /** Camada modal genérica do Design. */
  private modal(color: number, w: number, h: number): { layer: Phaser.GameObjects.Container; x: number; y: number; close: () => void } {
    const layer = this.add.container(0, 0).setDepth(2000);
    this.popup = layer;
    layer.add(this.add.rectangle(this.W / 2, this.H / 2, this.W, this.H, 0x000000, 0.75).setInteractive());
    const x = this.W / 2 - w / 2;
    const y = this.H / 2 - h / 2;
    layer.add(addPanel(this, { x, y, w, h }, color, 0.97));
    const close = () => {
      layer.destroy();
      this.popup = null;
    };
    return { layer, x, y, close };
  }

  /** LEGENDA: o que cada sensor lê, o que é a camada oculta e o que cada ação faz. */
  private openLegend(): void {
    const w = Math.min(this.W - 60, 1180);
    const h = this.H - 60;
    const { layer, x, y, close } = this.modal(C.cyan, w, h);
    layer.add(title(this, this.W / 2, y + 32, t('legend.title'), 26, C.cyan).setOrigin(0.5));
    const colW = (w - 80) / 3;
    const cols: [string, string, number, string[]][] = [
      ['legend.in.t', 'legend.in.d', C.yellow, this.bp.inputs],
      ['legend.hidden.t', 'legend.hidden.d', C.violet, []],
      ['legend.out.t', 'legend.out.d', C.green, this.bp.outputs],
    ];
    cols.forEach(([tk, dk, color, ids], i) => {
      const cx = x + 30 + i * (colW + 10);
      const g = this.add.graphics();
      const shape = i === 0 ? regularPoly(4, 18) : i === 1 ? regularPoly(6, 18, 0) : regularPoly(4, 16, Math.PI / 4);
      g.fillStyle(C.bg).fillPoints(shape.map((v) => new Phaser.Math.Vector2(v.x + cx + 20, v.y + y + 90)), true);
      g.lineStyle(3, color).strokePoints(shape.map((v) => new Phaser.Math.Vector2(v.x + cx + 20, v.y + y + 90)), true, true);
      layer.add([g, title(this, cx + 48, y + 90, t(tk), 18, color).setOrigin(0, 0.5)]);
      const intro = body(this, cx, y + 120, t(dk), 18, C.text).setWordWrapWidth(colW - 10).setLineSpacing(3);
      layer.add(intro);
      let ly = intro.y + intro.height + 14;
      for (const id of ids) {
        const line = body(this, cx, ly, `• ${t(`io.${id}`)}: `, 17, color).setWordWrapWidth(colW - 10);
        const desc = body(this, cx, ly + 20, t(`io.${id}.d`), 16, C.text).setWordWrapWidth(colW - 20);
        layer.add([line, desc]);
        ly += 26 + desc.height;
      }
    });
    layer.add(new NeonButton(this, this.W / 2, y + h - 40, 220, 52, t('legend.close'), close, { color: C.cyan, size: 18 }));
    audio.sfx('whoosh');
  }

  /** ✦ AUTO: confirma e então monta a rede de referência explicando cada escolha. */
  private openAssist(): void {
    const { layer, y, close } = this.modal(C.magenta, 700, 330);
    layer.add(title(this, this.W / 2, y + 36, t('assist.title'), 26, C.magenta).setOrigin(0.5));
    layer.add(body(this, this.W / 2, y + 84, t('assist.confirm'), 21, C.text).setOrigin(0.5, 0).setWordWrapWidth(620).setAlign('center'));
    layer.add(new NeonButton(this, this.W / 2 - 160, y + 280, 280, 58, t('assist.yes'), () => {
      close();
      this.applyAssist();
    }, { color: C.magenta, size: 17 }));
    layer.add(new NeonButton(this, this.W / 2 + 160, y + 280, 280, 58, t('assist.no'), close, { color: C.orange, size: 17 }));
  }

  private applyAssist(): void {
    const m = this.mission;
    const caps = state.caps;
    // A referência pode usar sensores que o jogador ainda não tem (ex.: x², y²): então usa uma rede densa nos básicos.
    let ref = m.reference.topology;
    if (!ref.links.every(([a]) => this.bp.inputs.includes(a) || /^h/.test(a))) {
      ref = { ...fullyConnected(m.inputs, [Math.min(this.bp.slots, 4)], m.outputs), inputs: this.bp.inputs };
    }
    this.snapshot();
    this.replaceBoard(boardFromTopology(this.bp, ref));
    const hyper = { ...m.defaults, ...m.reference.hyper };
    if (!caps.epochValues.includes(hyper.epochs)) hyper.epochs = Math.max(...caps.epochValues);
    const es = !!m.reference.earlyStop && caps.earlystop;
    this.refresh(true);
    state.saveDesign(m.id, { assisted: true, hyper, earlyStop: es });
    state.assisted = true;
    audio.sfx('zap');
    this.cameras.main.flash(200, 255, 43, 214);

    // Explicações, uma a uma.
    const used = [...new Set(ref.links.map((l) => l[0]).filter((id) => !/^h/.test(id)))];
    const unused = m.inputs.filter((id) => !used.includes(id));
    const names = (ids: string[]) => ids.map((id) => t(`io.${id}`)).join(', ');
    const n = ref.hidden.flat().length;
    const steps: [string, string][] = [
      [t('assist.s1.t'), t('assist.s1.used', { a: names(used) }) + (unused.length ? t('assist.s1.unused', { a: names(unused) }) : '')],
      [t('assist.s2.t'), t('assist.s2.d', { n, why: t(n <= 1 ? 'assist.why.1' : 'assist.why.many') })],
      [t('assist.s3.t'), t('assist.s3.d', { lr: hyper.learningRate, e: hyper.epochs, es: es ? t('assist.es') : '' })],
      [t('assist.concept'), t(`mission.${m.id}.concept`)],
    ];
    steps.forEach(([ti, tx], i) => this.time.delayedCall(300 + i * 900, () => showToast(this, { title: `✦ ${ti}`, text: tx, color: C.magenta, life: 12000 })));
    body(this, 170, 64, t('assist.badge'), 14, C.magenta).setOrigin(0, 1);
  }

  /* ------------------------------------------------------------------ sonda */

  /** Mostra o que um neurônio (ou ação) responde com os pesos atuais. */
  private openProbe(id: string): void {
    const m = this.mission;
    const d = state.design(m.id);
    const topo = boardToTopology(this.bp, this.board);
    const trained = !!d.params && d.epochs > 0;
    const params = reconcileParams(topo, d.params ?? initParams(topo, d.seed), d.seed);
    const fn = d.hyper.activation;
    const valueOf = (inputs: Record<string, number>) => forward(topo, params, inputs, fn).values[id] ?? 0;
    audio.sfx('zap', 7);

    const layer = this.add.container(0, 0).setDepth(2000);
    this.popup = layer;
    layer.add(this.add.rectangle(this.W / 2, this.H / 2, this.W, this.H, 0x000000, 0.7).setInteractive());
    const pw = 620;
    const ph = 470;
    const px = this.W / 2 - pw / 2;
    const py = this.H / 2 - ph / 2;
    layer.add(addPanel(this, { x: px, y: py, w: pw, h: ph }, C.yellow, 0.97));
    const name = /^h/.test(id) ? t('design.probe.neuron') : t(`io.${id}`);
    layer.add(title(this, px + 24, py + 20, `${t('tool.probe.t')} · ${name}`, 22, C.yellow));
    layer.add(body(this, px + 24, py + 52, t(trained ? 'design.probe.trained' : 'design.probe.untrained'), 17, trained ? C.text : C.orange).setWordWrapWidth(pw - 48));

    const g = this.add.graphics();
    layer.add(g);
    const area = { x: px + 24, y: py + 90, w: pw - 48, h: ph - 170 };
    if (m.skin === 'field') {
      // Mapa do plano: claro = o neurônio dispara forte naquele ponto.
      const size = area.h;
      const ox = area.x + (area.w - size) / 2;
      const n = 26;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const v = valueOf(fieldInputs(((i + 0.5) / n) * 2 - 1, 1 - ((j + 0.5) / n) * 2));
          const k = Phaser.Math.Clamp(Math.abs(v), 0, 1);
          g.fillStyle(v >= 0 ? C.yellow : C.violet, 0.1 + k * 0.85).fillRect(ox + (i * size) / n, area.y + (j * size) / n, size / n + 0.5, size / n + 0.5);
        }
      }
      for (const p of m.train) {
        g.fillStyle(p.targets[0] ? C.magenta : C.cyan).fillRect(ox + ((p.in.x + 1) / 2) * size - 2, area.y + ((1 - p.in.y) / 2) * size - 2, 5, 5);
      }
      g.lineStyle(2, C.panelEdge).strokeRect(ox, area.y, size, size);
    } else {
      // Barras: uma por exemplo de treino, cor = resposta certa daquele exemplo.
      const samples = toSamples(topo, m.train).slice(0, 16);
      const bw = area.w / samples.length;
      const mid = area.y + area.h / 2;
      g.lineStyle(1, C.dim).lineBetween(area.x, mid, area.x + area.w, mid);
      samples.forEach((s, i) => {
        const v = Phaser.Math.Clamp(valueOf(toInputMap(topo, s.inputs)), -1, 1);
        const cls = s.targets.length === 1 ? (s.targets[0] >= 0.5 ? 1 : 0) : s.targets.indexOf(Math.max(...s.targets));
        const color = [C.cyan, C.magenta, C.yellow, C.green][cls % 4];
        const h = (v * area.h) / 2;
        g.fillStyle(color, 0.85).fillRect(area.x + i * bw + 3, h >= 0 ? mid - h : mid, bw - 6, Math.abs(h));
      });
      layer.add(body(this, area.x, area.y + area.h + 4, t('design.probe.bars'), 15, C.dim).setWordWrapWidth(area.w));
    }
    tip(this, 'probe', true);
    layer.add(
      new NeonButton(this, this.W / 2, py + ph - 40, 220, 52, t('menu.close'), () => {
        layer.destroy();
        this.popup = null;
      }, { color: C.orange, size: 18 }),
    );
  }

  /* ------------------------------------------------------------------ feedback */

  /** Anel que se expande onde um bloco nasceu. */
  private popAt(x: number, y: number, color: number): void {
    const ring = this.add.graphics({ x, y }).lineStyle(4, color).strokePoints(regularPoly(6, this.view.radius, 0), true, true);
    this.tweens.add({ targets: ring, scale: 2, alpha: 0, duration: 320, onComplete: () => ring.destroy() });
  }

  private fail(hintKey: string): void {
    audio.sfx('error');
    this.bot.shake();
    this.setHint(hintKey, 'sad');
    this.armed = this.view.highlight = null;
  }

  private setHint(key: string, mood: 'idle' | 'think' | 'happy' | 'sad'): void {
    this.hint.setText(t(key));
    this.bot.setMood(mood);
  }

  private flashEnergy(): void {
    this.tweens.add({ targets: this.energyText, scale: 1.25, duration: 90, yoyo: true, repeat: 1 });
  }

  /** Desenha a carteira de moedas: violeta = gasto na rede, amarelo = o que ainda dá para gastar. */
  private redrawEnergy(): void {
    const cost = this.cost();
    const free = Math.max(0, this.ceiling - cost);
    this.energyText.setText(t('design.energy', { a: cost, b: this.ceiling })).setColor(css(free < this.ceiling * 0.2 ? C.orange : C.yellow));
    const w = 230;
    const x = this.W - 24 - w;
    const y = this.energyText.y + 14;
    const segs = 20;
    const g = this.energyBar.clear();
    for (let i = 0; i < segs; i++) {
      const v = ((i + 0.5) / segs) * this.ceiling;
      const color = v <= cost ? C.violet : C.yellow;
      g.fillStyle(color, color === C.yellow ? 0.9 : 0.6).fillRect(x + (i * w) / segs + 1, y, w / segs - 3, 10);
    }
  }

  /**
   * Recalcula validação/dica e, se `changed`, salva o tabuleiro.
   * Uma mudança de rede zera o treino (pesos, energia de treino e água);
   * `keepTraining` preserva tudo (poda e trava).
   */
  private refresh(changed: boolean, keepTraining = false): void {
    if (changed && keepTraining) state.saveDesign(this.mission.id, { board: this.board });
    else if (changed) {
      const d = state.design(this.mission.id);
      const hadTraining = d.epochs > 0 || (d.trainSpent ?? 0) > 0;
      state.saveDesign(this.mission.id, { board: this.board, epochs: 0, params: null, loss: 1, trainSpent: 0, water: undefined, usedEarlyStop: false });
      if (hadTraining) {
        floatText(this, this.W - 140, this.energyText.y - 30, t('design.resetTrain'), css(C.magenta), 18);
        tip(this, 'retrain', true);
      }
    }
    const topo = boardToTopology(this.bp, this.board);
    const check = validateTopology(topo);
    this.nextBtn.setEnabled(check.ok);
    this.redrawEnergy();
    if (changed) celebrate(this);

    if (check.ok) {
      this.setHint('design.hint.ok', 'happy');
      if (changed) this.events.emit('tour:valid');
      if (changed) {
        this.bot.hop();
        const used = new Set(topo.links.map((l) => l[0]));
        if (this.cost() > this.ceiling * 0.75) tip(this, 'overbudget', true);
        else if (this.mission.inputs.some((id) => !used.has(id))) tip(this, 'unused', true);
        else tip(this, 'budget', true);
      }
    } else if (changed || !this.board.links.length) {
      this.setHint(this.board.links.length ? `design.hint.${check.issue}` : `design.hint.${this.tool}`, 'think');
    } else {
      this.setHint(`design.hint.${check.issue}`, 'think');
    }
  }

  private toTrain(): void {
    const topo = boardToTopology(this.bp, this.board);
    analytics.track('design_done', { mission: this.mission.id, hidden: countHidden(topo), links: topo.links.length });
    this.events.emit('tour:train');
    this.go('Train', { missionId: this.mission.id });
  }

  /** Miniatura dos dados de treino das missões de campo (ciano = aliado, magenta = invasor). */
  private addDataPreview(x: number, y: number): void {
    const size = 136;
    const g = this.add.graphics();
    g.fillStyle(C.bg, 0.85).fillRect(x, y, size, size).lineStyle(2, C.panelEdge).strokeRect(x, y, size, size);
    for (const p of this.mission.train) {
      const px = x + ((p.in.x + 1) / 2) * size;
      const py = y + ((1 - p.in.y) / 2) * size;
      g.fillStyle(p.targets[0] ? C.magenta : C.cyan, 0.9).fillRect(Phaser.Math.Clamp(px, x + 2, x + size - 4) - 2, Phaser.Math.Clamp(py, y + 2, y + size - 4) - 2, 5, 5);
    }
    body(this, x + size / 2, y - 6, t('design.data'), 15, C.dim).setOrigin(0.5, 1);
  }

  update(time: number): void {
    this.view.render(time);
  }
}
