/**
 * @module scenes/skins/captcha
 * Skin do CAPTCHA: uma janela "Selecione todos os quadros com TRIÂNGULOS",
 * três rodadas de 9 quadros com ruído. O robô varre quadro a quadro e marca
 * os que a rede classificar como triângulo; ao fim de cada rodada, verifica.
 */
import Phaser from 'phaser';
import { audio } from '../../app/services';
import { createRng } from '../../core/nn/network';
import { CaptchaVisual } from '../../core/missions/types';
import { ClassResult } from '../../core/simulation/classification';
import { Robot } from '../../entities/Robot';
import { t } from '../../services/i18n';
import { burst } from '../../ui/fx';
import { C, body, regularPoly, title } from '../../ui/theme';
import { SkinFactory } from './types';

export const captchaSkin: SkinFactory = ({ scene, rect, result, hud }) => {
  const res = result as unknown as ClassResult<CaptchaVisual>;
  const rounds = res.steps.length / 9;
  const headH = 84;
  const footH = 54;
  const gap = 8;
  const tile = Math.min(124, Math.floor((rect.h - headH - footH - gap * 4) / 3));
  const winW = tile * 3 + gap * 4;
  const winH = headH + footH + tile * 3 + gap * 4;
  const wx = rect.x + rect.w * 0.62 - winW / 2;
  const wy = rect.y + (rect.h - winH) / 2;

  const win = scene.add.graphics();
  win.fillStyle(0xe9ecf5).fillRect(wx, wy, winW, winH);
  win.fillStyle(0x2a5bd7).fillRect(wx + gap, wy + gap, winW - gap * 2, headH - gap);
  body(scene, wx + gap + 14, wy + gap + 8, t('captcha.title'), 19, 0xffffff);
  title(scene, wx + gap + 14, wy + gap + 32, t('captcha.target'), 28, 0xffffff);
  const foot = body(scene, wx + 14, wy + winH - footH / 2, '', 20, 0x333344).setOrigin(0, 0.5);
  const verdict = title(scene, wx + winW - 14, wy + winH - footH / 2, '', 18, 0x333344).setOrigin(1, 0.5);

  const bot = new Robot(scene, rect.x + rect.w * 0.17, rect.y + rect.h * 0.5, 1.5);
  const cursor = scene.add.graphics().setDepth(20);
  cursor.fillStyle(C.yellow).lineStyle(2, 0x000000).fillTriangle(0, 0, 0, 30, 20, 20).strokeTriangle(0, 0, 0, 30, 20, 20);
  cursor.setPosition(wx - 40, wy + winH / 2);

  const tilePos = (k: number) => ({ x: wx + gap + (k % 3) * (tile + gap) + tile / 2, y: wy + headH + gap + Math.floor(k / 3) * (tile + gap) + tile / 2 });
  let tiles: Phaser.GameObjects.Container[] = [];

  /** Monta os 9 quadros de uma rodada (forma + chuvisco proporcional ao ruído). */
  const buildRound = (round: number) => {
    tiles.forEach((c) => c.destroy());
    tiles = [];
    for (let k = 0; k < 9; k++) {
      const v = res.steps[round * 9 + k].case.visual;
      const rng = createRng(round * 100 + k + 1);
      const g = scene.add.graphics();
      g.fillStyle(0x23203f).fillRect(-tile / 2, -tile / 2, tile, tile);
      const color = [C.cyan, C.magenta, C.yellow, C.green, C.orange][Math.floor(rng() * 5)];
      const r = tile * (0.26 + rng() * 0.08);
      g.fillStyle(color, 0.35).lineStyle(4, color);
      if (v.sides === 0) g.fillCircle(0, 0, r).strokeCircle(0, 0, r);
      else {
        const pts = regularPoly(v.sides, r, v.rot);
        g.fillPoints(pts, true).strokePoints(pts, true, true);
      }
      for (let n = 0; n < v.noise * 70; n++) {
        g.fillStyle(rng() > 0.5 ? 0xffffff : 0x000000, 0.5).fillRect((rng() - 0.5) * tile, (rng() - 0.5) * tile, 4, 4);
      }
      const p = tilePos(k);
      const c = scene.add.container(p.x, p.y, [g]).setScale(0);
      scene.tweens.add({ targets: c, scale: 1, duration: 180, delay: k * 25, ease: 'Back.out' });
      tiles.push(c);
    }
    foot.setText(t('captcha.round', { a: round + 1, b: rounds }));
    verdict.setText('');
  };

  /** Moldura por cima de um quadro (seleção ou erro). */
  const mark = (k: number, color: number, check: boolean) => {
    const g = scene.add.graphics();
    g.lineStyle(6, color).strokeRect(-tile / 2 + 3, -tile / 2 + 3, tile - 6, tile - 6);
    if (check) g.fillStyle(color).fillTriangle(tile / 2 - 34, -tile / 2, tile / 2, -tile / 2, tile / 2, -tile / 2 + 34);
    tiles[k].add(g);
  };

  return {
    steps: res.steps.length,
    async play(i) {
      const round = Math.floor(i / 9);
      const k = i % 9;
      if (k === 0) {
        buildRound(round);
        bot.setMood('think');
        await scene.wait(450);
      }
      const step = res.steps[i];
      const p = tilePos(k);
      await scene.tween({ targets: cursor, x: p.x - 4, y: p.y - 4, duration: 150, ease: 'Sine.out' });
      const out = Object.values(step.outputs)[0];
      hud(`${t('io.cantos')} ${step.case.inputs.cantos.toFixed(2)}  ·  ${t('io.ruido')} ${step.case.inputs.ruido.toFixed(2)}   →   ${t('io.marcar')} ${out.toFixed(2)}`);
      if (step.chosen) {
        audio.sfx('click');
        mark(k, 0x2a5bd7, true);
        scene.tweens.add({ targets: tiles[k], scale: 0.92, duration: 80, yoyo: true });
      } else audio.sfx('tick', -5);
      await scene.wait(130);

      if (k === 8) {
        // Verificação da rodada.
        await scene.wait(250);
        const roundSteps = res.steps.slice(round * 9, round * 9 + 9);
        const ok = roundSteps.every((s) => s.correct);
        roundSteps.forEach((s, j) => !s.correct && mark(j, C.red, false));
        verdict.setText(t(ok ? 'captcha.pass' : 'captcha.fail')).setColor(ok ? '#0a8f3c' : '#d0142c');
        if (ok) {
          audio.sfx('good');
          bot.setMood('happy').hop();
          burst(scene, wx + winW / 2, wy + winH / 2, C.green, 30, 460);
        } else {
          audio.sfx('bad');
          bot.setMood('sad').shake();
          scene.cameras.main.shake(200, 0.01);
        }
        await scene.wait(900);
      }
    },
  };
};
