import { describe, expect, it } from 'vitest';
import { autoWire, blueprintFor, boardFromTopology, boardToTopology, emptyBoard } from '../core/missions/board';
import { ACHIEVEMENTS } from '../core/progression/achievements';
import { dealFate, dealTactics, modsOf } from '../core/progression/cards';
import { capsFor } from '../core/progression/upgrades';
import { getMission } from '../core/missions/catalog';
import { GLOSSARY, searchGlossary } from '../services/i18n/glossary';
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
    s.recordResult('contagem', 1, false);
    expect(s.isUnlocked('captcha')).toBe(false); // ainda falta o labirinto
    s.reset();
    expect(s.totalStars).toBe(0);
  });

  it('descarta UMA vez o desenho salvo das missões reformadas, mantendo as estrelas', () => {
    const storage = memoryStorage();
    const old = new GameState(storage);
    old.recordResult('xor', 2, false);
    old.saveDesign('xor', { seed: 7 });
    // Simula um save da versão anterior: sem o marcador da reforma.
    const raw = JSON.parse(storage.getItem('neurobot.save.v2')!);
    delete raw.redesign;
    storage.setItem('neurobot.save.v2', JSON.stringify(raw));
    const loaded = new GameState(storage);
    expect(loaded.stars('xor')).toBe(2);
    expect(loaded.snapshot().missions.xor.design).toBeUndefined();
    // Desenhos novos feitos depois disso não são descartados no próximo carregamento.
    loaded.saveDesign('xor', { seed: 9 });
    expect(new GameState(storage).design('xor').seed).toBe(9);
    // Um save remoto antigo também não traz o desenho velho de volta.
    const remote = JSON.parse(JSON.stringify(old.snapshot()));
    delete remote.redesign;
    remote.updatedAt = Date.now() + 1000;
    const g = new GameState(memoryStorage());
    g.merge(remote);
    expect(g.snapshot().missions.xor.design).toBeUndefined();
    expect(g.stars('xor')).toBe(2);
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

describe('modo assistido', () => {
  it('não conta contadores nem conquistas, mas as estrelas valem', () => {
    const s = new GameState(memoryStorage());
    s.assisted = true;
    s.bump('neurons_placed', 50);
    s.recordResult('bercario', 3, false);
    expect(s.claimAchievements()).toEqual([]);
    expect(s.stars('bercario')).toBe(3);
    s.assisted = false;
    expect(s.achievementLevels().primeiro_neuronio).toBe(0);
    expect(s.achievementLevels().occam).toBe(0);
    s.recordResult('bercario', 3, false);
    expect(s.achievementLevels().occam).toBe(1);
  });
});

describe('glossário', () => {
  it('busca sem acento e sem caixa, e todo "veja também" existe', () => {
    expect(searchGlossary('regularizacao').map((e) => e.id)).toContain('regularizacao');
    expect(searchGlossary('relu').map((e) => e.id)).toContain('relu');
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(35);
    const ids = new Set(GLOSSARY.map((e) => e.id));
    for (const e of GLOSSARY) for (const r of e.see ?? []) expect(ids.has(r)).toBe(true);
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
    b2.links = [['forma_a', 'gemeas'], ['gemeas', 'forma_a'], ['forma_a', 'h0_1'], ['forma_a', 'h0_0'], ['h0_0', 'gemeas']];
    expect(boardToTopology(bp, b2).links).toEqual([['forma_a', 'h0_0'], ['h0_0', 'gemeas']]);
  });

  it('AUTO liga tudo em tudo e os sensores derivados só aparecem com o upgrade', () => {
    const m = getMission('fronteira');
    expect(blueprintFor(m, capsFor([])).inputs).toEqual(['x', 'y']);
    const bp = blueprintFor(m, capsFor(['features']));
    expect(bp.inputs).toContain('x2');
    const board = emptyBoard(bp);
    board.hidden[0][0] = board.hidden[0][1] = true;
    expect(autoWire(bp, board).length).toBe(5 * 2 + 2);
  });

  it('as camadas ocultas crescem ao longo do mapa e o upgrade soma mais uma (até 3)', () => {
    expect(blueprintFor(getMission('bercario'), capsFor([])).layers).toBe(1);
    expect(blueprintFor(getMission('bercario'), capsFor(['layer'])).layers).toBe(2);
    expect(blueprintFor(getMission('tangram'), capsFor([])).layers).toBe(2);
    expect(blueprintFor(getMission('turing'), capsFor([])).layers).toBe(3);
    expect(blueprintFor(getMission('turing'), capsFor(['layer'])).layers).toBe(3);
  });

  it('saves antigos levam as estrelas das missões trocadas para as novas', () => {
    const storage = memoryStorage();
    const old = new GameState(storage).snapshot();
    old.missions = { quadrantes: { stars: 2, attempts: 3 }, alvo: { stars: 1, attempts: 1 } };
    storage.setItem('neurobot.save.v2', JSON.stringify(old));
    const s = new GameState(storage);
    expect(s.stars('contagem')).toBe(2);
    expect(s.stars('quebracabeca')).toBe(1);
  });
});

describe('cartas', () => {
  it('a loja traz sempre 2 táticas diferentes, com preço; o destino é sorte ou azar', () => {
    for (let i = 0; i < 2000; i++) {
      const [a, b] = dealTactics();
      expect(a.kind).toBe('tatica');
      expect(b.kind).toBe('tatica');
      expect(a).not.toBe(b);
      expect(a.price).toBeGreaterThan(0);
      expect(['sorte', 'azar']).toContain(dealFate().kind);
    }
    expect(modsOf(undefined).lrMul).toBe(1);
  });

  it('há pelo menos 20 conquistas', () => {
    expect(ACHIEVEMENTS.length).toBeGreaterThanOrEqual(20);
  });
});
