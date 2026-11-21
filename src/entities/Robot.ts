/**
 * @module entities/Robot
 * O robô do jogador: mascote poligonal desenhado por código, visto de frente.
 *
 * ```ts
 * const bot = new Robot(this, x, y, 1.2);          // usa o avatar salvo do jogador
 * const demo = new Robot(this, x, y, 1, { avatar: 'gato', color: 0xff2bd6, level: 4 });
 * bot.setMood('think');   // 'idle' | 'think' | 'happy' | 'sad'
 * bot.hop();              // pulinho de comemoração
 * ```
 * Aparência = MODELO (`avatar`) + COR + NÍVEL. O nível acrescenta enfeites:
 * 2 ombreiras · 3 aura · 4 coroa · 5 satélites. Para criar um modelo novo,
 * acrescente um `case` em {@link Robot.drawBody} e em {@link Robot.drawEyes}
 * e registre o id em `core/progression/avatars.ts`.
 *
 * O container externo pode ser movido/tweenado livremente; o balanço de
 * "flutuar" acontece num container interno (`rig`) para não brigar com isso.
 */
import Phaser from 'phaser';
import { state } from '../app/services';
import { AVATAR_COLORS } from '../core/progression/avatars';
import { glow } from '../ui/fx';
import { C, chamfer, offset, regularPoly } from '../ui/theme';

export type Mood = 'idle' | 'think' | 'happy' | 'sad';

export interface RobotLook {
  avatar: string;
  /** Cor de destaque (hex). */
  color: number;
  /** 1..5 */
  level: number;
}

/** Aparência atual do jogador, lida do save. */
export function playerLook(): RobotLook {
  const color = AVATAR_COLORS.find((c) => c.id === state.look.color)?.hex ?? C.cyan;
  return { avatar: state.look.avatar, color, level: state.avatarLevel };
}

const v = (pts: number[][]) => pts.map(([x, y]) => new Phaser.Math.Vector2(x, y));

export class Robot extends Phaser.GameObjects.Container {
  private rig: Phaser.GameObjects.Container;
  private eyes: Phaser.GameObjects.Graphics;
  private mood: Mood = 'idle';
  private look: RobotLook;

