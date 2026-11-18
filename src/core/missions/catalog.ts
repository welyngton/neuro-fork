/**
 * @module core/missions/catalog
 *
 * Catálogo das 12 missões, na ordem de dificuldade — do "brinquedo de bebê"
 * (encaixar formas, que também é a missão-tutorial) até zerar o jogo no Teste
 * de Turing. Cada missão traz um tipo de desafio diferente: separar formas,
 * fronteira no campo, labirintos, contar peças, montar um tangram, dobrar
 * origami, encaixar quebra-cabeça, CAPTCHA e conversa.
 *
 * As camadas ocultas crescem ao longo do mapa (`layers`): 1 no começo, 2 no
 * meio e 3 no fim, e as soluções de referência das últimas missões são redes
 * profundas com mais fios.
 *
 * Regra geral do jogo: sensores NÃO se ligam direto nas ações — todo sinal
 * passa por pelo menos um neurônio (ver `isAllowedLink` em `board.ts`).
 *
 * Princípios de dificuldade (conferidos em `core.test.ts`):
 *  - toda missão tem uma solução de referência DENTRO do limiar de eficiência (`budget`);
 *  - com menos neurônios que `minHidden`, a rede não vence;
 *  - ligar TODOS os sensores custa mais que o limiar sempre que há sensor inútil:
 *    a 3ª estrela exige escolher o que ligar (seleção de atributos).
 *
 * Convenções de dados:
 *  - `cantos` = número de lados da forma ÷ 3 (círculo 0 · triângulo 1 · quadrado 1,33 · hexágono 2);
 *  - sensores binários valem 0 ou 1; `x`, `y` e `tom` variam de -1 a 1;
 *  - `targets` com 1 coluna = classe binária; com N colunas = one-hot da ação correta.
 */
import { Topology, createRng, energyCost } from '../nn/network';
import { trainEnergyPerEpoch, waterPerEpoch } from '../progression/resources';
import { ClassCase } from '../simulation/classification';
import { FIELD_EXTRA, FieldShape, makeField } from './datasets';
import { CaptchaVisual, DataPoint, FieldVisual, MissionDef, OrigamiVisual, SorterVisual, TuringVisual } from './types';

/** Monta uma rede totalmente conectada camada a camada. `hiddenSizes` = neurônios por camada oculta. */
export function fullyConnected(inputs: string[], hiddenSizes: number[], outputs: string[]): Topology {
  const hidden = hiddenSizes.map((n, l) => Array.from({ length: n }, (_, i) => `h${l}_${i}`));
  const layers = [inputs, ...hidden, outputs];
  const links: [string, string][] = [];
  for (let l = 0; l < layers.length - 1; l++) for (const a of layers[l]) for (const b of layers[l + 1]) links.push([a, b]);
  return { inputs, hidden, outputs, links };
}

/** Rede densa que usa só ALGUNS sensores (os demais ficam sem cabo). */
function denseFrom(inputs: string[], used: string[], hiddenSizes: number[], outputs: string[]): Topology {
  return { ...fullyConnected(used, hiddenSizes, outputs), inputs };
}

const oneHot = (i: number, n: number) => Array.from({ length: n }, (_, k) => (k === i ? 1 : 0));
const SIDES: Record<string, number> = { circle: 0, triangle: 3, square: 4 };
const point = (inp: Record<string, number>, targets: number[]): DataPoint => ({ in: inp, targets });

/* ------------------------------------------------------------------ 1. Berçário */
const bercarioItems: SorterVisual['shape'][] = ['circle', 'square', 'triangle', 'circle', 'square', 'circle'];
// Além de "cantos", o robô tem dois sensores que não dizem nada sobre a regra.
const bercarioCases: ClassCase[] = bercarioItems.map((shape, i) => ({
  inputs: { cantos: SIDES[shape] / 3, grande: i % 2, cor: i % 3 === 0 ? 1 : 0 },
  expected: shape === 'circle' ? 0 : 1,
  visual: { shape, big: i % 2 === 1, alt: i % 3 === 0 } satisfies SorterVisual,
}));
const bercarioTrain: DataPoint[] = [];
for (const c of [0, 1, 4 / 3]) for (const g of [0, 1]) for (const cor of [0, 1]) bercarioTrain.push(point({ cantos: c, grande: g, cor }, [c ? 1 : 0]));

