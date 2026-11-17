/**
 * @module scenes/SimulationScene
 *
 * FASE 3 — SIMULAÇÃO: o robô usa a rede treinada para enfrentar o desafio.
 *
 * O resultado é calculado de uma vez pelo motor puro ({@link runMission}) e
 * depois ENCENADO por uma skin (`scenes/skins`). Isso mantém a lógica testável
 * e deixa a cena livre para cuidar só de ritmo, velocidade e placar final.
 *
 * Ao terminar: calcula estrelas, grava o progresso, dispara analytics e abre
 * o painel de resultado. Vencer a última missão leva à cena final.
 */
import Phaser from 'phaser';
import { analytics, audio, state } from '../app/services';
import { boardToTopology } from '../core/missions/board';
import { FINAL_MISSION_ID, getMission } from '../core/missions/catalog';
import { SimResult, runMission } from '../core/missions/runMission';
import { MissionDef } from '../core/missions/types';
import { Topology, countHidden, reconcileParams } from '../core/nn/network';
import { Stars, calculateStars } from '../core/scoring';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { burst } from '../ui/fx';
import { C, body, title } from '../ui/theme';
import { StarRow, addPanel } from '../ui/widgets';
import { BaseScene, MissionSceneData } from './BaseScene';
import { SKINS } from './skins';

const SPEEDS = [1, 2, 4];

export class SimulationScene extends BaseScene {
  protected accent = C.cyan;

  private mission!: MissionDef;
  private topology!: Topology;
  private result!: SimResult;
  private speedIndex = 0;
  /** Muda a cada execução/encerramento: laços antigos percebem e param. */
  private runToken = 0;

  constructor() {
    super('Simulation');
  }

  init(data: MissionSceneData): void {
    this.mission = getMission(data.missionId);
    this.music = this.mission.skin === 'captcha' || this.mission.skin === 'turing' ? 'boss' : 'sim';
  }

