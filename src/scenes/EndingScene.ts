/**
 * @module scenes/EndingScene
 * Final do jogo — exibida ao vencer o Teste de Turing ("zerar" a simulação).
 */
import Phaser from 'phaser';
import { state } from '../app/services';
import { MISSIONS } from '../core/missions/catalog';
import { Robot } from '../entities/Robot';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { burst, glow } from '../ui/fx';
import { C, FONT_TITLE, body, css } from '../ui/theme';
import { BaseScene } from './BaseScene';

export class EndingScene extends BaseScene {
  protected accent = C.green;
  protected music = 'ending' as const;

  constructor() {
    super('Ending');
  }

  protected build(): void {
    const cx = this.W / 2;
    glow(this, cx, 250, C.green, 7, 0.25);
    const head = this.add
      .text(cx, 90, t('ending.title'), { fontFamily: FONT_TITLE, fontSize: '56px', fontStyle: '800', color: css(C.green) })
      .setOrigin(0.5)
      .setShadow(4, 4, css(C.magenta), 0);
    // Tremida de "glitch" periódica no título.
    this.time.addEvent({ delay: 2200, loop: true, callback: () => this.tweens.add({ targets: head, x: cx + 8, duration: 40, yoyo: true, repeat: 3 }) });

    const bot = new Robot(this, cx, 270, 2).setMood('happy');
    this.time.addEvent({ delay: 900, loop: true, callback: () => bot.hop() });

    ['ending.line1', 'ending.line2', 'ending.line3'].forEach((k, i) => {
      const line = body(this, cx, 420 + i * 38, t(k), 26, i === 0 ? C.text : C.cyan).setOrigin(0.5).setAlpha(0);
      this.tweens.add({ targets: line, alpha: 1, y: line.y - 8, duration: 600, delay: 600 + i * 900 });
    });
    body(this, cx, 548, `★ ${t('menu.stars', { n: state.totalStars, max: MISSIONS.length * 3 })}`, 28, C.yellow).setOrigin(0.5);
    body(this, cx, 590, t('ending.credits'), 20, C.dim).setOrigin(0.5);
    new NeonButton(this, cx, 660, 320, 68, t('ending.back'), () => this.go('Menu'), { color: C.green, size: 20 });

    // Chuva de confete poligonal.
    const colors = [C.cyan, C.magenta, C.yellow, C.green];
    this.time.addEvent({
      delay: 450,
      loop: true,
      callback: () => burst(this, Phaser.Math.Between(80, this.W - 80), Phaser.Math.Between(60, 380), Phaser.Utils.Array.GetRandom(colors), 18, 380),
    });
  }
}
