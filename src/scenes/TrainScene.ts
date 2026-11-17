/**
 * @module scenes/TrainScene
 *
 * FASE 2 — TREINO: a rede desenhada aprende com os exemplos da missão.
 *
 * À esquerda a rede "viva" (cabos engrossam e mudam de cor conforme os pesos;
 * os blocos piscam com exemplos do dataset). À direita o painel:
 *
 *  - LENTE, com três modos que mostram a mesma rede de ângulos diferentes:
 *      PERDA           curvas de treino (magenta) e validação (amarela);
 *      FRONTEIRA       o que a rede responde em cada ponto do plano (missões de campo);
 *      ESPAÇO OCULTO   os exemplos vistos pelos neurônios ocultos — cada neurônio
 *                      é um eixo; com 3 eixos a nuvem gira em 3D;
 *  - leituras de época / perda / acertos;
 *  - hiperparâmetros (os que dependem de upgrade só aparecem depois de comprados);
 *  - CARTAS: mesa opcional com duas táticas e uma carta do destino.
 *
 * O treino roda no próprio laço do jogo, algumas épocas por frame
 * ({@link Trainer.step}), dosadas pelo tempo para durar ~4 s em qualquer aparelho.
 * Daqui o jogador pode VOLTAR AO DESIGN ou seguir para SIMULAR.
 */
import Phaser from 'phaser';
import { analytics, audio, state } from '../app/services';
import { Blueprint, boardToTopology } from '../core/missions/board';
import { getMission } from '../core/missions/catalog';
import { fieldInputs } from '../core/missions/datasets';
import { MissionDef, toSamples } from '../core/missions/types';
import { Trainer } from '../core/nn/Trainer';
import { Hyper, Params, Sample, Topology, createRng, datasetLoss, forward, initParams, linkKey, reconcileParams, toInputMap } from '../core/nn/network';
import { CardDef, NO_MODS, RunMods, dealCards, modsOf } from '../core/progression/cards';
import { Caps } from '../core/progression/upgrades';
import { Robot } from '../entities/Robot';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { NetworkView } from '../ui/NetworkView';
import { celebrate, tip } from '../ui/Toast';
import { burst } from '../ui/fx';
import { C, Rect, body, chamfer, css, offset, title } from '../ui/theme';
import { LineChart, StepSlider, addPanel } from '../ui/widgets';
import { BaseScene, MissionSceneData } from './BaseScene';

const LR_VALUES = [0.003, 0.01, 0.03, 0.1, 0.3, 1];
const L2_VALUES = [0, 0.0005, 0.002, 0.01];
const DROPOUT_VALUES = [0, 0.1, 0.2, 0.4];
/** Duração-alvo de uma rodada de treino, em ms — independe do FPS do aparelho. */
const RUN_MS = 4000;
type Lens = 'loss' | 'boundary' | 'space';
const KIND_COLOR = { tatica: C.cyan, sorte: C.green, azar: C.red } as const;
const CLASS_COLORS = [C.cyan, C.magenta, C.yellow, C.green];

export class TrainScene extends BaseScene {
  protected accent = C.magenta;
  protected music = 'train' as const;

  private mission!: MissionDef;
  private bp!: Blueprint;
  private caps!: Caps;
  private topology!: Topology;
  private trainer!: Trainer;
  private valSamples: Sample[] = [];
  private view!: NetworkView;
  private chart!: LineChart;
  private lensG!: Phaser.GameObjects.Graphics;
  private lensNote!: Phaser.GameObjects.Text;
  private lensRect!: Rect;
  private lens: Lens = 'loss';
  private lensTabs!: Record<Lens, NeonButton>;
  private running = false;
  private runEpochs = 0;
  private frame = 0;
  /** Épocas "devidas" acumuladas (fração) conforme o tempo passa. */
  private owed = 0;
  private readout!: { epoch: Phaser.GameObjects.Text; loss: Phaser.GameObjects.Text; acc: Phaser.GameObjects.Text };
  private msg!: Phaser.GameObjects.Text;
  private cardText!: Phaser.GameObjects.Text;
  private trainBtn!: NeonButton;
  private cardsBtn!: NeonButton;
  private bot!: Robot;
  /** Carta escolhida para a próxima rodada (ou a que está valendo na rodada atual). */
  private card: CardDef | null = null;
  private mods: RunMods = NO_MODS;
  private runStartLoss = 1;

