/**
 * @module scenes/DesignScene
 *
 * FASE 1 — DESIGN: o jogador monta o cérebro do robô.
 *
 * Inspiração: Mario Maker / Mario Paint / Minecraft — ferramentas numa barra
 * inferior ("hotbar"), tudo responde na hora com som, pulo e estilhaços, e
 * cada bloco toca uma nota conforme a linha em que é colocado.
 *
 * Interação (igual no mouse e no toque):
 *  - CABO     : arraste de um bloco até outro — ou toque na origem e depois no destino;
 *  - NEURÔNIO : toque num encaixe vazio (também funciona com a ferramenta CABO);
 *  - BORRACHA : toque num neurônio ou cabo;
 *  - AUTO     : (upgrade) liga tudo em tudo entre as camadas ocupadas;
 *  - DESFAZER : volta um passo · BOMBA: limpa tudo.
 *
 * O tamanho do tabuleiro vem da {@link Blueprint} (missão + upgrades). O
 * medidor de CUSTO mostra cabos + neurônios contra o orçamento da 3ª estrela,
 * e cada ação pode disparar uma dica de conceito ({@link tip}).
 *
 * A cena edita o {@link Board} salvo em `GameState` e nunca mexe em pesos:
 * quem cuida disso é a TrainScene.
 */
import Phaser from 'phaser';
import { analytics, audio, state } from '../app/services';
import { Blueprint, Board, autoWire, boardToTopology, emptyBoard, nodeColumn, slotId } from '../core/missions/board';
import { getMission } from '../core/missions/catalog';
import { MissionDef } from '../core/missions/types';
import { countHidden, networkCost, validateTopology } from '../core/nn/network';
import { Robot } from '../entities/Robot';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { NetworkView } from '../ui/NetworkView';
import { celebrate, tip } from '../ui/Toast';
import { burst } from '../ui/fx';
import { C, body, css, regularPoly, title } from '../ui/theme';
import { addPanel } from '../ui/widgets';
import { BaseScene, MissionSceneData } from './BaseScene';

type Tool = 'cable' | 'neuron' | 'eraser';

/** Escala pentatônica menor (em semitons) — qualquer sequência de blocos soa bem. */
const PENTA = [0, 3, 5, 7, 10, 12, 15];

export class DesignScene extends BaseScene {
  protected accent = C.yellow;
  protected music = 'design' as const;

  private mission!: MissionDef;
  private bp!: Blueprint;
  private board!: Board;
  private costText!: Phaser.GameObjects.Text;
  private costHint!: Phaser.GameObjects.Text;
  private view!: NetworkView;
  private tool: Tool = 'cable';
  private toolButtons!: Record<Tool, NeonButton>;
  private undoStack: string[] = [];
  private dragFrom: string | null = null;
  private armed: string | null = null;
  private hint!: Phaser.GameObjects.Text;
  private bot!: Robot;
  private nextBtn!: NeonButton;

  constructor() {
    super('Design');
  }

  init(data: MissionSceneData): void {
    this.mission = getMission(data.missionId);
  }

  protected build(): void {
    const m = this.mission;
    this.bp = state.blueprint(m.id);
    this.board = state.design(m.id).board;
    this.undoStack = [];
    this.dragFrom = this.armed = null;
    this.tool = 'cable';

    const top = this.addTopBar(m, 'design');
    const barH = 96;
    const boardRect = { x: 16, y: top + 10, w: this.W - 32, h: this.H - top - barH - 78 };
    addPanel(this, boardRect, C.panelEdge, 0.55);
    this.view = new NetworkView(this, this.bp, this.board, boardRect, { showSlots: true, showHeaders: true, labelPad: 200 });
    if (m.skin === 'field') this.addDataPreview(boardRect.x + boardRect.w - 150, boardRect.y + boardRect.h - 150);

    // Faixa de dica com o mascote.
    const hintY = this.H - barH - 36;
    this.bot = new Robot(this, 56, hintY - 4, 0.42);
    this.hint = body(this, 100, hintY, '', 22, C.text).setOrigin(0, 0.5);
    // Medidor de custo x orçamento (3ª estrela).
    this.costText = title(this, this.W - 24, hintY - 10, '', 22, C.green).setOrigin(1, 0.5);
    this.costHint = body(this, this.W - 24, hintY + 14, '', 16, C.dim).setOrigin(1, 0.5);

    this.buildHotbar(barH);
    this.bindPointer();
    this.refresh(false);
  }

