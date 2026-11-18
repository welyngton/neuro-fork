/**
 * @module ui/NeonButton
 * Botão padrão do jogo: placa chanfrada com contorno de neon.
 *
 * ```ts
 * const b = new NeonButton(this, x, y, 220, 64, 'TREINAR', () => this.go('Train'), { color: C.green });
 * b.setEnabled(false);       // fica apagado e não responde
 * b.setSelected(true);       // estado "ligado" (ferramenta ativa, opção marcada)
 * b.setLabel('PAUSAR');
 * ```
 * A posição (x, y) é o CENTRO do botão. Funciona com mouse e toque.
 */
import Phaser from 'phaser';
import { audio } from '../app/services';
import { C, FONT_TITLE, chamfer, css } from './theme';

export interface NeonButtonOptions {
  /** Cor do neon (padrão: ciano). */
  color?: number;
  /** Tamanho da fonte (padrão: 20). */
  size?: number;
  /** Desenha um ícone acima do texto; recebe um Graphics já posicionado no centro do ícone. */
  icon?: (g: Phaser.GameObjects.Graphics, color: number) => void;
}

export class NeonButton extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Graphics;
  private iconG?: Phaser.GameObjects.Graphics;
  private label: Phaser.GameObjects.Text;
  private color: number;
  private hover = false;
  private selected = false;
  private enabled = true;

  /** Retângulo ocupado na tela (para o tour guiado apontar o botão). */
  rect(): { x: number; y: number; w: number; h: number } {
    return { x: this.x - this.boxW / 2, y: this.y - this.boxH / 2, w: this.boxW, h: this.boxH };
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private boxW: number,
    private boxH: number,
    text: string,
    private onClick: () => void,
    private opts: NeonButtonOptions = {},
  ) {
    super(scene, x, y);
    const w = boxW;
    const h = boxH;
    this.color = opts.color ?? C.cyan;
    this.bg = scene.add.graphics();
    this.label = scene.add
      .text(0, opts.icon ? h * 0.26 : 0, text, { fontFamily: FONT_TITLE, fontSize: `${opts.size ?? 20}px`, fontStyle: '700', color: css(this.color) })
      .setOrigin(0.5);
    this.add([this.bg, this.label]);
    if (opts.icon) {
      this.iconG = scene.add.graphics({ y: -h * 0.14 });
      this.add(this.iconG);
    }
    this.setSize(w, h).setInteractive({ useHandCursor: true });
    this.on('pointerover', () => this.setHover(true));
    this.on('pointerout', () => this.setHover(false));
    this.on('pointerdown', () => {
      if (!this.enabled) return;
      scene.tweens.add({ targets: this, scale: 0.94, duration: 60, yoyo: true });
    });
    this.on('pointerup', () => {
      if (!this.enabled) {
        audio.sfx('error');
        return;
      }
      audio.sfx('click');
      this.onClick();
    });
    this.redraw();
    scene.add.existing(this);
  }

  private setHover(v: boolean): void {
    this.hover = v;
    this.redraw();
  }

  setLabel(text: string): this {
    this.label.setText(text);
    return this;
  }

  setColor(color: number): this {
    this.color = color;
    this.redraw();
    return this;
  }

  setEnabled(v: boolean): this {
    this.enabled = v;
    this.setAlpha(v ? 1 : 0.35);
    return this;
  }

  setSelected(v: boolean): this {
    this.selected = v;
    this.redraw();
    return this;
  }

  private redraw(): void {
    const pts = chamfer(this.boxW, this.boxH, Math.min(14, this.boxH / 4));
    const lit = this.selected || (this.hover && this.enabled);
    this.bg.clear();
    this.bg.fillStyle(C.panel, 0.92).fillPoints(pts, true);
    if (lit) this.bg.fillStyle(this.color, this.selected ? 0.28 : 0.14).fillPoints(pts, true);
    this.bg.lineStyle(this.selected ? 4 : 2, this.color, 1).strokePoints(pts, true, true);
    this.label.setColor(css(this.selected ? 0xffffff : this.color));
    if (this.iconG && this.opts.icon) {
      this.iconG.clear();
      this.opts.icon(this.iconG, this.selected ? 0xffffff : this.color);
    }
  }
}