  constructor(scene: Phaser.Scene, x: number, y: number, scale = 1, look: RobotLook = playerLook()) {
    super(scene, x, y);
    this.look = look;
    this.rig = scene.add.container(0, 0);
    this.add(this.rig);
    this.setScale(scale);

    if (look.level >= 3) {
      const aura = glow(scene, 0, -10, look.color, 2.2, 0.35);
      scene.tweens.add({ targets: aura, alpha: 0.6, scale: 2.6, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      this.rig.add(aura);
    }
    const body = scene.add.graphics();
    this.eyes = scene.add.graphics();
    if (look.avatar !== 'fantasma') {
      const flame = scene.add.graphics();
      flame.fillStyle(C.magenta, 0.9).fillTriangle(-12, 44, 12, 44, 0, 74);
      flame.fillStyle(C.yellow, 0.9).fillTriangle(-6, 44, 6, 44, 0, 60);
      flame.setBlendMode(Phaser.BlendModes.ADD);
      scene.tweens.add({ targets: flame, scaleY: 0.6, alpha: 0.6, duration: 90, yoyo: true, repeat: -1 });
      this.rig.add(flame);
    }
    this.rig.add([body, this.eyes]);
    this.drawBody(body);
    this.drawEyes();

    if (look.level >= 5) {
      // Dois satélites em órbita.
      const orbit = scene.add.container(0, -10);
      for (const side of [-1, 1]) {
        const s = scene.add.graphics({ x: side * 74 });
        s.fillStyle(C.yellow).fillPoints(regularPoly(4, 8), true);
        orbit.add(s);
      }
      scene.tweens.add({ targets: orbit, angle: 360, duration: 3200, repeat: -1 });
      this.rig.add(orbit);
    }

    scene.tweens.add({ targets: this.rig, y: -8, duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    // Piscar.
    const blink = scene.time.addEvent({
      delay: 2600,
      loop: true,
      callback: () => scene.tweens.add({ targets: this.eyes, scaleY: 0.1, duration: 70, yoyo: true }),
    });
    // Robôs também vivem em sobreposições (lições do tour): ao sumir, levam o piscar e os balanços junto.
    this.once(Phaser.GameObjects.Events.DESTROY, () => {
      blink.remove();
      scene.tweens.killTweensOf([this.rig, this.eyes]);
    });
    scene.add.existing(this);
  }

  /** Corpo, cabeça e enfeites de nível, conforme o modelo. */
  private drawBody(b: Phaser.GameObjects.Graphics): void {
    const { avatar, color, level } = this.look;
    const dark = 0x221e46;
    const wide = avatar === 'tanque' ? 1.25 : 1;

    // Braços (o fantasma não tem).
    if (avatar !== 'fantasma') {
      b.fillStyle(C.panelEdge).fillPoints(offset(regularPoly(3, 14, Math.PI), -46 * wide, 14), true);
      b.fillStyle(C.panelEdge).fillPoints(offset(regularPoly(3, 14, 0), 46 * wide, 14), true);
    }
    if (level >= 2) {
      for (const side of [-1, 1]) {
        const pad = offset(chamfer(24, 14, 5), side * 34 * wide, 2);
        b.fillStyle(color, 0.9).fillPoints(pad, true);
      }
    }

    // Tronco.
    const torso =
      avatar === 'fantasma'
        ? v([[-30, 0], [30, 0], [30, 46], [18, 36], [6, 48], [-6, 36], [-18, 48], [-30, 38]])
        : v([[-28 * wide, 0], [28 * wide, 0], [20 * wide, 44], [-20 * wide, 44]]);
    b.fillStyle(0x1b1838).fillPoints(torso, true);
    b.lineStyle(3, C.violet).strokePoints(torso, true, true);
    b.fillStyle(color, 0.8).fillTriangle(-8, 12, 8, 12, 0, 26);

    // Cabeça.
    let head: Phaser.Math.Vector2[];
    if (avatar === 'ciclope') head = offset(regularPoly(6, 38, 0), 0, -28);
    else if (avatar === 'fantasma') head = offset(regularPoly(8, 36, Math.PI / 8), 0, -28);
    else head = offset(chamfer(84 * wide, 56, 14), 0, -26);
    if (avatar === 'gato') {
      // Orelhas de gato — a GatoNet.
      for (const side of [-1, 1]) {
        const ear = v([[side * 40, -50], [side * 14, -52], [side * 34, -82]]);
        b.fillStyle(dark).fillPoints(ear, true);
        b.lineStyle(3, color).strokePoints(ear, true, true);
        b.fillStyle(C.magenta, 0.8).fillTriangle(side * 34, -56, side * 22, -56, side * 31, -70);
      }
    } else if (avatar === 'tanque') {
      for (const side of [-1, 1]) {
        b.lineStyle(3, C.dim).lineBetween(side * 30, -52, side * 30, -68);
        b.fillStyle(C.magenta).fillRect(side * 30 - 5, -74, 10, 8);
      }
    } else if (avatar !== 'fantasma') {
      b.lineStyle(3, C.dim).lineBetween(0, -52, 0, -70);
      b.fillStyle(C.magenta).fillTriangle(-7, -70, 7, -70, 0, -84);
    }
    b.fillStyle(dark).fillPoints(head, true);
    b.lineStyle(3, color).strokePoints(head, true, true);
    // Visor.
    if (avatar === 'ciclope') b.fillStyle(C.bg).fillPoints(offset(regularPoly(4, 20), 0, -28), true);
    else b.fillStyle(C.bg).fillRect(-30 * wide, -40, 60 * wide, 26);
    if (avatar === 'gato') {
      // Bigodes.
      b.lineStyle(2, C.text, 0.7);
      for (const side of [-1, 1]) b.lineBetween(side * 34, -8, side * 56, -12).lineBetween(side * 34, -4, side * 56, 0);
    }
    if (level >= 4) {
      // Coroa.
      const crown = v([[-22, -60], [-22, -78], [-11, -68], [0, -84], [11, -68], [22, -78], [22, -60]]);
      b.fillStyle(C.yellow).fillPoints(offset(crown, 0, avatar === 'gato' ? -4 : 0), true);
    }
  }

  private drawEyes(): void {
    const g = this.eyes;
    const c = this.mood === 'idle' ? this.look.color : this.mood === 'think' ? C.yellow : this.mood === 'happy' ? C.green : C.red;
    g.clear();
    g.setPosition(0, -27);
    g.fillStyle(c);
    if (this.look.avatar === 'ciclope') {
      if (this.mood === 'happy') g.fillTriangle(-12, 6, 12, 6, 0, -10);
      else if (this.mood === 'sad') g.fillTriangle(-12, -6, 12, -6, 0, 10);
      else g.fillPoints(regularPoly(4, 11), true);
      return;
    }
    const dx = this.look.avatar === 'tanque' ? 20 : 15;
    if (this.mood === 'happy') {
      g.fillTriangle(-dx - 7, 6, -dx + 7, 6, -dx, -8).fillTriangle(dx - 7, 6, dx + 7, 6, dx, -8);
    } else if (this.mood === 'sad') {
      g.fillTriangle(-dx - 7, -6, -dx + 7, -6, -dx, 8).fillTriangle(dx - 7, -6, dx + 7, -6, dx, 8);
    } else if (this.look.avatar === 'gato') {
      // Olhos puxados de gato.
      g.fillTriangle(-dx - 8, 4, -dx + 8, -6, -dx + 8, 6).fillTriangle(dx + 8, 4, dx - 8, -6, dx - 8, 6);
    } else {
      g.fillRect(-dx - 7, -6, 14, 12).fillRect(dx - 7, -6, 14, 12);
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
