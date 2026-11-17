/**
 * @module scenes/TutorialScene
 *
 * ACADEMIA NEUROBOT — tutorial inicial em slides ilustrados. Explica o que é
 * machine learning e deep learning e apresenta as peças do jogo: sensores
 * (entradas), neurônios, camadas ocultas, ações (saídas), treino (perda,
 * energia e água) e simulação.
 *
 * Abre sozinha no primeiro acesso e depois pelo botão ACADEMIA do menu.
 * Cada slide = textos `tut.<n>.t` / `tut.<n>.d` + uma função que desenha a
 * ilustração no retângulo da esquerda. Para criar um slide, acrescente um item
 * em {@link SLIDES}.
 */
import Phaser from 'phaser';
import { audio, state } from '../app/services';
import { Blueprint, autoWire, emptyBoard } from '../core/missions/board';
import { Robot } from '../entities/Robot';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { NetworkView } from '../ui/NetworkView';
import { glow } from '../ui/fx';
import { C, FONT_TITLE, Rect, body, chamfer, css, offset, regularPoly, title } from '../ui/theme';
import { LineChart, StarRow, addPanel } from '../ui/widgets';
import { BaseScene } from './BaseScene';

type Draw = (s: TutorialScene, r: Rect, layer: Phaser.GameObjects.Container) => void;

/** Rede de exemplo para as ilustrações. `focus` destaca uma coluna. */
function demoNet(s: TutorialScene, r: Rect, layer: Phaser.GameObjects.Container, layers: number, focus?: 'in' | 'hidden' | 'out'): void {
  const bp: Blueprint = { inputs: ['cantos', 'grande', 'cor'], outputs: ['buraco_b'], layers, slots: 3 };
  const board = emptyBoard(bp);
  board.hidden = board.hidden.map((col) => col.map(() => true));
  board.links = autoWire(bp, board);
  // Pesos de mentirinha só para colorir os cabos.
  const weights: Record<string, number> = {};
  board.links.forEach(([a, b], i) => (weights[`${a}->${b}`] = Math.sin(i * 1.7) * 1.6));
  const view = new NetworkView(s, bp, board, r, { labelPad: 120, nodeRadius: 24, showHeaders: true });
  view.params = { weights, biases: {} };
  layer.add(view);
  s.views.push(view);
  if (focus) {
    const ids = focus === 'in' ? bp.inputs : focus === 'out' ? bp.outputs : board.hidden.flatMap((col, c) => col.map((_, k) => `h${c}_${k}`));
    const xs = ids.map((id) => view.posOf(id).x);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const w = Math.max(...xs) - Math.min(...xs) + 110;
    const halo = s.add.rectangle(cx, r.y + r.h / 2 + 14, w, r.h - 30, focus === 'in' ? C.yellow : focus === 'out' ? C.green : C.violet, 0.12).setStrokeStyle(3, focus === 'in' ? C.yellow : focus === 'out' ? C.green : C.violet, 0.8);
    s.tweens.add({ targets: halo, alpha: 0.45, duration: 700, yoyo: true, repeat: -1 });
    layer.addAt(halo, 0);
  }
}