  constructor() {
    super('Train');
  }

  init(data: MissionSceneData): void {
    this.mission = getMission(data.missionId);
  }

  private get design() {
    return state.design(this.mission.id);
  }

  protected build(): void {
    const m = this.mission;
    const d = this.design;
    this.caps = state.caps;
    this.bp = state.blueprint(m.id);
    this.data.set('toastSide', 'left');
    this.running = false;
    this.card = null;
    this.mods = NO_MODS;
    this.lens = 'loss';
    this.topology = boardToTopology(this.bp, d.board);
    this.valSamples = m.validation ? toSamples(this.topology, m.validation) : [];
    // Hiperparâmetros fora do que os upgrades atuais permitem voltam ao padrão.
    if (!this.caps.epochValues.includes(d.hyper.epochs)) d.hyper.epochs = 200;
    if (!this.caps.activations.includes(d.hyper.activation)) d.hyper.activation = 'tanh';
    if (!LR_VALUES.includes(d.hyper.learningRate)) d.hyper.learningRate = 0.1;
    // Mantém os pesos dos cabos que sobreviveram a uma ida ao Design.
    const params = reconcileParams(this.topology, d.params, d.seed);
    this.trainer = this.makeTrainer(params, d.hyper, toSamples(this.topology, m.train));
    state.saveDesign(m.id, { params, loss: this.trainer.valLoss });

    const top = this.addTopBar(m, 'train');
    const bottomH = 96;
    const panelW = Math.min(470, this.W * 0.39);
    const netRect = { x: 16, y: top + 10, w: this.W - panelW - 44, h: this.H - top - bottomH - 56 };
    addPanel(this, netRect, C.panelEdge, 0.55);
    this.view = new NetworkView(this, this.bp, d.board, netRect, { labelPad: 150, nodeRadius: 26 });
    this.view.params = params;

    this.buildPanel({ x: this.W - panelW - 16, y: top + 10, w: panelW, h: this.H - top - bottomH - 20 });

    // Rodapé.
    const by = this.H - bottomH / 2 - 4;
    this.bot = new Robot(this, 56, this.H - bottomH - 22, 0.42);
    this.msg = body(this, 100, this.H - bottomH - 18, t('train.msg.idle'), 22, C.text).setOrigin(0, 0.5);
    this.cardText = body(this, netRect.x + netRect.w - 6, this.H - bottomH - 18, '', 18, C.yellow).setOrigin(1, 0.5);
    new NeonButton(this, 110, by, 190, 76, `◀ ${t('phase.design')}`, () => this.leave('Design'), { color: C.yellow, size: 20 });
    this.trainBtn = new NeonButton(this, this.W / 2, by, 280, 76, t('train.start'), () => this.toggle(), { color: C.magenta, size: 26 });
    new NeonButton(this, this.W - 120, by, 210, 76, `${t('train.toSim')} ▶`, () => this.leave('Simulation'), { color: C.cyan, size: 20 });

    this.updateReadout();
    tip(this, 'loss');
  }

  /* ------------------------------------------------------------------ painel direito */

