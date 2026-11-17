import { describe, expect, it } from 'vitest';
import { boardFromTopology, boardToTopology, emptyBoard } from '../core/missions/board';
import { getMission } from '../core/missions/catalog';
import { GameState } from './GameState';

function memoryStorage() {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) };
}

describe('GameState', () => {
  it('libera missões conforme as dependências e persiste', () => {
    const storage = memoryStorage();
    const s = new GameState(storage);
    expect(s.isUnlocked('bercario')).toBe(true);
    expect(s.isUnlocked('triagem')).toBe(false);
    expect(s.recordResult('bercario', 2, false)).toBe(true);
    expect(s.recordResult('bercario', 1, false)).toBe(false);
    expect(s.stars('bercario')).toBe(2);
    expect(new GameState(storage).isUnlocked('triagem')).toBe(true);
    s.recordResult('triagem', 1, false);
    s.recordResult('corredor', 1, false);
    expect(s.isUnlocked('labirinto')).toBe(false); // ainda falta o XOR
    s.reset();
    expect(s.totalStars).toBe(0);
  });

  it('mescla saves remotos ficando com o melhor resultado', () => {
    const a = new GameState(memoryStorage());
    const b = new GameState(memoryStorage());
    a.recordResult('bercario', 1, false);
    b.recordResult('bercario', 3, false);
    a.merge(b.snapshot());
    expect(a.stars('bercario')).toBe(3);
  });
});

describe('board', () => {
  it('converte tabuleiro <-> topologia e descarta cabos inválidos', () => {
    const m = getMission('xor');
    const board = boardFromTopology(m, m.idealTopology);
    expect(boardToTopology(m, board)).toEqual(m.idealTopology);
    const b2 = emptyBoard(m);
    b2.links = [['luz_a', 'ativar'], ['ativar', 'luz_a'], ['luz_a', 'h0_0']];
    expect(boardToTopology(m, b2).links).toEqual([['luz_a', 'ativar']]);
  });
});
