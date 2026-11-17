/**
 * @module core/missions/datasets
 *
 * Geradores dos conjuntos de dados 2D (missões de "campo"), inspirados no
 * TensorFlow Playground. Todos são determinísticos (seed fixa).
 *
 * Cada ponto tem coordenadas `x`, `y` em [-1, 1] e a classe 0 (aliado) ou
 * 1 (invasor). {@link makeField} devolve dois conjuntos:
 *  - `train`: com ruído nas coordenadas e alguns rótulos TROCADOS de propósito
 *    — é o que permite ao jogador ver overfitting acontecer;
 *  - `validation`: limpo e sorteado com outra seed — é o que a simulação usa.
 *
 * Os sensores derivados (`x2`, `y2`, `xy`) já vêm calculados em cada ponto;
 * a rede só os enxerga se o jogador tiver o upgrade e ligar um cabo neles.
 */
import { createRng } from '../nn/network';
import { DataPoint } from './types';

export type FieldShape = 'fronteira' | 'quadrantes' | 'ilha' | 'luas' | 'alvo';

/** Sensores derivados oferecidos nas missões de campo. */
export const FIELD_EXTRA = ['x2', 'y2', 'xy'];

/** Acrescenta os sensores derivados a um ponto (x, y). */
export function fieldInputs(x: number, y: number): Record<string, number> {
  return { x, y, x2: x * x, y2: y * y, xy: x * y };
}

/**
 * Regra de cada formato: devolve a classe e a "folga" até a fronteira
 * (pontos colados na fronteira são descartados para o problema ser justo).
 */
const RULES: Record<Exclude<FieldShape, 'luas'>, (x: number, y: number) => { cls: number; margin: number }> = {
  fronteira: (x, y) => ({ cls: y > 0.6 * x + 0.1 ? 1 : 0, margin: Math.abs(y - 0.6 * x - 0.1) }),
  quadrantes: (x, y) => ({ cls: x * y < 0 ? 1 : 0, margin: Math.min(Math.abs(x), Math.abs(y)) }),
  ilha: (x, y) => ({ cls: Math.hypot(x, y) < 0.6 ? 1 : 0, margin: Math.abs(Math.hypot(x, y) - 0.6) }),
  alvo: (x, y) => {
    const r = Math.hypot(x, y);
    return { cls: r > 0.4 && r < 0.8 ? 1 : 0, margin: Math.min(Math.abs(r - 0.4), Math.abs(r - 0.8)) };
  },
};

function sample(shape: FieldShape, rng: () => number): { x: number; y: number; cls: number } {
  if (shape === 'luas') {
    // Duas meias-luas entrelaçadas.
    const cls = rng() < 0.5 ? 0 : 1;
    const a = rng() * Math.PI;
    const jitter = () => (rng() - 0.5) * 0.12;
    return cls === 0
      ? { x: Math.cos(a) * 0.6 - 0.25 + jitter(), y: Math.sin(a) * 0.6 - 0.15 + jitter(), cls }
      : { x: 0.25 - Math.cos(a) * 0.6 + jitter(), y: 0.2 - Math.sin(a) * 0.6 + jitter(), cls };
  }
  for (;;) {
    const x = rng() * 2 - 1;
    const y = rng() * 2 - 1;
    const r = RULES[shape](x, y);
    if (r.margin > 0.07) return { x, y, cls: r.cls };
  }
}

export interface FieldData {
  train: DataPoint[];
  validation: DataPoint[];
}

/**
 * @param nTrain / nVal quantidade de pontos de treino e de validação;
 * @param flip fração de rótulos trocados no treino (ruído de rótulo).
 */
export function makeField(shape: FieldShape, seed: number, nTrain = 70, nVal = 40, flip = 0.06): FieldData {
  const rngT = createRng(seed);
  const rngV = createRng(seed + 1000);
  const train: DataPoint[] = [];
  for (let i = 0; i < nTrain; i++) {
    const p = sample(shape, rngT);
    const x = p.x + (rngT() - 0.5) * 0.08;
    const y = p.y + (rngT() - 0.5) * 0.08;
    const cls = rngT() < flip ? 1 - p.cls : p.cls;
    train.push({ in: fieldInputs(x, y), targets: [cls] });
  }
  const validation: DataPoint[] = [];
  for (let i = 0; i < nVal; i++) {
    const p = sample(shape, rngV);
    validation.push({ in: fieldInputs(p.x, p.y), targets: [p.cls] });
  }
  return { train, validation };
}