/* ------------------------------------------------------------------ 2. Triagem (E lógico + sensor inútil) */
const triagemItems: [SorterVisual['shape'], number, number][] = [
  ['square', 1, 0], ['circle', 1, 1], ['square', 0, 1], ['circle', 0, 0], ['square', 1, 1], ['square', 0, 0], ['circle', 1, 0], ['square', 1, 0],
];
const triagemCases: ClassCase[] = triagemItems.map(([shape, big, cor]) => ({
  inputs: { cantos: SIDES[shape] / 3, grande: big, cor },
  expected: shape === 'square' && big ? 1 : 0,
  visual: { shape, big: !!big, alt: !!cor } satisfies SorterVisual,
}));
const triagemTrain: DataPoint[] = [];
for (const c of [0, 4 / 3]) for (const g of [0, 1]) for (const cor of [0, 1]) triagemTrain.push(point({ cantos: c, grande: g, cor }, [c && g ? 1 : 0]));

/* ------------------------------------------------------------------ 5. XOR */
const xorPairs: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1], [1, 1], [0, 0], [0, 1], [1, 0]];
const xorCases: ClassCase[] = xorPairs.map(([a, b]) => ({
  inputs: { luz_a: a, luz_b: b },
  expected: a ^ b,
  visual: { shape: 'chip', a, b } satisfies SorterVisual,
}));

/* ------------------------------------------------------------------ 4 e 7. Labirintos */
const WALL_IN = ['parede_frente', 'parede_esq', 'parede_dir'];
const WALL_OUT = ['andar', 'virar_esq', 'virar_dir'];
const wallTrain: DataPoint[] = [];
for (let m = 0; m < 8; m++) {
  const [f, l, r] = [(m >> 2) & 1, (m >> 1) & 1, m & 1];
  // Frente livre -> andar; senão esquerda livre -> virar à esquerda; senão -> virar à direita.
  wallTrain.push(point({ parede_frente: f, parede_esq: l, parede_dir: r }, oneHot(!f ? 0 : !l ? 1 : 2, 3)));
}
const BEACON_IN = ['farol_frente', 'farol_esq', 'farol_dir', 'firewall_frente'];
const BEACON_OUT = ['andar', 'virar_esq', 'virar_dir', 'hackear'];
const beaconTrain: DataPoint[] = [];
for (let m = 0; m < 16; m++) {
  const [f, l, r, fw] = [(m >> 3) & 1, (m >> 2) & 1, (m >> 1) & 1, m & 1];
  // Firewall no caminho -> hackear; farol à frente -> andar; senão segue o farol lateral.
  const act = f && fw ? 3 : f ? 0 : l ? 1 : r ? 2 : 1;
  beaconTrain.push(point({ farol_frente: f, farol_esq: l, farol_dir: r, firewall_frente: fw }, oneHot(act, 4)));
}

/* ------------------------------------------------------------------ 9. CAPTCHA */
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
const captchaTrain: DataPoint[] = [0, 3, 5, 6].flatMap((s) =>
  [0, 0.5, 1].map((noise) => point({ cantos: s / 3, ruido: noise }, [s === 3 ? 1 : 0])),
);

/* ------------------------------------------------------------------ Campos 2D */
function fieldMission(shape: FieldShape, seed: number) {
  const data = makeField(shape, seed);
  const cases: ClassCase[] = data.validation.map((p) => ({
    inputs: p.in,
    expected: p.targets[0],
    visual: { x: p.in.x, y: p.in.y } satisfies FieldVisual,
  }));
  return { ...data, cases };
}
const FIELD_IN = ['x', 'y'];
const fronteira = fieldMission('fronteira', 11);

