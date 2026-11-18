/**
 * @module scenes/skins/origami
 * Skin da folha de ORIGAMI: o robô percorre a folha e, em cada ponto marcado,
 * decide se o vinco é MONTANHA (dobra para cima) ou VALE (para baixo).
 *
 * O fundo da folha é pintado com a resposta da rede em cada posição — dá para
 * ver quantas faixas a rede aprendeu (cada dobra pede pelo menos um neurônio,
 * ou um neurônio quântico com ativação seno).
 */
import { audio } from '../../app/services';
import { OrigamiVisual } from '../../core/missions/types';
import { ClassResult } from '../../core/simulation/classification';
import { Robot } from '../../entities/Robot';
import { t } from '../../services/i18n';
import { burst, floatText } from '../../ui/fx';
import { C, body, css, offset, regularPoly, title } from '../../ui/theme';
import { SkinFactory } from './types';

export const origamiSkin: SkinFactory = ({ scene, rect, mission, result, hud, predict }) => {
  const res = result as unknown as ClassResult<OrigamiVisual>;
  const out = mission.outputs[0];
  const px = rect.x + 60;
  const pw = rect.w - 120;
  const py = rect.y + rect.h * 0.5;
  const ph = Math.min(180, rect.h * 0.34);
  const toX = (x: number) => px + ((x + 1) / 2) * pw;

  // A folha, pintada com o que a rede responde ao longo dela.
  const g = scene.add.graphics();
  g.fillStyle(0xf2ead8, 0.12).fillRect(px, py - ph / 2, pw, ph);
  const n = 120;
  for (let i = 0; i < n; i++) {
    const x = ((i + 0.5) / n) * 2 - 1;
    const v = predict({ posicao: x, espessura: 0 })[out];
    g.fillStyle(v >= 0.5 ? C.magenta : C.cyan, 0.08 + Math.abs(v - 0.5) * 0.5).fillRect(px + (i * pw) / n, py - ph / 2, pw / n + 0.5, ph);
  }
  g.lineStyle(3, 0xf2ead8, 0.7).strokeRect(px, py - ph / 2, pw, ph);
  // Régua de -1 a 1 embaixo da folha.
  for (let k = -4; k <= 4; k++) {
    const x = toX(k / 4);
    g.lineStyle(2, C.dim).lineBetween(x, py + ph / 2, x, py + ph / 2 + (k % 2 ? 6 : 12));
  }
  body(scene, toX(-1), py + ph / 2 + 16, '-1', 15, C.dim).setOrigin(0.5, 0);
  body(scene, toX(1), py + ph / 2 + 16, '1', 15, C.dim).setOrigin(0.5, 0);

  const bot = new Robot(scene, rect.x + 110, rect.y + 90, 1);
  // Placar embaixo, à esquerda: o robô passeia pelo alto da folha.
  const score = title(scene, rect.x + 24, rect.y + rect.h - 64, '', 24, C.text);
  body(scene, rect.x + rect.w / 2, rect.y + rect.h - 26, t('origami.legend'), 18, C.text).setOrigin(0.5);
  let correct = 0;
  const showScore = () => score.setText(t('sim.score', { a: correct, b: res.steps.length }));
  showScore();

  return {
    steps: res.steps.length,
    async play(i) {
      const step = res.steps[i];
      const x = toX(step.case.visual.x);
      const up = step.chosen === 1;
      hud(`${t('io.posicao')} ${step.case.visual.x.toFixed(2)}   →   ${t(`io.${out}`)} ${step.outputs[out].toFixed(2)}`);
      await scene.tween({ targets: bot, x, duration: 180, ease: 'Sine.inOut' });
      // O vinco: linha na folha e um triângulo para cima (montanha) ou para baixo (vale).
      const color = up ? C.magenta : C.cyan;
      const mark = scene.add.graphics({ x, y: py }).setDepth(5);
      mark.lineStyle(3, color).lineBetween(0, -ph / 2, 0, ph / 2);
      mark.fillStyle(color).fillPoints(offset(regularPoly(3, 14, up ? -Math.PI / 2 : Math.PI / 2), 0, up ? -ph / 2 - 18 : ph / 2 + 18), true);
      audio.sfx('tick', up ? 7 : 0);
      await scene.tween({ targets: mark, scaleY: { from: 0, to: 1 }, duration: 140 });
      if (step.correct) {
        correct++;
        bot.setMood('happy');
        burst(scene, x, py, C.green, 8, 160);
      } else {
        audio.sfx('bad');
        bot.setMood('sad').shake();
        floatText(scene, x, py - ph / 2 - 40, 'X', css(C.red), 26);
        mark.lineStyle(4, C.red).lineBetween(-10, -10, 10, 10).lineBetween(10, -10, -10, 10);
      }
      showScore();
      await scene.wait(90);
    },
  };
};
