/**
 * @module scenes/skins/sorter
 * Skin "brinquedo de encaixar": itens chegam pela esteira e o robô arremessa
 * cada um num buraco. Com UMA ação há dois buracos (A = sinal fraco, B = forte);
 * com várias ações há um buraco por ação (vence a mais forte).
 *
 * Usada pelo Berçário, Triagem, Paradoxo dos Gêmeos (um par de formas: iguais
 * num cesto, o resto no outro), Tangram (peças do barco) e Origami (animais de
 * papel, um cesto para cada).
 */
import Phaser from 'phaser';
import { audio } from '../../app/services';
import { SorterVisual } from '../../core/missions/types';
import { ClassResult } from '../../core/simulation/classification';
import { Robot } from '../../entities/Robot';
import { t } from '../../services/i18n';
import { burst, floatText } from '../../ui/fx';
import { C, body, chamfer, css, title } from '../../ui/theme';
import { SHAPE_COLOR, drawOrigami, drawShape } from './shapes';
import { SkinFactory } from './types';

const V = (x: number, y: number) => new Phaser.Math.Vector2(x, y);

/** Desenha o item (forma, par de formas ou origami) num container novo. */
function makeItem(scene: Phaser.Scene, v: SorterVisual): Phaser.GameObjects.Container {
  const g = scene.add.graphics();
  if (v.shape === 'pair') {
    // Dois itens lado a lado, numa plaquinha: iguais = gêmeos.
    const [a, b] = v.pair ?? ['circle', 'circle'];
    g.fillStyle(0x1b1838).fillPoints(chamfer(150, 76, 12), true).lineStyle(3, C.violet).strokePoints(chamfer(150, 76, 12), true, true);
    drawShape(g, a, -36, 0, 21);
    drawShape(g, b, 36, 0, 21);
  } else if (v.shape === 'animal') {
    drawOrigami(g, v.animal ?? 'tsuru', 1.25);
    g.setRotation(v.tilt ?? 0);
  } else {
    const r = v.big ? 42 : 24;
    // Na Triagem a cor é um sensor que não tem nada a ver com a regra.
    const color = v.alt !== undefined ? (v.alt ? C.orange : C.green) : SHAPE_COLOR[v.shape === 'parallelogram' ? 'square' : v.shape];
    if (v.shape === 'parallelogram') {
      const pts = [V(-r * 0.6, -r * 0.6), V(r * 1.3, -r * 0.6), V(r * 0.6, r * 0.6), V(-r * 1.3, r * 0.6)];
      g.fillStyle(color, 0.3).lineStyle(4, color).fillPoints(pts, true).strokePoints(pts, true, true);
    } else drawShape(g, v.shape, 0, 0, r, { color, line: 4 });
  }
  return scene.add.container(0, 0, [g]);
}

export const sorterSkin: SkinFactory = ({ scene, rect, mission, result, hud }) => {
  const res = result as unknown as ClassResult<SorterVisual>;
  const cx = rect.x + rect.w * 0.44;
  const cy = rect.y + rect.h * 0.5;
  const beltY = cy + 84;
  const binX = rect.x + rect.w - 180;
  // Uma ação: buracos A (fraco) e B (forte). Várias: um buraco por ação.
  const multi = mission.outputs.length > 1;
  const COLORS = [C.cyan, C.magenta, C.yellow, C.green];
  const labels = multi ? mission.outputs.map((id) => t(`io.${id}`).toUpperCase()) : [t(`mission.${mission.id}.binA`), t(`mission.${mission.id}.binB`)];
  const n = labels.length;
  const binH = Math.min(150, (rect.h - 30) / n - 12);
  const bins = labels.map((label, i) => ({ x: binX, y: cy + (i - (n - 1) / 2) * (binH + 12), label, color: COLORS[i % COLORS.length], tag: multi ? label : i ? 'B' : 'A' }));

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
    g.fillStyle(C.panel, 0.9).fillPoints(chamfer(300, binH, 18), true);
    g.lineStyle(3, b.color).strokePoints(chamfer(300, binH, 18), true, true);
    g.fillStyle(0x000000, 0.8).fillPoints(chamfer(150, binH * 0.46, 12), true);
    g.lineStyle(2, b.color, 0.6).strokePoints(chamfer(150, binH * 0.46, 12), true, true);
    body(scene, b.x, b.y - binH / 2 + 6, b.label, multi ? 17 : 20, b.color).setOrigin(0.5, 0);
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
      const visual = step.case.visual;
      // Plaquinhas largas e bichos grandes param mais longe do robô.
      const stopX = cx - (visual.shape === 'pair' ? 175 : visual.shape === 'animal' ? 150 : 120);
      const item = makeItem(scene, visual).setPosition(rect.x - 60, beltY - (visual.shape === 'animal' ? 56 : 44));
      bot.setMood('idle');
      thought.setText('');
      await scene.tween({ targets: item, x: stopX, duration: 520, ease: 'Sine.out' });

      // "Pensando": mostra a saída da rede.
      bot.setMood('think');
      const out = multi ? step.outputs[mission.outputs[step.chosen]] : Object.values(step.outputs)[0];
      const shown = Object.entries(step.case.inputs).filter(([k]) => mission.inputs.includes(k));
      hud(`${shown.map(([k, v]) => `${t(`io.${k}`)} ${v.toFixed(2)}`).join('  ·  ')}   →   ${out.toFixed(2)}`);
      thought.setText(`${bins[step.chosen].tag}  ${out.toFixed(2)}`).setColor(css(bins[step.chosen].color));
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