  protected build(): void {
    const m = this.mission;
    const d = state.design(m.id);
    this.topology = boardToTopology(m, d.board);
    const params = reconcileParams(this.topology, d.params, d.seed);
    this.result = runMission(m, this.topology, params, d.hyper.activation);
    this.setSpeed(0);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.runToken++;
      this.setSpeed(0);
    });

    const top = this.addTopBar(m, 'sim');
    const bottomH = 84;
    const rect = { x: 16, y: top + 10, w: this.W - 32, h: this.H - top - bottomH - 20 };
    addPanel(this, rect, C.panelEdge, 0.45);

    const by = this.H - bottomH / 2 - 2;
    new NeonButton(this, 100, by, 170, 64, `◀ ${t('phase.design')}`, () => this.go('Design', { missionId: m.id }), { color: C.yellow, size: 17 });
    new NeonButton(this, 282, by, 170, 64, `◀ ${t('phase.train')}`, () => this.go('Train', { missionId: m.id }), { color: C.magenta, size: 17 });
    const speedBtn: NeonButton = new NeonButton(this, this.W - 250, by, 200, 64, t('sim.speed', { v: 1 }), () => {
      this.setSpeed((this.speedIndex + 1) % SPEEDS.length);
      speedBtn.setLabel(t('sim.speed', { v: SPEEDS[this.speedIndex] }));
    }, { color: C.cyan, size: 16 });
    new NeonButton(this, this.W - 80, by, 120, 64, `${t('sim.skip')} ▶▶`, () => this.setSpeed(-1), { color: C.text, size: 15 });
    const hudText = body(this, 384, by, '', 20, C.text).setOrigin(0, 0.5).setWordWrapWidth(this.W - 384 - 370);

    const skin = SKINS[m.skin]({ scene: this, rect, mission: m, result: this.result, hud: (s) => hudText.setText(s) });
    void this.run(skin.steps, (i) => skin.play(i));
  }

  /** Define a velocidade da encenação (-1 = "pular": 20x). */
  private setSpeed(index: number): void {
    const v = index < 0 ? 20 : SPEEDS[index];
    if (index >= 0) this.speedIndex = index;
    this.time.timeScale = v;
    this.tweens.timeScale = v;
  }

  private async run(steps: number, play: (i: number) => Promise<void>): Promise<void> {
    const token = ++this.runToken;
    await this.wait(500);
    for (let i = 0; i < steps; i++) {
      if (token !== this.runToken) return;
      await play(i);
    }
    if (token !== this.runToken) return;
    this.setSpeed(0);
    this.finish();
  }

  /* ------------------------------------------------------------------ resultado */

  private finish(): void {
    const m = this.mission;
    const d = state.design(m.id);
    const win = this.result.success;
    const hidden = countHidden(this.topology);
    const stars: Stars = calculateStars({ success: win, loss: d.loss, targetLoss: m.targetLoss, hiddenUsed: hidden, idealHidden: m.idealHidden });
    const isFinal = m.id === FINAL_MISSION_ID;
    state.recordResult(m.id, stars, isFinal);
    analytics.track('sim_result', { mission: m.id, success: win, stars, loss: +d.loss.toFixed(4), hidden });
    if (isFinal && win) analytics.track('game_finished', { stars: state.totalStars });
    audio.sfx(win ? 'win' : 'lose');
    if (win) burst(this, this.W / 2, this.H / 2, C.green, 60, 700);
    else this.cameras.main.shake(300, 0.01);
    this.showResult(win, stars, isFinal);
  }

  private showResult(win: boolean, stars: Stars, isFinal: boolean): void {
    const m = this.mission;
    const d = state.design(m.id);
    const layer = this.add.container(0, 0).setDepth(2000);
    // O véu escuro também bloqueia toques nos botões de baixo.
    layer.add(this.add.rectangle(this.W / 2, this.H / 2, this.W, this.H, 0x000000, 0.72).setInteractive());
    const pw = Math.min(760, this.W - 80);
    const ph = 470;
    const px = this.W / 2 - pw / 2;
    const py = this.H / 2 - ph / 2;
    const color = win ? C.green : C.red;
    layer.add(addPanel(this, { x: px, y: py, w: pw, h: ph }, color, 0.97));
    layer.add(title(this, this.W / 2, py + 44, t(win ? 'sim.win' : 'sim.lose'), 34, color).setOrigin(0.5));

    const r = this.result;
    const detail =
      r.kind === 'classification'
        ? t('sim.score', { a: r.correctCount, b: r.steps.length })
        : r.outcome === 'goal'
          ? `${r.frames.length} passos`
          : t(`sim.reason.${r.outcome}`);
    layer.add(body(this, this.W / 2, py + 88, detail, 24, C.text).setOrigin(0.5));

    const bigStars = new StarRow(this, this.W / 2, py + 150, 30, 14);
    layer.add(bigStars);
    bigStars.setStars(stars, true);

    // Critérios das três estrelas.
    const criteria: [boolean, string][] = [
      [stars >= 1, t('sim.star1')],
      [stars >= 2, `${t('sim.star2', { v: m.targetLoss })}  (${d.loss.toFixed(3)})`],
      [stars >= 3, m.idealHidden ? t('sim.star3', { n: m.idealHidden }) : t('sim.star3zero')],
    ];
    criteria.forEach(([ok, label], i) => {
      layer.add(body(this, px + 70, py + 204 + i * 36, `${ok ? '★' : '☆'}  ${label}`, 22, ok ? C.yellow : C.dim));
    });

    const by = py + ph - 62;
    const buttons: [string, number, () => void][] = [[t('sim.retry'), C.cyan, () => this.scene.restart()]];
    buttons.push([`◀ ${t('phase.design')}`, C.yellow, () => this.go('Design', { missionId: m.id })]);
    if (win) buttons.push([`${isFinal ? t('sim.next') : t('nav.map')} ▶`, C.green, () => this.go(isFinal ? 'Ending' : 'Menu')]);
    else buttons.push([`◀ ${t('phase.train')}`, C.magenta, () => this.go('Train', { missionId: m.id })]);
    const bw = (pw - 60 - (buttons.length - 1) * 14) / buttons.length;
    buttons.forEach(([label, c, fn], i) => {
      layer.add(new NeonButton(this, px + 30 + bw / 2 + i * (bw + 14), by, bw, 68, label, fn, { color: c, size: 18 }));
    });

    layer.setAlpha(0);
    this.tweens.add({ targets: layer, alpha: 1, duration: 250 });
  }
}
