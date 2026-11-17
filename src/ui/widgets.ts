/**
 * @module ui/widgets
 * Peças pequenas de interface: painel, seletor deslizante, gráfico de linha e estrelas.
 */
import Phaser from 'phaser';
import { audio } from '../app/services';
import { C, Rect, body, chamfer, css, offset, regularPoly, title } from './theme';

/** Painel chanfrado. `rect` em coordenadas de cena (canto superior esquerdo + tamanho). */
export function addPanel(scene: Phaser.Scene, rect: Rect, edge: number = C.panelEdge, alpha = 0.88): Phaser.GameObjects.Graphics {
  const g = scene.add.graphics();
  const pts = offset(chamfer(rect.w, rect.h, 16), rect.x + rect.w / 2, rect.y + rect.h / 2);
  g.fillStyle(C.panel, alpha).fillPoints(pts, true);
  g.lineStyle(2, edge, 1).strokePoints(pts, true, true);
  return g;
}

/**
 * Seletor deslizante de valores DISCRETOS (bom para toque: o dedo "encaixa" nos pontos).
 *
 * ```ts
 * new StepSlider(this, x, y, 300, 'ÉPOCAS', [50, 100, 200, 400], 200, String, (v) => ...);
 * ```
 * (x, y) é o canto superior esquerdo; ocupa `w` x 84.
 */
export class StepSlider extends Phaser.GameObjects.Container {
  private g: Phaser.GameObjects.Graphics;
  private valueText: Phaser.GameObjects.Text;
  private index: number;
  private dragging = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private boxW: number,
    label: string,
    private values: number[],
    value: number,
    private format: (v: number) => string,
    private onChange: (v: number) => void,
    private color: number = C.cyan,
  ) {
    super(scene, x, y);
    const w = boxW;
    this.index = Math.max(0, values.indexOf(value));
    this.g = scene.add.graphics();
    this.valueText = title(scene, w, 0, '', 20, color).setOrigin(1, 0);
    this.add([this.g, body(scene, 0, 0, label, 20, C.text), this.valueText]);
    const zone = scene.add.zone(w / 2, 54, w + 40, 60).setInteractive({ useHandCursor: true });
    this.add(zone);
    zone.on('pointerdown', (p: Phaser.Input.Pointer) => {
      this.dragging = true;
      this.pick(p.x);
    });
    const move = (p: Phaser.Input.Pointer) => this.dragging && this.pick(p.x);
    const up = () => (this.dragging = false);
    scene.input.on('pointermove', move);
    scene.input.on('pointerup', up);
    this.once('destroy', () => {
      scene.input.off('pointermove', move);
      scene.input.off('pointerup', up);
    });
    this.redraw();
    scene.add.existing(this);
  }

  get value(): number {
    return this.values[this.index];
  }

  private pick(worldX: number): void {
    const ratio = Phaser.Math.Clamp((worldX - this.x) / this.boxW, 0, 1);
    const i = Math.round(ratio * (this.values.length - 1));
    if (i === this.index) return;
    this.index = i;
    audio.sfx('tick', i * 2);
    this.redraw();
    this.onChange(this.value);
  }

  private redraw(): void {
    const g = this.g;
    const y = 54;
    const n = this.values.length - 1;
    g.clear();
    g.lineStyle(4, C.dim).lineBetween(0, y, this.boxW, y);
    g.lineStyle(4, this.color).lineBetween(0, y, (this.boxW * this.index) / n, y);
    for (let i = 0; i <= n; i++) g.fillStyle(i <= this.index ? this.color : C.dim).fillRect((this.boxW * i) / n - 3, y - 8, 6, 16);
    const hx = (this.boxW * this.index) / n;
    g.fillStyle(C.bg).fillPoints(offset(regularPoly(4, 16), hx, y), true);
    g.lineStyle(3, this.color).strokePoints(offset(regularPoly(4, 16), hx, y), true, true);
    this.valueText.setText(this.format(this.value));
  }
}

/**
 * Gráfico de linha simples para a curva de perda.
 * Chame {@link draw} sempre que o histórico mudar.
 */
