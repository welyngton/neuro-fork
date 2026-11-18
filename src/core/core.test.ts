import { describe, expect, it } from 'vitest';
import { MISSIONS, fullyConnected } from './missions/catalog';
import { runMission } from './missions/runMission';
import { MissionDef, toSamples } from './missions/types';
import { Trainer } from './nn/Trainer';
import { Topology, activate, activateDeriv, forward, initParams, energyCost, reconcileParams, validateTopology } from './nn/network';
import { trainEnergyPerEpoch, waterPerEpoch } from './progression/resources';
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

  it('cabo congelado não muda no treino; ativação por neurônio é respeitada', () => {
    const base = fullyConnected(['a', 'b'], [2], ['y']);
    const t = { ...base, frozen: ['a->h0_0'], acts: { h0_1: 'relu' as const } };
    const p0 = initParams(t, 2);
    const data = [{ inputs: [0, 1], targets: [1] }, { inputs: [1, 0], targets: [0] }];
    const tr = new Trainer(t, p0, data, { learningRate: 0.1, epochs: 30, activation: 'tanh' }).runAll();
    expect(tr.params.weights['a->h0_0']).toBe(p0.weights['a->h0_0']);
    expect(tr.params.weights['b->h0_0']).not.toBe(p0.weights['b->h0_0']);
    const z = forward(t, p0, { a: 2, b: -3 }, 'tanh');
    expect(z.values.h0_0).toBeCloseTo(Math.tanh(z.sums.h0_0)); // padrão do treino
    expect(z.values.h0_1).toBeCloseTo(z.sums.h0_1 > 0 ? z.sums.h0_1 : 0.01 * z.sums.h0_1); // relu escolhida no neurônio
  });

  it('derivadas das ativações batem com a diferença finita', () => {
    for (const fn of ['tanh', 'sigmoid', 'relu', 'sine', 'gauss'] as const) {
      for (const z of [-1.3, -0.2, 0.4, 1.7]) {
        const h = 1e-5;
        const num = (activate(z + h, fn) - activate(z - h, fn)) / (2 * h);
        expect(activateDeriv(z, activate(z, fn), fn)).toBeCloseTo(num, 4);
      }
    }
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

  it('as camadas oferecidas nunca diminuem e terminam em redes profundas', () => {
    const layers = MISSIONS.map((m) => m.layers ?? 1);
    for (let i = 1; i < layers.length; i++) expect(layers[i]).toBeGreaterThanOrEqual(layers[i - 1]);
    expect(layers[layers.length - 1]).toBe(3);
    // As duas últimas missões têm referência com 2 camadas ocultas.
    for (const m of MISSIONS.slice(-2)) expect(m.reference.topology.hidden.length).toBeGreaterThanOrEqual(2);
  });

  for (const m of MISSIONS) {
    it(`${m.id}: a referência cabe no tabuleiro sem upgrades (o assistente AUTO consegue montá-la)`, () => {
      const t = m.reference.topology;
      expect(t.hidden.length).toBeLessThanOrEqual(m.layers ?? 1);
      for (const layer of t.hidden) expect(layer.length).toBeLessThanOrEqual(4);
      for (const [a] of t.links) expect(m.inputs.includes(a) || /^h/.test(a)).toBe(true);
      expect([50, 100, 200]).toContain({ ...m.defaults, ...m.reference.hyper }.epochs);
    });

    it(`${m.id}: rede com pesos zerados NÃO vence`, () => {
      const t = m.reference.topology;
      const p = initParams(t, 1);
      for (const k of Object.keys(p.weights)) p.weights[k] = 0;
      for (const k of Object.keys(p.biases)) p.biases[k] = 0;
      expect(runMission(m, t, p, m.defaults.activation).success).toBe(false);
    });

    it(`${m.id}: a solução de referência cabe no orçamento e vence com 2★ na maioria das sementes`, () => {
      const ref = m.reference;
      expect(energyCost(ref.topology, m.extraInputs)).toBeLessThanOrEqual(m.budget);
      expect(m.energy).toBeGreaterThan(m.budget);
      // Treinar a referência cabe no limiar (rede + treino) e usa no máximo ~half do tanque.
      const hy = { ...m.defaults, ...ref.hyper };
      const cost = energyCost(ref.topology, m.extraInputs);
      expect(cost + hy.epochs * trainEnergyPerEpoch(cost)).toBeLessThanOrEqual(m.budget);
      expect(hy.epochs * waterPerEpoch(cost, hy.learningRate)).toBeLessThanOrEqual(m.water * 0.5);
      // Nenhum cabo da referência liga sensor direto em ação.
      for (const [a, b] of ref.topology.links) expect(m.inputs.concat(m.extraInputs ?? []).includes(a) && m.outputs.includes(b)).toBe(false);
      let good = 0;
      for (let seed = 1; seed <= 10; seed++) {
        const r = attempt(m, ref.topology, seed, ref.earlyStop, { ...m.defaults, ...ref.hyper });
        if (r.win && r.loss <= m.targetLoss) good++;
      }
      expect(good).toBeGreaterThanOrEqual(5);
    });

    const min = m.minHidden ?? 1;
    if (min > 1) {
      it(`${m.id}: com ${min - 1} neurônio(s) oculto(s) a rede NÃO resolve`, () => {
        // Só com os sensores básicos (no Alvo, com os derivados: é a rota de referência).
        const small = fullyConnected(m.inputs, [min - 1], m.outputs);
        let twoStars = 0;
        for (let seed = 1; seed <= 5; seed++) {
          const r = attempt(m, small, seed, false, { ...m.defaults, epochs: 800 });
          if (r.win && r.loss <= m.targetLoss) twoStars++;
        }
        expect(twoStars).toBeLessThanOrEqual(1);
      });
    }
    if (['bercario', 'triagem', 'corredor', 'captcha'].includes(m.id)) {
      it(`${m.id}: ligar TODOS os sensores estoura o limiar de eficiência`, () => {
        const cost = energyCost(fullyConnected(m.inputs, [min], m.outputs));
        const epochs = (m.reference.hyper?.epochs ?? m.defaults.epochs);
        expect(cost + epochs * trainEnergyPerEpoch(cost)).toBeGreaterThan(m.budget);
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
