/**
 * @module scenes/TrainScene
 *
 * FASE 2 — TREINO: a rede desenhada aprende com os exemplos da missão.
 *
 * O treino é uma gestão de RECURSOS (`core/progression/resources.ts`):
 *  - ENERGIA: a bateria da missão paga o desenho; o que sobra é a reserva de
 *    treino. Cada época gasta energia (redes maiores gastam mais) e as cartas
 *    de tática também custam energia. Reserva zerada = treino para.
 *    A energia TOTAL gasta (desenho + treino) conta para a 3ª estrela.
 *  - ÁGUA: cada época esquenta a rede e gasta água de resfriamento (taxas de
 *    aprendizado altas esquentam mais). Se a água acaba, a rede SUPERAQUECE:
 *    todo o treino é perdido (os pesos voltam a ser sorteados) e o tanque é
 *    reabastecido — mas a energia gasta não volta.
 *  Bateria e tanque só são recarregados quando o desenho muda no Design.
 *
 * Durante a rodada:
 *  - na METADE, o treino para e abre a LOJA DE TÁTICAS (sempre 2 cartas com
 *    preço em energia: compre uma ou siga);
 *  - às vezes, num momento aleatório, surge sozinha uma CARTA DO DESTINO
 *    virada (sorte ou azar): aceitar ou passar.
 *
 * À esquerda: painel de recursos (bateria, tanque e temperatura) e a rede viva.
 * À direita: lentes (PERDA, FRONTEIRA, ESPAÇO OCULTO), leituras e hiperparâmetros.
 */
import Phaser from 'phaser';
import { analytics, audio, state } from '../app/services';
import { Blueprint, boardToTopology } from '../core/missions/board';
import { getMission } from '../core/missions/catalog';
import { fieldInputs } from '../core/missions/datasets';
import { MissionDef, toSamples } from '../core/missions/types';
import { Trainer } from '../core/nn/Trainer';
import { Hyper, Params, Sample, Topology, createRng, energyCost, forward, initParams, linkKey, reconcileParams, toInputMap } from '../core/nn/network';
import { CardDef, NO_MODS, RunMods, dealFate, dealTactics, modsOf } from '../core/progression/cards';
import { temperature, trainEnergyPerEpoch, waterPerEpoch } from '../core/progression/resources';
import { Caps } from '../core/progression/upgrades';
import { DesignSave } from '../state/GameState';
import { Robot } from '../entities/Robot';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { NetworkView } from '../ui/NetworkView';
import { celebrate, tip } from '../ui/Toast';
import { burst, floatText, glow } from '../ui/fx';
import { C, Rect, body, chamfer, css, offset, title } from '../ui/theme';
import { LineChart, StepSlider, addPanel } from '../ui/widgets';
import { BaseScene, MissionSceneData } from './BaseScene';