export class LineChart extends Phaser.GameObjects.Container {
  private g: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, private boxW: number, private boxH: number, private color: number = C.magenta) {
    super(scene, x, y);
    this.g = scene.add.graphics();
    this.add(this.g);
    this.draw([], 0);
    scene.add.existing(this);
  }

  /**
   * @param target linha tracejada de meta (0 = não desenhar).
   * @param second segunda curva opcional (ex.: perda de validação), em amarelo.
   */
  draw(history: number[], target: number, second: number[] = []): void {
    const g = this.g;
    const w = this.boxW;
    const h = this.boxH;
    g.clear();
    g.fillStyle(C.bg, 0.7).fillRect(0, 0, w, h);
    g.lineStyle(1, C.panelEdge, 0.8);
    for (let i = 1; i < 4; i++) g.lineBetween(0, (h * i) / 4, w, (h * i) / 4);
    g.lineStyle(2, C.panelEdge).strokeRect(0, 0, w, h);
    const maxY = Math.max(0.3, ...history.slice(0, 5), history.length ? 0 : 0.3);
    const yOf = (v: number) => h - Phaser.Math.Clamp(v / maxY, 0, 1) * (h - 8) - 4;
    if (target > 0) {
      g.lineStyle(2, C.green, 0.9);
      for (let x = 0; x < w; x += 16) g.lineBetween(x, yOf(target), Math.min(w, x + 8), yOf(target));
    }
    const line = (data: number[], color: number) => {
      if (data.length < 2) return;
      const stride = Math.max(1, Math.floor(data.length / 240));
      g.lineStyle(3, color);
      g.beginPath();
      for (let i = 0; i < data.length; i += stride) {
        const px = (i / (data.length - 1)) * w;
        if (i === 0) g.moveTo(px, yOf(data[i]));
        else g.lineTo(px, yOf(data[i]));
      }
      g.lineTo(w, yOf(data[data.length - 1]));
      g.strokePath();
      g.fillStyle(0xffffff).fillCircle(w, yOf(data[data.length - 1]), 4);
    };
    line(history, this.color);
    line(second, C.yellow);
  }
}

/** Fileira de estrelas (0..3). `setStars(n, true)` anima uma a uma com som. */
export class StarRow extends Phaser.GameObjects.Container {
  private gs: Phaser.GameObjects.Graphics[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number, private r = 16, gap = 8) {
    super(scene, x, y);
    for (let i = 0; i < 3; i++) {
      const g = scene.add.graphics({ x: (i - 1) * (r * 2 + gap) });
      this.gs.push(g);
      this.add(g);
    }
    this.setStars(0);
    scene.add.existing(this);
  }

  private paint(g: Phaser.GameObjects.Graphics, on: boolean): void {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rad = i % 2 === 0 ? this.r : this.r * 0.45;
      return new Phaser.Math.Vector2(Math.cos(a) * rad, Math.sin(a) * rad);
    });
    g.clear();
    if (on) g.fillStyle(C.yellow).fillPoints(pts, true);
    g.lineStyle(2, on ? C.yellow : C.dim).strokePoints(pts, true, true);
  }

  setStars(n: number, animate = false): void {
    this.gs.forEach((g, i) => {
      this.paint(g, !animate && i < n);
      if (animate && i < n) {
        this.scene.time.delayedCall(350 + i * 380, () => {
          this.paint(g, true);
          audio.sfx('star', i * 4);
          this.scene.tweens.add({ targets: g, scale: { from: 2.2, to: 1 }, duration: 320, ease: 'Back.out' });
        });
      }
    });
  }
}

/** Rótulo pequeno em caixa (ex.: chips de fase no topo). */
export function addChip(scene: Phaser.Scene, x: number, y: number, text: string, color: number, active: boolean): Phaser.GameObjects.Text {
  return scene.add
    .text(x, y, text, {
      fontFamily: 'Oxanium, sans-serif',
      fontSize: '18px',
      fontStyle: '700',
      color: css(active ? C.bg : color),
      backgroundColor: active ? css(color) : undefined,
      padding: { x: 10, y: 6 },
    })
    .setOrigin(0.5)
    .setAlpha(active ? 1 : 0.6);
}
