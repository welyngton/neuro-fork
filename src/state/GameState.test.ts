import { describe, expect, it } from 'vitest';
import { autoWire, blueprintFor, boardFromTopology, boardToTopology, emptyBoard } from '../core/missions/board';
import { ACHIEVEMENTS } from '../core/progression/achievements';
import { dealCards, modsOf } from '../core/progression/cards';
import { capsFor } from '../core/progression/upgrades';
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
    s.recordResult('fronteira', 1, false);
    s.recordResult('xor', 1, false);
    s.recordResult('quadrantes', 1, false);
    expect(s.isUnlocked('captcha')).toBe(false); // ainda falta o labirinto
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

  it('loja: gasta estrelas, amplia o tabuleiro e não deixa comprar sem saldo', () => {
    const s = new GameState(memoryStorage());
    expect(s.buy('slots')).toBe(false);
    s.recordResult('bercario', 3, false);
    expect(s.balance).toBe(3);
    expect(s.buy('slots')).toBe(true);
    expect(s.buy('slots')).toBe(false);
    expect(s.balance).toBe(1);
    expect(s.design('xor').board.hidden[0].length).toBe(6);
    expect(s.buy('layer')).toBe(false);
  });

  it('conquistas: anuncia cada nível uma única vez', () => {
    const s = new GameState(memoryStorage());
    expect(s.claimAchievements()).toEqual([]);
    s.bump('neurons_placed');
    expect(s.claimAchievements()).toEqual([{ id: 'primeiro_neuronio', level: 1 }]);
    expect(s.claimAchievements()).toEqual([]);
    s.bump('neurons_placed', 30);
    expect(s.claimAchievements()).toEqual([{ id: 'primeiro_neuronio', level: 2 }]);
  });
});

describe('board', () => {
  it('converte tabuleiro <-> topologia e descarta cabos inválidos', () => {
    const m = getMission('xor');
    const bp = blueprintFor(m, capsFor([]));
    const board = boardFromTopology(bp, m.reference.topology);
    expect(boardToTopology(bp, board)).toMatchObject(m.reference.topology);
    const b2 = emptyBoard(bp);
    b2.hidden[0][0] = true;
    // Direto sensor->ação, de trás para frente e para um encaixe vazio: tudo descartado.
    b2.links = [['luz_a', 'ativar'], ['ativar', 'luz_a'], ['luz_a', 'h0_1'], ['luz_a', 'h0_0'], ['h0_0', 'ativar']];
    expect(boardToTopology(bp, b2).links).toEqual([['luz_a', 'h0_0'], ['h0_0', 'ativar']]);
  });

  it('AUTO liga tudo em tudo e os sensores derivados só aparecem com o upgrade', () => {
    const m = getMission('ilha');
    expect(blueprintFor(m, capsFor([])).inputs).toEqual(['x', 'y']);
    const bp = blueprintFor(m, capsFor(['features']));
    expect(bp.inputs).toContain('x2');
    const board = emptyBoard(bp);
    board.hidden[0][0] = board.hidden[0][1] = true;
    expect(autoWire(bp, board).length).toBe(5 * 2 + 2);
  });
});

describe('cartas', () => {
  it('a mesa traz 2 ou 3 cartas: táticas diferentes e uma do destino', () => {
    const sizes = new Set<number>();
    for (let i = 0; i < 60; i++) {
      const d = dealCards();
      sizes.add(d.tactics.length + 1);
      expect(d.tactics.every((c) => c.kind === 'tatica')).toBe(true);
      expect(new Set(d.tactics).size).toBe(d.tactics.length);
      expect(['sorte', 'azar']).toContain(d.fate.kind);
    }
    expect([...sizes].sort()).toEqual([2, 3]);
    expect(modsOf(undefined).lrMul).toBe(1);
  });

  it('há pelo menos 20 conquistas', () => {
    expect(ACHIEVEMENTS.length).toBeGreaterThanOrEqual(20);
  });
});