  private buildPanel(pr: Rect): void {
    const m = this.mission;
    const d = this.design;
    addPanel(this, pr, C.magenta, 0.85);
    const ix = pr.x + 18;
    const iw = pr.w - 36;

    // Abas da lente.
    const lenses: Lens[] = ['loss', 'boundary', 'space'];
    const tw = iw / 3;
    this.lensTabs = {} as Record<Lens, NeonButton>;
    lenses.forEach((l, i) => {
      this.lensTabs[l] = new NeonButton(this, ix + tw * i + tw / 2, pr.y + 28, tw - 6, 36, t(`train.lens.${l}`), () => this.setLens(l), { color: C.magenta, size: 13 });
    });
    this.lensTabs.loss.setSelected(true);
    this.lensTabs.boundary.setEnabled(this.topology.inputs.includes('x'));
    this.lensRect = { x: ix, y: pr.y + 52, w: iw, h: 168 };
    this.chart = new LineChart(this, ix, this.lensRect.y, iw, this.lensRect.h);
    this.lensG = this.add.graphics();
    this.lensNote = body(this, ix + iw / 2, this.lensRect.y + this.lensRect.h / 2, '', 17, C.dim).setOrigin(0.5).setWordWrapWidth(iw - 30).setAlign('center');

    // Leituras.
    const ry = this.lensRect.y + this.lensRect.h + 8;
    const col = iw / 3;
    const stat = (i: number, label: string, color: number) => {
      body(this, ix + col * i, ry, label, 15, C.dim);
      return title(this, ix + col * i, ry + 17, '-', 21, color);
    };
    this.readout = { epoch: stat(0, t('train.epoch'), C.text), loss: stat(1, `${t('train.loss')} (${t('train.target', { v: m.targetLoss })})`, C.magenta), acc: stat(2, t('train.acc'), C.green) };

    // Seletores, em duas colunas.
    const sw = iw / 2 - 14;
    const sy = ry + 50;
    new StepSlider(this, ix, sy, sw, t('train.lr'), LR_VALUES, d.hyper.learningRate, String, (v) => this.setHyper({ learningRate: v }), C.magenta);
    new StepSlider(this, ix + iw / 2 + 14, sy, sw, t('train.epochs'), this.caps.epochValues, d.hyper.epochs, String, (v) => this.setHyper({ epochs: v }));
    if (this.caps.l2) {
      new StepSlider(this, ix, sy + 76, sw, t('train.l2'), L2_VALUES, L2_VALUES.includes(d.hyper.l2 ?? 0) ? (d.hyper.l2 ?? 0) : 0, String, (v) => this.setHyper({ l2: v }), C.violet);
    }
    if (this.caps.dropout) {
      new StepSlider(this, ix + iw / 2 + 14, sy + 76, sw, t('train.dropout'), DROPOUT_VALUES, DROPOUT_VALUES.includes(d.hyper.dropout ?? 0) ? (d.hyper.dropout ?? 0) : 0, (v) => `${Math.round(v * 100)}%`, (v) => this.setHyper({ dropout: v }), C.violet);
    }

    // Botões: ativação, parada antecipada, embaralhar, cartas.
    const by = sy + 76 * 2 + 14;
    const bw = iw / 2 - 6;
    if (this.caps.activations.length > 1) {
      const actBtn: NeonButton = new NeonButton(this, ix + bw / 2, by, bw, 42, t('train.activation', { v: d.hyper.activation }), () => {
        if (this.running) return;
        const list = this.caps.activations;
        const next = list[(list.indexOf(this.design.hyper.activation) + 1) % list.length];
        this.setHyper({ activation: next });
        actBtn.setLabel(t('train.activation', { v: next }));
        this.resetTrainer(this.trainer.params);
      }, { color: C.violet, size: 13 });
    }
    if (this.caps.earlystop) {
      const label = () => t('train.earlystop', { v: t(this.design.earlyStop ? 'train.on' : 'train.off') });
      const esBtn: NeonButton = new NeonButton(this, ix + iw - bw / 2, by, bw, 42, label(), () => {
        state.saveDesign(m.id, { earlyStop: !this.design.earlyStop });
        esBtn.setLabel(label()).setSelected(!!this.design.earlyStop);
      }, { color: C.green, size: 12 });
      esBtn.setSelected(!!d.earlyStop);
    }
    new NeonButton(this, ix + bw / 2, by + 50, bw, 42, t('train.shuffle'), () => this.shuffle(), { color: C.orange, size: 13 });
    this.cardsBtn = new NeonButton(this, ix + iw - bw / 2, by + 50, bw, 42, `◆ ${t('train.cards')}`, () => this.openCards(), { color: C.yellow, size: 15 });
  }

