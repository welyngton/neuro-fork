/**
 * @module core/nn/network
 *
 * Núcleo da rede neural — TypeScript puro, sem Phaser, DOM ou rede.
 *
 * Tudo aqui é determinístico e testável em Node (ver `network.test.ts`).
 * As cenas do jogo NUNCA fazem contas de rede diretamente: elas montam uma
 * {@link Topology}, pedem parâmetros a {@link initParams} e chamam
 * {@link forward} / {@link trainEpoch}.
 *
 * Modelo mental:
 *  - `Topology`  = o "desenho" feito pelo jogador (quem liga em quem).
 *  - `Params`    = os números aprendidos (peso de cada cabo, bias de cada neurônio).
 *  - `forward`   = dado um conjunto de leituras dos sensores, calcula as saídas.
 *  - `trainEpoch`= uma passada de backpropagation sobre o dataset inteiro.
 */

/** Funções de ativação disponíveis para os neurônios ocultos. A saída usa sempre sigmoide. */
export type Activation = 'sigmoid' | 'tanh' | 'relu';

export const ACTIVATIONS: Activation[] = ['tanh', 'sigmoid', 'relu'];

/** Desenho da rede. Ids são strings livres; `links` é uma lista de pares [origem, destino]. */
export interface Topology {
  /** Ids dos sensores (camada de entrada), na ordem das colunas do dataset. */
  inputs: string[];
  /** Camadas ocultas, da mais próxima das entradas à mais próxima das saídas. */
  hidden: string[][];
  /** Ids das ações (camada de saída), na ordem das colunas de `targets`. */
  outputs: string[];
  /** Cabos. Devem sempre apontar "para frente" (camada menor -> camada maior). */
  links: [string, string][];
}

/** Números treináveis da rede. */
export interface Params {
  /** Peso por cabo, indexado por {@link linkKey}. */
  weights: Record<string, number>;
  /** Bias por neurônio (ocultos e saídas). */
  biases: Record<string, number>;
}

/** Um exemplo rotulado: leituras dos sensores e resposta desejada por saída. */
export interface Sample {
  inputs: number[];
  targets: number[];
}

/** Hiperparâmetros ajustáveis na fase de treino. */
export interface Hyper {
  learningRate: number;
  epochs: number;
  activation: Activation;
}

/** Estado interno do otimizador (momentum). Crie com {@link createMomentum}. */
export interface Momentum {
  w: Record<string, number>;
  b: Record<string, number>;
}

/** Resultado de um forward pass: saída final e o estado de cada neurônio (para inspeção visual). */
export interface ForwardResult {
  outputs: Record<string, number>;
  /** Valor de saída de TODO nó (sensores, ocultos e ações). */
  values: Record<string, number>;
  /** Soma ponderada (antes da ativação) de ocultos e saídas. */
  sums: Record<string, number>;
}

/** Chave canônica de um cabo. */
export function linkKey(from: string, to: string): string {
  return `${from}->${to}`;
}

/** Total de neurônios ocultos do desenho (usado na pontuação por "rede enxuta"). */
export function countHidden(t: Topology): number {
  return t.hidden.reduce((n, layer) => n + layer.length, 0);
}

/** Ids de todos os nós que possuem bias (ocultos + saídas), em ordem estável. */
export function biasNodes(t: Topology): string[] {
  return [...t.hidden.flat(), ...t.outputs];
}

/** Gerador pseudoaleatório determinístico (Mulberry32). Mesma seed => mesma sequência. */
export function createRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Aplica a função de ativação. */
export function activate(x: number, fn: Activation): number {
  switch (fn) {
    case 'sigmoid':
      return 1 / (1 + Math.exp(-Math.max(-30, Math.min(30, x))));
    case 'tanh':
      return Math.tanh(x);
    case 'relu':
      return x > 0 ? x : 0.01 * x; // leaky: evita neurônios "mortos"
  }
}

/** Derivada da ativação em função da soma `z` e da saída `a` já calculada. */
export function activateDeriv(z: number, a: number, fn: Activation): number {
  switch (fn) {
    case 'sigmoid':
      return a * (1 - a);
    case 'tanh':
      return 1 - a * a;
    case 'relu':
      return z > 0 ? 1 : 0.01;
  }
}

