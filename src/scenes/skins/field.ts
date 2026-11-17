/**
 * @module scenes/skins/field
 * Skin do "campo" 2D (missões Fronteira, Quadrantes, Ilha, Duas Luas, Alvo).
 *
 * O fundo do campo é pintado com a resposta da rede em cada ponto — a
 * fronteira de decisão, como no TensorFlow Playground. Drones surgem um a um:
 * círculo ciano = aliado, triângulo magenta = invasor. O robô atira nos que a
 * rede classificar como invasores; acertos e erros aparecem na hora.
 */
import Phaser from 'phaser';
import { audio } from '../../app/services';
import { fieldInputs } from '../../core/missions/datasets';
import { FieldVisual } from '../../core/missions/types';
import { ClassResult } from '../../core/simulation/classification';
import { Robot } from '../../entities/Robot';
import { t } from '../../services/i18n';
import { burst, floatText } from '../../ui/fx';
import { C, body, css, offset, regularPoly, title } from '../../ui/theme';
import { SkinFactory } from './types';

export const fieldSkin: SkinFactory = ({ scene, rect, mission, result, hud, predict }) => {
  const res = result as unknown as ClassResult<FieldVisual>;
  const size = Math.min(rect.h - 24, rect.w * 0.6);
  const fx = rect.x + rect.w - size - 30;
  const fy = rect.y + (rect.h - size) / 2;
  const toScreen = (x: number, y: number) => ({ x: fx + ((x + 1) / 2) * size, y: fy + ((1 - y) / 2) * size });
  const out = mission.outputs[0];

  // Fronteira de decisão da rede do jogador.
  const g = scene.add.graphics();
  const n = 30;
  const cell = size / n;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const v = predict(fieldInputs(((i + 0.5) / n) * 2 - 1, 1 - ((j + 0.5) / n) * 2))[out];
      g.fillStyle(v >= 0.5 ? C.magenta : C.cyan, 0.08 + Math.abs(v - 0.5) * 0.5).fillRect(fx + i * cell, fy + j * cell, cell + 0.5, cell + 0.5);
    }
  }
  g.lineStyle(1, C.dim, 0.5).lineBetween(fx + size / 2, fy, fx + size / 2, fy + size).lineBetween(fx, fy + size / 2, fx + size, fy + size / 2);
  g.lineStyle(3, C.panelEdge).strokeRect(fx, fy, size, size);

  // Lado esquerdo: robô, placar e legenda.
  const lx = rect.x + (fx - rect.x) / 2;
  const bot = new Robot(scene, lx, rect.y + rect.h * 0.46, 1.3);
  const score = title(scene, lx, rect.y + 30, '', 24, C.text).setOrigin(0.5);
  const legend = scene.add.graphics();
  legend.fillStyle(C.cyan).fillCircle(lx - 96, rect.y + rect.h - 84, 9);
  legend.fillStyle(C.magenta).fillPoints(offset(regularPoly(3, 12), lx - 96, rect.y + rect.h - 52), true);
  body(scene, lx - 76, rect.y + rect.h - 84, t('field.ally'), 20, C.cyan).setOrigin(0, 0.5);
  body(scene, lx - 76, rect.y + rect.h - 52, t('field.enemy'), 20, C.magenta).setOrigin(0, 0.5);
  body(scene, lx, rect.y + rect.h - 18, t('field.hint'), 15, C.dim).setOrigin(0.5).setWordWrapWidth(fx - rect.x - 30).setAlign('center');
  let correct = 0;
  const showScore = () => score.setText(t('sim.score', { a: correct, b: res.steps.length }));
  showScore();

  return {
    steps: res.steps.length,
    async play(i) {
      const step = res.steps[i];
      const v = step.case.visual;
      const p = toScreen(v.x, v.y);
      const enemy = step.case.expected === 1;
      const drone = scene.add.graphics({ x: p.x, y: p.y }).setDepth(5);
      if (enemy) drone.fillStyle(C.magenta).fillPoints(regularPoly(3, 11), true).lineStyle(2, 0xffffff).strokePoints(regularPoly(3, 11), true, true);
      else drone.fillStyle(C.cyan).fillCircle(0, 0, 8).lineStyle(2, 0xffffff).strokeCircle(0, 0, 8);
      hud(`x ${v.x.toFixed(2)}  ·  y ${v.y.toFixed(2)}   →   ${t(`io.${out}`)} ${step.outputs[out].toFixed(2)}`);
      await scene.tween({ targets: drone, scale: { from: 2.6, to: 1 }, alpha: { from: 0, to: 1 }, duration: 110 });

      if (step.chosen === 1) {
        // Tiro.
        audio.sfx('zap', enemy ? 0 : -7);
        const beam = scene.add.graphics().lineStyle(4, C.yellow).lineBetween(bot.x + 30, bot.y - 30, p.x, p.y).setBlendMode(Phaser.BlendModes.ADD);
        scene.tweens.add({ targets: beam, alpha: 0, duration: 160, onComplete: () => beam.destroy() });
        burst(scene, p.x, p.y, enemy ? C.magenta : C.red, enemy ? 10 : 16, 220);
      }
      if (step.correct) {
        correct++;
        bot.setMood('happy');
        if (step.chosen === 1) drone.destroy();
        else scene.tweens.add({ targets: drone, alpha: 0.35, duration: 200 });
      } else {
        // Errou: aliado abatido ou invasor que passou.
        audio.sfx('bad');
        bot.setMood('sad').shake();
        scene.cameras.main.shake(90, 0.004);
        floatText(scene, p.x, p.y - 10, 'X', css(C.red), 26);
        drone.clear().lineStyle(4, C.red).lineBetween(-9, -9, 9, 9).lineBetween(9, -9, -9, 9);
      }
      showScore();
      await scene.wait(120);
    },
  };
};
