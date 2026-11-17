/**
 * @module core/missions/catalog
 *
 * Catálogo das missões, na ordem de dificuldade — do "brinquedo de bebê"
 * (encaixar formas) até zerar o jogo no Teste de Turing.
 *
 * Convenções:
 *  - `cantos` = número de lados da forma ÷ 3 (círculo 0 · triângulo 1 · quadrado 1,33 · hexágono 2);
 *  - os demais sensores valem 0 ou 1;
 *  - `targets` com 1 coluna = classe binária; com N colunas = one-hot da ação correta.
 */
import { Sample, Topology } from '../nn/network';
import { ClassCase } from '../simulation/classification';
import { createRng } from '../nn/network';
import { CaptchaVisual, MissionDef, SorterVisual, TuringVisual } from './types';

/** Monta uma rede totalmente conectada camada a camada. `hiddenSizes` = neurônios por camada oculta. */
export function fullyConnected(inputs: string[], hiddenSizes: number[], outputs: string[]): Topology {
  const hidden = hiddenSizes.map((n, l) => Array.from({ length: n }, (_, i) => `h${l}_${i}`));
  const layers = [inputs, ...hidden, outputs];
  const links: [string, string][] = [];
  for (let l = 0; l < layers.length - 1; l++) for (const a of layers[l]) for (const b of layers[l + 1]) links.push([a, b]);
  return { inputs, hidden, outputs, links };
}

const oneHot = (i: number, n: number) => Array.from({ length: n }, (_, k) => (k === i ? 1 : 0));
const SIDES: Record<string, number> = { circle: 0, triangle: 3, square: 4 };

/* ------------------------------------------------------------------ 1. Berçário */
const bercarioItems: SorterVisual['shape'][] = ['circle', 'square', 'triangle', 'circle', 'square', 'circle'];
const bercarioCases: ClassCase[] = bercarioItems.map((shape) => ({
  inputs: { cantos: SIDES[shape] / 3 },
  expected: shape === 'circle' ? 0 : 1,
  visual: { shape, big: true } satisfies SorterVisual,
}));

/* ------------------------------------------------------------------ 2. Triagem (AND) */
const triagemCases: ClassCase[] = (
  [
    ['square', 1], ['circle', 1], ['square', 0], ['circle', 0], ['square', 1], ['square', 0], ['circle', 1], ['square', 1],
  ] as [SorterVisual['shape'], number][]
).map(([shape, big]) => ({
  inputs: { cantos: SIDES[shape] / 3, grande: big },
  expected: shape === 'square' && big ? 1 : 0,
  visual: { shape, big: !!big } satisfies SorterVisual,
}));
const triagemData: Sample[] = [
  { inputs: [0, 0], targets: [0] },
  { inputs: [0, 1], targets: [0] },
  { inputs: [4 / 3, 0], targets: [0] },
  { inputs: [4 / 3, 1], targets: [1] },
];

/* ------------------------------------------------------------------ 4. XOR */
const xorPairs: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1], [1, 1], [0, 0], [0, 1], [1, 0]];
const xorCases: ClassCase[] = xorPairs.map(([a, b]) => ({
  inputs: { luz_a: a, luz_b: b },
  expected: a ^ b,
  visual: { shape: 'chip', a, b } satisfies SorterVisual,
}));

/* ------------------------------------------------------------------ 3 e 5. Labirintos */
const wallPolicy: Sample[] = [];
for (let m = 0; m < 8; m++) {
  const [f, l, r] = [(m >> 2) & 1, (m >> 1) & 1, m & 1];
  // Frente livre -> andar; senão esquerda livre -> virar à esquerda; senão -> virar à direita.
  wallPolicy.push({ inputs: [f, l, r], targets: oneHot(!f ? 0 : !l ? 1 : 2, 3) });
}
const beaconPolicy: Sample[] = [];
for (let m = 0; m < 16; m++) {
  const [f, l, r, fw] = [(m >> 3) & 1, (m >> 2) & 1, (m >> 1) & 1, m & 1];
  // Firewall no caminho -> hackear; farol à frente -> andar; senão segue o farol lateral.
  const act = f && fw ? 3 : f ? 0 : l ? 1 : r ? 2 : 1;
  beaconPolicy.push({ inputs: [f, l, r, fw], targets: oneHot(act, 4) });
}

