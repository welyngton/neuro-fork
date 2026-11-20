/**
 * @module scenes/skins/shapes
 * Desenhos poligonais compartilhados pelas skins: formas simples, dobraduras de
 * origami (tsuru, sapo, borboleta e peixe) e peças de quebra-cabeça.
 *
 * Tudo é desenhado por código (Graphics), centrado em (0, 0) — o chamador move
 * ou gira o container.
 */
import Phaser from 'phaser';
import { OriAnimal } from '../../core/missions/types';
import { C, offset, regularPoly } from '../../ui/theme';

const V = (x: number, y: number) => new Phaser.Math.Vector2(x, y);

/** Formas que aparecem nas esteiras de formas. */
export type AnyShape = 'circle' | 'triangle' | 'square' | 'pentagon' | 'hexagon';

/** Cor de cada forma (a mesma em todas as missões, para o jogador aprender). */
export const SHAPE_COLOR: Record<AnyShape, number> = {
  circle: C.cyan,
  triangle: C.yellow,
  square: C.magenta,
  pentagon: C.green,
  hexagon: C.orange,
};

/** Contorno de um polígono da forma (ou `null` para o círculo). */
export function shapePoints(shape: AnyShape, r: number, rot = 0): Phaser.Math.Vector2[] | null {
  switch (shape) {
    case 'circle':
      return null;
    case 'triangle':
      return regularPoly(3, r * 1.15, -Math.PI / 2 + rot);
    case 'square':
      return regularPoly(4, r * 1.25, Math.PI / 4 + rot);
    case 'pentagon':
      return regularPoly(5, r * 1.1, -Math.PI / 2 + rot);
    case 'hexagon':
      return regularPoly(6, r * 1.05, rot);
  }
}

/**
 * Desenha uma forma em (x, y). No círculo, `rot` só aparece como uma marquinha
 * (senão ninguém veria que ele girou).
 */
export function drawShape(g: Phaser.GameObjects.Graphics, shape: AnyShape, x: number, y: number, r: number, opts: { rot?: number; color?: number; alpha?: number; line?: number } = {}): void {
  const color = opts.color ?? SHAPE_COLOR[shape];
  const rot = opts.rot ?? 0;
  g.fillStyle(color, opts.alpha ?? 0.3).lineStyle(opts.line ?? 3, color);
  const pts = shapePoints(shape, r, rot);
  if (!pts) {
    g.fillCircle(x, y, r).strokeCircle(x, y, r);
    if (opts.rot !== undefined) g.lineBetween(x, y, x + Math.cos(rot) * r, y + Math.sin(rot) * r).fillStyle(color, 1).fillCircle(x + Math.cos(rot) * r * 0.62, y + Math.sin(rot) * r * 0.62, Math.max(2, r * 0.1));
    return;
  }
  const p = offset(pts, x, y);
  g.fillPoints(p, true).strokePoints(p, true, true);
}

/* ------------------------------------------------------------------ origami */

interface Facet {
  pts: number[][];
  /** Brilho da faceta (0..1): é o que dá a cara de papel dobrado. */
  shade: number;
}

/** Cor do papel de cada animal. */
export const ANIMAL_COLOR: Record<OriAnimal, number> = {
  tsuru: 0xf2ead8,
  sapo: C.green,
  borboleta: C.magenta,
  peixe: C.orange,
};

/** Facetas de cada dobradura, em coordenadas de ~100 × 100 (y para baixo). */
const ORIGAMI: Record<OriAnimal, Facet[]> = {
  // Tsuru: pescoço e bico à esquerda, cauda à direita, duas asas erguidas.
  tsuru: [
    { pts: [[-30, 10], [26, 10], [0, 36]], shade: 0.28 },
    { pts: [[-30, 10], [26, 10], [-4, -8]], shade: 0.5 },
    { pts: [[-30, 10], [-6, -4], [-46, -34]], shade: 0.38 },
    { pts: [[-46, -34], [-40, -22], [-58, -30]], shade: 0.7 },
    { pts: [[26, 10], [8, 24], [58, 8]], shade: 0.34 },
    { pts: [[-10, 0], [24, 8], [10, -54]], shade: 0.62 },
    { pts: [[-6, -2], [12, -10], [-12, -42]], shade: 0.4 },
  ],
  // Sapo pulador: cabeça, duas patinhas na frente e duas patonas atrás.
  sapo: [
    { pts: [[-18, -18], [18, -18], [0, 12]], shade: 0.5 },
    { pts: [[-14, -18], [14, -18], [0, -40]], shade: 0.66 },
    { pts: [[-18, -14], [-44, -2], [-26, 8]], shade: 0.36 },
    { pts: [[18, -14], [44, -2], [26, 8]], shade: 0.36 },
    { pts: [[-14, 6], [-48, 30], [-20, 36]], shade: 0.3 },
    { pts: [[14, 6], [48, 30], [20, 36]], shade: 0.3 },
    { pts: [[-48, 30], [-56, 42], [-36, 40]], shade: 0.58 },
    { pts: [[48, 30], [56, 42], [36, 40]], shade: 0.58 },
    { pts: [[-14, 6], [14, 6], [0, 34]], shade: 0.4 },
  ],
  // Borboleta: quatro asas abertas, corpo fino e antenas.
  borboleta: [
    { pts: [[4, -4], [54, -42], [44, 6]], shade: 0.56 },
    { pts: [[-4, -4], [-54, -42], [-44, 6]], shade: 0.56 },
    { pts: [[4, 4], [42, 12], [28, 44]], shade: 0.34 },
    { pts: [[-4, 4], [-42, 12], [-28, 44]], shade: 0.34 },
    { pts: [[-5, -26], [5, -26], [5, 26], [-5, 26]], shade: 0.72 },
  ],
  // Peixe: nariz à esquerda, nadadeira em cima e cauda em leque.
  peixe: [
    { pts: [[-48, 0], [0, -24], [24, 0]], shade: 0.58 },
    { pts: [[-48, 0], [0, 24], [24, 0]], shade: 0.32 },
    { pts: [[24, 0], [56, -26], [56, 26]], shade: 0.44 },
    { pts: [[-16, -14], [8, -38], [14, -18]], shade: 0.7 },
  ],
};

