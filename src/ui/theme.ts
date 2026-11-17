/**
 * @module ui/theme
 *
 * Identidade visual: paleta cyberpunk escura, fontes e medidas-base.
 * TODA cor e tamanho de fonte do jogo deve sair daqui — mudar o tema é editar este arquivo.
 *
 * Resolução lógica: altura fixa de {@link GAME_HEIGHT} e largura variável
 * (ver `app/viewport.ts`). Tamanhos são pensados para um celular deitado:
 * nada de texto abaixo de 18 px lógicos nem alvo de toque abaixo de 56 px.
 */
import Phaser from 'phaser';

export const GAME_HEIGHT = 720;

/** Paleta (números para Graphics, strings para Text). */
export const C = {
  bg: 0x07060f,
  bgAlt: 0x0d0b1c,
  panel: 0x121026,
  panelEdge: 0x2b2752,
  dim: 0x4a4670,
  text: 0xe8e6ff,
  cyan: 0x00f0ff,
  magenta: 0xff2bd6,
  yellow: 0xfcee0a,
  green: 0x39ff88,
  red: 0xff3355,
  violet: 0x8a5cff,
  orange: 0xff8a1f,
} as const;

/** Converte cor numérica em string CSS (`#rrggbb`). */
export const css = (c: number) => `#${c.toString(16).padStart(6, '0')}`;

export const FONT_TITLE = 'Oxanium, sans-serif';
export const FONT_BODY = 'Rajdhani, sans-serif';

/** Texto de corpo (Rajdhani 700). */
export function body(scene: Phaser.Scene, x: number, y: number, str: string, size = 22, color: number = C.text) {
  return scene.add.text(x, y, str, { fontFamily: FONT_BODY, fontSize: `${size}px`, fontStyle: '700', color: css(color) });
}

/** Texto de título (Oxanium 700) — caixa alta, anguloso. */
export function title(scene: Phaser.Scene, x: number, y: number, str: string, size = 28, color: number = C.text) {
  return scene.add.text(x, y, str, { fontFamily: FONT_TITLE, fontSize: `${size}px`, fontStyle: '700', color: css(color) });
}

/** Pontos de um retângulo com os cantos cortados (o "chanfro" que marca o visual do jogo), centrado na origem. */
export function chamfer(w: number, h: number, c = 12): Phaser.Math.Vector2[] {
  const x = w / 2;
  const y = h / 2;
  return [
    [-x + c, -y], [x, -y], [x, y - c], [x - c, y], [-x, y], [-x, -y + c],
  ].map(([px, py]) => new Phaser.Math.Vector2(px, py));
}

/** Pontos de um polígono regular de `n` lados e raio `r`, centrado na origem. */
export function regularPoly(n: number, r: number, rot = -Math.PI / 2): Phaser.Math.Vector2[] {
  return Array.from({ length: n }, (_, i) => {
    const a = rot + (i / n) * Math.PI * 2;
    return new Phaser.Math.Vector2(Math.cos(a) * r, Math.sin(a) * r);
  });
}

/** Desloca uma lista de pontos. */
export const offset = (pts: Phaser.Math.Vector2[], x: number, y: number) => pts.map((p) => new Phaser.Math.Vector2(p.x + x, p.y + y));

/** Retângulo simples usado nos layouts. */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