  private setHyper(patch: Partial<Hyper>): void {
    state.saveDesign(this.mission.id, { hyper: { ...this.design.hyper, ...patch } });
    if (patch.learningRate !== undefined) this.trainer.hyper.learningRate = patch.learningRate * this.mods.lrMul;
  }

  private setLens(lens: Lens): void {
    this.lens = lens;
    (Object.keys(this.lensTabs) as Lens[]).forEach((k) => this.lensTabs[k].setSelected(k === lens));
    this.chart.setVisible(lens === 'loss');
    this.lensG.clear();
    this.lensNote.setText('');
    if (lens === 'boundary') {
      tip(this, 'boundary', true);
      this.drawBoundary();
    }
    if (lens === 'space') tip(this, 'space', true);
    this.updateReadout();
  }

  /* ------------------------------------------------------------------ treinador */

  private makeTrainer(params: Params, hyper: Hyper, train: Sample[]): Trainer {
    return new Trainer(this.topology, params, train, { ...hyper, epochs: 0 }, this.valSamples);
  }

  /** Recria o treinador a partir de `params` (zera gráfico e contador). */
  private resetTrainer(params: Params): void {
    this.trainer = this.makeTrainer(params, this.design.hyper, toSamples(this.topology, this.mission.train));
    this.view.params = params;
    state.saveDesign(this.mission.id, { params, epochs: 0, loss: this.trainer.valLoss, usedEarlyStop: false });
    this.trainBtn.setLabel(t('train.start'));
    this.updateReadout();
  }

  private shuffle(): void {
    if (this.running) return;
    const seed = this.design.seed + 1;
    state.saveDesign(this.mission.id, { seed });
    state.bump('shuffles');
    audio.sfx('zap');
    this.cameras.main.flash(120, 255, 138, 31);
    this.resetTrainer(initParams(this.topology, seed));
    this.msg.setText(t('train.msg.idle'));
    this.bot.setMood('idle');
    celebrate(this);
  }

  /** Aplica a carta ao conjunto de treino. */
  private trainData(mods: RunMods): Sample[] {
    const rng = createRng(this.design.seed * 97 + 5);
    let data = toSamples(this.topology, this.mission.train);
    if (mods.dataKeep < 1) data = data.filter(() => rng() < mods.dataKeep).concat(data.slice(0, 2));
    const jitter = (s: Sample, amount: number): Sample => ({ inputs: s.inputs.map((v) => v + (rng() - 0.5) * 2 * amount), targets: s.targets });
    if (mods.noise > 0) data = data.map((s) => jitter(s, mods.noise));
    if (mods.augment) data = data.concat(data.map((s) => jitter(s, 0.04)));
    return data;
  }

  /** Prepara os pesos de partida da rodada conforme a carta. */
  private startParams(mods: RunMods, train: Sample[]): Params {
    const d = this.design;
    let p = this.trainer.params;
    if (mods.transfer && d.bestParams) p = reconcileParams(this.topology, d.bestParams, d.seed);
    if (mods.bestOfSeeds > 0) {
      for (let k = 1; k <= mods.bestOfSeeds; k++) {
        const cand = initParams(this.topology, d.seed * 31 + k);
        if (datasetLoss(this.topology, cand, train, d.hyper.activation) < datasetLoss(this.topology, p, train, d.hyper.activation)) p = cand;
      }
    }
    if (mods.weightScale !== 1 || mods.killNeuron) {
      const weights = { ...p.weights };
      for (const k of Object.keys(weights)) weights[k] *= mods.weightScale;
      const victim = this.topology.hidden.flat()[0];
      if (mods.killNeuron && victim) for (const [a, b] of this.topology.links) if (b === victim) weights[linkKey(a, b)] = 0;
      p = { weights, biases: { ...p.biases } };
    }
    return p;
  }

