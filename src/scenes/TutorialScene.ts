/**
 * @module scenes/TutorialScene
 *
 * ACADEMIA NEUROBOT — as 9 lições ilustradas (`ui/lessons.ts`) em slides, para
 * rever quando quiser pelo botão ACADEMIA do menu. O botão TOUR GUIADO refaz a
 * missão-tutorial (Berçário), em que cada lição se alterna com um passo prático
 * na interface (`ui/Tour.ts`).
 */
import Phaser from 'phaser';
import { audio, state } from '../app/services';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { NetworkView } from '../ui/NetworkView';
import { LESSONS, animateLessonViews, buildLesson } from '../ui/lessons';
import { C, FONT_TITLE, css } from '../ui/theme';
import { BaseScene } from './BaseScene';

export class TutorialScene extends BaseScene {
  protected accent = C.cyan;
  protected music = 'menu' as const;

  /** Redes animadas na lição atual. */
  views: NetworkView[] = [];
  private index = 0;
  private layer: Phaser.GameObjects.Container | null = null;
  private prevBtn!: NeonButton;
  private nextBtn!: NeonButton;

  constructor() {
    super('Tutorial');
  }

  protected build(): void {
    this.index = 0;
    this.views = [];
    this.layer = null;
    this.add.text(this.W / 2, 40, t('tut.title'), { fontFamily: FONT_TITLE, fontSize: '30px', fontStyle: '800', color: css(C.cyan) }).setOrigin(0.5).setShadow(3, 3, css(C.magenta), 0);
    new NeonButton(this, 100, 40, 160, 46, `◀ ${t('nav.back')}`, () => this.go('Menu'), { color: C.orange, size: 16 });
    new NeonButton(this, this.W - 130, 40, 230, 46, t('tut.tour'), () => {
      state.startTour();
      this.go('Design', { missionId: 'bercario' });
    }, { color: C.magenta, size: 15 });
    this.prevBtn = new NeonButton(this, 150, this.H - 48, 240, 64, t('tut.prev'), () => this.show(this.index - 1), { color: C.text, size: 18 });
    this.nextBtn = new NeonButton(this, this.W - 170, this.H - 48, 300, 64, t('tut.next'), () => (this.index < LESSONS.length - 1 ? this.show(this.index + 1) : this.go('Menu')), { color: C.green, size: 20 });
    this.input.keyboard?.on('keydown-RIGHT', () => this.index < LESSONS.length - 1 && this.show(this.index + 1));
    this.input.keyboard?.on('keydown-LEFT', () => this.index > 0 && this.show(this.index - 1));
    this.show(0);
  }

  private show(i: number): void {
    if (i < 0 || i >= LESSONS.length) return;
    this.index = i;
    audio.sfx('whoosh');
    this.tweens.killAll();
    this.time.removeAllEvents();
    this.layer?.destroy();
    this.views = [];
    this.layer = buildLesson(this, i, { x: 20, y: 86, w: this.W - 40, h: this.H - 196 });
    this.prevBtn.setEnabled(i > 0);
    this.nextBtn.setLabel(i === LESSONS.length - 1 ? t('tut.done') : t('tut.next'));
    this.layer.setAlpha(0);
    this.tweens.add({ targets: this.layer, alpha: 1, duration: 250 });
  }

  update(time: number): void {
    animateLessonViews(this.views, time);
  }
}
