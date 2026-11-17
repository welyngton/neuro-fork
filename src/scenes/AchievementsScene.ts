/**
 * @module scenes/AchievementsScene
 * Página de conquistas: duas colunas, cada linha com medalha, nome, como
 * ganhar e os níveis (bronze / prata / ouro) já atingidos.
 */
import { state } from '../app/services';
import { ACHIEVEMENTS } from '../core/progression/achievements';
import { t } from '../services/i18n';
import { C, body, offset, regularPoly, title } from '../ui/theme';
import { BaseScene } from './BaseScene';

const TIER_COLOR = [C.orange, C.text, C.yellow];

export class AchievementsScene extends BaseScene {
  protected accent = C.magenta;
  protected music = 'menu' as const;

  constructor() {
    super('Achievements');
  }

  protected build(): void {
    const top = this.addPageHeader('ach.title', C.magenta);
    const levels = state.achievementLevels();
    const have = ACHIEVEMENTS.reduce((n, a) => n + levels[a.id], 0);
    const all = ACHIEVEMENTS.reduce((n, a) => n + a.tiers.length, 0);
    title(this, this.W / 2 + 60, 34, t('ach.count', { a: have, b: all }), 20, C.text).setOrigin(0.5);

    const cols = 2;
    const rows = Math.ceil(ACHIEVEMENTS.length / cols);
    const cw = (this.W - 40) / cols;
    const rh = (this.H - top - 16) / rows;
    const g = this.add.graphics();

    ACHIEVEMENTS.forEach((a, i) => {
      const x = 20 + Math.floor(i / rows) * cw;
      const y = top + 10 + (i % rows) * rh;
      const level = levels[a.id];
      const color = level ? TIER_COLOR[level - 1] : C.dim;
      // Fundo zebrado e medalha.
      if (i % 2 === 0) g.fillStyle(C.panel, 0.55).fillRect(x, y, cw - 10, rh - 3);
      const medal = offset(regularPoly(6, Math.min(17, rh / 2 - 4), 0), x + 24, y + rh / 2 - 1);
      g.fillStyle(color, level ? 0.9 : 0.15).fillPoints(medal, true);
      g.lineStyle(2, color).strokePoints(medal, true, true);
      body(this, x + 52, y + 1, t(`ach.${a.id}.t`), 19, level ? C.text : C.dim);
      body(this, x + 52, y + 22, t(`ach.${a.id}.d`), 15, level ? C.violet : C.dim);
      // Um losango por nível possível.
      a.tiers.forEach((_, k) => {
        const px = x + cw - 30 - (a.tiers.length - 1 - k) * 24;
        const pip = offset(regularPoly(4, 9), px, y + rh / 2 - 1);
        if (k < level) g.fillStyle(TIER_COLOR[k]).fillPoints(pip, true);
        g.lineStyle(2, k < level ? TIER_COLOR[k] : C.dim).strokePoints(pip, true, true);
      });
    });
  }
}
