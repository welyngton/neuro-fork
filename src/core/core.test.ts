import { describe, expect, it } from 'vitest';
import { MISSIONS, fullyConnected } from './missions/catalog';
import { runMission } from './missions/runMission';
import { Trainer } from './nn/Trainer';
import { forward, initParams, reconcileParams, validateTopology } from './nn/network';
import { calculateStars } from './scoring';

describe('rede neural', () => {
  it('forward é determinístico e a saída fica em [0,1]', () => {
    const t = fullyConnected(['a', 'b'], [3], ['y']);
    const p = initParams(t, 5);
    const r1 = forward(t, p, { a: 1, b: 0 }, 'tanh');
    expect(forward(t, p, { a: 1, b: 0 }, 'tanh')).toEqual(r1);
    expect(r1.outputs.y).toBeGreaterThan(0);
    expect(r1.outputs.y).toBeLessThan(1);
  });

  it('valida desenhos incompletos', () => {
    expect(validateTopology({ inputs: ['a'], hidden: [], outputs: ['y'], links: [] }).issue).toBe('no_links');
    expect(validateTopology({ inputs: ['a'], hidden: [['h']], outputs: ['y'], links: [['a', 'h']] }).issue).toBe('output_orphan');
    expect(
      validateTopology({ inputs: ['a'], hidden: [['h']], outputs: ['y'], links: [['a', 'y'], ['a', 'h']] }).issue,
    ).toBe('hidden_dangling');
    expect(validateTopology(fullyConnected(['a'], [2], ['y'])).ok).toBe(true);
  });

  it('reconcileParams preserva pesos de cabos que continuam existindo', () => {
    const t1 = fullyConnected(['a'], [], ['y']);
    const p1 = initParams(t1, 3);
    const p2 = reconcileParams(fullyConnected(['a'], [1], ['y']), p1, 9);
    expect(p2.biases.y).toBe(p1.biases.y);
  });
});

describe('missões', () => {
  for (const m of MISSIONS) {
    it(`${m.id}: rede sem treino NÃO vence com pesos zerados`, () => {
      const p = initParams(m.idealTopology, 1);
      for (const k of Object.keys(p.weights)) p.weights[k] = 0;
      for (const k of Object.keys(p.biases)) p.biases[k] = 0;
      expect(runMission(m, m.idealTopology, p, m.defaults.activation).success).toBe(false);
    });

    it(`${m.id}: rede ideal treinada com os padrões vence e atinge a meta de perda`, () => {
      // Várias seeds: o botão "embaralhar" do jogo não pode cair em beco sem saída com frequência.
      let wins = 0;
      for (let seed = 1; seed <= 10; seed++) {
        const tr = new Trainer(m.idealTopology, initParams(m.idealTopology, seed), m.dataset, { ...m.defaults }).runAll();
        const ok = runMission(m, m.idealTopology, tr.params, m.defaults.activation).success && tr.loss <= m.targetLoss;
        if (ok) wins++;
        if (seed === 1) expect(ok, `seed 1 perda=${tr.loss}`).toBe(true);
      }
      expect(wins).toBeGreaterThanOrEqual(7);
    });
  }

  it('XOR não é resolvido por um único neurônio', () => {
    const m = MISSIONS.find((x) => x.id === 'xor')!;
    const t = fullyConnected(m.inputs, [], m.outputs);
    const tr = new Trainer(t, initParams(t, 1), m.dataset, { ...m.defaults }).runAll();
    expect(runMission(m, t, tr.params, 'tanh').success).toBe(false);
  });
});

describe('pontuação', () => {
  it('segue a regra de 0 a 3 estrelas', () => {
    const base = { loss: 0.01, targetLoss: 0.05, hiddenUsed: 2, idealHidden: 2 };
    expect(calculateStars({ ...base, success: false })).toBe(0);
    expect(calculateStars({ ...base, success: true, loss: 0.2 })).toBe(1);
    expect(calculateStars({ ...base, success: true, hiddenUsed: 4 })).toBe(2);
    expect(calculateStars({ ...base, success: true })).toBe(3);
  });
});