const SLIDES: Draw[] = [
  // 1 · ML: exemplos com resposta -> robô aprende.
  (s, r, layer) => {
    const shapes: [number, number, number][] = [[0, 0, C.cyan], [3, 1, C.yellow], [4, 1, C.magenta]];
    shapes.forEach(([sides, ans, color], i) => {
      const y = r.y + 70 + i * (r.h - 120) / 2;
      const g = s.add.graphics({ x: r.x + 80, y });
      g.fillStyle(color, 0.3).lineStyle(4, color);
      if (!sides) g.fillCircle(0, 0, 30).strokeCircle(0, 0, 30);
      else g.fillPoints(regularPoly(sides, 34, sides === 4 ? Math.PI / 4 : -Math.PI / 2), true).strokePoints(regularPoly(sides, 34, sides === 4 ? Math.PI / 4 : -Math.PI / 2), true, true);
      const arrow = s.add.graphics().lineStyle(3, C.dim).lineBetween(r.x + 130, y, r.x + 200, y).fillStyle(C.dim).fillTriangle(r.x + 200, y - 7, r.x + 214, y, r.x + 200, y + 7);
      layer.add([g, arrow, title(s, r.x + 230, y, ans ? 'B' : 'A', 30, ans ? C.magenta : C.cyan).setOrigin(0, 0.5)]);
    });
    const bot = new Robot(s, r.x + r.w - 130, r.y + r.h / 2, 1.5).setMood('think');
    layer.add([glow(s, bot.x, bot.y, C.cyan, 3, 0.25), bot]);
    s.time.addEvent({ delay: 1500, loop: true, callback: () => bot.setMood(bot.getData('h') ? 'think' : 'happy').setData('h', !bot.getData('h')).hop() });
  },
  // 2 · DL: rede com duas camadas ocultas.
  (s, r, layer) => demoNet(s, r, layer, 2),
  // 3 · Sensores: formas e o número que o sensor "cantos" lê.
  (s, r, layer) => {
    const items: [number, string][] = [[0, '0'], [3, '1'], [4, '1,33'], [6, '2']];
    items.forEach(([sides, v], i) => {
      const x = r.x + 70 + i * ((r.w - 140) / 3);
      const y = r.y + r.h * 0.35;
      const g = s.add.graphics({ x, y }).fillStyle(C.cyan, 0.25).lineStyle(4, C.cyan);
      if (!sides) g.fillCircle(0, 0, 34).strokeCircle(0, 0, 34);
      else g.fillPoints(regularPoly(sides, 38, sides === 4 ? Math.PI / 4 : -Math.PI / 2), true).strokePoints(regularPoly(sides, 38, sides === 4 ? Math.PI / 4 : -Math.PI / 2), true, true);
      const sensor = s.add.graphics({ x, y: y + 110 }).fillStyle(C.bg).fillPoints(regularPoly(4, 30), true).lineStyle(3, C.yellow).strokePoints(regularPoly(4, 30), true, true);
      layer.add([g, s.add.graphics().lineStyle(2, C.dim).lineBetween(x, y + 44, x, y + 78), sensor, title(s, x, y + 110, v, 18, C.yellow).setOrigin(0.5)]);
    });
    layer.add(body(s, r.x + r.w / 2, r.y + r.h - 40, `${t('io.cantos')}: ${t('io.cantos.d')}`, 18, C.yellow).setOrigin(0.5).setWordWrapWidth(r.w - 40).setAlign('center'));
  },
  // 4 · Neurônio: entradas × pesos + bias -> ativação.
  (s, r, layer) => {
    const cx = r.x + r.w * 0.58;
    const cy = r.y + r.h / 2;
    const g = s.add.graphics();
    [-90, 0, 90].forEach((dy, i) => {
      const color = i === 1 ? C.magenta : C.cyan;
      g.lineStyle(4 + i * 2, color, 0.85).lineBetween(r.x + 90, cy + dy, cx - 50, cy);
      g.fillStyle(C.bg).fillPoints(offset(regularPoly(4, 24), r.x + 70, cy + dy), true).lineStyle(3, C.yellow).strokePoints(offset(regularPoly(4, 24), r.x + 70, cy + dy), true, true);
      layer.add(body(s, (r.x + 90 + cx - 50) / 2, cy + dy * 0.55 - 18, `w${i + 1}`, 18, color).setOrigin(0.5));
    });
    g.fillStyle(C.bg).fillPoints(offset(regularPoly(6, 56, 0), cx, cy), true).fillStyle(C.violet, 0.35).fillPoints(offset(regularPoly(6, 56, 0), cx, cy), true).lineStyle(4, C.violet).strokePoints(offset(regularPoly(6, 56, 0), cx, cy), true, true);
    g.lineStyle(4, C.green).lineBetween(cx + 56, cy, r.x + r.w - 40, cy);
    layer.add([g, title(s, cx, cy, 'Σ', 40, C.text).setOrigin(0.5), body(s, cx, cy + 90, 'w1·x1 + w2·x2 + w3·x3 + bias  →  f( )', 19, C.text).setOrigin(0.5)]);
    // A curva da ativação (tanh) desenhada ao lado.
    const curve = s.add.graphics().lineStyle(3, C.green);
    curve.beginPath();
    for (let k = 0; k <= 40; k++) {
      const x = -3 + (6 * k) / 40;
      const px = r.x + r.w - 150 + k * 2.6;
      const py = cy - 70 - Math.tanh(x) * 30;
      if (k === 0) curve.moveTo(px, py);
      else curve.lineTo(px, py);
    }
    curve.strokePath();
    layer.add([curve, body(s, r.x + r.w - 98, cy - 120, 'f = tanh', 16, C.green).setOrigin(0.5)]);
  },
  // 5 · Camadas ocultas.
  (s, r, layer) => demoNet(s, r, layer, 1, 'hidden'),
  // 6 · Ações.
  (s, r, layer) => demoNet(s, r, layer, 1, 'out'),
  // 7 · Treino: curva de perda, bateria e água.
  (s, r, layer) => {
    const chart = new LineChart(s, r.x + 20, r.y + 20, r.w - 40, r.h * 0.5);
    const loss = Array.from({ length: 60 }, (_, i) => 0.3 * Math.exp(-i / 10) + 0.01);
    const val = loss.map((v, i) => v + 0.004 * Math.max(0, i - 25));
    chart.draw(loss, 0, val);
    layer.add(chart);
    const y = r.y + r.h * 0.5 + 60;
    const g = s.add.graphics();
    for (let i = 0; i < 16; i++) g.fillStyle(i < 10 ? C.yellow : C.dim, i < 10 ? 0.9 : 0.3).fillRect(r.x + 30 + i * 16, y, 12, 14);
    g.fillStyle(C.bg).fillRect(r.x + r.w / 2 + 20, y, r.w / 2 - 50, 14).fillStyle(0x2f8cff).fillRect(r.x + r.w / 2 + 20, y, (r.w / 2 - 50) * 0.55, 14);
    layer.add([g, title(s, r.x + 30, y - 28, '⚡ ENERGIA', 16, C.yellow), title(s, r.x + r.w / 2 + 20, y - 28, t('train.hud.water', { p: 55 }), 16, 0x2f8cff)]);
  },
  // 8 · Simulação e estrelas.
  (s, r, layer) => {
    const bot = new Robot(s, r.x + r.w / 2, r.y + r.h * 0.45, 1.8).setMood('happy');
    const stars = new StarRow(s, r.x + r.w / 2, r.y + r.h - 50, 26, 12);
    stars.setStars(3, true);
    layer.add([glow(s, bot.x, bot.y, C.green, 4, 0.25), bot, stars]);
    s.time.addEvent({ delay: 900, loop: true, callback: () => bot.hop() });
  },
  // 9 · Ajudas.
  (s, r, layer) => {
    const items: [string, number][] = [[t('design.legend'), C.cyan], [t('menu.glossary'), C.green], [t('assist.btn'), C.magenta]];
    items.forEach(([label, color], i) => {
      const plate = s.add.graphics({ x: r.x + r.w / 2, y: r.y + 80 + i * 110 });
      plate.fillStyle(C.panel).fillPoints(chamfer(300, 70, 14), true).lineStyle(3, color).strokePoints(chamfer(300, 70, 14), true, true);
      layer.add([plate, title(s, r.x + r.w / 2, r.y + 80 + i * 110, label, 22, color).setOrigin(0.5)]);
    });
  },
];

