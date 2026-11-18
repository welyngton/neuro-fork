/**
 * @module ui/lessons
 *
 * As LIÇÕES ilustradas da Academia: o que é machine learning e deep learning,
 * sensores de formas geométricas, neurônio, camadas ocultas, ações, treino,
 * simulação e ajudas. Usadas pela {@link TutorialScene} (slides) e pelo tour
 * guiado da missão Berçário (`ui/Tour.ts`), que intercala cada lição com um
 * passo prático na interface.
 *
 * Cada lição = textos `tut.<n>.t` / `tut.<n>.d` + uma função que desenha a
 * ilustração num retângulo. Para criar uma, acrescente um item em {@link LESSONS}.
 */
import Phaser from 'phaser';
import { Blueprint, autoWire, emptyBoard } from '../core/missions/board';
import { Robot } from '../entities/Robot';
import { t } from '../services/i18n';
import { NetworkView } from './NetworkView';
import { glow } from './fx';
import { C, Rect, body, chamfer, offset, regularPoly, title } from './theme';
import { LineChart, StarRow, addPanel } from './widgets';

/** Cena que hospeda uma lição: guarda as redes animadas para atualizá-las a cada quadro. */
export type LessonHost = Phaser.Scene & { views: NetworkView[] };

export type Draw = (s: LessonHost, r: Rect, layer: Phaser.GameObjects.Container) => void;

/** Rede de exemplo para as ilustrações. `focus` destaca uma coluna. */
function demoNet(s: LessonHost, r: Rect, layer: Phaser.GameObjects.Container, layers: number, focus?: 'in' | 'hidden' | 'out'): void {
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
    halo.once(Phaser.GameObjects.Events.DESTROY, () => s.tweens.killTweensOf(halo));
    layer.addAt(halo, 0);
  }
}

