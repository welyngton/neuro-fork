import { describe, expect, it } from 'vitest';
import { registerLoss, registerWin } from './losses';

describe('dicas após derrotas', () => {
  it('dispara na 3ª derrota e uma vitória zera a contagem', () => {
    registerWin();
    expect([registerLoss(), registerLoss(), registerLoss()]).toEqual([false, false, true]);
    expect([registerLoss(), registerLoss()]).toEqual([false, false]);
    registerWin();
    expect([registerLoss(), registerLoss(), registerLoss()]).toEqual([false, false, true]);
  });
});
