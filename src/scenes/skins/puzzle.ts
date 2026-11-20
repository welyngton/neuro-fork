/**
 * @module scenes/skins/puzzle
 * Skin do QUEBRA-CABEÇA 3×3: o tabuleiro à direita está completo, menos a ÚLTIMA
 * peça (canto de baixo) — o ALVO. Pela esteira chegam peças de formatos variados
 * e giradas de jeitos diferentes. O robô decide: encaixar (a peça gira de volta e
 * entra no buraco) ou descartar (vai para a lixeira).
 */
import Phaser from 'phaser';
import { audio } from '../../app/services';
import { PuzzleVisual } from '../../core/missions/types';
import { ClassResult } from '../../core/simulation/classification';
import { Robot } from '../../entities/Robot';
import { t } from '../../services/i18n';
import { burst, floatText } from '../../ui/fx';
import { C, body, chamfer, css, offset, title } from '../../ui/theme';
import { pieceOutline } from './shapes';
import { SkinFactory } from './types';

/** Bordas entre as peças do tabuleiro (1 = aba, -1 = recorte). Vizinhas se completam. */
const H = [[1, -1], [-1, 1], [1, -1]]; // H[linha][coluna] = borda direita da peça
const V = [[-1, 1, -1], [1, -1, 1]]; // V[linha][coluna] = borda de baixo da peça
const edgesAt = (r: number, c: number): number[] => [
  r === 0 ? 0 : -V[r - 1][c],
  c === 2 ? 0 : H[r][c],
  r === 2 ? 0 : V[r][c],
  c === 0 ? 0 : -H[r][c - 1],
];
const PALETTE = [C.cyan, C.magenta, C.yellow, C.green, C.orange, C.violet];