export class TutorialScene extends BaseScene {
  protected accent = C.cyan;
  protected music = 'menu' as const;

  /** Visões de rede animadas no slide atual. */
  views: NetworkView[] = [];
  private index = 0;
  private layer!: Phaser.GameObjects.Container;
  private art!: Rect;
  private texts!: { title: Phaser.GameObjects.Text; body: Phaser.GameObjects.Text; page: Phaser.GameObjects.Text };
  private prevBtn!: NeonButton;
  private nextBtn!: NeonButton;

  constructor() {
    super('Tutorial');
  }

  protected build(): void {
    this.index = 0;
    this.views = [];
    state.markTip('academy_intro');
    this.add.text(this.W / 2, 40, t('tut.title'), { fontFamily: FONT_TITLE, fontSize: '30px', fontStyle: '800', color: css(C.cyan) }).setOrigin(0.5).setShadow(3, 3, css(C.magenta), 0);
    new NeonButton(this, this.W - 90, 40, 140, 46, t('tut.skip'), () => this.go('Menu'), { color: C.orange, size: 16 });

    const aw = Math.round(this.W * 0.54);
    this.art = { x: 20, y: 86, w: aw, h: this.H - 196 };
    addPanel(this, this.art, C.panelEdge, 0.7);
    const tx = aw + 50;
    const tw = this.W - tx - 30;
    addPanel(this, { x: tx - 16, y: 86, w: tw + 32, h: this.H - 196 }, C.cyan, 0.85);
    this.texts = {
      title: title(this, tx + 6, 110, '', 26, C.cyan).setWordWrapWidth(tw - 12),
      body: body(this, tx + 6, 170, '', 23, C.text).setWordWrapWidth(tw - 12).setLineSpacing(6),
      page: body(this, this.W / 2, this.H - 92, '', 18, C.dim).setOrigin(0.5),
    };
    this.prevBtn = new NeonButton(this, 150, this.H - 48, 240, 64, t('tut.prev'), () => this.show(this.index - 1), { color: C.text, size: 18 });
    this.nextBtn = new NeonButton(this, this.W - 170, this.H - 48, 300, 64, t('tut.next'), () => (this.index < SLIDES.length - 1 ? this.show(this.index + 1) : this.go('Menu')), { color: C.green, size: 20 });
    this.input.keyboard?.on('keydown-RIGHT', () => this.index < SLIDES.length - 1 && this.show(this.index + 1));
    this.input.keyboard?.on('keydown-LEFT', () => this.index > 0 && this.show(this.index - 1));
    this.layer = this.add.container(0, 0);
    this.show(0);
  }