/* ------------------------------------------------------------------ 6. Contagem */
const SLOTS = ['slot_1', 'slot_2', 'slot_3', 'slot_4'];
/** Leituras de uma bandeja: cada encaixe vale 1 se tem peça; `soma` (derivado) = peças ÷ 4. */
const trayInputs = (bits: number[]) => ({ ...Object.fromEntries(SLOTS.map((id, i) => [id, bits[i]])), soma: bits.reduce((a, b) => a + b, 0) / 4 });
/** A caixa só fecha com EXATAMENTE duas peças: nem uma reta, nem "quanto mais melhor". */
const countRule = (bits: number[]) => (bits.reduce((a, b) => a + b, 0) === 2 ? 1 : 0);
const contagemTrain: DataPoint[] = [];
for (let mask = 0; mask < 16; mask++) {
  const bits = SLOTS.map((_, i) => (mask >> i) & 1);
  contagemTrain.push(point(trayInputs(bits), [countRule(bits)]));
}
const TRAY_SHAPES = ['circle', 'triangle', 'square'] as const;
const contagemCases: ClassCase[] = [
  [1, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [1, 0, 0, 1], [1, 1, 1, 1], [0, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 1], [0, 0, 1, 1],
].map((bits, n) => ({
  inputs: trayInputs(bits),
  expected: countRule(bits),
  visual: { shape: 'tray', cells: bits.map((b, i) => (b ? TRAY_SHAPES[(n + i) % 3] : null)) } satisfies SorterVisual,
}));

/* ------------------------------------------------------------------ 8. Tangram */
const TANGRAM_IN = ['cantos', 'grande', 'inclinado', 'cor'];
const TANGRAM_OUT = ['vela', 'bandeira', 'casco', 'proa'];
/** Barco de tangram: triângulo grande = vela, pequeno = bandeira; quadrado = casco; paralelogramo (inclinado) = proa. */
const tangramRule = (tri: boolean, big: number, tilted: number) => (tri ? (big ? 0 : 1) : tilted ? 3 : 2);
const tangramTrain: DataPoint[] = [];
for (const tri of [true, false]) for (const g of [0, 1]) for (const inc of [0, 1]) for (const cor of [0, 1]) {
  tangramTrain.push(point({ cantos: tri ? 1 : 4 / 3, grande: g, inclinado: inc, cor }, oneHot(tangramRule(tri, g, inc), 4)));
}
const tangramPieces: [boolean, number, number, number][] = [
  [true, 1, 0, 0], [false, 0, 0, 1], [true, 0, 1, 1], [false, 1, 1, 0], [false, 1, 0, 0], [true, 1, 1, 1], [false, 0, 1, 1], [true, 0, 0, 0], [false, 1, 1, 1], [true, 1, 0, 1],
];
const tangramCases: ClassCase[] = tangramPieces.map(([tri, big, inc, cor]) => ({
  inputs: { cantos: tri ? 1 : 4 / 3, grande: big, inclinado: inc, cor },
  expected: tangramRule(tri, big, inc),
  visual: { shape: tri ? 'triangle' : inc ? 'parallelogram' : 'square', big: !!big, alt: !!cor } satisfies SorterVisual,
}));

/* ------------------------------------------------------------------ 10. Origami */
/** Vincos alternados ao longo da folha: vale | montanha | vale | montanha (dobras em -0,5 · 0 · 0,5). */
const foldRule = (x: number) => Math.floor((x + 1) * 2) % 2;
function origamiSet(n: number, noise: number, seed: number): DataPoint[] {
  const rng = createRng(seed);
  const out: DataPoint[] = [];
  while (out.length < n) {
    const x = rng() * 2 - 1;
    // Pontos colados numa dobra são ambíguos demais: ficam de fora.
    if (Math.min(...[-0.5, 0, 0.5].map((b) => Math.abs(x - b))) < 0.06) continue;
    let cls = foldRule(x);
    if (rng() < noise) cls = 1 - cls;
    out.push(point({ posicao: x, espessura: rng() * 2 - 1 }, [cls]));
  }
  return out;
}
const origamiTrain = origamiSet(48, 0.08, 5);
const origamiVal = origamiSet(40, 0, 9);
const origamiCases: ClassCase[] = origamiVal.map((p) => ({ inputs: p.in, expected: p.targets[0], visual: { x: p.in.posicao } satisfies OrigamiVisual }));

/* ------------------------------------------------------------------ 11. Quebra-cabeça */
const PUZZLE_IN = ['peca_cima', 'peca_baixo', 'vao_cima', 'vao_baixo', 'cor'];
/** Encaixa quando cada borda da peça é o oposto da borda do vão (aba entra em recorte), em cima E embaixo. */
const puzzleRule = (pc: number, pb: number, vc: number, vb: number) => (pc !== vc && pb !== vb ? 1 : 0);
const puzzleTrain: DataPoint[] = [];
for (let mask = 0; mask < 32; mask++) {
  const [pc, pb, vc, vb, cor] = [0, 1, 2, 3, 4].map((i) => (mask >> i) & 1);
  puzzleTrain.push(point({ peca_cima: pc, peca_baixo: pb, vao_cima: vc, vao_baixo: vb, cor }, [puzzleRule(pc, pb, vc, vb)]));
}
const puzzleCases: ClassCase[] = [
  [1, 0, 0, 1, 0], [1, 1, 0, 0, 1], [0, 1, 0, 1, 1], [0, 0, 1, 1, 0], [1, 0, 1, 0, 1], [0, 1, 1, 0, 0], [1, 1, 0, 1, 0], [0, 0, 1, 0, 1], [1, 1, 1, 1, 1], [0, 1, 1, 0, 1],
].map(([pc, pb, vc, vb, cor]) => ({
  inputs: { peca_cima: pc, peca_baixo: pb, vao_cima: vc, vao_baixo: vb, cor },
  expected: puzzleRule(pc, pb, vc, vb),
  visual: { shape: 'puzzle', piece: [pc, pb], hole: [vc, vb], alt: !!cor } satisfies SorterVisual,
}));

/* ------------------------------------------------------------------ 12. Teste de Turing */
const TURING_IN = ['saudacao', 'pergunta', 'tom'];
const TURING_OUT = ['cumprimentar', 'responder', 'consolar', 'brincar'];
/**
 * Regra do bom papo. `tom` vai de -1 (muito negativo) a +1 (muito positivo):
 * saudação -> cumprimentar; tom EXAGERADO para qualquer lado é ironia -> brincar;
 * tom negativo moderado -> consolar; o resto -> responder.
 * "Brincar" ocupa as duas pontas do eixo: nenhuma reta separa isso.
 */
export const turingRule = (s: number, tom: number) => (s ? 0 : Math.abs(tom) >= 0.7 ? 3 : tom <= -0.25 ? 2 : 1);
// [saudacao, pergunta, tom] por fala da juíza (textos em `turing.q{n}`).
const turingLines: [number, number, number][] = [
  [1, 0, 0.2], [0, 1, 0], [0, 0, -0.4], [0, 0, -1], [1, 1, 0.3], [0, 1, 0.1], [0, 1, 1], [0, 0, -0.3], [1, 0, 0.5], [0, 1, 0],
];
const turingCases: ClassCase[] = turingLines.map(([s, p, tom], n) => ({
  inputs: { saudacao: s, pergunta: p, tom },
  expected: turingRule(s, tom),
  visual: { n } satisfies TuringVisual,
}));
const turingTrain: DataPoint[] = [];
for (const p of [0, 1]) {
  for (const tom of [-1, -0.5, 0, 0.5, 1]) turingTrain.push(point({ saudacao: 1, pergunta: p, tom }, oneHot(0, 4)));
  for (const tom of [-1, -0.85, -0.7, -0.55, -0.4, -0.25, -0.1, 0, 0.15, 0.3, 0.5, 0.7, 0.85, 1]) {
    turingTrain.push(point({ saudacao: 0, pergunta: p, tom }, oneHot(turingRule(0, tom), 4)));
  }
}

/**
 * Acrescenta o custo do TREINO ao balanceamento de uma missão, a partir da
 * solução de referência treinada pelas épocas dela:
 *  - limiar oculto (3ª estrela) += 120% da energia de treino da referência;
 *  - bateria visível          += 350% dela (folga para experimentar e errar);
 *  - tanque de água           = 250% da água que a referência gasta.
 */
function withTraining(m: Omit<MissionDef, 'water'>): MissionDef {
  const cost = energyCost(m.reference.topology, m.extraInputs);
  const hyper = { ...m.defaults, ...m.reference.hyper };
  const trainE = hyper.epochs * trainEnergyPerEpoch(cost);
  const water = hyper.epochs * waterPerEpoch(cost, hyper.learningRate);
  return {
    ...m,
    budget: m.budget + Math.ceil(trainE * 1.2),
    energy: m.energy + Math.ceil(trainE * 3.5) + 2,
    water: Math.ceil((water * 2.5) / 10) * 10,
  };
}

/** Todas as missões, em ordem de progressão. */
export const MISSIONS: MissionDef[] = (<Omit<MissionDef, 'water'>[]>[
  {
    id: 'bercario',
    pos: { x: 0.05, y: 0.8 },
    requires: [],
    skin: 'sorter',
    inputs: ['cantos', 'grande', 'cor'],
    outputs: ['buraco_b'],
    targetLoss: 0.05,
    budget: 4,
    energy: 12,
    defaults: { learningRate: 0.1, epochs: 100, activation: 'tanh' },
    train: bercarioTrain,
    reference: { topology: denseFrom(['cantos', 'grande', 'cor'], ['cantos'], [1], ['buraco_b']) },
    cases: bercarioCases,
  },
  {
    id: 'triagem',
    pos: { x: 0.13, y: 0.38 },
    requires: ['bercario'],
    skin: 'sorter',
    inputs: ['cantos', 'grande', 'cor'],
    outputs: ['buraco_b'],
    targetLoss: 0.05,
    budget: 5,
    energy: 14,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: triagemTrain,
    reference: { topology: denseFrom(['cantos', 'grande', 'cor'], ['cantos', 'grande'], [1], ['buraco_b']) },
    cases: triagemCases,
  },
  {
    id: 'fronteira',
    pos: { x: 0.23, y: 0.74 },
    requires: ['triagem'],
    skin: 'field',
    inputs: FIELD_IN,
    extraInputs: FIELD_EXTRA,
    outputs: ['invasor'],
    targetLoss: 0.06,
    budget: 5,
    energy: 14,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: fronteira.train,
    validation: fronteira.validation,
    reference: { topology: denseFrom(FIELD_IN, FIELD_IN, [1], ['invasor']) },
    cases: fronteira.cases,
    passRatio: 0.9,
  },
  {
    id: 'corredor',
    pos: { x: 0.31, y: 0.26 },
    requires: ['triagem'],
    skin: 'maze',
    inputs: WALL_IN,
    outputs: WALL_OUT,
    targetLoss: 0.05,
    budget: 14,
    energy: 30,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: wallTrain,
    // "parede_dir" é um sensor inútil para esta política.
    reference: { topology: denseFrom(WALL_IN, ['parede_frente', 'parede_esq'], [2], WALL_OUT) },
    minHidden: 2,
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
    pos: { x: 0.41, y: 0.68 },
    requires: ['fronteira'],
    skin: 'sorter',
    inputs: ['luz_a', 'luz_b'],
    outputs: ['ativar'],
    targetLoss: 0.05,
    budget: 10,
    energy: 22,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: [point({ luz_a: 0, luz_b: 0 }, [0]), point({ luz_a: 0, luz_b: 1 }, [1]), point({ luz_a: 1, luz_b: 0 }, [1]), point({ luz_a: 1, luz_b: 1 }, [0])],
    reference: { topology: fullyConnected(['luz_a', 'luz_b'], [2], ['ativar']) },
    minHidden: 2,
    cases: xorCases,
  },
  {
    id: 'contagem',
    pos: { x: 0.5, y: 0.2 },
    requires: ['xor'],
    skin: 'sorter',
    inputs: SLOTS,
    // Com o upgrade de sensores derivados, "soma" já conta as peças.
    extraInputs: ['soma'],
    outputs: ['embalar'],
    layers: 2,
    targetLoss: 0.1,
    budget: 21,
    energy: 46,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: contagemTrain,
    reference: { topology: fullyConnected(SLOTS, [3], ['embalar']) },
    minHidden: 2,
    cases: contagemCases,
    passRatio: 0.9,
  },

  {
    id: 'labirinto',
    pos: { x: 0.57, y: 0.62 },
    requires: ['corredor'],
    skin: 'maze',
    inputs: BEACON_IN,
    outputs: BEACON_OUT,
    layers: 2,
    targetLoss: 0.05,
    budget: 20,
    energy: 44,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: beaconTrain,
    reference: { topology: fullyConnected(BEACON_IN, [2], BEACON_OUT) },
    minHidden: 2,
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
    id: 'tangram',
    pos: { x: 0.66, y: 0.24 },
    requires: ['contagem'],
    skin: 'sorter',
    inputs: TANGRAM_IN,
    outputs: TANGRAM_OUT,
    layers: 2,
    targetLoss: 0.06,
    budget: 27,
    energy: 54,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: tangramTrain,
    // A cor da peça não importa: deixá-la sem cabo é parte da 3ª estrela.
    reference: { topology: denseFrom(TANGRAM_IN, ['cantos', 'grande', 'inclinado'], [3], TANGRAM_OUT) },
    minHidden: 2,
    cases: tangramCases,
  },

  {
    id: 'captcha',
    pos: { x: 0.74, y: 0.72 },
    requires: ['contagem', 'labirinto'],
    skin: 'captcha',
    inputs: ['cantos', 'ruido'],
    outputs: ['marcar'],
    layers: 2,
    targetLoss: 0.05,
    budget: 8,
    energy: 22,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: captchaTrain,
    // 3 estrelas exigem deixar o sensor "ruido" sem cabo.
    reference: { topology: denseFrom(['cantos', 'ruido'], ['cantos'], [2], ['marcar']) },
    minHidden: 2,
    cases: buildCaptcha(),
  },

  {
    id: 'origami',
    pos: { x: 0.83, y: 0.34 },
    requires: ['tangram'],
    skin: 'origami',
    inputs: ['posicao', 'espessura'],
    outputs: ['montanha'],
    layers: 3,
    targetLoss: 0.07,
    budget: 16,
    energy: 36,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: origamiTrain,
    validation: origamiVal,
    // Quatro faixas alternadas = três dobras: um neurônio por dobra (ou um neurônio quântico, seno).
    reference: { topology: denseFrom(['posicao', 'espessura'], ['posicao'], [4], ['montanha']) },
    minHidden: 3,
    cases: origamiCases,
    passRatio: 0.9,
  },

  {
    id: 'quebracabeca',
    pos: { x: 0.9, y: 0.78 },
    requires: ['origami', 'captcha'],
    skin: 'sorter',
    inputs: PUZZLE_IN,
    outputs: ['encaixar'],
    layers: 3,
    targetLoss: 0.06,
    budget: 40,
    energy: 80,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: puzzleTrain,
    // Rede profunda: a 1ª camada compara cada borda, a 2ª exige as duas ao mesmo tempo.
    reference: { topology: denseFrom(PUZZLE_IN, ['peca_cima', 'peca_baixo', 'vao_cima', 'vao_baixo'], [4, 2], ['encaixar']) },
    minHidden: 3,
    cases: puzzleCases,
  },

  {
    id: 'turing',
    pos: { x: 0.95, y: 0.16 },
    requires: ['quebracabeca'],
    skin: 'turing',
    inputs: TURING_IN,
    outputs: TURING_OUT,
    layers: 3,
    targetLoss: 0.05,
    budget: 42,
    energy: 84,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: turingTrain,
    // Duas camadas de 3: a 1ª lê o tom, a 2ª decide. "pergunta" não muda a resposta.
    reference: { topology: denseFrom(TURING_IN, ['saudacao', 'tom'], [3, 3], TURING_OUT) },
    minHidden: 3,
    cases: turingCases,
  },
]).map(withTraining);


/** Id da última missão — vencê-la "zera" o jogo. */
export const FINAL_MISSION_ID = MISSIONS[MISSIONS.length - 1].id;

export function getMission(id: string): MissionDef {
  const m = MISSIONS.find((x) => x.id === id);
  if (!m) throw new Error(`Missão desconhecida: ${id}`);
  return m;
}