/**
 * Sorteia pesos e bias iniciais (uniforme em [-1, 1]) de forma reproduzível.
 * Trocar a `seed` equivale ao botão "embaralhar pesos" do jogo.
 */
export function initParams(t: Topology, seed = 1): Params {
  const rng = createRng(seed);
  const weights: Record<string, number> = {};
  const biases: Record<string, number> = {};
  for (const [a, b] of t.links) weights[linkKey(a, b)] = (rng() * 2 - 1) * 1.0;
  for (const id of biasNodes(t)) biases[id] = (rng() * 2 - 1) * 0.3;
  return { weights, biases };
}

/**
 * Reaproveita os valores de `old` nos cabos/neurônios que continuam existindo
 * e sorteia os novos. Usado quando o jogador volta ao Design e altera a rede.
 */
export function reconcileParams(t: Topology, old: Params | null, seed = 1): Params {
  const fresh = initParams(t, seed);
  if (!old) return fresh;
  for (const k of Object.keys(fresh.weights)) if (k in old.weights) fresh.weights[k] = old.weights[k];
  for (const k of Object.keys(fresh.biases)) if (k in old.biases) fresh.biases[k] = old.biases[k];
  return fresh;
}

/** Mapa destino -> lista de origens. */
function incoming(t: Topology): Map<string, string[]> {
  const m = new Map<string, string[]>();
  for (const [a, b] of t.links) {
    const l = m.get(b);
    if (l) l.push(a);
    else m.set(b, [a]);
  }
  return m;
}

/**
 * Forward pass: propaga as leituras dos sensores até as saídas.
 * @param input leituras por id de sensor (ids ausentes valem 0).
 * @param hiddenFn ativação dos neurônios ocultos (a saída é sempre sigmoide, em [0,1]).
 */
export function forward(
  t: Topology,
  p: Params,
  input: Record<string, number>,
  hiddenFn: Activation,
): ForwardResult {
  const inc = incoming(t);
  const values: Record<string, number> = {};
  const sums: Record<string, number> = {};
  for (const id of t.inputs) values[id] = input[id] ?? 0;

  const run = (id: string, fn: Activation) => {
    let z = p.biases[id] ?? 0;
    for (const from of inc.get(id) ?? []) z += (values[from] ?? 0) * (p.weights[linkKey(from, id)] ?? 0);
    sums[id] = z;
    values[id] = activate(z, fn);
  };
  for (const layer of t.hidden) for (const id of layer) run(id, hiddenFn);
  const outputs: Record<string, number> = {};
  for (const id of t.outputs) {
    run(id, 'sigmoid');
    outputs[id] = values[id];
  }
  return { outputs, values, sums };
}

/** Converte um vetor do dataset em mapa por id de sensor. */
export function toInputMap(t: Topology, inputs: number[]): Record<string, number> {
  const m: Record<string, number> = {};
  t.inputs.forEach((id, i) => (m[id] = inputs[i] ?? 0));
  return m;
}

/**
 * Decide a "ação escolhida" a partir das saídas:
 *  - 1 saída  => classe 1 se saída >= 0.5, senão classe 0;
 *  - N saídas => índice da maior saída (argmax).
 */
export function decide(t: Topology, outputs: Record<string, number>): number {
  if (t.outputs.length === 1) return (outputs[t.outputs[0]] ?? 0) >= 0.5 ? 1 : 0;
  let best = 0;
  t.outputs.forEach((id, i) => {
    if ((outputs[id] ?? 0) > (outputs[t.outputs[best]] ?? 0)) best = i;
  });
  return best;
}

/** Erro quadrático médio (MSE) da rede sobre o dataset. */
export function datasetLoss(t: Topology, p: Params, data: Sample[], hiddenFn: Activation): number {
  if (!data.length || !t.outputs.length) return 1;
  let total = 0;
  let n = 0;
  for (const s of data) {
    const r = forward(t, p, toInputMap(t, s.inputs), hiddenFn);
    t.outputs.forEach((id, i) => {
      const d = (r.outputs[id] ?? 0) - (s.targets[i] ?? 0);
      total += d * d;
      n++;
    });
  }
  return total / n;
}