  /* ------------------------------------------------------------------ hotbar */

  private buildHotbar(barH: number): void {
    const y = this.H - barH / 2 - 6;
    const bw = 124;
    const bh = 80;
    const gap = 8;
    let x = 20 + bw / 2;
    const add = (label: string, color: number, icon: (g: Phaser.GameObjects.Graphics, c: number) => void, onClick: () => void) => {
      const b = new NeonButton(this, x, y, bw, bh, label, onClick, { color, size: 14, icon });
      x += bw + gap;
      return b;
    };
    this.toolButtons = {
      cable: add(t('design.tool.cable'), C.cyan, (g, c) => g.lineStyle(4, c).lineBetween(-18, 8, 18, -8).fillStyle(c).fillRect(-23, 3, 10, 10).fillRect(13, -13, 10, 10), () => this.setTool('cable')),
      neuron: add(t('design.tool.neuron'), C.violet, (g, c) => g.lineStyle(4, c).strokePoints(regularPoly(6, 15, 0), true, true), () => this.setTool('neuron')),
      eraser: add(t('design.tool.eraser'), C.orange, (g, c) => g.lineStyle(5, c).lineBetween(-12, -12, 12, 12).lineBetween(12, -12, -12, 12), () => this.setTool('eraser')),
    };
    x += 14;
    add(t('design.tool.auto'), state.caps.autowire ? C.green : C.dim, (g, c) => g.fillStyle(c).fillTriangle(-4, -16, -12, 4, 0, 2).fillTriangle(4, 16, 12, -4, 0, -2), () => this.autoWire());
    add(t('design.tool.undo'), C.text, (g, c) => g.lineStyle(4, c).beginPath().arc(0, 2, 12, Math.PI, Math.PI * 2.6).strokePath().fillStyle(c).fillTriangle(-20, 2, -4, 2, -12, -10), () => this.undo());
    add(t('design.tool.clear'), C.red, (g, c) => g.fillStyle(c).fillCircle(-2, 4, 11).lineStyle(3, c).lineBetween(4, -6, 12, -15), () => this.clearAll());

    this.nextBtn = new NeonButton(this, this.W - 130, y, 220, bh, `${t('design.next')} ▶`, () => this.toTrain(), { color: C.magenta, size: 24 });
    this.toolButtons.cable.setSelected(true);

    this.input.keyboard?.on('keydown', (e: KeyboardEvent) => {
      if (e.key === '1') this.setTool('cable');
      else if (e.key === '2') this.setTool('neuron');
      else if (e.key === '3') this.setTool('eraser');
      else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) this.undo();
    });
  }

  private setTool(tool: Tool): void {
    this.tool = tool;
    this.armed = null;
    (Object.keys(this.toolButtons) as Tool[]).forEach((k) => this.toolButtons[k].setSelected(k === tool));
    this.refresh(false);
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
    const node = this.view.nodeAt(x, y);
    const slot = this.view.slotAt(x, y);

    if (this.tool === 'eraser') {
      if (node && /^h/.test(node)) this.removeNeuron(node);
      else if (node) this.fail('design.hint.eraser');
      else {
        const li = this.view.linkAt(x, y);
        if (li >= 0) this.removeLink(li);
      }
      return;
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
    else if (this.tool === 'cable') {
      const li = this.view.linkAt(x, y);
      if (li < 0) this.armed = this.view.highlight = null;
    }
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

  /** Guarda o estado atual para o DESFAZER (máx. 40 passos). */
  private snapshot(): void {
    this.undoStack.push(JSON.stringify(this.board));
    if (this.undoStack.length > 40) this.undoStack.shift();
  }

  /** Aplica um tabuleiro inteiro (desfazer, auto, bomba) mantendo a mesma referência usada pela view. */
  private replaceBoard(b: Board): void {
    this.board.hidden = b.hidden;
    this.board.links = b.links;
  }

  private placeNeuron(col: number, row: number): void {
    this.snapshot();
    this.board.hidden[col][row] = true;
    state.bump('neurons_placed');
    tip(this, col > 0 ? 'deep' : 'neuron', true);
    const p = this.view.posOf(slotId(col, row));
    audio.sfx('place', PENTA[(this.bp.slots - 1 - row + col * 2) % PENTA.length]);
    burst(this, p.x, p.y, C.violet, 12);
    this.popAt(p.x, p.y, C.violet);
    this.refresh(true);
  }

  private removeNeuron(id: string): void {
    this.snapshot();
    const [, c, r] = /^h(\d+)_(\d+)$/.exec(id)!;
    this.board.hidden[+c][+r] = false;
    this.board.links = this.board.links.filter(([a, b]) => a !== id && b !== id);
    const p = this.view.posOf(id);
    audio.sfx('erase');
    burst(this, p.x, p.y, C.orange, 16, 320);
    this.refresh(true);
  }

  private removeLink(index: number): void {
    this.snapshot();
    const [a, b] = this.board.links[index];
    const pa = this.view.posOf(a);
    const pb = this.view.posOf(b);
    this.board.links.splice(index, 1);
    audio.sfx('erase');
    burst(this, (pa.x + pb.x) / 2, (pa.y + pb.y) / 2, C.orange, 8);
    this.refresh(true);
  }

  private connect(a: string, b: string): void {
    const ca = nodeColumn(this.bp, this.board, a);
    const cb = nodeColumn(this.bp, this.board, b);
    if (ca === cb) return this.fail('design.hint.backwards');
    // O jogador pode arrastar em qualquer sentido: orientamos o cabo para a direita.
    const [from, to] = ca < cb ? [a, b] : [b, a];
    if (this.board.links.some(([x, y]) => x === from && y === to)) {
      audio.sfx('tick');
      return;
    }
    this.snapshot();
    this.board.links.push([from, to]);
    // Uma dica por ação, da mais específica para a mais geral.
    if (this.mission.extraInputs?.includes(from)) tip(this, 'feature', true);
    else if (Math.abs(cb - ca) > 1 && this.board.hidden.some((col) => col.some(Boolean))) tip(this, 'skip', true);
    else if (/^h/.test(from) || /^h/.test(to)) tip(this, 'hidden', true);
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

  private autoWire(): void {
    if (!state.caps.autowire) return this.fail('design.autoLocked');
    this.snapshot();
    this.board.links = autoWire(this.bp, this.board);
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
    audio.sfx('bomb');
    this.cameras.main.shake(260, 0.012);
    this.cameras.main.flash(200, 255, 51, 85);
    burst(this, this.W / 2, this.H / 2, C.red, 40, 600);
    this.refresh(true);
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

  /** Recalcula validação/dica e, se `changed`, salva o tabuleiro (zerando o contador de treino). */
  private refresh(changed: boolean): void {
    if (changed) state.saveDesign(this.mission.id, { board: this.board, epochs: 0 });
    const topo = boardToTopology(this.bp, this.board);
    const check = validateTopology(topo);
    this.nextBtn.setEnabled(check.ok);

    const cost = networkCost(topo);
    const within = cost <= this.mission.budget;
    this.costText.setText(t('design.cost', { a: cost, b: this.mission.budget })).setColor(css(within ? C.green : C.orange));
    this.costHint.setText(t(within ? 'design.costOk' : 'design.costOver'));
    if (changed) celebrate(this);

    if (check.ok) {
      this.setHint('design.hint.ok', 'happy');
      if (changed) {
        this.bot.hop();
        const used = new Set(topo.links.map((l) => l[0]));
        if (!within) tip(this, 'overbudget', true);
        else if (this.mission.needsHidden && !topo.hidden.length) tip(this, 'linear', true);
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
