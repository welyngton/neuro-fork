/**
 * @module scenes/skins/maze
 * Skin de labirinto visto de cima: blocos estilo "voxel", farol pulsando no
 * objetivo, firewalls magenta e o robô (uma seta) andando célula a célula.
 */
import Phaser from 'phaser';
import { audio } from '../../app/services';
import { MazeResult } from '../../core/simulation/maze';
import { t } from '../../services/i18n';
import { burst, glow } from '../../ui/fx';
import { C, offset, regularPoly } from '../../ui/theme';
import { SkinFactory } from './types';

const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

export const mazeSkin: SkinFactory = ({ scene, rect, mission, result, hud }) => {
  const res = result as MazeResult;
  const grid = mission.maze!.grid;
  const rows = grid.length;
  const cols = grid[0].length;
  const cell = Math.floor(Math.min(rect.w / cols, rect.h / rows));
  const ox = rect.x + (rect.w - cell * cols) / 2;
  const oy = rect.y + (rect.h - cell * rows) / 2;
  const center = (x: number, y: number) => ({ x: ox + (x + 0.5) * cell, y: oy + (y + 0.5) * cell });

  const g = scene.add.graphics();
  g.fillStyle(0x0a0818, 0.9).fillRect(ox, oy, cell * cols, cell * rows);
  const firewalls = new Map<string, Phaser.GameObjects.Graphics>();
  grid.forEach((row, y) =>
    Array.from(row).forEach((ch, x) => {
      const px = ox + x * cell;
      const py = oy + y * cell;
      if (ch === '#') {
        // Bloco com "tampa" clara e lateral escura.
        g.fillStyle(0x1d1940).fillRect(px + 1, py + 1, cell - 2, cell - 2);
        g.fillStyle(0x2f2a66).fillRect(px + 1, py + 1, cell - 2, cell * 0.22);
        g.lineStyle(1, C.violet, 0.5).strokeRect(px + 1, py + 1, cell - 2, cell - 2);
      } else {
        g.fillStyle(C.dim, 0.5).fillRect(px + cell / 2 - 2, py + cell / 2 - 2, 4, 4);
        if (ch === 'F') {
          const f = scene.add.graphics({ x: px + cell / 2, y: py + cell / 2 });
          const s = cell * 0.42;
          f.fillStyle(C.magenta, 0.25).fillRect(-s, -s, s * 2, s * 2);
          f.lineStyle(3, C.magenta).strokeRect(-s, -s, s * 2, s * 2).lineBetween(-s, -s, s, s).lineBetween(s, -s, -s, s);
          scene.tweens.add({ targets: f, alpha: 0.55, duration: 300, yoyo: true, repeat: -1 });
          firewalls.set(`${x},${y}`, f);
        }
      }
    }),
  );

  // Farol do objetivo.
  const gp = center(res.goal.x, res.goal.y);
  const halo = glow(scene, gp.x, gp.y, C.green, cell / 40, 0.6);
  scene.tweens.add({ targets: halo, scale: cell / 22, alpha: 0.2, duration: 900, yoyo: true, repeat: -1 });
  scene.add.graphics({ x: gp.x, y: gp.y }).lineStyle(4, C.green).strokePoints(regularPoly(6, cell * 0.32, 0), true, true);

  // Robô: seta apontando para o leste (rotação = direção).
  const sp = center(res.start.x, res.start.y);
  const botG = scene.add.graphics();
  const r = cell * 0.36;
  const arrow = [[r, 0], [-r * 0.8, -r * 0.8], [-r * 0.35, 0], [-r * 0.8, r * 0.8]].map(([x, y]) => new Phaser.Math.Vector2(x, y));
  botG.fillStyle(C.bg).fillPoints(arrow, true).fillStyle(C.cyan, 0.5).fillPoints(arrow, true).lineStyle(3, C.cyan).strokePoints(arrow, true, true);
  const bot = scene.add.container(sp.x, sp.y, [glow(scene, 0, 0, C.cyan, cell / 50, 0.5), botG]).setDepth(10);
  let angle = res.start.dir * 90;
  bot.setAngle(angle);
  const trail = scene.add.graphics();

  return {
    steps: res.frames.length,
    async play(i) {
      const f = res.frames[i];
      const active = mission.inputs.filter((id) => f.sensors[id]).map((id) => t(`io.${id}`));
      hud(`${t('sim.sensors')}: ${active.join(', ') || '—'}   →   ${t(`io.${f.action}`)}`);
      const p = center(f.x, f.y);

      if (f.event === 'move' || f.event === 'goal') {
        audio.sfx('step', (i % 4) * 2);
        trail.fillStyle(C.cyan, 0.35).fillPoints(offset(regularPoly(4, 5), bot.x, bot.y), true);
        await scene.tween({ targets: bot, x: p.x, y: p.y, duration: 170, ease: 'Sine.inOut' });
        if (f.event === 'goal') {
          burst(scene, p.x, p.y, C.green, 40, 480);
          audio.sfx('good');
          await scene.tween({ targets: bot, angle: angle + 720, scale: 1.4, duration: 600, ease: 'Cubic.out' });
        }
      } else if (f.event === 'turn') {
        audio.sfx('turn');
        angle += Phaser.Math.Angle.ShortestBetween(Phaser.Math.Angle.WrapDegrees(angle), f.dir * 90);
        await scene.tween({ targets: bot, angle, duration: 140 });
      } else if (f.event === 'hack' && f.hacked) {
        const fw = firewalls.get(`${f.hacked.x},${f.hacked.y}`);
        const hp = center(f.hacked.x, f.hacked.y);
        audio.sfx('zap');
        const beam = scene.add.graphics().lineStyle(5, C.yellow).lineBetween(bot.x, bot.y, hp.x, hp.y).setBlendMode(Phaser.BlendModes.ADD);
        burst(scene, hp.x, hp.y, C.magenta, 24, 360);
        if (fw) {
          scene.tweens.killTweensOf(fw);
          scene.tweens.add({ targets: fw, scale: 1.8, alpha: 0, duration: 260, onComplete: () => fw.destroy() });
        }
        await scene.tween({ targets: beam, alpha: 0, duration: 260 });
        beam.destroy();
      } else if (f.event === 'crash') {
        audio.sfx('bad');
        scene.cameras.main.shake(260, 0.014);
        await scene.tween({ targets: bot, x: bot.x + DX[f.dir] * cell * 0.4, y: bot.y + DY[f.dir] * cell * 0.4, duration: 80, yoyo: true });
        burst(scene, bot.x + DX[f.dir] * cell * 0.4, bot.y + DY[f.dir] * cell * 0.4, C.red, 26, 380);
        await scene.tween({ targets: bot, alpha: 0.3, duration: 90, yoyo: true, repeat: 3 });
      } else {
        // 'idle' / 'timeout': o robô hesita.
        audio.sfx('tick', -8);
        await scene.tween({ targets: bot, scale: 0.8, duration: 70, yoyo: true });
      }
    },
  };
};
