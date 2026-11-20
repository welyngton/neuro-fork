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
import { Blueprint, boardToTopology } from '../core/missions/board';
import { FINAL_MISSION_ID, getMission } from '../core/missions/catalog';
import { SimResult, runMission } from '../core/missions/runMission';
import { MissionDef } from '../core/missions/types';
import { Topology, countHidden, energyCost, forward, reconcileParams } from '../core/nn/network';
import { getCard } from '../core/progression/cards';
import { Stars, calculateStars } from '../core/scoring';
import { t } from '../services/i18n';
import { GLOSSARY, GlossaryEntry, entryText } from '../services/i18n/glossary';
import { NeonButton } from '../ui/NeonButton';
import { celebrate, tip } from '../ui/Toast';
import { burst } from '../ui/fx';
import { runTour, touring } from '../ui/Tour';
import { C, Rect, body, title } from '../ui/theme';
import { StarRow, addPanel } from '../ui/widgets';
import { BaseScene, MissionSceneData } from './BaseScene';
import { SKINS } from './skins';

/** Verbetes do glossário sugeridos ao recapitular cada missão. */
const RECAP_TERMS: Record<string, string[]> = {
  bercario: ['neuronio', 'bias', 'atributo'],
  triagem: ['bias', 'atributo', 'classificacao'],
  fronteira: ['fronteira', 'validacao', 'ruido'],
  corredor: ['argmax', 'acao', 'atributo'],
  xor: ['xor', 'camada_oculta', 'fronteira'],
  contagem: ['argmax', 'classificacao', 'atributo'],
  labirinto: ['argmax', 'camada_oculta', 'acao'],
  tangram: ['argmax', 'classificacao', 'atributo'],
  captcha: ['ativacao', 'atributo', 'ruido'],
  origami: ['argmax', 'camada_oculta', 'validacao'],
  quebracabeca: ['dl', 'camada_oculta', 'xor'],
  turing: ['classificacao', 'turing', 'dl'],
};

const SPEEDS = [1, 2, 4];

export class SimulationScene extends BaseScene {
  protected accent = C.cyan;

  private mission!: MissionDef;
  private bp!: Blueprint;
  private topology!: Topology;
  private result!: SimResult;
  private speedIndex = 0;
  /** Muda a cada execução/encerramento: laços antigos percebem e param. */
  private runToken = 0;
  /** Painel de resultado e botão RECAPITULAR (o tour guiado aponta para eles). */
  private resultRect: Rect | null = null;
  private recapRect: Rect | null = null;

  constructor() {
    super('Simulation');
  }

  init(data: MissionSceneData): void {
    this.mission = getMission(data.missionId);
    this.music = ['captcha', 'turing', 'quebracabeca', 'origami'].includes(this.mission.id) ? 'boss' : 'sim';
  }

  protected build(): void {
    const m = this.mission;
    const d = state.design(m.id);
    state.assisted = !!d.assisted;
    this.bp = state.blueprint(m.id);
    this.topology = boardToTopology(this.bp, d.board);
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

    const skin = SKINS[m.skin]({
      scene: this,
      rect,
      mission: m,
      result: this.result,
      hud: (s) => hudText.setText(s),
      predict: (inputs) => forward(this.topology, params, inputs, d.hyper.activation).outputs,
    });
    const tour = touring(m.id);
    this.data.set('touring', tour);
    if (tour) {
      runTour(this, 'Simulation', {
        targets: { result: () => this.resultRect ?? rect, recap: () => this.recapRect ?? rect },
      });
    }
    if (m.validation) tip(this, 'generalize');
    else if (m.outputs.length > 1) tip(this, 'argmax');
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
    // Energia TOTAL: o hardware (rede) mais tudo que o treino e as cartas gastaram.
    const netCost = energyCost(this.topology, m.extraInputs, state.caps.cablePrice);
    const cost = netCost + Math.ceil(d.trainSpent ?? 0);
    const stars: Stars = calculateStars({ success: win, loss: d.loss, targetLoss: m.targetLoss, cost, budget: m.budget });
    const isFinal = m.id === FINAL_MISSION_ID;
    state.recordResult(m.id, stars, isFinal);
    this.countStats(win);
    analytics.track('sim_result', { mission: m.id, success: win, stars, loss: +d.loss.toFixed(4), hidden });
    if (isFinal && win) analytics.track('game_finished', { stars: state.totalStars });
    audio.sfx(win ? 'win' : 'lose');
    if (win) burst(this, this.W / 2, this.H / 2, C.green, 60, 700);
    else this.cameras.main.shake(300, 0.01);
    this.showResult(win, stars, isFinal, netCost);
    celebrate(this);
  }