/* ------------------------------------------------------------------ 6. CAPTCHA */
function buildCaptcha(): ClassCase[] {
  const rng = createRng(7);
  const cases: ClassCase[] = [];
  const pool = [0, 5, 6];
  for (let round = 0; round < 3; round++) {
    const tiles = Array.from({ length: 9 }, () => pool[Math.floor(rng() * pool.length)]);
    // Garante 3 triângulos por rodada em posições sorteadas.
    for (let k = 0; k < 3; ) {
      const i = Math.floor(rng() * 9);
      if (tiles[i] !== 3) {
        tiles[i] = 3;
        k++;
      }
    }
    for (const sides of tiles) {
      const noise = Math.round(rng() * 100) / 100;
      cases.push({
        inputs: { cantos: sides / 3, ruido: noise },
        expected: sides === 3 ? 1 : 0,
        visual: { sides, rot: rng() * Math.PI * 2, noise, round } satisfies CaptchaVisual,
      });
    }
  }
  return cases;
}
const captchaData: Sample[] = [0, 3, 5, 6].flatMap((s) =>
  [0, 0.5, 1].map((noise) => ({ inputs: [s / 3, noise], targets: [s === 3 ? 1 : 0] })),
);

/* ------------------------------------------------------------------ 7. Teste de Turing */
// [saudacao, pergunta, emocao] por fala do juiz (textos em `turing.q{n}`).
const turingFeatures: [number, number, number][] = [
  [1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 1, 1], [1, 1, 0], [0, 1, 0], [1, 0, 1], [0, 1, 1],
];
/** Regra do bom papo: saudação -> cumprimentar; pergunta com emoção -> brincar; pergunta -> responder; emoção -> consolar. */
const turingRule = (s: number, p: number, e: number) => (s ? 0 : p && e ? 3 : p ? 1 : 2);
const turingCases: ClassCase[] = turingFeatures.map(([s, p, e], n) => ({
  inputs: { saudacao: s, pergunta: p, emocao: e },
  expected: turingRule(s, p, e),
  visual: { n } satisfies TuringVisual,
}));
const turingData: Sample[] = [];
for (let m = 1; m < 8; m++) {
  const [s, p, e] = [(m >> 2) & 1, (m >> 1) & 1, m & 1];
  turingData.push({ inputs: [s, p, e], targets: oneHot(turingRule(s, p, e), 4) });
}

const WALL_IN = ['parede_frente', 'parede_esq', 'parede_dir'];
const BEACON_IN = ['farol_frente', 'farol_esq', 'farol_dir', 'firewall_frente'];
const TURING_OUT = ['cumprimentar', 'responder', 'consolar', 'brincar'];