  private toggle(): void {
    if (this.running) {
      this.running = false;
      this.trainBtn.setLabel(t('train.resume'));
      return;
    }
    if (this.trainer.done) {
      // Nova rodada: N épocas a partir dos pesos atuais, com os efeitos da carta (se houver).
      const d = this.design;
      this.mods = modsOf(this.card ?? undefined);
      const train = this.trainData(this.mods);
      const hyper: Hyper = {
        ...d.hyper,
        learningRate: d.hyper.learningRate * this.mods.lrMul,
        l2: (this.caps.l2 ? (d.hyper.l2 ?? 0) : 0) + this.mods.l2Add,
        dropout: (this.caps.dropout ? (d.hyper.dropout ?? 0) : 0) + this.mods.dropoutAdd,
      };
      this.trainer = this.makeTrainer(this.startParams(this.mods, train), hyper, train);
      this.runEpochs = Math.round(d.hyper.epochs * this.mods.epochsMul);
      this.trainer.hyper.epochs = this.runEpochs;
      this.runStartLoss = this.trainer.loss;
      this.owed = 0;
      this.cardsBtn.setEnabled(false);
      if (this.valSamples.length) tip(this, 'val');
    }
    this.running = true;
    this.trainBtn.setLabel(t('train.pause'));
    this.msg.setText(t('train.msg.running'));
    this.bot.setMood('think');
  }

  private finishRun(): void {
    this.running = false;
    const m = this.mission;
    const d = this.design;
    const tr = this.trainer;
    const finalTrain = tr.loss;
    const exploded = !Number.isFinite(finalTrain) || tr.valLoss >= 0.45;
    const overfit = this.valSamples.length > 0 && tr.valLoss > tr.best.loss * 1.3 && tr.valLoss - tr.best.loss > 0.01 && finalTrain < this.runStartLoss;
    const stuck = !exploded && Math.abs(this.runStartLoss - finalTrain) < 0.002 && finalTrain > m.targetLoss;

    // Parada antecipada: volta aos melhores pesos vistos na validação.
    const useBest = ((this.caps.earlystop && d.earlyStop) || this.mods.earlyStop) && tr.best.epoch > 0 && tr.best.loss < tr.valLoss;
    let msg = '';
    if (useBest) {
      tr.params = tr.best.params;
      tr.valLoss = tr.best.loss;
      this.view.params = tr.params;
      msg = t('train.msg.earlystop', { n: tr.best.epoch });
    }
    const loss = tr.valLoss;
    const good = loss <= m.targetLoss;

    state.bump('epochs_total', tr.epoch);
    if ((tr.hyper.dropout ?? 0) > 0) state.bump('dropout_runs');
    if (exploded) state.bump('exploded_runs');
    if (stuck) state.bump('stuck_runs');
    if (overfit) state.bump('overfit_runs');
    const better = loss < (d.bestLoss ?? 1);
    state.saveDesign(m.id, {
      params: tr.params,
      epochs: tr.epoch,
      loss,
      card: this.card?.id ?? null,
      usedEarlyStop: useBest,
      ...(better ? { bestParams: tr.params, bestLoss: loss } : {}),
    });
    analytics.track('train_run', { mission: m.id, epochs: tr.epoch, loss: +loss.toFixed(4), activation: tr.hyper.activation });

    this.trainBtn.setLabel(t('train.again'));
    if (!msg) msg = exploded ? t('train.msg.exploded') : overfit ? t('train.msg.overfit') : t(good ? 'train.msg.good' : 'train.msg.stuck');
    this.msg.setText(msg);
    this.bot.setMood(good ? 'happy' : 'sad');
    if (exploded) tip(this, 'lr_high', true);
    else if (overfit) tip(this, 'overfit', true);
    else if (stuck) tip(this, 'stuck', true);
    if (good) {
      audio.sfx('win');
      this.bot.hop();
      burst(this, this.W / 2, this.H - 60, C.green, 24, 420);
    } else {
      audio.sfx('bad');
      this.bot.shake();
    }
    // A carta vale por uma rodada.
    this.card = null;
    this.mods = NO_MODS;
    this.cardText.setText('');
    this.cardsBtn.setEnabled(true);
    this.updateReadout();
    celebrate(this);
  }

