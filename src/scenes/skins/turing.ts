/**
 * @module scenes/skins/turing
 * Skin do Teste de Turing: um chat com a juíza. Cada resposta adequada move
 * o medidor para HUMANO; respostas "robóticas" movem para MÁQUINA.
 */
import Phaser from 'phaser';
import { audio } from '../../app/services';
import { TuringVisual } from '../../core/missions/types';
import { ClassResult } from '../../core/simulation/classification';
import { Robot } from '../../entities/Robot';
import { t } from '../../services/i18n';
import { burst, glow } from '../../ui/fx';
import { C, body, chamfer, css, offset, regularPoly, title } from '../../ui/theme';
import { SkinFactory } from './types';

export const turingSkin: SkinFactory = ({ scene, rect, mission, result, hud }) => {
  const res = result as unknown as ClassResult<TuringVisual>;
  const cy = rect.y + rect.h * 0.56;
  const sideW = 190;
  const chatX = rect.x + sideW;
  const chatW = rect.w - sideW * 2;

  // Medidor MÁQUINA <-> HUMANO.
  const mw = Math.min(620, rect.w * 0.5);
  const mx = rect.x + rect.w / 2 - mw / 2;
  const my = rect.y + 34;
  const meter = scene.add.graphics();
  for (let i = 0; i < 20; i++) {
    const col = Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(C.red), Phaser.Display.Color.ValueToColor(C.green), 19, i);
    meter.fillStyle(Phaser.Display.Color.GetColor(col.r, col.g, col.b), 0.85).fillRect(mx + (mw / 20) * i + 2, my, mw / 20 - 4, 18);
  }
  title(scene, mx - 14, my + 9, t('turing.machine'), 18, C.red).setOrigin(1, 0.5);
  title(scene, mx + mw + 14, my + 9, t('turing.human'), 18, C.green).setOrigin(0, 0.5);
  const needle = scene.add.triangle(mx + mw / 2, my + 36, 0, 18, 12, 0, 24, 18, 0xffffff);
  let trust = 0.5;

  // Juíza: um "olho" poligonal.
  const jx = rect.x + sideW / 2;
  glow(scene, jx, cy, C.magenta, 2.2, 0.3);
  const judge = scene.add.graphics({ x: jx, y: cy });
  judge.fillStyle(0x1b1838).fillPoints(regularPoly(6, 62, 0), true).lineStyle(4, C.magenta).strokePoints(regularPoly(6, 62, 0), true, true);
  const iris = scene.add.graphics({ x: jx, y: cy });
  iris.fillStyle(C.magenta).fillPoints(regularPoly(3, 24), true).fillStyle(C.bg).fillCircle(0, 2, 8);
  scene.tweens.add({ targets: iris, angle: 360, duration: 5000, repeat: -1 });
  body(scene, jx, cy + 78, t('turing.judge'), 20, C.magenta).setOrigin(0.5, 0);
  const bot = new Robot(scene, rect.x + rect.w - sideW / 2, cy, 1.25);
  body(scene, rect.x + rect.w - sideW / 2, cy + 78, t('turing.bot'), 20, C.cyan).setOrigin(0.5, 0);

  // Balões do chat.
  const bubbleW = chatW * 0.8;
  const bubbleH = 120;
  const mkBubble = (x: number, y: number, color: number) => {
    scene.add
      .graphics()
      .fillStyle(C.panel, 0.92)
      .fillPoints(offset(chamfer(bubbleW, bubbleH, 16), x + bubbleW / 2, y + bubbleH / 2), true)
      .lineStyle(3, color)
      .strokePoints(offset(chamfer(bubbleW, bubbleH, 16), x + bubbleW / 2, y + bubbleH / 2), true, true);
    return body(scene, x + 22, y + 18, '', 28, C.text).setWordWrapWidth(bubbleW - 44);
  };
  const qText = mkBubble(chatX, cy - bubbleH - 20, C.magenta);
  const aText = mkBubble(chatX + chatW - bubbleW, cy + 20, C.cyan);
  const counter = body(scene, rect.x + rect.w / 2, rect.y + rect.h - 6, '', 20, C.dim).setOrigin(0.5, 1);

  /** Efeito máquina de escrever. */
  const type = async (obj: Phaser.GameObjects.Text, str: string) => {
    for (let n = 1; n <= str.length; n++) {
      obj.setText(str.slice(0, n));
      if (n % 2 === 0) audio.sfx('type');
      await scene.wait(24);
    }
  };

  return {
    steps: res.steps.length,
    async play(i) {
      const step = res.steps[i];
      const n = step.case.visual.n;
      counter.setText(`${i + 1} / ${res.steps.length}`);
      qText.setText('');
      aText.setText('').setColor(css(C.text));
      bot.setMood('idle');
      await type(qText, t(`turing.q${n}`));
      await scene.wait(300);

      bot.setMood('think');
      const feats = Object.entries(step.case.inputs).filter(([, v]) => v).map(([k]) => t(`io.${k}`));
      hud(`${t('sim.sensors')}: ${feats.join(' + ') || '—'}   →   ${t(`io.${mission.outputs[step.chosen]}`)}`);
      for (const dots of ['.', '..', '...']) {
        aText.setText(dots);
        await scene.wait(160);
      }
      if (step.correct) {
        await type(aText, t(`turing.a${n}`));
        audio.sfx('good');
        bot.setMood('happy').hop();
      } else {
        aText.setColor(css(C.red));
        await type(aText, t(`turing.bad${step.chosen}`));
        audio.sfx('bad');
        bot.setMood('sad').shake();
        scene.cameras.main.shake(140, 0.006);
      }
      trust = Phaser.Math.Clamp(trust + ((step.correct ? 1 : -1) * 0.5) / res.steps.length, 0, 1);
      scene.tweens.add({ targets: needle, x: mx + mw * trust, duration: 300, ease: 'Back.out' });
      if (i === res.steps.length - 1 && result.success) burst(scene, mx + mw, my, C.green, 40, 500);
      await scene.wait(750);
    },
  };
};