/** Desenha a dobradura de papel de um animal, centrada em (0, 0), com `scale`. */
export function drawOrigami(g: Phaser.GameObjects.Graphics, animal: OriAnimal, scale = 1): void {
  const color = ANIMAL_COLOR[animal];
  for (const f of ORIGAMI[animal]) {
    const pts = f.pts.map(([x, y]) => V(x * scale, y * scale));
    g.fillStyle(color, 0.12 + f.shade * 0.5).fillPoints(pts, true);
    g.lineStyle(2, color, 0.95).strokePoints(pts, true, true);
  }
  // Olhinho (tudo que não é borboleta tem um).
  g.fillStyle(0xffffff, 0.95);
  if (animal === 'tsuru') g.fillCircle(-46 * scale, -28 * scale, 2.4 * scale);
  else if (animal === 'sapo') g.fillCircle(-7 * scale, -26 * scale, 3 * scale).fillCircle(7 * scale, -26 * scale, 3 * scale);
  else if (animal === 'peixe') g.fillCircle(-32 * scale, -3 * scale, 3 * scale);
  else g.lineStyle(2, color).lineBetween(-3 * scale, -26 * scale, -14 * scale, -46 * scale).lineBetween(3 * scale, -26 * scale, 14 * scale, -46 * scale);
}

/* ------------------------------------------------------------------ quebra-cabeça */

/**
 * Pontos de UMA borda de peça (de cima, indo da esquerda para a direita) de lado
 * `s`: reta (0), com aba para fora (1) ou com recorte para dentro (-1).
 * As coordenadas já estão no canto superior de uma peça centrada na origem.
 */
function topEdge(s: number, kind: number): Phaser.Math.Vector2[] {
  const h = s / 2;
  const pts = [V(-h, -h)];
  if (kind === 0) return pts;
  const d = kind > 0 ? -1 : 1; // a aba sobe (y negativo); o recorte desce
  const neck = s * 0.075; // meia-largura do pescoço
  const r = s * 0.14; // raio da cabeça
  const cy = s * 0.17; // centro da cabeça, medido a partir da borda
  const base = cy - Math.sqrt(r * r - neck * neck); // altura em que o pescoço encontra a cabeça
  pts.push(V(-neck, -h), V(-neck, -h + d * base));
  // Arco "pelo lado de fora" do círculo: sai do encontro esquerdo, sobe e volta pelo direito.
  const a0 = Math.atan2(base - cy, -neck);
  const a1 = Math.atan2(base - cy, neck) - Math.PI * 2;
  const n = 14;
  for (let k = 0; k <= n; k++) {
    const a = a0 + (k / n) * (a1 - a0);
    pts.push(V(Math.cos(a) * r, -h + d * (cy + Math.sin(a) * r)));
  }
  pts.push(V(neck, -h + d * base), V(neck, -h));
  return pts;
}

/**
 * Contorno de uma peça de quebra-cabeça de lado `s`, centrada em (cx, cy), com as
 * bordas [cima, direita, baixo, esquerda] (1 = aba, -1 = recorte, 0 = reta).
 */
export function pieceOutline(cx: number, cy: number, s: number, edges: readonly number[]): Phaser.Math.Vector2[] {
  const out: Phaser.Math.Vector2[] = [];
  for (let k = 0; k < 4; k++) {
    // Cada lado é a borda de cima girada k × 90°.
    const ang = (k * Math.PI) / 2;
    const c = Math.cos(ang);
    const sn = Math.sin(ang);
    const edge = topEdge(s, edges[k]);
    for (const p of edge) out.push(V(cx + p.x * c - p.y * sn, cy + p.x * sn + p.y * c));
  }
  return out;
}
