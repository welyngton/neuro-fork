/**
 * @module scenes/skins/counter
 * Skin da CONTAGEM: figuras geométricas de todo tipo, tamanho e giro passam
 * correndo pela esteira. Logo depois de um SENSOR fica um CONTADOR DIGITAL com
 * uma coluna para cada forma: a rede decide que forma é aquela e o contador
 * dessa forma soma +1. No fim, cada contador é conferido com a contagem real.
 */
import { audio } from '../../app/services';
import { CounterVisual } from '../../core/missions/types';
import { ClassResult } from '../../core/simulation/classification';
import { Robot } from '../../entities/Robot';
import { t } from '../../services/i18n';
import { burst, floatText } from '../../ui/fx';
import { C, body, chamfer, css, offset, title } from '../../ui/theme';
import { SHAPE_COLOR, drawShape } from './shapes';
import { SkinFactory } from './types';

const ORDER: CounterVisual['shape'][] = ['circle', 'triangle', 'square', 'pentagon', 'hexagon'];

export const counterSkin: SkinFactory = ({ scene, rect, mission, result, hud }) => {
  const res = result as unknown as ClassResult<CounterVisual>;
  const n = mission.outputs.length;

  // Geometria: esteira à esquerda (cerca de 58% do palco), contador à direita.
  const beltX0 = rect.x + 16;
  const beltX1 = rect.x + rect.w * 0.56;
  const beltY = rect.y + rect.h * 0.58;
  const gateX = beltX0 + (beltX1 - beltX0) * 0.74;
  const SPEED = 820; // px/s a 1x: as peças passam MUITO rápido
  const GAP = 150; // ms entre uma figura e a seguinte

  // Esteira com setas correndo bem depressa.
  const belt = scene.add.graphics();
  belt.fillStyle(0x15122c).fillRect(beltX0, beltY, beltX1 - beltX0, 30);
  belt.lineStyle(2, C.dim).strokeRect(beltX0, beltY, beltX1 - beltX0, 30);
  for (let i = 0; i < 9; i++) {
    const arrow = scene.add.triangle(beltX0 + 10, beltY + 15, 0, 0, 14, 8, 0, 16, C.dim).setAlpha(0.8);
    scene.tweens.add({ targets: arrow, x: beltX1 - 24, duration: ((beltX1 - beltX0) / SPEED) * 1000, repeat: -1, delay: i * 90 });
  }

  // O sensor: duas colunas e um feixe que pisca quando uma figura passa.
  const gate = scene.add.graphics();
  gate.lineStyle(4, C.cyan).lineBetween(gateX - 22, beltY - 96, gateX - 22, beltY + 34).lineBetween(gateX + 22, beltY - 96, gateX + 22, beltY + 34);
  gate.fillStyle(C.cyan, 0.9).fillRect(gateX - 34, beltY - 104, 68, 12).fillRect(gateX - 34, beltY + 32, 68, 8);
  body(scene, gateX, beltY - 124, t('counter.sensor'), 18, C.cyan).setOrigin(0.5);
  const beam = scene.add.rectangle(gateX, beltY - 10, 4, 120, C.cyan, 0.35);
  scene.tweens.add({ targets: beam, alpha: 0.7, duration: 90, yoyo: true, repeat: -1 });
  const bot = new Robot(scene, beltX0 + 120, beltY - 170, 0.8);

  // O contador digital: um mostrador de LED por forma.
  const panelW = Math.min(rect.w * 0.38, 460);
  const panelX = rect.x + rect.w - panelW / 2 - 18;
  const rowH = Math.min(78, (rect.h - 120) / n);
  const top = rect.y + 64;
  const panelH = 56 + n * rowH + 14;
  const panelPts = offset(chamfer(panelW, panelH, 16), panelX, top + panelH / 2 - 36);
  const pg = scene.add.graphics();
  pg.fillStyle(C.panel, 0.95).fillPoints(panelPts, true).lineStyle(3, C.yellow).strokePoints(panelPts, true, true);
  title(scene, panelX, top - 12, t('counter.title'), 22, C.yellow).setOrigin(0.5);

  const counts = new Array<number>(n).fill(0);
  const truth = ORDER.map((_, k) => res.steps.filter((s) => s.case.expected === k).length);
  const digits: Phaser.GameObjects.Text[] = [];
  const checks: Phaser.GameObjects.Text[] = [];
  ORDER.slice(0, n).forEach((shape, k) => {
    const y = top + 36 + k * rowH + rowH / 2 - 14;
    const g = scene.add.graphics();
    drawShape(g, shape, panelX - panelW / 2 + 44, y, 17);
    body(scene, panelX - panelW / 2 + 76, y, t(`shape.${shape}`), 19, SHAPE_COLOR[shape]).setOrigin(0, 0.5);
    // Mostrador de LED: o "88" apagado atrás e o número aceso na frente.
    const dx = panelX + panelW / 2 - 90;
    scene.add.rectangle(dx, y, 84, rowH - 14, 0x05040c).setStrokeStyle(2, C.dim);
    title(scene, dx, y, '88', 38, C.dim).setOrigin(0.5).setAlpha(0.22);
    digits.push(title(scene, dx, y, '00', 38, SHAPE_COLOR[shape]).setOrigin(0.5));
    checks.push(body(scene, dx + 54, y, '', 20, C.text).setOrigin(0, 0.5));
  });
  const fmt = (v: number) => String(v).padStart(2, '0');

  const score = title(scene, rect.x + 20, rect.y + 16, '', 24, C.text);
  let correct = 0;
  const showScore = () => score.setText(t('sim.score', { a: correct, b: res.steps.length }));
  showScore();

  const pending: Promise<void>[] = [];

  /** A vida de uma figura: entra, passa pelo sensor, é contada e sai da esteira. */
  async function lifecycle(i: number): Promise<void> {
    const step = res.steps[i];
    const v = step.case.visual;
    const g = scene.add.graphics();
    drawShape(g, v.shape, 0, 0, 16 + v.size * 16, { rot: v.rot });
    const item = scene.add.container(beltX0 - 50, beltY - 26, [g]);
    await scene.tween({ targets: item, x: gateX, duration: ((gateX - (beltX0 - 50)) / SPEED) * 1000, ease: 'Linear' });

    // Passou pelo sensor: lê, decide e o contador soma.
    const k = step.chosen;
    beam.setFillStyle(step.correct ? C.green : C.red, 0.9);
    scene.tweens.add({ targets: beam, scaleX: 5, duration: 70, yoyo: true, onComplete: () => beam.setFillStyle(C.cyan, 0.35) });
    const shown = Object.entries(step.case.inputs).map(([key, val]) => `${t(`io.${key}`)} ${val.toFixed(2)}`);
    hud(`${shown.join('  ·  ')}   →   ${t(`shape.${ORDER[k]}`)}`);
    counts[k]++;
    digits[k].setText(fmt(counts[k])).setColor(css(step.correct ? SHAPE_COLOR[ORDER[k]] : C.red));
    scene.tweens.add({ targets: digits[k], scale: { from: 1.35, to: 1 }, duration: 160, onComplete: () => digits[k].setColor(css(SHAPE_COLOR[ORDER[k]])) });
    audio.sfx(step.correct ? 'tick' : 'bad', k * 2);
    if (step.correct) {
      correct++;
      bot.setMood('think');
    } else {
      bot.setMood('sad');
      floatText(scene, gateX, beltY - 70, 'X', css(C.red), 26);
    }
    showScore();
    await scene.tween({ targets: item, x: beltX1 + 40, alpha: 0.2, duration: ((beltX1 + 40 - gateX) / SPEED) * 1000, ease: 'Linear' });
    item.destroy();
  }

  return {
    steps: res.steps.length,
    async play(i) {
      pending.push(lifecycle(i));
      await scene.wait(GAP);
      if (i === res.steps.length - 1) {
        await Promise.all(pending);
        // Fim da esteira: confere cada contador com a contagem real.
        let allOk = true;
        counts.forEach((c, k) => {
          const ok = c === truth[k];
          allOk &&= ok;
          checks[k].setText(ok ? '✓' : `/${truth[k]}`).setColor(css(ok ? C.green : C.red));
          if (!ok) digits[k].setColor(css(C.red));
        });
        if (allOk) {
          audio.sfx('good');
          bot.setMood('happy').hop();
          burst(scene, panelX, top + 80, C.green, 30, 420);
        } else {
          audio.sfx('bad');
          bot.setMood('sad').shake();
        }
        await scene.wait(500);
      }
    },
  };
};
