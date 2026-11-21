/**
 * @module scenes/AvatarScene
 * Tela do avatar: modelos (liberados pelo total de estrelas) e a lojinha do robô —
 * cada nível de melhoria e cada cor custam estrelas; comprar tudo rende uma conquista.
 */
import { audio, state } from '../app/services';
import { AVATARS, AVATAR_COLORS, AVATAR_LEVEL_COST, AVATAR_MAX_LEVEL } from '../core/progression/avatars';
import { Robot, playerLook } from '../entities/Robot';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { celebrate, showToast } from '../ui/Toast';
import { C, body, chamfer, offset, regularPoly, title } from '../ui/theme';
import { addPanel } from '../ui/widgets';
import { BaseScene } from './BaseScene';

export class AvatarScene extends BaseScene {
  protected accent = C.cyan;
  protected music = 'menu' as const;

  constructor() {
    super('Avatar');
  }

  protected build(): void {
    const top = this.addPageHeader('avatar.title', C.cyan);
    const total = state.totalStars;
    const level = state.avatarLevel;
    const look = playerLook();

    // Vitrine do robô atual.
    const lw = 360;
    const left = { x: 20, y: top + 12, w: lw, h: this.H - top - 24 };
    addPanel(this, left, look.color, 0.85);
    const bot = new Robot(this, left.x + lw / 2, left.y + 150, 2);
    this.time.addEvent({ delay: 2200, loop: true, callback: () => bot.setMood('happy').hop() });
    title(this, left.x + lw / 2, left.y + 280, t(`avatar.${look.avatar}`), 26, look.color).setOrigin(0.5);
    title(this, left.x + lw / 2, left.y + 314, t('avatar.level', { n: level }), 20, C.yellow).setOrigin(0.5);
    for (let n = 1; n <= 5; n++) {
      body(this, left.x + 30, left.y + 348 + (n - 1) * 30, `${n <= level ? '★' : '☆'}  ${t(`avatar.perk.${n}`)}`, 19, n <= level ? C.text : C.dim);
    }
    const maxed = level >= AVATAR_MAX_LEVEL;
    const poor = state.balance < AVATAR_LEVEL_COST;
    if (maxed) body(this, left.x + lw / 2, left.y + left.h - 30, t('avatar.max'), 18, C.yellow).setOrigin(0.5);
    else {
      const btn = new NeonButton(this, left.x + lw / 2, left.y + left.h - 34, lw - 40, 50, poor ? t('avatar.poor', { n: AVATAR_LEVEL_COST - state.balance }) : t('avatar.buyLevel', { n: AVATAR_LEVEL_COST }), () => this.buy(() => state.buyAvatarLevel()), { color: poor ? C.dim : C.yellow, size: 17 });
      if (poor) btn.disableInteractive();
    }

    // Modelos.
    const rx = lw + 40;
    const rw = this.W - rx - 20;
    title(this, rx, top + 22, t('avatar.model'), 20, C.text);
    const tw = (rw - 4 * 12) / AVATARS.length;
    AVATARS.forEach((a, i) => {
      const x = rx + i * (tw + 12);
      const y = top + 56;
      const open = total >= a.stars;
      const picked = state.look.avatar === a.id;
      addPanel(this, { x, y, w: tw, h: 250 }, picked ? C.yellow : open ? C.panelEdge : C.panelEdge, open ? 0.9 : 0.5);
      const demo = new Robot(this, x + tw / 2, y + 120, Math.min(1.1, tw / 150), { avatar: a.id, color: look.color, level: 1 });
      demo.setAlpha(open ? 1 : 0.25);
      body(this, x + tw / 2, y + 206, t(`avatar.${a.id}`), 18, picked ? C.yellow : open ? C.text : C.dim).setOrigin(0.5);
      if (!open) title(this, x + tw / 2, y + 228, `${a.stars}★`, 18, C.dim).setOrigin(0.5);
      this.add
        .zone(x + tw / 2, y + 125, tw, 250)
        .setInteractive({ useHandCursor: open })
        .on('pointerup', () => this.pick(open, { avatar: a.id }));
    });

    // Cores.
    const cy = top + 344;
    title(this, rx, cy, t('avatar.color'), 20, C.text);
    const sw = (rw - 5 * 12) / AVATAR_COLORS.length;
    AVATAR_COLORS.forEach((c, i) => {
      const x = rx + i * (sw + 12) + sw / 2;
      const y = cy + 110;
      const open = state.ownsColor(c.id);
      const picked = state.look.color === c.id;
      const g = this.add.graphics({ x, y });
      const plate = chamfer(sw, 130, 14);
      g.fillStyle(C.panel, 0.9).fillPoints(plate, true);
      g.lineStyle(picked ? 5 : 2, picked ? C.yellow : C.panelEdge).strokePoints(plate, true, true);
      g.fillStyle(c.hex, open ? 1 : 0.2).fillPoints(offset(regularPoly(6, Math.min(34, sw / 3), 0), 0, -8), true);
      if (!open) title(this, x, y + 44, t('avatar.buyColor', { n: c.cost }), 17, state.balance >= c.cost ? C.yellow : C.dim).setOrigin(0.5);
      this.add
        .zone(x, y, sw, 130)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => (open ? this.pick(true, { color: c.id }) : this.buy(() => state.buyAvatarColor(c.id), c.id)));
    });
    celebrate(this);
  }

  /** Compra um item do avatar; compra de cor já a deixa selecionada. */
  private buy(action: () => boolean, color?: string): void {
    if (!action()) return void audio.sfx('error');
    audio.sfx('win');
    if (color) state.setLook({ color });
    showToast(this, { title: t('avatar.bought'), text: state.achievementLevels()['avatar_completo'] ? t('avatar.allDone') : '', color: C.yellow, life: 2500 });
    this.scene.restart();
  }

  private pick(open: boolean, patch: { avatar?: string; color?: string }): void {
    if (!open) return void audio.sfx('error');
    audio.sfx('place', 7);
    state.setLook(patch);
    this.scene.restart();
  }
}
