/**
 * @module core/progression/losses
 * Contagem de derrotas que dispara as dicas de deep/machine learning.
 */
/** Quantidade de dicas no i18n (`hint.0.t` … `hint.N.t`). */
export const LOSS_HINTS = 8;
/** Derrotas seguidas que disparam as dicas. */
export const LOSSES_FOR_HINTS = 3;

let losses = 0;

/** Registra uma derrota. @returns `true` quando é hora de mostrar as dicas. */
export function registerLoss(): boolean {
  losses++;
  if (losses < LOSSES_FOR_HINTS) return false;
  losses = 0;
  return true;
}

/** Vitória zera a contagem. */
export function registerWin(): void {
  losses = 0;
}