/** Todas as missões, em ordem de progressão. */
export const MISSIONS: MissionDef[] = [
  {
    id: 'bercario',
    pos: { x: 0.07, y: 0.74 },
    requires: [],
    skin: 'sorter',
    inputs: ['cantos'],
    outputs: ['buraco_b'],
    maxHiddenLayers: 1,
    maxHiddenPerLayer: 2,
    idealHidden: 0,
    targetLoss: 0.05,
    defaults: { learningRate: 0.5, epochs: 100, activation: 'tanh' },
    dataset: [
      { inputs: [0], targets: [0] },
      { inputs: [1], targets: [1] },
      { inputs: [4 / 3], targets: [1] },
    ],
    idealTopology: fullyConnected(['cantos'], [], ['buraco_b']),
    cases: bercarioCases,
  },
  {
    id: 'triagem',
    pos: { x: 0.23, y: 0.36 },
    requires: ['bercario'],
    skin: 'sorter',
    inputs: ['cantos', 'grande'],
    outputs: ['buraco_b'],
    maxHiddenLayers: 1,
    maxHiddenPerLayer: 3,
    idealHidden: 0,
    targetLoss: 0.05,
    defaults: { learningRate: 0.5, epochs: 200, activation: 'tanh' },
    dataset: triagemData,
    idealTopology: fullyConnected(['cantos', 'grande'], [], ['buraco_b']),
    cases: triagemCases,
  },
  {
    id: 'corredor',
    pos: { x: 0.4, y: 0.72 },
    requires: ['triagem'],
    skin: 'maze',
    inputs: WALL_IN,
    outputs: ['andar', 'virar_esq', 'virar_dir'],
    maxHiddenLayers: 1,
    maxHiddenPerLayer: 4,
    idealHidden: 0,
    targetLoss: 0.05,
    defaults: { learningRate: 0.5, epochs: 200, activation: 'tanh' },
    dataset: wallPolicy,
    idealTopology: fullyConnected(WALL_IN, [], ['andar', 'virar_esq', 'virar_dir']),
    maze: {
      grid: [
        '#############',
        '#S....#.....#',
        '#####.#.###.#',
        '#.....#.#...#',
        '#.#####.#.###',
        '#.......#..G#',
        '#############',
      ],
      startDir: 0,
      maxSteps: 70,
    },
  },
  {
    id: 'xor',
    pos: { x: 0.43, y: 0.16 },
    requires: ['triagem'],
    skin: 'sorter',
    inputs: ['luz_a', 'luz_b'],
    outputs: ['ativar'],
    maxHiddenLayers: 1,
    maxHiddenPerLayer: 4,
    idealHidden: 2,
    targetLoss: 0.05,
    defaults: { learningRate: 0.5, epochs: 400, activation: 'tanh' },
    dataset: [
      { inputs: [0, 0], targets: [0] },
      { inputs: [0, 1], targets: [1] },
      { inputs: [1, 0], targets: [1] },
      { inputs: [1, 1], targets: [0] },
    ],
    idealTopology: fullyConnected(['luz_a', 'luz_b'], [2], ['ativar']),
    cases: xorCases,
  },
  {
    id: 'labirinto',
    pos: { x: 0.62, y: 0.46 },
    requires: ['corredor', 'xor'],
    skin: 'maze',
    inputs: BEACON_IN,
    outputs: ['andar', 'virar_esq', 'virar_dir', 'hackear'],
    maxHiddenLayers: 2,
    maxHiddenPerLayer: 4,
    idealHidden: 0,
    targetLoss: 0.05,
    defaults: { learningRate: 0.5, epochs: 400, activation: 'tanh' },
    dataset: beaconPolicy,
    idealTopology: fullyConnected(BEACON_IN, [], ['andar', 'virar_esq', 'virar_dir', 'hackear']),
    maze: {
      grid: [
        '###############',
        '#S..#.....#...#',
        '#.#.#.###.#.#.#',
        '#.#...#...F.#.#',
        '#.#####.###.#.#',
        '#...#...#...#.#',
        '###.#.###.###.#',
        '#...F.....#..G#',
        '###############',
      ],
      startDir: 0,
      maxSteps: 90,
    },
  },
  {
    id: 'captcha',
    pos: { x: 0.8, y: 0.76 },
    requires: ['labirinto'],
    skin: 'captcha',
    inputs: ['cantos', 'ruido'],
    outputs: ['marcar'],
    maxHiddenLayers: 2,
    maxHiddenPerLayer: 4,
    idealHidden: 2,
    targetLoss: 0.05,
    defaults: { learningRate: 0.3, epochs: 800, activation: 'tanh' },
    dataset: captchaData,
    idealTopology: fullyConnected(['cantos', 'ruido'], [2], ['marcar']),
    cases: buildCaptcha(),
  },
  {
    id: 'turing',
    pos: { x: 0.91, y: 0.22 },
    requires: ['captcha'],
    skin: 'turing',
    inputs: ['saudacao', 'pergunta', 'emocao'],
    outputs: TURING_OUT,
    maxHiddenLayers: 2,
    maxHiddenPerLayer: 4,
    idealHidden: 0,
    targetLoss: 0.05,
    defaults: { learningRate: 0.5, epochs: 400, activation: 'tanh' },
    dataset: turingData,
    idealTopology: fullyConnected(['saudacao', 'pergunta', 'emocao'], [], TURING_OUT),
    cases: turingCases,
  },
];

/** Id da última missão — vencê-la "zera" o jogo. */
export const FINAL_MISSION_ID = MISSIONS[MISSIONS.length - 1].id;

export function getMission(id: string): MissionDef {
  const m = MISSIONS.find((x) => x.id === id);
  if (!m) throw new Error(`Missão desconhecida: ${id}`);
  return m;
}