/** As 9 lições, na ordem dos textos `tut.<n>.t` / `tut.<n>.d`. */
export const LESSONS: Draw[] = [
  // 1 · ML: EXEMPLOS DE TREINO (forma + resposta certa) entram no robô; depois ele acerta uma forma nova.
  (s, r, layer) => {
    layer.add(title(s, r.x + 24, r.y + 18, t('tut.1.examples'), 17, C.yellow));
    const examples: [number, number, number][] = [[0, 0, C.cyan], [3, 1, C.yellow], [4, 1, C.magenta]];
    const cardW = Math.min(250, r.w * 0.42);
    const cardH = (r.h - 120) / 3 - 10;
    examples.forEach(([sides, ans, color], i) => {
      const cy = r.y + 64 + cardH / 2 + i * (cardH + 10);
      const cx = r.x + 24 + cardW / 2;
      const card = s.add.graphics({ x: cx, y: cy });
      card.fillStyle(C.panel, 0.95).fillPoints(chamfer(cardW, cardH, 10), true).lineStyle(2, C.panelEdge).strokePoints(chamfer(cardW, cardH, 10), true, true);
      const g = s.add.graphics({ x: cx - cardW / 2 + 44, y: cy });
      g.fillStyle(color, 0.3).lineStyle(4, color);
      const rad = Math.min(26, cardH * 0.32);
      if (!sides) g.fillCircle(0, 0, rad).strokeCircle(0, 0, rad);
      else g.fillPoints(regularPoly(sides, rad * 1.15, sides === 4 ? Math.PI / 4 : -Math.PI / 2), true).strokePoints(regularPoly(sides, rad * 1.15, sides === 4 ? Math.PI / 4 : -Math.PI / 2), true, true);
      layer.add([card, g]);
      layer.add(body(s, cx - cardW / 2 + 86, cy - 12, t('tut.1.answer'), 14, C.dim).setOrigin(0, 0.5));
      layer.add(title(s, cx - cardW / 2 + 86, cy + 12, t(ans ? 'tut.1.holeB' : 'tut.1.holeA'), 18, ans ? C.magenta : C.cyan).setOrigin(0, 0.5));
    });
    // Seta grossa "aprende" até o robô.
    const ax = r.x + 36 + cardW;
    const bx = r.x + r.w * 0.66;
    const midY = r.y + r.h / 2 - 10;
    const arrow = s.add.graphics().lineStyle(6, C.green, 0.8).lineBetween(ax, midY, bx - 70, midY).fillStyle(C.green).fillTriangle(bx - 70, midY - 14, bx - 46, midY, bx - 70, midY + 14);
    layer.add([arrow, body(s, (ax + bx - 60) / 2, midY - 22, t('tut.1.learns'), 16, C.green).setOrigin(0.5)]);
    const bot = new Robot(s, bx, midY, 1.2).setMood('think');
    layer.add([glow(s, bot.x, bot.y, C.cyan, 2.6, 0.25), bot]);
    // Depois: uma forma NOVA (hexágono) e o palpite certo.
    const ny = r.y + r.h - 44;
    const hex = s.add.graphics({ x: bx - 60, y: ny }).fillStyle(C.green, 0.3).lineStyle(3, C.green);
    hex.fillPoints(regularPoly(6, 20, 0), true).strokePoints(regularPoly(6, 20, 0), true, true);
    layer.add([hex, title(s, bx - 28, ny, t('tut.1.guess'), 18, C.green).setOrigin(0, 0.5), body(s, bx, ny - 38, t('tut.1.new'), 14, C.dim).setOrigin(0.5)]);
    const loop = s.time.addEvent({ delay: 1500, loop: true, callback: () => bot.setMood(bot.getData('h') ? 'think' : 'happy').setData('h', !bot.getData('h')).hop() });
    bot.once(Phaser.GameObjects.Events.DESTROY, () => loop.remove());
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
    const loop = s.time.addEvent({ delay: 900, loop: true, callback: () => bot.hop() });
    bot.once(Phaser.GameObjects.Events.DESTROY, () => loop.remove());
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

/** Pulsos de "atividade" nas redes de exemplo, para parecerem vivas. Chame a cada quadro. */
export function animateLessonViews(views: NetworkView[], time: number): void {
  for (const v of views) {
    const act: Record<string, number> = {};
    for (const id of ['cantos', 'grande', 'cor', 'buraco_b', 'h0_0', 'h0_1', 'h0_2', 'h1_0', 'h1_1', 'h1_2']) act[id] = 0.5 + 0.5 * Math.sin(time / 400 + id.length * 1.3 + id.charCodeAt(id.length - 1));
    v.activity = act;
    v.render(time);
  }
}

/**
 * Monta uma lição completa dentro de `area`: ilustração à esquerda e, à
 * direita, o selo "LIÇÃO n/9", o título e o texto. Destrua o container
 * devolvido para trocar de lição.
 */
export function buildLesson(s: LessonHost, i: number, area: Rect): Phaser.GameObjects.Container {
  const layer = s.add.container(0, 0);
  const aw = Math.round(area.w * 0.54);
  const art: Rect = { x: area.x, y: area.y, w: aw, h: area.h };
  layer.add(addPanel(s, art, C.panelEdge, 0.7));
  const tx = area.x + aw + 30;
  const tw = area.x + area.w - tx - 14;
  layer.add(addPanel(s, { x: tx - 16, y: area.y, w: tw + 30, h: area.h }, C.cyan, 0.85));
  layer.add(body(s, tx + 6, area.y + 18, t('tut.lesson', { n: i + 1, max: LESSONS.length }), 16, C.dim));
  const head = title(s, tx + 6, area.y + 44, t(`tut.${i + 1}.t`), 25, C.cyan).setWordWrapWidth(tw - 12);
  layer.add(head);
  layer.add(body(s, tx + 6, head.y + head.height + 18, t(`tut.${i + 1}.d`), 21, C.text).setWordWrapWidth(tw - 12).setLineSpacing(5));
  LESSONS[i](s, art, layer);
  return layer;
}
