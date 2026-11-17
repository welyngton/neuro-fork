/**
 * @module core/scoring
 * Regra de estrelas:
 *  - ★     : venceu a simulação;
 *  - ★★    : venceu E a perda final (de validação) ficou abaixo da meta da missão;
 *  - ★★★   : idem, com a energia do desenho dentro do limiar de eficiência da
 *            missão — a "navalha de Occam": a rede mais simples que resolve.
 *
 * Os critérios NÃO são exibidos ao jogador; o resultado só dá uma pista vaga.
 */
export type Stars = 0 | 1 | 2 | 3;

export interface StarInput {
  success: boolean;
  loss: number;
  targetLoss: number;
  /** Energia do desenho ({@link energyCost}). */
  cost: number;
  budget: number;
}

export function calculateStars(i: StarInput): Stars {
  if (!i.success) return 0;
  if (i.loss > i.targetLoss) return 1;
  return i.cost <= i.budget ? 3 : 2;
}
