import { describe, expect, it } from 'vitest';
import { MISSIONS, fullyConnected } from './missions/catalog';
import { runMission } from './missions/runMission';
import { MissionDef, toSamples } from './missions/types';
import { Trainer } from './nn/Trainer';
import { Topology, forward, initParams, networkCost, reconcileParams, validateTopology } from './nn/network';
import { calculateStars } from './scoring';

/** Treina `t` na missão e diz se venceu (e com que perda). */
function attempt(m: MissionDef, t: Topology, seed: number, earlyStop = false, hyper = m.defaults) {
  const tr = new Trainer(t, initParams(t, seed), toSamples(t, m.train), { ...hyper }, m.validation ? toSamples(t, m.validation) : []).runAll();
  const params = earlyStop ? tr.best.params : tr.params;
  const loss = earlyStop ? tr.best.loss : tr.valLoss;
  return { win: runMission(m, t, params, hyper.activation).success, loss };
}

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

  it('dropout e L2 treinam sem explodir', () => {
    const m = MISSIONS.find((x) => x.id === 'xor')!;
    const t = fullyConnected(m.inputs, [4], m.outputs);
    const tr = new Trainer(t, initParams(t, 1), toSamples(t, m.train), { ...m.defaults, dropout: 0.2, l2: 0.001 }).runAll();
    expect(Number.isFinite(tr.loss)).toBe(true);
    expect(tr.loss).toBeLessThan(0.25);
  });
});

describe('missões', () => {
  it('são 12 e todas têm requisitos válidos', () => {
    expect(MISSIONS.length).toBe(12);
    const ids = new Set(MISSIONS.map((m) => m.id));
    for (const m of MISSIONS) for (const r of m.requires) expect(ids.has(r)).toBe(true);
  });

  for (const m of MISSIONS) {
    it(`${m.id}: rede com pesos zerados NÃO vence`, () => {
      const t = m.reference.topology;
      const p = initParams(t, 1);
      for (const k of Object.keys(p.weights)) p.weights[k] = 0;
      for (const k of Object.keys(p.biases)) p.biases[k] = 0;
      expect(runMission(m, t, p, m.defaults.activation).success).toBe(false);
    });

    it(`${m.id}: a solução de referência cabe no orçamento e vence com 2★ na maioria das sementes`, () => {
      const ref = m.reference;
      expect(networkCost(ref.topology)).toBeLessThanOrEqual(m.budget);
      let good = 0;
      for (let seed = 1; seed <= 10; seed++) {
        const r = attempt(m, ref.topology, seed, ref.earlyStop, { ...m.defaults, ...ref.hyper });
        if (r.win && r.loss <= m.targetLoss) good++;
      }
      expect(good).toBeGreaterThanOrEqual(5);
    });

    const direct = fullyConnected(m.inputs, [], m.outputs);
    if (m.needsHidden) {
      it(`${m.id}: ligar sensores direto nas ações NÃO resolve`, () => {
        for (let seed = 1; seed <= 5; seed++) expect(attempt(m, direct, seed, false, { ...m.defaults, epochs: 800 }).win).toBe(false);
      });
    } else if (m.inputs.length > 1 && m.id !== 'fronteira') {
      it(`${m.id}: ligar tudo em tudo estoura o orçamento (sem 3★ de graça)`, () => {
        expect(networkCost(direct)).toBeGreaterThan(m.budget);
      });
    }
  }
});

describe('pontuação', () => {
  it('segue a regra de 0 a 3 estrelas', () => {
    const base = { loss: 0.01, targetLoss: 0.05, cost: 8, budget: 8 };
    expect(calculateStars({ ...base, success: false })).toBe(0);
    expect(calculateStars({ ...base, success: true, loss: 0.2 })).toBe(1);
    expect(calculateStars({ ...base, success: true, cost: 12 })).toBe(2);
    expect(calculateStars({ ...base, success: true })).toBe(3);
  });
});
