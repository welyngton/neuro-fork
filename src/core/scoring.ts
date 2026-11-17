/**
 * @module core/scoring
 * Regra de estrelas:
 *  - ★     : venceu a simulação;
 *  - ★★    : venceu E a perda final (de validação) ficou abaixo da meta da missão;
 *  - ★★★   : idem, com o custo do desenho (cabos + neurônios ocultos) dentro do
 *            orçamento — a "navalha de Occam": a rede mais simples que resolve.
 */
export type Stars = 0 | 1 | 2 | 3;

export interface StarInput {
  success: boolean;
  loss: number;
  targetLoss: number;
  /** Custo do desenho ({@link networkCost}). */
  cost: number;
  budget: number;
}

export function calculateStars(i: StarInput): Stars {
  if (!i.success) return 0;
  if (i.loss > i.targetLoss) return 1;
  return i.cost <= i.budget ? 3 : 2;
}
