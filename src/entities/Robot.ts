/**
 * @module entities/Robot
 * O NeuroBot: mascote poligonal desenhado por código, visto de frente.
 *
 * ```ts
 * const bot = new Robot(this, x, y, 1.2);
 * bot.setMood('think');   // 'idle' | 'think' | 'happy' | 'sad'
 * bot.hop();              // pulinho de comemoração
 * ```
 * O container externo pode ser movido/tweenado livremente; o balanço de
 * "flutuar" acontece num container interno (`rig`) para não brigar com isso.
 */
import Phaser from 'phaser';
import { C, chamfer, offset, regularPoly } from '../ui/theme';

export type Mood = 'idle' | 'think' | 'happy' | 'sad';

const MOOD_COLOR: Record<Mood, number> = { idle: C.cyan, think: C.yellow, happy: C.green, sad: C.red };

export class Robot extends Phaser.GameObjects.Container {
  private rig: Phaser.GameObjects.Container;
  private eyes: Phaser.GameObjects.Graphics;
  private mood: Mood = 'idle';

  constructor(scene: Phaser.Scene, x: number, y: number, scale = 1) {
    super(scene, x, y);
    this.rig = scene.add.container(0, 0);
    this.add(this.rig);
    this.setScale(scale);

    const flame = scene.add.graphics();
    flame.fillStyle(C.magenta, 0.9).fillTriangle(-12, 44, 12, 44, 0, 74);
    flame.fillStyle(C.yellow, 0.9).fillTriangle(-6, 44, 6, 44, 0, 60);
    flame.setBlendMode(Phaser.BlendModes.ADD);
    scene.tweens.add({ targets: flame, scaleY: 0.6, alpha: 0.6, duration: 90, yoyo: true, repeat: -1 });

    const b = scene.add.graphics();
    // antena
    b.lineStyle(3, C.dim).lineBetween(0, -52, 0, -70);
    b.fillStyle(C.magenta).fillTriangle(-7, -70, 7, -70, 0, -84);
    // braços
    b.fillStyle(C.panelEdge).fillPoints(offset(regularPoly(3, 14, Math.PI), -46, 14), true);
    b.fillStyle(C.panelEdge).fillPoints(offset(regularPoly(3, 14, 0), 46, 14), true);
    // corpo (trapézio) e cabeça (placa chanfrada)
    const torso = [[-28, 0], [28, 0], [20, 44], [-20, 44]].map(([px, py]) => new Phaser.Math.Vector2(px, py));
    b.fillStyle(0x1b1838).fillPoints(torso, true);
    b.lineStyle(3, C.violet).strokePoints(torso, true, true);
    b.fillStyle(C.cyan, 0.8).fillTriangle(-8, 12, 8, 12, 0, 26);
    const head = offset(chamfer(84, 56, 14), 0, -26);
    b.fillStyle(0x221e46).fillPoints(head, true);
    b.lineStyle(3, C.cyan).strokePoints(head, true, true);
    b.fillStyle(C.bg).fillRect(-30, -40, 60, 26);

    this.eyes = scene.add.graphics();
    this.rig.add([flame, b, this.eyes]);
    this.drawEyes();

    scene.tweens.add({ targets: this.rig, y: -8, duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    // Piscar.
    scene.time.addEvent({
      delay: 2600,
      loop: true,
      callback: () => scene.tweens.add({ targets: this.eyes, scaleY: 0.1, duration: 70, yoyo: true }),
    });
    scene.add.existing(this);
  }

  private drawEyes(): void {
    const g = this.eyes;
    const c = MOOD_COLOR[this.mood];
    g.clear();
    g.setPosition(0, -27);
    g.fillStyle(c);
    if (this.mood === 'happy') {
      g.fillTriangle(-22, 6, -8, 6, -15, -8).fillTriangle(8, 6, 22, 6, 15, -8);
    } else if (this.mood === 'sad') {
      g.fillTriangle(-22, -6, -8, -6, -15, 8).fillTriangle(8, -6, 22, -6, 15, 8);
    } else {
      g.fillRect(-22, -6, 14, 12).fillRect(8, -6, 14, 12);
    }
  }

  setMood(mood: Mood): this {
    if (mood === this.mood) return this;
    this.mood = mood;
    this.drawEyes();
    return this;
  }

  /** Pulinho (comemoração / reação). */
  hop(): this {
    this.scene.tweens.add({ targets: this.rig, scaleY: 1.12, scaleX: 0.92, duration: 110, yoyo: true, repeat: 1 });
    return this;
  }

  /** Tremida (erro / tristeza). */
  shake(): this {
    this.scene.tweens.add({ targets: this.rig, x: 6, duration: 45, yoyo: true, repeat: 4, onComplete: () => (this.rig.x = 0) });
    return this;
  }
}
