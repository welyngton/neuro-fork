/**
 * @module core/nn/Trainer
 *
 * Treinador incremental: permite treinar "um pouco por frame" para que a cena
 * de treino anime o progresso sem travar a interface (substitui o Web Worker
 * + TensorFlow.js da versão original — as redes do jogo têm no máximo dezenas
 * de pesos, então o custo por época é de microssegundos).
 *
 * Uso típico:
 * ```ts
 * const trainer = new Trainer(topology, params, mission.dataset, hyper);
 * // a cada frame:
 * trainer.step(5);            // roda 5 épocas
 * chart.push(trainer.loss);   // lê o estado atual
 * if (trainer.done) ...
 * ```
 */
import {
  Hyper,
  Momentum,
  Params,
  Sample,
  Topology,
  createMomentum,
  datasetAccuracy,
  datasetLoss,
  trainEpoch,
} from './network';

export class Trainer {
  /** Época atual (0 = ainda não treinou). */
  epoch = 0;
  /** Perda (MSE) mais recente. */
  loss: number;
  /** Histórico de perdas, uma por época — alimenta o gráfico. */
  readonly history: number[] = [];
  private momentum: Momentum = createMomentum();

  constructor(
    readonly topology: Topology,
    public params: Params,
    readonly dataset: Sample[],
    public hyper: Hyper,
  ) {
    this.loss = datasetLoss(topology, params, dataset, hyper.activation);
  }

  /** `true` quando todas as épocas configuradas já rodaram. */
  get done(): boolean {
    return this.epoch >= this.hyper.epochs;
  }

  /** Acurácia atual no dataset (0..1). */
  get accuracy(): number {
    return datasetAccuracy(this.topology, this.params, this.dataset, this.hyper.activation);
  }

  /**
   * Roda até `n` épocas (para antes se atingir `hyper.epochs`).
   * @returns quantas épocas realmente rodaram.
   */
  step(n = 1): number {
    let ran = 0;
    while (ran < n && !this.done) {
      const r = trainEpoch(this.topology, this.params, this.dataset, this.hyper, this.momentum);
      this.params = r.params;
      this.epoch++;
      ran++;
      // Proteção contra explosão numérica (taxa de aprendizado alta demais).
      this.loss = Number.isFinite(r.loss) ? r.loss : 1;
      this.history.push(this.loss);
    }
    if (ran) {
      const l = datasetLoss(this.topology, this.params, this.dataset, this.hyper.activation);
      this.loss = Number.isFinite(l) ? l : 1;
    }
    return ran;
  }

  /** Treina tudo de uma vez (usado nos testes). */
  runAll(): this {
    this.step(this.hyper.epochs);
    return this;
  }
}