  private updateReadout(): void {
    const tr = this.trainer;
    this.readout.epoch.setText(String(tr.epoch));
    this.readout.loss.setText(tr.valLoss.toFixed(3)).setColor(css(tr.valLoss <= this.mission.targetLoss ? C.green : C.magenta));
    this.readout.acc.setText(`${Math.round(tr.accuracy * 100)}%`);
    if (this.lens === 'loss') this.chart.draw(tr.history, this.mission.targetLoss, tr.valHistory);
    else if (this.lens === 'boundary' && !this.running) this.drawBoundary();
  }

  private leave(key: 'Design' | 'Simulation'): void {
    if (this.running) {
      // Sair no meio da rodada guarda os pesos como estão.
      state.saveDesign(this.mission.id, { params: this.trainer.params, epochs: this.trainer.epoch, loss: this.trainer.valLoss, card: this.card?.id ?? null });
    }
    this.go(key, { missionId: this.mission.id });
  }

  /* ------------------------------------------------------------------ cartas */

  private openCards(): void {
    if (this.running) return;
    const deal = dealCards();
    const layer = this.add.container(0, 0).setDepth(2000);
    layer.add(this.add.rectangle(this.W / 2, this.H / 2, this.W, this.H, 0x000000, 0.8).setInteractive());
    layer.add(title(this, this.W / 2, 70, t('cards.title'), 34, C.yellow).setOrigin(0.5));
    layer.add(body(this, this.W / 2, 112, t('cards.sub'), 22, C.text).setOrigin(0.5));
    const cw = 270;
    const ch = 380;
    const gap = 30;
    const x0 = this.W / 2 - cw - gap;
    const cy = 350;
    let chosen = false;

    const choose = (card: CardDef) => {
      this.card = card;
      state.bump('cards_drawn');
      this.cardText.setText(t('train.cardActive', { name: t(`card.${card.id}.t`) })).setColor(css(KIND_COLOR[card.kind]));
      audio.sfx(card.kind === 'azar' ? 'bad' : 'good');
      celebrate(this);
    };
    /** Desenha a face de uma carta dentro de um container centrado em (0,0). */
    const face = (box: Phaser.GameObjects.Container, card: CardDef) => {
      const color = KIND_COLOR[card.kind];
      const g = this.add.graphics();
      g.fillStyle(C.panel, 1).fillPoints(chamfer(cw, ch, 22), true).lineStyle(4, color).strokePoints(chamfer(cw, ch, 22), true, true);
      g.fillStyle(color, 0.18).fillPoints(offset(chamfer(cw - 24, 96, 14), 0, -ch / 2 + 62), true);
      box.add(g);
      box.add(body(this, 0, -ch / 2 + 34, t(`cards.kind.${card.kind}`), 16, color).setOrigin(0.5));
      box.add(title(this, 0, -ch / 2 + 72, t(`card.${card.id}.t`), 20, C.text).setOrigin(0.5).setWordWrapWidth(cw - 40).setAlign('center'));
      box.add(body(this, 0, 20, t(`card.${card.id}.d`), 21, C.text).setOrigin(0.5).setWordWrapWidth(cw - 44).setAlign('center'));
    };

    [deal.tactics[0], deal.tactics[1]].forEach((card, i) => {
      const box = this.add.container(x0 + i * (cw + gap), cy);
      face(box, card);
      box.setSize(cw, ch).setInteractive({ useHandCursor: true });
      box.on('pointerup', () => {
        if (chosen) return;
        chosen = true;
        choose(card);
        this.tweens.add({ targets: box, scale: 1.08, duration: 120, yoyo: true, onComplete: () => layer.destroy() });
      });
      layer.add(box);
    });

    // Carta do destino: virada para baixo até ser tocada.
    const fate = this.add.container(x0 + 2 * (cw + gap), cy);
    const back = this.add.graphics();
    back.fillStyle(0x1b1838).fillPoints(chamfer(cw, ch, 22), true).lineStyle(4, C.violet).strokePoints(chamfer(cw, ch, 22), true, true);
    for (let k = 0; k < 6; k++) back.lineStyle(2, C.violet, 0.35).strokePoints(chamfer(cw - 30 - k * 34, ch - 30 - k * 50, 16), true, true);
    const q = title(this, 0, -20, '?', 110, C.violet).setOrigin(0.5);
    const hint = body(this, 0, 110, `${t('cards.fate')}\n${t('cards.fateHint')}`, 18, C.text).setOrigin(0.5).setAlign('center').setWordWrapWidth(cw - 40);
    fate.add([back, q, hint]);
    fate.setSize(cw, ch).setInteractive({ useHandCursor: true });
    fate.on('pointerup', () => {
      if (chosen) return;
      chosen = true;
      audio.sfx('whoosh');
      // Vira a carta: achata, troca a face, abre de novo.
      this.tweens.add({
        targets: fate,
        scaleX: 0,
        duration: 160,
        onComplete: () => {
          fate.removeAll(true);
          face(fate, deal.fate);
          choose(deal.fate);
          if (deal.fate.kind === 'azar') this.cameras.main.shake(200, 0.01);
          else burst(this, fate.x, fate.y, C.green, 30, 420);
          this.tweens.add({ targets: fate, scaleX: 1, duration: 160 });
          this.time.delayedCall(2600, () => layer.destroy());
        },
      });
    });
    layer.add(fate);
    layer.add(new NeonButton(this, this.W / 2, this.H - 60, 260, 60, t('cards.none'), () => !chosen && layer.destroy(), { color: C.orange, size: 18 }));
  }

