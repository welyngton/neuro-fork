/**
 * @module scenes/TrainScene
 *
 * FASE 2 — TREINO: a rede desenhada aprende com os exemplos da missão.
 *
 * À esquerda a rede "viva" (cabos engrossam e mudam de cor conforme os pesos;
 * os blocos piscam com exemplos do dataset). À direita o painel: curva de
 * perda, leitura de época/perda/acertos e os hiperparâmetros.
 *
 * O treino roda no próprio laço do jogo, algumas épocas por frame
 * ({@link Trainer.step}), dosadas pelo tempo para durar ~4 s em qualquer aparelho.
 * Daqui o jogador pode VOLTAR AO DESIGN ou seguir para SIMULAR.
 */
import Phaser from 'phaser';
import { analytics, audio, state } from '../app/services';
import { boardToTopology } from '../core/missions/board';
import { getMission } from '../core/missions/catalog';
import { MissionDef } from '../core/missions/types';
import { Trainer } from '../core/nn/Trainer';
import { ACTIVATIONS, Topology, forward, initParams, reconcileParams, toInputMap } from '../core/nn/network';
import { Robot } from '../entities/Robot';
import { t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { NetworkView } from '../ui/NetworkView';
import { burst } from '../ui/fx';
import { C, body, title } from '../ui/theme';
import { LineChart, StepSlider, addPanel } from '../ui/widgets';
import { BaseScene, MissionSceneData } from './BaseScene';

const LR_VALUES = [0.01, 0.03, 0.1, 0.3, 0.5, 1, 2];
const EPOCH_VALUES = [50, 100, 200, 400, 800];
/** Duração-alvo de uma rodada de treino, em ms — independe do FPS do aparelho. */
const RUN_MS = 4000;

export class TrainScene extends BaseScene {
  protected accent = C.magenta;
  protected music = 'train' as const;

  private mission!: MissionDef;
  private topology!: Topology;
  private trainer!: Trainer;
  private view!: NetworkView;
  private chart!: LineChart;
  private running = false;
  private runEpochs = 0;
  private frame = 0;
  /** Épocas "devidas" acumuladas (fração) conforme o tempo passa. */
  private owed = 0;
  private readout!: { epoch: Phaser.GameObjects.Text; loss: Phaser.GameObjects.Text; acc: Phaser.GameObjects.Text };
  private msg!: Phaser.GameObjects.Text;
  private trainBtn!: NeonButton;
  private bot!: Robot;

  constructor() {
    super('Train');
  }

  init(data: MissionSceneData): void {
    this.mission = getMission(data.missionId);
  }

  protected build(): void {
    const m = this.mission;
    const d = state.design(m.id);
    this.running = false;
    this.topology = boardToTopology(m, d.board);
    // Mantém os pesos dos cabos que sobreviveram a uma ida ao Design.
    const params = reconcileParams(this.topology, d.params, d.seed);
    this.trainer = new Trainer(this.topology, params, m.dataset, { ...d.hyper, epochs: 0 });
    state.saveDesign(m.id, { params, loss: this.trainer.loss });

    const top = this.addTopBar(m, 'train');
    const bottomH = 96;
    const panelW = Math.min(440, this.W * 0.36);
    const netRect = { x: 16, y: top + 10, w: this.W - panelW - 44, h: this.H - top - bottomH - 56 };
    addPanel(this, netRect, C.panelEdge, 0.55);
    this.view = new NetworkView(this, m, d.board, netRect, { labelPad: 170, nodeRadius: 28 });
    this.view.params = params;

    // Painel direito.
    const px = this.W - panelW - 16;
    const pr = { x: px, y: top + 10, w: panelW, h: this.H - top - bottomH - 20 };
    addPanel(this, pr, C.magenta, 0.85);
    const ix = px + 20;
    const iw = panelW - 40;
    body(this, ix, pr.y + 12, t('train.loss'), 18, C.magenta);
    body(this, ix + iw, pr.y + 12, t('train.target', { v: m.targetLoss }), 18, C.green).setOrigin(1, 0);
    this.chart = new LineChart(this, ix, pr.y + 38, iw, 130);
    const ry = pr.y + 178;
    const col = iw / 3;
    const stat = (i: number, label: string, color: number) => {
      body(this, ix + col * i, ry, label, 16, C.dim);
      return title(this, ix + col * i, ry + 20, '-', 22, color);
    };
    this.readout = { epoch: stat(0, t('train.epoch'), C.text), loss: stat(1, t('train.loss'), C.magenta), acc: stat(2, t('train.acc'), C.green) };

    new StepSlider(this, ix, ry + 62, iw, t('train.lr'), LR_VALUES, d.hyper.learningRate, String, (v) => {
      this.trainer.hyper.learningRate = v;
      this.saveHyper({ learningRate: v });
    }, C.magenta);
    new StepSlider(this, ix, ry + 148, iw, t('train.epochs'), EPOCH_VALUES, EPOCH_VALUES.includes(d.hyper.epochs) ? d.hyper.epochs : 200, String, (v) =>
      this.saveHyper({ epochs: v }),
    );
    const actBtn: NeonButton = new NeonButton(this, ix + iw * 0.27, ry + 268, iw * 0.52, 52, t('train.activation', { v: d.hyper.activation }), () => {
      if (this.running) return;
      const next = ACTIVATIONS[(ACTIVATIONS.indexOf(this.trainer.hyper.activation) + 1) % ACTIVATIONS.length];
      this.trainer.hyper.activation = next;
      this.saveHyper({ activation: next });
      actBtn.setLabel(t('train.activation', { v: next }));
      this.resetTrainer(this.trainer.params);
    }, { color: C.violet, size: 14 });
    new NeonButton(this, ix + iw * 0.77, ry + 268, iw * 0.44, 52, t('train.shuffle'), () => this.shuffle(), { color: C.orange, size: 13 });

    // Rodapé.
    const by = this.H - bottomH / 2 - 4;
    this.bot = new Robot(this, 56, this.H - bottomH - 22, 0.42);
    this.msg = body(this, 100, this.H - bottomH - 18, t('train.msg.idle'), 22, C.text).setOrigin(0, 0.5);
    new NeonButton(this, 110, by, 190, 76, `◀ ${t('phase.design')}`, () => this.leave('Design'), { color: C.yellow, size: 20 });
    this.trainBtn = new NeonButton(this, this.W / 2, by, 280, 76, t('train.start'), () => this.toggle(), { color: C.magenta, size: 26 });
    new NeonButton(this, this.W - 120, by, 210, 76, `${t('train.toSim')} ▶`, () => this.leave('Simulation'), { color: C.cyan, size: 20 });

    this.updateReadout();
  }

  private saveHyper(patch: Partial<{ learningRate: number; epochs: number; activation: (typeof ACTIVATIONS)[number] }>): void {
    const d = state.design(this.mission.id);
    state.saveDesign(this.mission.id, { hyper: { ...d.hyper, ...patch } });
  }

  /** Recria o treinador a partir de `params` (zera gráfico e contador). */
  private resetTrainer(params: Trainer['params']): void {
    const d = state.design(this.mission.id);
    this.trainer = new Trainer(this.topology, params, this.mission.dataset, { ...d.hyper, epochs: 0 });
    this.view.params = params;
    this.chart.draw([], this.mission.targetLoss);
    state.saveDesign(this.mission.id, { params, epochs: 0, loss: this.trainer.loss });
    this.trainBtn.setLabel(t('train.start'));
    this.updateReadout();
  }

  private shuffle(): void {
    if (this.running) return;
    const seed = state.design(this.mission.id).seed + 1;
    state.saveDesign(this.mission.id, { seed });
    audio.sfx('zap');
    this.cameras.main.flash(120, 255, 138, 31);
    this.resetTrainer(initParams(this.topology, seed));
    this.msg.setText(t('train.msg.idle'));
    this.bot.setMood('idle');
  }

  private toggle(): void {
    if (this.running) {
      this.running = false;
      this.trainBtn.setLabel(t('train.resume'));
      return;
    }
    if (this.trainer.done) {
      // Nova rodada: mais N épocas a partir dos pesos atuais.
      this.runEpochs = state.design(this.mission.id).hyper.epochs;
      this.trainer.hyper.epochs = this.trainer.epoch + this.runEpochs;
    }
    this.running = true;
    this.trainBtn.setLabel(t('train.pause'));
    this.msg.setText(t('train.msg.running'));
    this.bot.setMood('think');
  }

  private finishRun(): void {
    this.running = false;
    const tr = this.trainer;
    const good = tr.loss <= this.mission.targetLoss;
    state.saveDesign(this.mission.id, { params: tr.params, epochs: tr.epoch, loss: tr.loss });
    analytics.track('train_run', { mission: this.mission.id, epochs: tr.epoch, loss: +tr.loss.toFixed(4), activation: tr.hyper.activation });
    this.trainBtn.setLabel(t('train.again'));
    this.msg.setText(t(good ? 'train.msg.good' : 'train.msg.stuck'));
    this.bot.setMood(good ? 'happy' : 'sad');
    if (good) {
      audio.sfx('win');
      this.bot.hop();
      burst(this, this.W / 2, this.H - 60, C.green, 24, 420);
    } else {
      audio.sfx('bad');
      this.bot.shake();
    }
  }

  private updateReadout(): void {
    const tr = this.trainer;
    this.readout.epoch.setText(String(tr.epoch));
    this.readout.loss.setText(tr.loss.toFixed(3)).setColor(tr.loss <= this.mission.targetLoss ? '#39ff88' : '#ff2bd6');
    this.readout.acc.setText(`${Math.round(tr.accuracy * 100)}%`);
    this.chart.draw(tr.history, this.mission.targetLoss);
  }

  private leave(key: 'Design' | 'Simulation'): void {
    state.saveDesign(this.mission.id, { params: this.trainer.params, epochs: this.trainer.epoch, loss: this.trainer.loss });
    this.go(key, { missionId: this.mission.id });
  }

  update(time: number, delta: number): void {
    if (this.running) {
      this.owed += (this.runEpochs * Math.min(delta, 100)) / RUN_MS;
      const n = Math.floor(this.owed);
      this.owed -= n;
      this.trainer.step(n);
      this.view.params = this.trainer.params;
      this.frame++;
      if (this.frame % 5 === 0) {
        // O "motor" sobe de tom conforme a perda cai.
        audio.sfx('tick', Math.round(Phaser.Math.Clamp(1 - this.trainer.loss / 0.3, 0, 1) * 24) - 12);
        this.updateReadout();
      }
      if (this.trainer.done) {
        this.updateReadout();
        this.finishRun();
      }
    }
    // Mostra a rede "pensando": um exemplo do dataset a cada 600 ms.
    const sample = this.mission.dataset[Math.floor(time / 600) % this.mission.dataset.length];
    this.view.activity = forward(this.topology, this.trainer.params, toInputMap(this.topology, sample.inputs), this.trainer.hyper.activation).values;
    this.view.render(time);
  }
}
