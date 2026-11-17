/**
 * @module scenes/skins/sorter
 * Skin "brinquedo de encaixar": itens chegam pela esteira e o robô arremessa
 * cada um no buraco A ou B. Usada pelo Berçário, Triagem e Paradoxo XOR
 * (no XOR o item é um chip com dois LEDs).
 */
import Phaser from 'phaser';
import { audio } from '../../app/services';
import { SorterVisual } from '../../core/missions/types';
import { ClassResult } from '../../core/simulation/classification';
import { Robot } from '../../entities/Robot';
import { t } from '../../services/i18n';
import { burst, floatText } from '../../ui/fx';
import { C, body, chamfer, css, offset, regularPoly, title } from '../../ui/theme';
import { SkinFactory } from './types';

/** Desenha o item (forma geométrica ou chip) num container novo. */
function makeItem(scene: Phaser.Scene, v: SorterVisual): Phaser.GameObjects.Container {
  const g = scene.add.graphics();
  if (v.shape === 'chip') {
    g.fillStyle(0x1b1838).fillPoints(chamfer(110, 64, 10), true);
    g.lineStyle(3, C.violet).strokePoints(chamfer(110, 64, 10), true, true);
    [v.a, v.b].forEach((on, i) => {
      const x = i === 0 ? -26 : 26;
      g.fillStyle(on ? C.yellow : C.dim, on ? 1 : 0.5).fillPoints(offset(regularPoly(4, 16), x, 0), true);
      if (on) g.lineStyle(2, 0xffffff).strokePoints(offset(regularPoly(4, 16), x, 0), true, true);
    });
  } else {
    const r = v.big ? 42 : 24;
    // Na Triagem a cor é um sensor que não tem nada a ver com a regra.
    const color = v.alt !== undefined ? (v.alt ? C.orange : C.green) : v.shape === 'circle' ? C.cyan : v.shape === 'triangle' ? C.yellow : C.magenta;
    g.fillStyle(color, 0.3).lineStyle(4, color);
    if (v.shape === 'circle') g.fillCircle(0, 0, r).strokeCircle(0, 0, r);
    else {
      const pts = v.shape === 'triangle' ? regularPoly(3, r * 1.15) : regularPoly(4, r * 1.25, Math.PI / 4);
      g.fillPoints(pts, true).strokePoints(pts, true, true);
    }
  }
  return scene.add.container(0, 0, [g]);
}

export const sorterSkin: SkinFactory = ({ scene, rect, mission, result, hud }) => {
  const res = result as unknown as ClassResult<SorterVisual>;
  const cx = rect.x + rect.w * 0.44;
  const cy = rect.y + rect.h * 0.5;
  const beltY = cy + 84;
  const binX = rect.x + rect.w - 180;
  const bins = [
    { x: binX, y: cy - 120, label: t(`mission.${mission.id}.binA`), color: C.cyan },
    { x: binX, y: cy + 120, label: t(`mission.${mission.id}.binB`), color: C.magenta },
  ];

  // Esteira com setas correndo.
  const belt = scene.add.graphics();
  belt.fillStyle(0x15122c).fillRect(rect.x + 10, beltY, cx - rect.x - 70, 26);
  belt.lineStyle(2, C.dim).strokeRect(rect.x + 10, beltY, cx - rect.x - 70, 26);
  for (let i = 0; i < 6; i++) {
    const arrow = scene.add.triangle(rect.x + 30, beltY + 13, 0, 0, 14, 8, 0, 16, C.dim).setAlpha(0.8);
    scene.tweens.add({ targets: arrow, x: cx - 80, duration: 2400, repeat: -1, delay: i * 400 });
  }

  // Buracos.
  const binGfx = bins.map((b) => {
    const g = scene.add.graphics({ x: b.x, y: b.y });
    g.fillStyle(C.panel, 0.9).fillPoints(chamfer(300, 150, 18), true);
    g.lineStyle(3, b.color).strokePoints(chamfer(300, 150, 18), true, true);
    g.fillStyle(0x000000, 0.8).fillPoints(chamfer(150, 70, 12), true);
    g.lineStyle(2, b.color, 0.6).strokePoints(chamfer(150, 70, 12), true, true);
    body(scene, b.x, b.y - 70, b.label, 20, b.color).setOrigin(0.5, 0);
    return g;
  });

  const bot = new Robot(scene, cx, cy, 1.4);
  const score = title(scene, rect.x + 20, rect.y + 16, '', 24, C.text);
  const thought = title(scene, cx, cy - 150, '', 26, C.yellow).setOrigin(0.5);
  let correct = 0;
  const showScore = () => score.setText(t('sim.score', { a: correct, b: res.steps.length }));
  showScore();

  return {
    steps: res.steps.length,
    async play(i) {
      const step = res.steps[i];
      const item = makeItem(scene, step.case.visual).setPosition(rect.x - 60, beltY - 44);
      bot.setMood('idle');
      thought.setText('');
      await scene.tween({ targets: item, x: cx - 120, duration: 520, ease: 'Sine.out' });

      // "Pensando": mostra a saída da rede.
      bot.setMood('think');
      const out = Object.values(step.outputs)[0];
      hud(`${Object.entries(step.case.inputs).map(([k, v]) => `${t(`io.${k}`)} ${v.toFixed(2)}`).join('  ·  ')}   →   ${out.toFixed(2)}`);
      thought.setText(`${step.chosen ? 'B' : 'A'}  ${out.toFixed(2)}`).setColor(css(bins[step.chosen].color));
      audio.sfx('tick', step.chosen ? 7 : 0);
      await scene.wait(320);

      // Arremesso em arco até o buraco escolhido.
      const bin = bins[step.chosen];
      const from = { x: item.x, y: item.y };
      audio.sfx('whoosh');
      await scene.tween({
        targets: item,
        angle: 360,
        duration: 480,
        onUpdate: (tw: Phaser.Tweens.Tween) => {
          const p = tw.progress;
          item.x = Phaser.Math.Linear(from.x, bin.x, p);
          item.y = Phaser.Math.Linear(from.y, bin.y, p) - Math.sin(p * Math.PI) * 130;
        },
      });

      const g = binGfx[step.chosen];
      if (step.correct) {
        correct++;
        audio.sfx('good');
        bot.setMood('happy').hop();
        burst(scene, bin.x, bin.y, C.green, 14);
        floatText(scene, bin.x, bin.y - 40, '+1', css(C.green));
        scene.tweens.add({ targets: g, scale: 1.08, duration: 90, yoyo: true });
        await scene.tween({ targets: item, scale: 0, duration: 200 });
      } else {
        audio.sfx('bad');
        bot.setMood('sad').shake();
        scene.cameras.main.shake(160, 0.008);
        burst(scene, bin.x, bin.y, C.red, 14);
        floatText(scene, bin.x, bin.y - 40, 'X', css(C.red));
        // O buraco cospe a peça de volta.
        await scene.tween({ targets: item, x: bin.x - 220, y: rect.y + rect.h + 80, angle: -200, duration: 420, ease: 'Quad.in' });
      }
      item.destroy();
      showScore();
      await scene.wait(120);
    },
  };
};