export const puzzleSkin: SkinFactory = ({ scene, rect, result, hud }) => {
  const res = result as unknown as ClassResult<PuzzleVisual>;
  const cs = Math.min(112, (rect.h - 150) / 3);
  const bx = rect.x + rect.w - cs * 1.5 - 56;
  const by = rect.y + rect.h * 0.5 + 8;
  const cell = (r: number, c: number) => ({ x: bx + (c - 1) * cs, y: by + (r - 1) * cs });
  const hole = cell(2, 2);

  // Moldura e as 8 peças que já estão no lugar.
  const frame = scene.add.graphics();
  const fw = cs * 3 + 36;
  frame.fillStyle(C.panel, 0.9).fillPoints(offset(chamfer(fw, fw + 8, 18), bx, by), true).lineStyle(3, C.panelEdge).strokePoints(offset(chamfer(fw, fw + 8, 18), bx, by), true, true);
  const board = scene.add.graphics();
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (r === 2 && c === 2) continue;
      const color = PALETTE[(r * 3 + c) % PALETTE.length];
      const p = cell(r, c);
      const pts = pieceOutline(p.x, p.y, cs, edgesAt(r, c));
      board.fillStyle(color, 0.22).fillPoints(pts, true).lineStyle(2, color, 0.8).strokePoints(pts, true, true);
    }
  }
  // O buraco-alvo: contorno exato da peça que falta, piscando.
  const target = scene.add.graphics();
  const tp = pieceOutline(hole.x, hole.y, cs, edgesAt(2, 2));
  target.fillStyle(0x000000, 0.75).fillPoints(tp, true).lineStyle(3, C.yellow).strokePoints(tp, true, true);
  scene.tweens.add({ targets: target, alpha: 0.45, duration: 520, yoyo: true, repeat: -1 });
  body(scene, hole.x, hole.y, '?', 34, C.yellow).setOrigin(0.5);
  title(scene, bx, by - fw / 2 - 18, t('puzzle.target'), 20, C.yellow).setOrigin(0.5);

  // Esteira, estação do robô e lixeira.
  const stationX = rect.x + rect.w * 0.28;
  const beltY = rect.y + rect.h * 0.66;
  const belt = scene.add.graphics();
  belt.fillStyle(0x15122c).fillRect(rect.x + 10, beltY, stationX - rect.x + 70, 24);
  belt.lineStyle(2, C.dim).strokeRect(rect.x + 10, beltY, stationX - rect.x + 70, 24);
  for (let i = 0; i < 6; i++) {
    const arrow = scene.add.triangle(rect.x + 30, beltY + 12, 0, 0, 14, 8, 0, 16, C.dim).setAlpha(0.8);
    scene.tweens.add({ targets: arrow, x: stationX + 40, duration: 2000, repeat: -1, delay: i * 330 });
  }
  // Balde de descarte: interior escuro atrás da peça, corpo e aro à frente (a peça "cai" dentro).
  const bin = { x: stationX + 40, y: rect.y + rect.h - 64 };
  const topW = 132, botW = 100, hgt = 74, top = -34;
  const back = scene.add.graphics({ x: bin.x, y: bin.y });
  back.fillStyle(0x07050f).fillEllipse(0, top, topW, 26);
  const front = scene.add.graphics({ x: bin.x, y: bin.y }).setDepth(6);
  const bodyPts = [
    new Phaser.Math.Vector2(-topW / 2, top), new Phaser.Math.Vector2(topW / 2, top),
    new Phaser.Math.Vector2(botW / 2, top + hgt), new Phaser.Math.Vector2(-botW / 2, top + hgt),
  ];
  front.fillStyle(C.panel, 0.98).fillPoints(bodyPts, true).lineStyle(3, C.red).strokePoints(bodyPts, true, true);
  for (const k of [-0.5, 0, 0.5]) front.lineStyle(2, C.red, 0.35).lineBetween(k * topW * 0.8, top + 14, k * botW * 0.8, top + hgt - 6);
  front.lineStyle(3, C.red).strokeEllipse(0, top, topW, 26);
  front.lineStyle(3, C.red, 0.8).beginPath().arc(0, top + 2, topW / 2 + 8, Math.PI * 1.08, Math.PI * 1.92).strokePath();
  const lbl = body(scene, bin.x, bin.y + 20, t('puzzle.trash'), 17, C.red).setOrigin(0.5).setDepth(7);
  void lbl;
  const binDrop = { x: bin.x, y: bin.y + top + 14 };

  const bot = new Robot(scene, stationX, rect.y + rect.h * 0.3, 1);
  const thought = title(scene, stationX, rect.y + rect.h * 0.3 - 108, '', 24, C.yellow).setOrigin(0.5);
  const score = title(scene, rect.x + 20, rect.y + 16, '', 24, C.text);
  let correct = 0;
  const showScore = () => score.setText(t('sim.score', { a: correct, b: res.steps.length }));
  showScore();

  const S = 84; // lado da peça na esteira
  return {
    steps: res.steps.length,
    async play(i) {
      const step = res.steps[i];
      const v = step.case.visual;
      const color = PALETTE[i % PALETTE.length];
      const g = scene.add.graphics();
      const pts = pieceOutline(0, 0, S, v.edges);
      g.fillStyle(color, 0.35).fillPoints(pts, true).lineStyle(3, color).strokePoints(pts, true, true);
      const item = scene.add.container(rect.x - 70, beltY - 52, [g]).setAngle((v.rot * 180) / Math.PI);
      bot.setMood('idle');
      thought.setText('');
      await scene.tween({ targets: item, x: stationX, duration: 380, ease: 'Sine.out' });

      // "Pensando": o que os sensores leem e o que a rede responde.
      bot.setMood('think');
      const out = Object.values(step.outputs)[0];
      hud(`${Object.entries(step.case.inputs).map(([k, val]) => `${t(`io.${k}`)} ${val.toFixed(2)}`).join('  ·  ')}   →   ${out.toFixed(2)}`);
      thought.setText(step.chosen ? `${t('puzzle.fit')}  ${out.toFixed(2)}` : `${t('puzzle.skip')}  ${out.toFixed(2)}`).setColor(css(step.chosen ? C.green : C.red));
      audio.sfx('tick', step.chosen ? 7 : 0);
      await scene.wait(300);

      const toTrash = () => {
        audio.sfx('whoosh');
        return scene.tween({ targets: item, x: binDrop.x, y: binDrop.y, angle: item.angle + 300, scale: 0.4, duration: 480, ease: 'Quad.in' });
      };

      if (step.chosen) {
        // Gira de volta para a posição certa e vai até o buraco.
        item.angle = Phaser.Math.Angle.WrapDegrees(item.angle);
        audio.sfx('whoosh');
        await scene.tween({ targets: item, x: hole.x, y: hole.y, angle: 0, scale: cs / S, duration: 560, ease: 'Sine.inOut' });
        if (v.fits) {
          // Encaixou: a peça acende e o buraco se fecha.
          correct++;
          audio.sfx('good');
          bot.setMood('happy').hop();
          g.clear();
          g.fillStyle(C.green, 0.5).fillPoints(pts, true).lineStyle(3, C.green).strokePoints(pts, true, true);
          burst(scene, hole.x, hole.y, C.green, 22, 360);
          floatText(scene, hole.x, hole.y - 70, '+1', css(C.green));
          await scene.wait(380);
          await scene.tween({ targets: item, alpha: 0, duration: 220 });
        } else {
          // Não era a peça: não entra, o robô percebe e joga fora.
          audio.sfx('bad');
          bot.setMood('sad').shake();
          scene.cameras.main.shake(160, 0.008);
          g.clear();
          g.fillStyle(C.red, 0.4).fillPoints(pts, true).lineStyle(3, C.red).strokePoints(pts, true, true);
          floatText(scene, hole.x, hole.y - 70, 'X', css(C.red));
          await scene.wait(260);
          await toTrash();
        }
      } else {
        await toTrash();
        if (v.fits) {
          // Descartou a peça certa.
          audio.sfx('bad');
          bot.setMood('sad').shake();
          floatText(scene, bin.x, bin.y - 80, 'X', css(C.red));
        } else {
          correct++;
          audio.sfx('good');
          bot.setMood('happy');
          floatText(scene, bin.x, bin.y - 80, '+1', css(C.green), 24);
        }
      }
      item.destroy();
      showScore();
      await scene.wait(120);
    },
  };
};
