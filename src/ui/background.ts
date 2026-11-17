/**
 * @module ui/background
 * Fundo low-poly: uma malha de triângulos escuros com arestas sutis, alguns
 * triângulos de neon que "respiram" e linhas de varredura (scanlines).
 */
import Phaser from 'phaser';
import { createRng } from '../core/nn/network';
import { C } from './theme';

/**
 * Desenha o fundo poligonal ocupando a cena inteira.
 * @param accent cor de destaque dos triângulos vivos (cada cena usa a sua).
 * @param seed   muda o padrão da malha.
 */
export function addPolyBackground(scene: Phaser.Scene, accent: number = C.cyan, seed = 3): void {
  const { width: W, height: H } = scene.scale;
  const rng = createRng(seed);
  const step = 150;
  const cols = Math.ceil(W / step) + 2;
  const rows = Math.ceil(H / step) + 2;
  const pts: { x: number; y: number }[][] = [];
  for (let r = 0; r < rows; r++) {
    pts.push([]);
    for (let c = 0; c < cols; c++) {
      pts[r].push({ x: (c - 0.5) * step + (rng() - 0.5) * 90, y: (r - 0.5) * step + (rng() - 0.5) * 90 });
    }
  }
  const g = scene.add.graphics().setDepth(-100);
  g.fillStyle(C.bg).fillRect(0, 0, W, H);
  const dark = Phaser.Display.Color.ValueToColor(C.bg);
  const lite = Phaser.Display.Color.ValueToColor(0x1a1638);
  const live: { a: { x: number; y: number }; b: { x: number; y: number }; c: { x: number; y: number } }[] = [];
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const quad = [pts[r][c], pts[r][c + 1], pts[r + 1][c + 1], pts[r + 1][c]];
      const tris = rng() > 0.5 ? [[0, 1, 2], [0, 2, 3]] : [[0, 1, 3], [1, 2, 3]];
      for (const [i, j, k] of tris) {
        const col = Phaser.Display.Color.Interpolate.ColorWithColor(dark, lite, 100, Math.floor(rng() * 100));
        g.fillStyle(Phaser.Display.Color.GetColor(col.r, col.g, col.b));
        g.fillTriangle(quad[i].x, quad[i].y, quad[j].x, quad[j].y, quad[k].x, quad[k].y);
        g.lineStyle(1, C.panelEdge, 0.35);
        g.strokeTriangle(quad[i].x, quad[i].y, quad[j].x, quad[j].y, quad[k].x, quad[k].y);
        if (rng() > 0.93) live.push({ a: quad[i], b: quad[j], c: quad[k] });
      }
    }
  }
  // Triângulos de neon que pulsam devagar.
  live.forEach((t, i) => {
    const lg = scene.add.graphics().setDepth(-99).setBlendMode(Phaser.BlendModes.ADD);
    lg.fillStyle(i % 3 === 0 ? C.magenta : accent, 0.16).fillTriangle(t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y);
    lg.lineStyle(2, i % 3 === 0 ? C.magenta : accent, 0.5).strokeTriangle(t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y);
    lg.setAlpha(0.2);
    scene.tweens.add({ targets: lg, alpha: 1, duration: 1800 + rng() * 2600, yoyo: true, repeat: -1, delay: rng() * 2000, ease: 'Sine.inOut' });
  });
  // Scanlines.
  const s = scene.add.graphics().setDepth(1000).setAlpha(0.07);
  s.fillStyle(0x000000);
  for (let y = 0; y < H; y += 4) s.fillRect(0, y, W, 2);
}