  /** Atualiza os contadores que alimentam as conquistas. */
  private countStats(win: boolean): void {
    const m = this.mission;
    const d = state.design(m.id);
    const r = this.result;
    const t = this.topology;
    state.bump('sims');
    const nothing = r.kind === 'classification' ? r.correctCount === 0 : r.outcome === 'crash' && r.frames.length <= 2;
    if (!win && nothing) state.bump('zero_sims');
    if (!win && d.loss <= m.targetLoss) state.bump('good_loss_lost');
    if (!win) return;
    const used = new Set(t.links.map((l) => l[0]));
    if (t.hidden.length >= 2 && t.hidden.every((layer) => layer.length === 1)) state.bump('duck_wins');
    if (countHidden(t) === this.bp.layers * this.bp.slots) state.bump('full_board_wins');
    if (m.inputs.length > 1 && m.inputs.some((id) => !used.has(id))) state.bump('sparse_wins');
    if (m.extraInputs?.some((id) => used.has(id))) state.bump('feature_wins');
    if (getCard(d.card ?? '')?.kind === 'azar') state.bump('bad_card_wins');
    if (d.card === 'transfer') state.bump('transfer_wins');
    if (d.usedEarlyStop) state.bump('earlystop_wins');
  }

  /**
   * RECAPITULAR: resume a missão — a rede montada, o treino feito, o resultado
   * e o que a missão ensina, com atalho para os termos no glossário.
   */
  private openRecap(win: boolean, netCost: number): void {
    const m = this.mission;
    const d = state.design(m.id);
    const topo = this.topology;
    const layer = this.add.container(0, 0).setDepth(2100);
    layer.add(this.add.rectangle(this.W / 2, this.H / 2, this.W, this.H, 0x000000, 0.8).setInteractive());
    const pw = Math.min(this.W - 60, 1100);
    const ph = this.H - 50;
    const px = this.W / 2 - pw / 2;
    const py = this.H / 2 - ph / 2;
    layer.add(addPanel(this, { x: px, y: py, w: pw, h: ph }, C.violet, 0.98));
    layer.add(title(this, this.W / 2, py + 32, t('recap.title', { m: t(`mission.${m.id}.title`) }), 24, C.violet).setOrigin(0.5));

    const used = [...new Set(topo.links.map((l) => l[0]).filter((id) => !/^h/.test(id)))];
    const unused = topo.inputs.filter((id) => !used.includes(id));
    const names = (ids: string[]) => (ids.length ? ids.map((id) => t(`io.${id}`)).join(', ') : t('recap.none'));
    const acts = [...new Set(topo.hidden.flat().map((id) => topo.acts?.[id] ?? 'tanh'))];
    const r = this.result;
    const res = r.kind === 'classification' ? t('sim.score', { a: r.correctCount, b: r.steps.length }) : r.outcome === 'goal' ? t('sim.steps', { n: r.frames.length }) : t(`sim.reason.${r.outcome}`);
    const tank = Math.round(m.water * state.caps.waterMul);
    const colW = (pw - 80) / 2;
    const section = (x: number, y: number, head: string, lines: string[], color: number) => {
      layer.add(title(this, x, y, head, 18, color));
      let ly = y + 32;
      for (const line of lines) {
        const tx = body(this, x, ly, `• ${line}`, 18, C.text).setWordWrapWidth(colW);
        layer.add(tx);
        ly += tx.height + 6;
      }
    };
    section(px + 30, py + 74, t('recap.net'), [
      t('recap.used', { a: names(used) }),
      t('recap.unused', { a: names(unused) }),
      t('recap.hidden', { n: topo.hidden.flat().length, l: topo.hidden.length, c: topo.links.length }),
      t('recap.acts', { a: acts.join(', ') || '—' }),
    ], C.yellow);
    section(px + 50 + colW, py + 74, t('recap.train'), [
      t('recap.energy', { d: netCost, t: Math.ceil(d.trainSpent ?? 0), b: Math.round(m.energy * state.caps.energyMul) }),
      t('recap.epochs', { n: d.epochs, l: d.loss.toFixed(3) }),
      t('recap.water', { p: Math.round(((d.water ?? tank) / tank) * 100) }),
      ...(d.card ? [t('recap.card', { c: t(`card.${d.card}.t`) })] : []),
      t('recap.result', { r: `${t(win ? 'sim.win' : 'sim.lose')} · ${res}` }),
    ], C.magenta);

    const ly = py + ph * 0.52;
    layer.add(this.add.graphics().lineStyle(2, C.panelEdge).lineBetween(px + 30, ly - 14, px + pw - 30, ly - 14));
    layer.add(title(this, px + 30, ly, t('recap.lesson'), 18, C.green));
    const lesson = body(this, px + 30, ly + 32, t(`mission.${m.id}.recap`), 21, C.text).setWordWrapWidth(pw - 60).setLineSpacing(4);
    layer.add(lesson);
    if (d.assisted) layer.add(body(this, px + 30, lesson.y + lesson.height + 10, t('recap.assisted'), 17, C.magenta));

    // Termos para pesquisar.
    const terms = (RECAP_TERMS[m.id] ?? []).map((id) => GLOSSARY.find((e) => e.id === id)).filter(Boolean) as GlossaryEntry[];
    const ty = py + ph - 140;
    layer.add(body(this, px + 30, ty, t('recap.terms'), 17, C.dim));
    terms.forEach((e, i) => {
      const label = entryText(e)[0].replace(/ \(.*\)$/, '');
      const bw = (pw - 60 - (terms.length - 1) * 12) / Math.max(3, terms.length);
      layer.add(new NeonButton(this, px + 30 + bw / 2 + i * (bw + 12), ty + 48, bw, 46, label, () => this.go('Glossary', { id: e.id }), { color: C.green, size: 14 }));
    });
    layer.add(new NeonButton(this, this.W / 2, py + ph - 36, 220, 50, t('recap.close'), () => layer.destroy(), { color: C.orange, size: 17 }));
    audio.sfx('whoosh');
  }

