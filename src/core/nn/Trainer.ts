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
  createRng,
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
  /** Histórico de perdas de TREINO, uma por época — alimenta o gráfico. */
  readonly history: number[] = [];
  /** Histórico de perdas de VALIDAÇÃO (vazio se não houver conjunto de validação). */
  readonly valHistory: number[] = [];
  /** Perda de validação mais recente (igual à de treino quando não há validação). */
  valLoss: number;
  /** Melhor perda de validação já vista e os pesos daquele momento (para early stopping). */
  best: { loss: number; params: Params; epoch: number };
  private momentum: Momentum = createMomentum();
  private rng = createRng(12345);

  /**
   * @param validation exemplos NÃO usados no treino. A diferença entre a perda de
   *   treino e a de validação é o que revela overfitting.
   */
  constructor(
    readonly topology: Topology,
    public params: Params,
    public dataset: Sample[],
    public hyper: Hyper,
    readonly validation: Sample[] = [],
  ) {
    this.loss = datasetLoss(topology, params, dataset, hyper.activation);
    this.valLoss = validation.length ? datasetLoss(topology, params, validation, hyper.activation) : this.loss;
    this.best = { loss: this.valLoss, params, epoch: 0 };
  }

  /** `true` quando todas as épocas configuradas já rodaram. */
  get done(): boolean {
    return this.epoch >= this.hyper.epochs;
  }

  /** Acurácia atual (0..1) — na validação, se houver; senão no treino. */
  get accuracy(): number {
    return datasetAccuracy(this.topology, this.params, this.validation.length ? this.validation : this.dataset, this.hyper.activation);
  }

  /** Acurácia no conjunto de treino (0..1). */
  get trainAccuracy(): number {
    return datasetAccuracy(this.topology, this.params, this.dataset, this.hyper.activation);
  }

  /**
   * Roda até `n` épocas (para antes se atingir `hyper.epochs`).
   * @returns quantas épocas realmente rodaram.
   */
  step(n = 1): number {
    let ran = 0;
    while (ran < n && !this.done) {
      const r = trainEpoch(this.topology, this.params, this.dataset, this.hyper, this.momentum, this.rng);
      this.params = r.params;
      this.epoch++;
      ran++;
      // Proteção contra explosão numérica (taxa de aprendizado alta demais).
      this.loss = Number.isFinite(r.loss) ? r.loss : 1;
      this.history.push(this.loss);
      if (this.validation.length) {
        const v = datasetLoss(this.topology, this.params, this.validation, this.hyper.activation);
        this.valLoss = Number.isFinite(v) ? v : 1;
        this.valHistory.push(this.valLoss);
      }
      const watched = this.validation.length ? this.valLoss : this.loss;
      if (watched < this.best.loss) this.best = { loss: watched, params: this.params, epoch: this.epoch };
    }
    if (ran) {
      const l = datasetLoss(this.topology, this.params, this.dataset, this.hyper.activation);
      this.loss = Number.isFinite(l) ? l : 1;
      if (!this.validation.length) this.valLoss = this.loss;
    }
    return ran;
  }

  /** Treina tudo de uma vez (usado nos testes). */
  runAll(): this {
    this.step(this.hyper.epochs);
    return this;
  }
}
