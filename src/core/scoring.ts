/**
 * @module core/scoring
 * Regra de estrelas, igual à do jogo original:
 *  - ★     : venceu a simulação;
 *  - ★★    : venceu E a perda final ficou abaixo da meta da missão;
 *  - ★★★   : idem, usando no máximo o número ideal de neurônios ocultos (rede enxuta).
 */
export type Stars = 0 | 1 | 2 | 3;

export interface StarInput {
  success: boolean;
  loss: number;
  targetLoss: number;
  hiddenUsed: number;
  idealHidden: number;
}

export function calculateStars(i: StarInput): Stars {
  if (!i.success) return 0;
  if (i.loss > i.targetLoss) return 1;
  return i.hiddenUsed <= i.idealHidden ? 3 : 2;
}