/** Fração de exemplos do dataset em que a decisão da rede bate com o alvo (0..1). */
export function datasetAccuracy(t: Topology, p: Params, data: Sample[], hiddenFn: Activation): number {
  if (!data.length) return 0;
  let ok = 0;
  for (const s of data) {
    const r = forward(t, p, toInputMap(t, s.inputs), hiddenFn);
    const expected =
      t.outputs.length === 1 ? (s.targets[0] >= 0.5 ? 1 : 0) : s.targets.indexOf(Math.max(...s.targets));
    if (decide(t, r.outputs) === expected) ok++;
  }
  return ok / data.length;
}

export function createMomentum(): Momentum {
  return { w: {}, b: {} };
}

/**
 * Executa UMA época de backpropagation (gradiente em lote + momentum 0.9).
 * Não altera `p`: devolve novos parâmetros e a perda (MSE) medida antes do ajuste.
 * Funciona para qualquer grafo "para frente", inclusive com cabos que pulam camadas.
 */
export function trainEpoch(
  t: Topology,
  p: Params,
  data: Sample[],
  hyper: Pick<Hyper, 'learningRate' | 'activation'>,
  mom: Momentum,
): { params: Params; loss: number } {
  const gw: Record<string, number> = {};
  const gb: Record<string, number> = {};
  const out = new Map<string, string[]>();
  for (const [a, b] of t.links) {
    gw[linkKey(a, b)] = 0;
    const l = out.get(a);
    if (l) l.push(b);
    else out.set(a, [b]);
  }
  const nodes = biasNodes(t);
  for (const id of nodes) gb[id] = 0;

  let total = 0;
  let count = 0;
  for (const s of data) {
    const r = forward(t, p, toInputMap(t, s.inputs), hyper.activation);
    const delta: Record<string, number> = {};
    t.outputs.forEach((id, i) => {
      const a = r.values[id];
      const err = a - (s.targets[i] ?? 0);
      total += err * err;
      count++;
      delta[id] = err * activateDeriv(r.sums[id], a, 'sigmoid');
    });
    for (let l = t.hidden.length - 1; l >= 0; l--) {
      for (const id of t.hidden[l]) {
        let sum = 0;
        for (const to of out.get(id) ?? []) sum += (p.weights[linkKey(id, to)] ?? 0) * (delta[to] ?? 0);
        delta[id] = sum * activateDeriv(r.sums[id], r.values[id], hyper.activation);
      }
    }
    for (const [a, b] of t.links) gw[linkKey(a, b)] += (delta[b] ?? 0) * (r.values[a] ?? 0);
    for (const id of nodes) gb[id] += delta[id] ?? 0;
  }

  const n = Math.max(1, data.length);
  const mu = 0.9;
  const weights: Record<string, number> = {};
  const biases: Record<string, number> = {};
  for (const k of Object.keys(gw)) {
    const v = mu * (mom.w[k] ?? 0) - hyper.learningRate * (gw[k] / n);
    mom.w[k] = v;
    weights[k] = (p.weights[k] ?? 0) + v;
  }
  for (const id of nodes) {
    const v = mu * (mom.b[id] ?? 0) - hyper.learningRate * (gb[id] / n);
    mom.b[id] = v;
    biases[id] = (p.biases[id] ?? 0) + v;
  }
  return { params: { weights, biases }, loss: count ? total / count : 1 };
}

/**
 * Valida o desenho antes do treino.
 * @returns `ok` e, se inválido, um código de problema para a UI traduzir:
 *  - `no_links`      : nenhum cabo;
 *  - `output_orphan` : alguma ação não recebe sinal de nenhum sensor;
 *  - `hidden_dangling`: neurônio oculto sem entrada ou sem saída.
 */
export function validateTopology(t: Topology): { ok: boolean; issue?: 'no_links' | 'output_orphan' | 'hidden_dangling' } {
  if (!t.links.length) return { ok: false, issue: 'no_links' };
  const inc = incoming(t);
  const reach = new Set<string>(t.inputs);
  for (const id of [...t.hidden.flat(), ...t.outputs]) {
    if ((inc.get(id) ?? []).some((f) => reach.has(f))) reach.add(id);
  }
  if (t.outputs.some((o) => !reach.has(o))) return { ok: false, issue: 'output_orphan' };
  const hasOut = new Set(t.links.map((l) => l[0]));
  if (t.hidden.flat().some((h) => !reach.has(h) || !hasOut.has(h))) return { ok: false, issue: 'hidden_dangling' };
  return { ok: true };
}
