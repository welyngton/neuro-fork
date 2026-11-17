/**
 * @module core/progression/resources
 *
 * Recursos do TREINO. Cada missão tem:
 *  - uma BATERIA de energia, dividida entre o hardware (o desenho, pago no
 *    Design) e o treino (o que sobra é a reserva para treinar);
 *  - um TANQUE de água para resfriamento.
 *
 * Cada época de treino gasta energia e água. Redes maiores gastam mais dos
 * dois; taxas de aprendizado altas esquentam mais (gastam mais água).
 * Se a água acaba, a rede SUPERAQUECE e todo o treino é perdido.
 *
 * As fórmulas ficam aqui para serem as mesmas no jogo, nos testes e no
 * balanceamento das missões (`catalog.ts`).
 */

/** Energia gasta por época, para uma rede de custo `designCost`. */
export function trainEnergyPerEpoch(designCost: number): number {
  return (1 + designCost / 8) / 100;
}

/** Água gasta por época, para uma rede de custo `designCost` treinando com taxa `lr`. */
export function waterPerEpoch(designCost: number, lr: number): number {
  return ((6 + designCost / 2) / 100) * (1 + lr);
}

/** Temperatura exibida (°C) para um tanque com fração `level` (0..1) de água. */
export function temperature(level: number): number {
  return Math.round(28 + (1 - Math.max(0, Math.min(1, level))) * 72);
}