  /* ------------------------------------------------------------------ lentes */

  /** FRONTEIRA: pinta o plano com a resposta da rede e marca os pontos de treino. */
  private drawBoundary(): void {
    const { x, y, w, h } = this.lensRect;
    const g = this.lensG;
    const size = Math.min(w, h);
    const ox = x + (w - size) / 2;
    const n = 22;
    const cell = size / n;
    const out = this.topology.outputs[0];
    g.clear();
    g.fillStyle(C.bg, 0.9).fillRect(x, y, w, h);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const fx = ((i + 0.5) / n) * 2 - 1;
        const fy = 1 - ((j + 0.5) / n) * 2;
        const v = forward(this.topology, this.trainer.params, fieldInputs(fx, fy), this.trainer.hyper.activation).outputs[out];
        g.fillStyle(v >= 0.5 ? C.magenta : C.cyan, 0.12 + Math.abs(v - 0.5) * 0.9).fillRect(ox + i * cell, y + j * cell, cell + 0.5, cell + 0.5);
      }
    }
    for (const p of this.mission.train) {
      const px = ox + ((p.in.x + 1) / 2) * size - 2;
      const py = y + ((1 - p.in.y) / 2) * size - 2;
      g.fillStyle(p.targets[0] ? C.magenta : C.cyan).fillRect(px, py, 5, 5);
      g.lineStyle(1, 0x000000, 0.7).strokeRect(px, py, 5, 5);
    }
    g.lineStyle(2, C.panelEdge).strokeRect(ox, y, size, size);
  }

  /**
   * ESPAÇO OCULTO: cada exemplo é desenhado nas coordenadas dadas pelas ativações
   * dos (até 3) neurônios da última camada oculta. Com 3 eixos, a nuvem gira.
   */
  private drawSpace(time: number): void {
    const { x, y, w, h } = this.lensRect;
    const g = this.lensG;
    g.clear();
    g.fillStyle(C.bg, 0.9).fillRect(x, y, w, h).lineStyle(2, C.panelEdge).strokeRect(x, y, w, h);
    const axes = (this.topology.hidden[this.topology.hidden.length - 1] ?? []).slice(0, 3);
    if (!axes.length) {
      this.lensNote.setText(t('train.lens.none'));
      return;
    }
    this.lensNote.setText('');
    const cx = x + w / 2;
    const cy = y + h / 2;
    const r = h * 0.4;
    const ang = axes.length >= 3 ? time / 2200 : 0;
    const project = (a: number, b: number, c: number) => {
      // Rotação em torno do eixo vertical + leve inclinação para dar profundidade.
      const rx = a * Math.cos(ang) + c * Math.sin(ang);
      const rz = -a * Math.sin(ang) + c * Math.cos(ang);
      return { px: cx + rx * r * 1.5, py: cy - b * r + rz * r * 0.25, depth: rz };
    };
    const axisColor = [C.yellow, C.green, C.orange];
    axes.forEach((_, i) => {
      const e = [0, 0, 0];
      e[i] = 1;
      const a = project(-e[0], -e[1], -e[2]);
      const b = project(e[0], e[1], e[2]);
      g.lineStyle(2, axisColor[i], 0.6).lineBetween(a.px, a.py, b.px, b.py);
    });
    let scale = 1;
    const pts = this.trainer.dataset.slice(0, 90).map((s) => {
      const vals = forward(this.topology, this.trainer.params, toInputMap(this.topology, s.inputs), this.trainer.hyper.activation).values;
      const c = axes.map((id) => vals[id] ?? 0);
      scale = Math.max(scale, ...c.map(Math.abs));
      const cls = s.targets.length === 1 ? (s.targets[0] >= 0.5 ? 1 : 0) : s.targets.indexOf(Math.max(...s.targets));
      return { c, cls };
    });
    for (const p of pts) {
      const q = project(p.c[0] / scale, (p.c[1] ?? 0) / scale, (p.c[2] ?? 0) / scale);
      const sz = 5 + q.depth * 1.5;
      g.fillStyle(CLASS_COLORS[p.cls % CLASS_COLORS.length], 0.9).fillRect(q.px - sz / 2, q.py - sz / 2, sz, sz);
    }
  }

  update(time: number, delta: number): void {
    this.frame++;
    if (this.running) {
      this.owed += (this.runEpochs * Math.min(delta, 100)) / RUN_MS;
      const n = Math.floor(this.owed);
      this.owed -= n;
      this.trainer.step(n);
      this.view.params = this.trainer.params;
      if (this.frame % 5 === 0) {
        // O "motor" sobe de tom conforme a perda cai.
        audio.sfx('tick', Math.round(Phaser.Math.Clamp(1 - this.trainer.loss / 0.3, 0, 1) * 24) - 12);
        this.updateReadout();
      }
      if (this.trainer.done) this.finishRun();
      if (this.lens === 'boundary' && this.frame % 6 === 0) this.drawBoundary();
    }
    if (this.lens === 'space') this.drawSpace(time);
    // Mostra a rede "pensando": um exemplo do dataset a cada 600 ms.
    const sample = this.trainer.dataset[Math.floor(time / 600) % this.trainer.dataset.length];
    this.view.activity = forward(this.topology, this.trainer.params, toInputMap(this.topology, sample.inputs), this.trainer.hyper.activation).values;
    this.view.render(time);
  }
}