const LR_VALUES = [0.003, 0.01, 0.03, 0.1, 0.3, 1];
const L2_VALUES = [0, 0.0005, 0.002, 0.01];
const DROPOUT_VALUES = [0, 0.1, 0.2, 0.4];
/** Duração-alvo de uma rodada de treino, em ms — independe do FPS do aparelho. */
const RUN_MS = 4000;
/** Chance de surgir uma carta do destino numa rodada. */
const FATE_CHANCE = 0.45;
type Lens = 'loss' | 'boundary' | 'space';
const KIND_COLOR = { tatica: C.cyan, sorte: C.green, azar: C.red } as const;
const CLASS_COLORS = [C.cyan, C.magenta, C.yellow, C.green];
const WATER_BLUE = 0x2f8cff;

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
  private netRect!: Rect;
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
  private rateText!: Phaser.GameObjects.Text;
  private trainBtn!: NeonButton;
  private simBtn!: NeonButton;
  private bot!: Robot;
  private card: CardDef | null = null;
  private mods: RunMods = NO_MODS;
  private runStartLoss = 1;
  /** Épocas (desta rodada) em que abrem a loja de táticas e a carta do destino (-1 = não abre mais). */
  private shopAt = -1;
  private fateAt = -1;

  /* recursos */
  private designCost = 0;
  private ceiling = 0;
  private spent = 0;
  private water = 0;
  private tank = 0;
  private hud!: { energy: Phaser.GameObjects.Text; water: Phaser.GameObjects.Text; temp: Phaser.GameObjects.Text; g: Phaser.GameObjects.Graphics; heat?: Phaser.GameObjects.Rectangle };
  private steam!: Phaser.GameObjects.Particles.ParticleEmitter;
  private lastAlarm = 0;

  constructor() {
    super('Train');
  }

  init(data: MissionSceneData): void {
    this.mission = getMission(data.missionId);
  }

  private get design() {
    return state.design(this.mission.id);
  }

  /** Energia que ainda dá para gastar em treino. */
  private get reserve(): number {
    return Math.max(0, this.ceiling - this.designCost - this.spent);
  }

  protected build(): void {
    const m = this.mission;
    const d = this.design;
    this.caps = state.caps;
    this.bp = state.blueprint(m.id);
    this.data.set('toastSide', 'left');
    this.data.set('toastTop', 68 + 10 + 70);
    this.running = false;
    this.card = null;
    this.mods = NO_MODS;
    this.lens = 'loss';
    this.shopAt = this.fateAt = -1;
    this.topology = boardToTopology(this.bp, d.board);
    this.valSamples = m.validation ? toSamples(this.topology, m.validation) : [];
    if (!this.caps.epochValues.includes(d.hyper.epochs)) d.hyper.epochs = 200;
    if (!LR_VALUES.includes(d.hyper.learningRate)) d.hyper.learningRate = 0.1;

    // Recursos desta montagem de rede.
    this.designCost = energyCost(this.topology, m.extraInputs);
    this.ceiling = Math.round(m.energy * this.caps.energyMul);
    this.tank = m.water;
    this.spent = d.trainSpent ?? 0;
    this.water = d.water ?? this.tank;

    // Mantém os pesos dos cabos que sobreviveram a uma poda no Design.
    const params = reconcileParams(this.topology, d.params, d.seed);
    this.trainer = this.makeTrainer(params, d.hyper, toSamples(this.topology, m.train));
    state.saveDesign(m.id, { params });

    const top = this.addTopBar(m, 'train');
    const bottomH = 96;
    const panelW = Math.min(470, this.W * 0.39);
    this.netRect = { x: 16, y: top + 10, w: this.W - panelW - 44, h: this.H - top - bottomH - 56 };
    addPanel(this, this.netRect, C.panelEdge, 0.55);
    this.hud = {
      g: this.add.graphics(),
      energy: title(this, this.netRect.x + 18, this.netRect.y + 12, '', 16, C.yellow),
      water: title(this, this.netRect.x + 30 + (this.netRect.w - 48) / 2, this.netRect.y + 12, '', 16, WATER_BLUE),
      temp: title(this, this.netRect.x + this.netRect.w - 18, this.netRect.y + 12, '', 16, C.text).setOrigin(1, 0),
    };
    const viewRect = { ...this.netRect, y: this.netRect.y + 64, h: this.netRect.h - 64 };
    this.view = new NetworkView(this, this.bp, d.board, viewRect, { labelPad: 172, nodeRadius: 24 });
    this.view.params = params;
    // Vermelhidão de calor por cima da rede + vapor.
    this.hud.heat = this.add.rectangle(viewRect.x + viewRect.w / 2, viewRect.y + viewRect.h / 2, viewRect.w - 8, viewRect.h - 8, C.red, 0).setBlendMode(Phaser.BlendModes.ADD);
    this.steam = this.add
      .particles(0, 0, 'dot', {
        speedY: { min: -90, max: -40 },
        speedX: { min: -20, max: 20 },
        lifespan: 1400,
        scale: { start: 1.4, end: 3.2 },
        alpha: { start: 0.45, end: 0 },
        tint: 0xdfe8ff,
        frequency: -1,
      })
      .setDepth(40);

    this.buildPanel({ x: this.W - panelW - 16, y: top + 10, w: panelW, h: this.H - top - bottomH - 20 });

    // Rodapé.
    const by = this.H - bottomH / 2 - 4;
    this.bot = new Robot(this, 56, this.H - bottomH - 22, 0.42);
    this.msg = body(this, 100, this.H - bottomH - 18, t('train.msg.idle'), 20, C.text).setOrigin(0, 0.5).setWordWrapWidth(this.netRect.w - 300);
    this.cardText = body(this, this.netRect.x + this.netRect.w - 6, this.H - bottomH - 18, '', 17, C.yellow).setOrigin(1, 0.5);
    new NeonButton(this, 110, by, 190, 76, `◀ ${t('phase.design')}`, () => this.leave('Design'), { color: C.yellow, size: 20 });
    this.trainBtn = new NeonButton(this, this.W / 2, by, 280, 76, t('train.start'), () => this.toggle(), { color: C.magenta, size: 26 });
    this.simBtn = new NeonButton(this, this.W - 120, by, 210, 76, `${t('train.toSim')} ▶`, () => this.leave('Simulation'), { color: C.cyan, size: 20 });
    this.simBtn.setEnabled(d.epochs > 0);
    if (!d.epochs) this.msg.setText(t('train.msg.mustTrain'));

    this.updateReadout();
    this.updateHud();
    if (this.reserve <= 0) this.noEnergy();
    tip(this, 'resources');
    tip(this, 'loss');
  }

  /* ------------------------------------------------------------------ painel de recursos */

  /** Redesenha bateria (rede | treino gasto | reserva) e tanque (nível, cor e temperatura). */
  private updateHud(): void {
    const r = this.netRect;
    const g = this.hud.g.clear();
    const half = (r.w - 48) / 2;
    const y = r.y + 38;

    // Bateria: violeta = rede, magenta = treino já gasto, amarelo = reserva.
    const segs = 24;
    const sw = half / segs;
    for (let i = 0; i < segs; i++) {
      const v = ((i + 0.5) / segs) * this.ceiling;
      const color = v <= this.designCost ? C.violet : v <= this.designCost + this.spent ? C.magenta : C.yellow;
      g.fillStyle(color, color === C.yellow ? 0.95 : 0.45).fillRect(r.x + 18 + i * sw, y, sw - 2, 12);
    }
    this.hud.energy.setText(t('train.hud.energy', { r: Math.floor(this.reserve), d: this.designCost, t: Math.ceil(this.spent) })).setColor(css(this.reserve < 2 ? C.red : C.yellow));

    // Tanque: nível de água, do azul ao vermelho conforme esvazia (pisca abaixo de 25%).
    const level = Phaser.Math.Clamp(this.water / this.tank, 0, 1);
    const wx = r.x + 30 + half;
    const blink = level < 0.25 && Math.floor(this.time.now / 250) % 2 === 0;
    const col = Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(C.red), Phaser.Display.Color.ValueToColor(WATER_BLUE), 100, Math.round(Math.min(1, level * 2) * 100));
    g.fillStyle(C.bg, 0.9).fillRect(wx, y, half, 12);
    g.fillStyle(blink ? C.red : Phaser.Display.Color.GetColor(col.r, col.g, col.b), 0.95).fillRect(wx, y, half * level, 12);
    // Ondinhas na superfície quando está treinando.
    if (this.running && level > 0.02) for (let k = 0; k < 5; k++) g.fillStyle(0xffffff, 0.4).fillRect(wx + half * level - 3 - ((this.time.now / 30 + k * 9) % 36), y + 2 + (k % 3) * 3, 4, 2);
    g.lineStyle(2, blink ? C.red : C.panelEdge).strokeRect(wx, y, half, 12);
    this.hud.water.setText(t('train.hud.water', { p: Math.round(level * 100) })).setColor(css(level < 0.25 ? C.red : WATER_BLUE));
    const temp = temperature(level);
    this.hud.temp.setText(`${temp}°C`).setColor(css(temp > 80 ? C.red : temp > 60 ? C.orange : C.text));

    // Calor visível sobre a rede.
    this.hud.heat?.setFillStyle(C.red, Math.max(0, (0.5 - level) * 0.4) * (0.7 + 0.3 * Math.sin(this.time.now / 160)));
  }

  private rateLabel(): string {
    const lr = this.trainer?.hyper.learningRate ?? this.design.hyper.learningRate;
    return t('train.rate', { e: (trainEnergyPerEpoch(this.designCost) * 100).toFixed(1), w: Math.round((waterPerEpoch(this.designCost, lr) * 10000) / this.tank) });
  }

  /* ------------------------------------------------------------------ painel direito */

  private buildPanel(pr: Rect): void {
    const m = this.mission;
    const d = this.design;
    addPanel(this, pr, C.magenta, 0.85);
    const ix = pr.x + 18;
    const iw = pr.w - 36;

    const lenses: Lens[] = ['loss', 'boundary', 'space'];
    const tw = iw / 3;
    this.lensTabs = {} as Record<Lens, NeonButton>;
    lenses.forEach((l, i) => {
      this.lensTabs[l] = new NeonButton(this, ix + tw * i + tw / 2, pr.y + 28, tw - 6, 36, t(`train.lens.${l}`), () => this.setLens(l), { color: C.magenta, size: 13 });
    });
    this.lensTabs.loss.setSelected(true);
    this.lensTabs.boundary.setEnabled(this.topology.inputs.includes('x'));
    this.lensRect = { x: ix, y: pr.y + 52, w: iw, h: 150 };
    this.chart = new LineChart(this, ix, this.lensRect.y, iw, this.lensRect.h);
    this.lensG = this.add.graphics();
    this.lensNote = body(this, ix + iw / 2, this.lensRect.y + this.lensRect.h / 2, '', 17, C.dim).setOrigin(0.5).setWordWrapWidth(iw - 30).setAlign('center');

    const ry = this.lensRect.y + this.lensRect.h + 8;
    const col = iw / 3;
    const stat = (i: number, label: string, color: number) => {
      body(this, ix + col * i, ry, label, 15, C.dim);
      return title(this, ix + col * i, ry + 17, '-', 21, color);
    };
    this.readout = { epoch: stat(0, t('train.epoch'), C.text), loss: stat(1, t(this.valSamples.length ? 'train.lossVal' : 'train.loss'), C.magenta), acc: stat(2, t('train.acc'), C.green) };

    const sw = iw / 2 - 14;
    const sy = ry + 48;
    new StepSlider(this, ix, sy, sw, t('train.lr'), LR_VALUES, d.hyper.learningRate, String, (v) => this.setHyper({ learningRate: v }), C.magenta);
    new StepSlider(this, ix + iw / 2 + 14, sy, sw, t('train.epochs'), this.caps.epochValues, d.hyper.epochs, String, (v) => this.setHyper({ epochs: v }));
    if (this.caps.l2) {
      new StepSlider(this, ix, sy + 76, sw, t('train.l2'), L2_VALUES, L2_VALUES.includes(d.hyper.l2 ?? 0) ? (d.hyper.l2 ?? 0) : 0, String, (v) => this.setHyper({ l2: v }), C.violet);
    }
    if (this.caps.dropout) {
      new StepSlider(this, ix + iw / 2 + 14, sy + 76, sw, t('train.dropout'), DROPOUT_VALUES, DROPOUT_VALUES.includes(d.hyper.dropout ?? 0) ? (d.hyper.dropout ?? 0) : 0, (v) => `${Math.round(v * 100)}%`, (v) => this.setHyper({ dropout: v }), C.violet);
    }
    const hasRow2 = this.caps.l2 || this.caps.dropout;
    this.rateText = body(this, ix + iw / 2, sy + (hasRow2 ? 162 : 92), this.rateLabel(), 16, C.text).setOrigin(0.5).setWordWrapWidth(iw).setAlign('center');

    const by = pr.y + pr.h - 34;
    const bw = iw / 2 - 6;
    if (this.caps.earlystop) {
      const label = () => t('train.earlystop', { v: t(this.design.earlyStop ? 'train.on' : 'train.off') });
      const esBtn: NeonButton = new NeonButton(this, ix + iw - bw / 2, by, bw, 44, label(), () => {
        state.saveDesign(m.id, { earlyStop: !this.design.earlyStop });
        esBtn.setLabel(label()).setSelected(!!this.design.earlyStop);
      }, { color: C.green, size: 12 });
      esBtn.setSelected(!!d.earlyStop);
    }
    new NeonButton(this, ix + bw / 2, by, bw, 44, t('train.shuffle'), () => this.shuffle(), { color: C.orange, size: 13 });
  }

  private setHyper(patch: Partial<Hyper>): void {
    state.saveDesign(this.mission.id, { hyper: { ...this.design.hyper, ...patch } });
    if (patch.learningRate !== undefined) {
      this.trainer.hyper.learningRate = patch.learningRate * this.mods.lrMul;
      if (patch.learningRate >= 0.3) tip(this, 'heat', true);
    }
    this.rateText.setText(this.rateLabel());
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

  /** Grava recursos (e o que mais vier em `extra`) no save. */
  private persist(extra: Partial<DesignSave> = {}): void {
    state.saveDesign(this.mission.id, { trainSpent: this.spent, water: this.water, ...extra });
  }

  private shuffle(): void {
    if (this.running) return;
    const seed = this.design.seed + 1;
    state.bump('shuffles');
    audio.sfx('zap');
    this.cameras.main.flash(120, 255, 138, 31);
    const params = initParams(this.topology, seed);
    this.trainer = this.makeTrainer(params, this.design.hyper, toSamples(this.topology, this.mission.train));
    this.view.params = params;
    this.persist({ seed, params, epochs: 0, loss: 1, usedEarlyStop: false });
    this.simBtn.setEnabled(false);
    this.trainBtn.setLabel(t('train.start'));
    this.msg.setText(t('train.msg.shuffled'));
    this.bot.setMood('idle');
    this.updateReadout();
    celebrate(this);
  }

  /** Aplica os efeitos de dados de uma carta (ruído, menos dados, augmentation). */
  private transformData(data: Sample[], mods: RunMods): Sample[] {
    const rng = createRng(this.design.seed * 97 + 5);
    const jitter = (s: Sample, amount: number): Sample => ({ inputs: s.inputs.map((v) => v + (rng() - 0.5) * 2 * amount), targets: s.targets });
    let out = data;
    if (mods.dataKeep < 1) out = out.filter(() => rng() < mods.dataKeep).concat(out.slice(0, 2));
    if (mods.noise > 0) out = out.map((s) => jitter(s, mods.noise));
    if (mods.augment) out = out.concat(out.map((s) => jitter(s, 0.04)));
    return out;
  }

  /** Aplica uma carta ao treino EM ANDAMENTO (vale para o resto da rodada). */
  private applyCard(card: CardDef): void {
    const tr = this.trainer;
    const mods = modsOf(card);
    // A parada antecipada de uma carta vale até o fim da rodada, mesmo com outra carta depois.
    this.mods = { ...mods, earlyStop: this.mods.earlyStop || mods.earlyStop };
    this.card = card;
    tr.hyper.learningRate *= mods.lrMul;
    tr.hyper.l2 = (tr.hyper.l2 ?? 0) + mods.l2Add;
    tr.hyper.dropout = (tr.hyper.dropout ?? 0) + mods.dropoutAdd;
    const left = tr.hyper.epochs - tr.epoch;
    const newLeft = Math.round(left * mods.epochsMul);
    tr.hyper.epochs = tr.epoch + newLeft;
    this.runEpochs += newLeft - left;
    tr.dataset = this.transformData(tr.dataset, mods);

    let p = tr.params;
    const d = this.design;
    if (mods.transfer && d.bestParams) p = reconcileParams(this.topology, d.bestParams, d.seed);
    if (mods.rewind) p = tr.best.params;
    if (mods.weightScale !== 1 || mods.killNeuron) {
      const weights = { ...p.weights };
      for (const k of Object.keys(weights)) weights[k] *= mods.weightScale;
      const victim = this.topology.hidden.flat()[0];
      if (mods.killNeuron && victim) for (const [a, b] of this.topology.links) if (b === victim) weights[linkKey(a, b)] = 0;
      p = { weights, biases: { ...p.biases } };
    }
    tr.params = p;
    this.view.params = p;

    if (mods.waterFrac) {
      this.water = Phaser.Math.Clamp(this.water + mods.waterFrac * this.tank, 1, this.tank);
      floatText(this, this.netRect.x + this.netRect.w * 0.75, this.netRect.y + 70, `${mods.waterFrac > 0 ? '+' : ''}${Math.round(mods.waterFrac * 100)}% ${t('train.waterShort')}`, css(mods.waterFrac > 0 ? WATER_BLUE : C.red), 24);
    }
    if (mods.energyRefund) {
      this.spent = Math.max(0, this.spent - mods.energyRefund);
      floatText(this, this.netRect.x + this.netRect.w * 0.25, this.netRect.y + 70, `+${mods.energyRefund}⚡`, css(C.yellow), 24);
    }
    this.cardText.setText(t('train.cardActive', { name: t(`card.${card.id}.t`) })).setColor(css(KIND_COLOR[card.kind]));
    this.persist();
    this.updateHud();
  }

  private toggle(): void {
    if (this.running) {
      this.running = false;
      this.trainBtn.setLabel(t('train.resume'));
      this.persist({ params: this.trainer.params });
      return;
    }
    if (this.reserve <= 0) return this.noEnergy();
    if (this.trainer.done) {
      // Nova rodada: N épocas a partir dos pesos atuais. Loja na metade; destino talvez.
      const d = this.design;
      this.card = null;
      this.mods = NO_MODS;
      this.cardText.setText('');
      const hyper: Hyper = { ...d.hyper, l2: this.caps.l2 ? (d.hyper.l2 ?? 0) : 0, dropout: this.caps.dropout ? (d.hyper.dropout ?? 0) : 0 };
      this.trainer = this.makeTrainer(this.trainer.params, hyper, toSamples(this.topology, this.mission.train));
      this.runEpochs = d.hyper.epochs;
      this.trainer.hyper.epochs = this.runEpochs;
      this.runStartLoss = this.trainer.loss;
      this.shopAt = Math.floor(this.runEpochs / 2);
      this.fateAt = -1;
      if (Math.random() < FATE_CHANCE) {
        // Longe da loja (que abre na metade).
        const f = Math.random() < 0.5 ? Phaser.Math.FloatBetween(0.15, 0.35) : Phaser.Math.FloatBetween(0.65, 0.85);
        this.fateAt = Math.floor(this.runEpochs * f);
      }
      this.owed = 0;
      if (this.valSamples.length) tip(this, 'val');
    }
    this.running = true;
    this.trainBtn.setLabel(t('train.pause'));
    this.msg.setText(t('train.msg.running'));
    this.bot.setMood('think');
  }

  /** Reserva de energia esgotada: o treino para onde está. */
  private noEnergy(): void {
    this.running = false;
    this.trainBtn.setEnabled(false).setLabel(t('train.noEnergyBtn'));
    this.msg.setText(t('train.msg.noEnergy'));
    this.bot.setMood('sad');
    audio.sfx('error');
    tip(this, 'energy', true);
  }

  /** A água acabou: a rede superaquece e todo o treino é perdido. */
  private overheat(): void {
    this.running = false;
    this.shopAt = this.fateAt = -1;
    state.bump('overheats');
    audio.sfx('bomb');
    audio.sfx('lose');
    this.cameras.main.shake(700, 0.02);
    this.cameras.main.flash(500, 255, 60, 30);
    // Cada neurônio estoura em faíscas e vapor.
    for (const id of [...this.topology.hidden.flat(), ...this.topology.outputs]) {
      const p = this.view.posOf(id);
      burst(this, p.x, p.y, C.orange, 22, 420);
      this.steam.explode(14, p.x, p.y);
    }
    const boom = title(this, this.netRect.x + this.netRect.w / 2, this.netRect.y + this.netRect.h / 2, t('train.overheat'), 44, C.red).setOrigin(0.5).setDepth(900).setScale(0.3);
    this.tweens.add({ targets: boom, scale: 1, duration: 300, ease: 'Back.out' });
    this.tweens.add({ targets: boom, alpha: 0, delay: 1800, duration: 500, onComplete: () => boom.destroy() });

    // Treino perdido: pesos novos, tanque cheio; a energia gasta NÃO volta.
    const seed = this.design.seed + 1;
    const params = initParams(this.topology, seed);
    this.trainer = this.makeTrainer(params, this.design.hyper, toSamples(this.topology, this.mission.train));
    this.view.params = params;
    this.water = this.tank;
    this.persist({ seed, params, epochs: 0, loss: 1, usedEarlyStop: false });
    this.simBtn.setEnabled(false);
    this.trainBtn.setLabel(t('train.start'));
    this.cardText.setText('');
    this.msg.setText(t('train.msg.overheat'));
    this.bot.setMood('sad').shake();
    this.updateReadout();
    this.updateHud();
    tip(this, 'overheat', true);
    celebrate(this);
    if (this.reserve <= 0) this.noEnergy();
  }

  private finishRun(): void {
    this.running = false;
    this.shopAt = this.fateAt = -1;
    const m = this.mission;
    const d = this.design;
    const tr = this.trainer;
    const finalTrain = tr.loss;
    const exploded = !Number.isFinite(finalTrain) || tr.valLoss >= 0.45;
    const overfit = this.valSamples.length > 0 && tr.valLoss > tr.best.loss * 1.3 && tr.valLoss - tr.best.loss > 0.01 && finalTrain < this.runStartLoss;
    const stuck = !exploded && Math.abs(this.runStartLoss - finalTrain) < 0.002 && finalTrain > m.targetLoss;

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
    this.persist({
      params: tr.params,
      epochs: (d.epochs ?? 0) + Math.max(1, tr.epoch),
      loss,
      card: this.card?.id ?? null,
      usedEarlyStop: useBest,
      ...(better ? { bestParams: tr.params, bestLoss: loss } : {}),
    });
    analytics.track('train_run', { mission: m.id, epochs: tr.epoch, loss: +loss.toFixed(4), activation: tr.hyper.activation });

    this.simBtn.setEnabled(true);
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
    this.card = null;
    this.mods = NO_MODS;
    this.updateReadout();
    this.updateHud();
    celebrate(this);
    if (this.reserve <= 0) this.noEnergy();
  }

  private updateReadout(): void {
    const tr = this.trainer;
    this.readout.epoch.setText(String(tr.epoch));
    this.readout.loss.setText(tr.valLoss.toFixed(3));
    this.readout.acc.setText(`${Math.round(tr.accuracy * 100)}%`);
    if (this.lens === 'loss') this.chart.draw(tr.history, 0, tr.valHistory);
    else if (this.lens === 'boundary' && !this.running) this.drawBoundary();
  }

  private leave(key: 'Design' | 'Simulation'): void {
    if (key === 'Simulation' && !this.design.epochs) return;
    // Sair no meio da rodada guarda os pesos e os recursos como estão.
    this.persist(this.running ? { params: this.trainer.params, card: this.card?.id ?? null } : {});
    this.go(key, { missionId: this.mission.id });
  }

  /* ------------------------------------------------------------------ cartas */

  /** Abre uma camada modal de cartas e pausa o treino. `close()` fecha e retoma. */
  private openModal(titleKey: string, sub: string): { layer: Phaser.GameObjects.Container; close: () => void } {
    this.running = false;
    this.registry.set('drawOpen', true);
    this.registry.set('drawKind', titleKey);
    const layer = this.add.container(0, 0).setDepth(2000);
    layer.add(this.add.rectangle(this.W / 2, this.H / 2, this.W, this.H, 0x000000, 0.82).setInteractive());
    layer.add(title(this, this.W / 2, 60, t(titleKey), 34, C.yellow).setOrigin(0.5));
    layer.add(body(this, this.W / 2, 102, sub, 21, C.text).setOrigin(0.5).setWordWrapWidth(this.W - 120).setAlign('center'));
    const close = () => {
      layer.destroy();
      this.registry.set('drawOpen', false);
      this.running = true;
      this.trainBtn.setLabel(t('train.pause'));
    };
    return { layer, close };
  }

  /** Face de uma carta, num container centrado em (0,0). */
  private cardFace(box: Phaser.GameObjects.Container, card: CardDef, cw: number, ch: number): void {
    const color = KIND_COLOR[card.kind];
    const g = this.add.graphics();
    g.fillStyle(C.panel, 1).fillPoints(chamfer(cw, ch, 22), true).lineStyle(4, color).strokePoints(chamfer(cw, ch, 22), true, true);
    g.fillStyle(color, 0.18).fillPoints(offset(chamfer(cw - 24, 96, 14), 0, -ch / 2 + 62), true);
    box.add(g);
    box.add(body(this, 0, -ch / 2 + 34, t(`cards.kind.${card.kind}`), 16, color).setOrigin(0.5));
    box.add(title(this, 0, -ch / 2 + 72, t(`card.${card.id}.t`), 20, C.text).setOrigin(0.5).setWordWrapWidth(cw - 40).setAlign('center'));
    box.add(body(this, 0, 10, t(`card.${card.id}.d`), 20, C.text).setOrigin(0.5).setWordWrapWidth(cw - 44).setAlign('center'));
  }

  /** LOJA DE TÁTICAS (metade da rodada): 2 cartas com preço em energia. */
  private openShop(): void {
    const cards = dealTactics();
    audio.sfx('whoosh');
    this.cameras.main.flash(160, 252, 238, 10);
    const { layer, close } = this.openModal('cards.shopTitle', t('cards.shopSub', { e: this.trainer.epoch, r: Math.floor(this.reserve) }));
    const cw = 290;
    const ch = 360;
    const gap = 40;
    let done = false;
    cards.forEach((card, i) => {
      const price = card.price ?? 0;
      const afford = this.reserve >= price;
      const box = this.add.container(this.W / 2 + (i - 0.5) * (cw + gap), 360).setAlpha(0);
      this.cardFace(box, card, cw, ch);
      // Etiqueta de preço.
      const tag = this.add.graphics().fillStyle(afford ? C.yellow : C.dim).fillPoints(offset(chamfer(150, 44, 10), 0, ch / 2 - 40), true);
      box.add([tag, title(this, 0, ch / 2 - 40, afford ? t('cards.buy', { n: price }) : t('cards.cant', { n: price }), 16, C.bg).setOrigin(0.5)]);
      this.tweens.add({ targets: box, alpha: afford ? 1 : 0.5, y: 340, angle: { from: i ? 6 : -6, to: 0 }, duration: 260, delay: 100 + i * 140, ease: 'Back.out', onStart: () => audio.sfx('tick', i * 5) });
      box.setSize(cw, ch).setInteractive({ useHandCursor: afford }).setData('choice', i);
      box.on('pointerup', () => {
        if (done) return;
        if (!afford) return void audio.sfx('error');
        done = true;
        this.spent += price;
        state.bump('cards_drawn');
        this.applyCard(card);
        audio.sfx('good');
        floatText(this, box.x, box.y - ch / 2, `-${price}⚡`, css(C.yellow), 28);
        celebrate(this);
        this.tweens.add({ targets: box, scale: 1.08, duration: 120, yoyo: true, onComplete: close });
      });
      layer.add(box);
    });
    const skip = new NeonButton(this, this.W / 2, this.H - 48, 300, 56, t('cards.skipShop'), () => {
      if (done) return;
      done = true;
      close();
    }, { color: C.orange, size: 18 });
    skip.setData('choice', -1);
    layer.add(skip);
    tip(this, 'cards');
  }

  /** CARTA DO DESTINO: surge sozinha, virada. Aceitar (e descobrir) ou passar. */
  private openFate(): void {
    const card = dealFate();
    audio.sfx('zap', 5);
    const { layer, close } = this.openModal('cards.fateTitle', t('cards.fateSub'));
    const cw = 270;
    const ch = 360;
    const box = this.add.container(this.W / 2, 330);
    const back = this.add.graphics();
    back.fillStyle(0x1b1838).fillPoints(chamfer(cw, ch, 22), true).lineStyle(4, C.violet).strokePoints(chamfer(cw, ch, 22), true, true);
    for (let k = 0; k < 6; k++) back.lineStyle(2, C.violet, 0.35).strokePoints(chamfer(cw - 30 - k * 34, ch - 30 - k * 50, 16), true, true);
    box.add([back, title(this, 0, -10, '?', 110, C.violet).setOrigin(0.5)]);
    box.setScale(0.2).setAngle(-30);
    this.tweens.add({ targets: box, scale: 1, angle: 0, duration: 420, ease: 'Back.out' });
    // Brilho pulsando para chamar a atenção.
    const aura = glow(this, this.W / 2, 330, C.violet, 4, 0.35);
    this.tweens.add({ targets: aura, alpha: 0.7, duration: 500, yoyo: true, repeat: -1 });
    layer.add([aura, box]);
    let done = false;
    const accept = new NeonButton(this, this.W / 2 - 160, this.H - 52, 280, 60, t('cards.accept'), () => {
      if (done) return;
      done = true;
      state.bump('cards_drawn');
      // Vira a carta: achata, troca a face, abre de novo.
      this.tweens.add({
        targets: box,
        scaleX: 0,
        duration: 160,
        onComplete: () => {
          box.removeAll(true);
          this.cardFace(box, card, cw, ch);
          this.applyCard(card);
          audio.sfx(card.kind === 'azar' ? 'bad' : 'good');
          if (card.kind === 'azar') this.cameras.main.shake(220, 0.012);
          else burst(this, box.x, box.y, C.green, 30, 420);
          this.tweens.add({ targets: box, scaleX: 1, duration: 160 });
          celebrate(this);
          this.time.delayedCall(2300, close);
        },
      });
    }, { color: C.green, size: 18 });
    accept.setData('choice', 0);
    const pass = new NeonButton(this, this.W / 2 + 160, this.H - 52, 280, 60, t('cards.pass'), () => {
      if (done) return;
      done = true;
      audio.sfx('whoosh');
      this.tweens.add({ targets: box, x: this.W + 300, angle: 40, duration: 300, onComplete: close });
    }, { color: C.orange, size: 18 });
    pass.setData('choice', -1);
    layer.add([accept, pass]);
  }

  /**
   * Usado pelo teste de fumaça: escolhe a opção `i` (0 = primeira carta / aceitar;
   * -1 = seguir sem comprar / passar) da camada de cartas aberta.
   * @returns `false` se não há camada aberta.
   */
  resolveDraw(i: number): boolean {
    const layer = this.children.list.find((o) => (o as Phaser.GameObjects.Container).depth === 2000) as Phaser.GameObjects.Container | undefined;
    if (!layer) return false;
    const target = layer.list.find((o) => (o as Phaser.GameObjects.GameObject).getData?.('choice') === i) as Phaser.GameObjects.GameObject | undefined;
    target?.emit('pointerup');
    return true;
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
      const tr = this.trainer;
      this.owed += (this.runEpochs * Math.min(delta, 100)) / RUN_MS;
      let n = Math.floor(this.owed);
      this.owed -= n;
      // Para exatamente na época de cada evento.
      for (const at of [this.shopAt, this.fateAt]) if (at >= 0 && at > tr.epoch) n = Math.min(n, at - tr.epoch);
      // E não gasta mais energia do que tem.
      const perE = trainEnergyPerEpoch(this.designCost);
      const perW = waterPerEpoch(this.designCost, tr.hyper.learningRate);
      const affordable = Math.floor(this.reserve / perE + 1e-9);
      n = Math.max(0, Math.min(n, affordable, tr.hyper.epochs - tr.epoch));
      const ran = tr.step(n);
      this.spent += ran * perE;
      this.water -= ran * perW;
      this.view.params = tr.params;

      if (this.water <= 0) {
        this.water = 0;
        this.overheat();
        this.view.render(time);
        return;
      }
      const level = this.water / this.tank;
      if (level < 0.5 && this.frame % Math.max(2, Math.round(level * 20)) === 0) {
        const ids = this.topology.hidden.flat();
        const p = this.view.posOf(ids[Math.floor(Math.random() * ids.length)] ?? this.topology.outputs[0]);
        this.steam.emitParticleAt(p.x + Phaser.Math.Between(-12, 12), p.y - 10);
      }
      if (level < 0.25 && time - this.lastAlarm > 900) {
        this.lastAlarm = time;
        audio.sfx('error');
        tip(this, 'heat', true);
      }
      if (this.frame % 5 === 0) {
        audio.sfx('tick', Math.round(Phaser.Math.Clamp(1 - tr.loss / 0.3, 0, 1) * 24) - 12);
        this.updateReadout();
      }
      if (this.shopAt >= 0 && tr.epoch >= this.shopAt) {
        this.shopAt = -1;
        this.updateReadout();
        this.openShop();
      } else if (this.fateAt >= 0 && tr.epoch >= this.fateAt) {
        this.fateAt = -1;
        this.updateReadout();
        this.openFate();
      } else if (tr.done) {
        this.finishRun();
      } else if (this.reserve < perE) {
        // Reserva acabou no meio da rodada: guarda o que aprendeu até aqui.
        this.finishRun();
      }
      if (this.lens === 'boundary' && this.frame % 6 === 0) this.drawBoundary();
    }
    this.updateHud();
    if (this.lens === 'space') this.drawSpace(time);
    // Mostra a rede "pensando": um exemplo do dataset a cada 600 ms.
    const sample = this.trainer.dataset[Math.floor(time / 600) % this.trainer.dataset.length];
    this.view.activity = forward(this.topology, this.trainer.params, toInputMap(this.topology, sample.inputs), this.trainer.hyper.activation).values;
    this.view.render(time);
  }
}
