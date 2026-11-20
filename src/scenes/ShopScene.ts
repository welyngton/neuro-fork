/**
 * @module scenes/ShopScene
 * Loja de upgrades: o jogador gasta estrelas para liberar ferramentas de
 * Design e de Treino. O catálogo vem de `core/progression/upgrades.ts`.
 */
import { analytics, audio, state } from '../app/services';
import { COINS_PER_STAR } from '../core/progression/resources';
import { UPGRADES } from '../core/progression/upgrades';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { celebrate } from '../ui/Toast';
import { burst } from '../ui/fx';
import { C, body, title } from '../ui/theme';
import { addChip, addPanel } from '../ui/widgets';
import { BaseScene } from './BaseScene';

export class ShopScene extends BaseScene {
  protected accent = C.yellow;
  protected music = 'menu' as const;

  constructor() {
    super('Shop');
  }

  protected build(): void {
    const head = this.addPageHeader('shop.title', C.yellow);
    // Painel "seus recursos": mostra o efeito dos upgrades comprados em cada recurso do jogo.
    const caps = state.caps;
    const panel = { x: 20, y: head + 8, w: this.W - 40, h: 58 };
    addPanel(this, panel, C.cyan, 0.7);
    title(this, panel.x + 16, panel.y + 6, t('shop.res.title'), 13, C.cyan);
    const cw3 = (panel.w - 32) / 3;
    const bonus = Math.floor(state.totalStars * COINS_PER_STAR);
    [
      [t('shop.res.coins', { n: bonus, c: caps.cablePrice }), caps.cablePrice < 1 ? C.green : C.yellow],
      [t('shop.res.energy', { e: caps.energyMul.toFixed(1), p: caps.trainEnergyMul.toFixed(1) }), caps.energyMul > 1 || caps.trainEnergyMul < 1 ? C.green : C.magenta],
      [t('shop.res.water', { w: caps.waterMul.toFixed(1) }), caps.waterMul > 1 ? C.green : C.cyan],
    ].forEach(([txt, color], i) => body(this, panel.x + 16 + i * cw3, panel.y + 28, txt as string, 15, color as number).setWordWrapWidth(cw3 - 12));
    const top = head + 70;
    const cols = UPGRADES.length > 9 ? 4 : 3;
    const gap = 14;
    const cw = (this.W - 40 - gap * (cols - 1)) / cols;
    const rows = Math.ceil(UPGRADES.length / cols);
    const ch = (this.H - top - 24 - gap * (rows - 1)) / rows;

    UPGRADES.forEach((up, i) => {
      const x = 20 + (i % cols) * (cw + gap);
      const y = top + 12 + Math.floor(i / cols) * (ch + gap);
      const owned = state.upgrades.includes(up.id);
      const missing = up.cost - state.balance;
      const color = up.area === 'design' ? C.yellow : C.magenta;
      addPanel(this, { x, y, w: cw, h: ch }, owned ? C.green : color, owned ? 0.6 : 0.9);
      title(this, x + 16, y + 12, t(`upg.${up.id}.t`), 16, owned ? C.green : color).setWordWrapWidth(cw - 110);
      addChip(this, 0, y + 22, t(`shop.area.${up.area}`), color, false).setOrigin(1, 0.5).setX(x + cw - 10).setScale(0.8);
      body(this, x + 16, y + 38, t(`upg.${up.id}.d`), 16, C.text).setWordWrapWidth(cw - 32);
      const label = owned ? `✓ ${t('shop.owned')}` : missing > 0 ? t('shop.poor', { n: missing }) : t('shop.buy', { n: up.cost });
      const btn = new NeonButton(
        this,
        x + cw / 2,
        y + ch - 30,
        cw - 32,
        42,
        label,
        () => {
          if (!state.buy(up.id)) return void audio.sfx('error');
          audio.sfx('win');
          analytics.track('setting_changed', { key: 'upgrade', value: up.id });
          burst(this, x + cw / 2, y + ch / 2, C.yellow, 40, 500);
          this.time.delayedCall(350, () => this.scene.restart());
        },
        { color: owned ? C.green : missing > 0 ? C.dim : C.yellow, size: 15 },
      );
      if (owned || missing > 0) btn.disableInteractive();
    });
    celebrate(this);
  }
}