  private showResult(win: boolean, stars: Stars, isFinal: boolean, netCost: number): void {
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
          ? t('sim.steps', { n: r.frames.length })
          : t(`sim.reason.${r.outcome}`);
    layer.add(body(this, this.W / 2, py + 88, detail, 24, C.text).setOrigin(0.5));

    const bigStars = new StarRow(this, this.W / 2, py + 150, 30, 14);
    layer.add(bigStars);
    bigStars.setStars(stars, true);

    // Os critérios das estrelas NÃO são revelados: só os números da sua rede
    // e uma provocação diferente conforme o resultado.
    const facts = `⚡ ${t('sim.energyUsed', { d: netCost, t: Math.ceil(d.trainSpent ?? 0) })}   ·   ${t('sim.lossFinal', { v: d.loss.toFixed(3) })}`;
    layer.add(body(this, this.W / 2, py + 214, facts, 22, C.text).setOrigin(0.5));
    const tease = stars === 3 ? 'sim.teaseTop' : stars > 0 ? `sim.teaseMid${Phaser.Math.Between(1, 4)}` : 'sim.teaseZero';
    layer.add(body(this, this.W / 2, py + 262, t(tease), 20, C.violet).setOrigin(0.5).setWordWrapWidth(pw - 80).setAlign('center'));

    const by = py + ph - 62;
    const buttons: [string, number, () => void][] = [
      [t('sim.recap'), C.violet, () => this.openRecap(win, netCost)],
      [t('sim.retry'), C.cyan, () => this.scene.restart()],
    ];
    buttons.push([`◀ ${t('phase.design')}`, C.yellow, () => this.go('Design', { missionId: m.id })]);
    if (win) buttons.push([`${isFinal ? t('sim.next') : t('nav.map')} ▶`, C.green, () => this.go(isFinal ? 'Ending' : 'Menu')]);
    else buttons.push([`◀ ${t('phase.train')}`, C.magenta, () => this.go('Train', { missionId: m.id })]);
    const bw = (pw - 60 - (buttons.length - 1) * 14) / buttons.length;
    buttons.forEach(([label, c, fn], i) => {
      const b = new NeonButton(this, px + 30 + bw / 2 + i * (bw + 14), by, bw, 68, label, fn, { color: c, size: 18 });
      layer.add(b);
      if (i === 0) this.recapRect = b.rect();
    });
    this.resultRect = { x: px, y: py + 110, w: pw, h: 180 };
    this.events.emit('tour:result');

    layer.setAlpha(0);
    this.tweens.add({ targets: layer, alpha: 1, duration: 250 });
  }
}