  private show(i: number): void {
    if (i < 0 || i >= SLIDES.length) return;
    this.index = i;
    audio.sfx('whoosh');
    this.tweens.killAll();
    this.time.removeAllEvents();
    this.layer.removeAll(true);
    this.views = [];
    SLIDES[i](this, this.art, this.layer);
    this.texts.title.setText(`${i + 1}. ${t(`tut.${i + 1}.t`)}`);
    this.texts.body.setText(t(`tut.${i + 1}.d`));
    this.texts.page.setText(`${i + 1} / ${SLIDES.length}`);
    this.prevBtn.setEnabled(i > 0);
    this.nextBtn.setLabel(i === SLIDES.length - 1 ? t('tut.start') : t('tut.next'));
    this.layer.setAlpha(0);
    this.tweens.add({ targets: this.layer, alpha: 1, duration: 250 });
  }

  update(time: number): void {
    for (const v of this.views) {
      // Pulsos de "atividade" nos neurônios para a rede parecer viva.
      const act: Record<string, number> = {};
      for (const id of ['cantos', 'grande', 'cor', 'buraco_b', 'h0_0', 'h0_1', 'h0_2', 'h1_0', 'h1_1', 'h1_2']) act[id] = 0.5 + 0.5 * Math.sin(time / 400 + id.length * 1.3 + id.charCodeAt(id.length - 1));
      v.activity = act;
      v.render(time);
    }
  }
}
