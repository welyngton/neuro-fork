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
import { BasicShape, CaptchaVisual, CounterVisual, DataPoint, FieldVisual, MissionDef, OriAnimal, PuzzleVisual, SorterVisual, TuringVisual } from './types';

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

/* ------------------------------------------------------------------ 5. Paradoxo dos Gêmeos */
const TWIN_SHAPES: BasicShape[] = ['circle', 'triangle', 'square'];
/** Código de cada forma no sensor: círculo -1 · triângulo 0 · quadrado 1. */
const twinCode = (s: BasicShape) => TWIN_SHAPES.indexOf(s) - 1;
const twinPairs: [BasicShape, BasicShape][] = [
  ['circle', 'circle'], ['triangle', 'square'], ['square', 'square'], ['circle', 'triangle'], ['triangle', 'triangle'],
  ['square', 'circle'], ['triangle', 'circle'], ['square', 'triangle'], ['circle', 'square'], ['square', 'square'],
];
const twinCases: ClassCase[] = twinPairs.map(([a, b]) => ({
  inputs: { forma_a: twinCode(a), forma_b: twinCode(b) },
  expected: a === b ? 1 : 0,
  visual: { shape: 'pair', pair: [a, b] } satisfies SorterVisual,
}));
// Os pares iguais entram duas vezes: são só 3 entre 9 e não podem ser "esquecidos".
const twinTrain: DataPoint[] = TWIN_SHAPES.flatMap((a) => TWIN_SHAPES.flatMap((b) => Array.from({ length: a === b ? 2 : 1 }, () => point({ forma_a: twinCode(a), forma_b: twinCode(b) }, [a === b ? 1 : 0]))));

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
const COUNT_SHAPES: CounterVisual['shape'][] = ['circle', 'triangle', 'square', 'pentagon', 'hexagon'];
const COUNT_SIDES: Record<CounterVisual['shape'], number> = { circle: 0, triangle: 3, square: 4, pentagon: 5, hexagon: 6 };
const COUNT_IN = ['cantos', 'tamanho', 'giro'];
const COUNT_OUT = ['conta_circulo', 'conta_triangulo', 'conta_quadrado', 'conta_pentagono', 'conta_hexagono'];
/** Treino: cada forma em três tamanhos e três giros — o tamanho e o giro NÃO mudam a resposta. */
const contagemTrain: DataPoint[] = COUNT_SHAPES.flatMap((shape, k) =>
  [0.3, 0.65, 1].flatMap((tamanho) => [0, 0.5, 1].map((giro) => point({ cantos: COUNT_SIDES[shape] / 3, tamanho, giro }, oneHot(k, 5)))),
);
/** Esteira de 30 figuras (6 de cada), embaralhadas e giradas ao acaso. */
function buildCounting(): ClassCase[] {
  const rng = createRng(21);
  const order = COUNT_SHAPES.flatMap((_, k) => Array<number>(6).fill(k));
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map((k) => {
    const shape = COUNT_SHAPES[k];
    const rot = rng() * Math.PI * 2;
    const size = 0.35 + rng() * 0.65;
    return {
      inputs: { cantos: COUNT_SIDES[shape] / 3, tamanho: Math.round(size * 100) / 100, giro: Math.round((rot / (Math.PI * 2)) * 100) / 100 },
      expected: k,
      visual: { shape, rot, size } satisfies CounterVisual,
    };
  });
}

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

/* ------------------------------------------------------------------ 10. Origami de animais */
const ANIMALS: OriAnimal[] = ['tsuru', 'sapo', 'borboleta', 'peixe'];
const ANIMAL_IN = ['asas', 'pescoco', 'patas', 'cor'];
/**
 * Leitura típica [asas, pescoço, patas] de cada dobradura (1 = bem marcado):
 * tsuru = asas + pescoço comprido; borboleta = só asas; sapo = quatro patas; peixe = nada disso.
 */
const ANIMAL_PROTO: Record<OriAnimal, [number, number, number]> = {
  tsuru: [1, 1, 0],
  sapo: [0, 0, 1],
  borboleta: [1, 0, 0],
  peixe: [0, 0, 0],
};
/** `flip` = fração de rótulos trocados (ruído do treino). */
function animalSet(n: number, flip: number, seed: number): { points: DataPoint[]; kinds: OriAnimal[]; tilts: number[] } {
  const rng = createRng(seed);
  const points: DataPoint[] = [];
  const kinds: OriAnimal[] = [];
  const tilts: number[] = [];
  for (let i = 0; i < n; i++) {
    const kind = ANIMALS[i % 4];
    const [asas, pescoco, patas] = ANIMAL_PROTO[kind].map((v) => Math.round(Math.max(0, Math.min(1, 0.15 + v * 0.7 + (rng() - 0.5) * 0.24)) * 100) / 100);
    const label = rng() < flip ? (ANIMALS.indexOf(kind) + 1 + Math.floor(rng() * 3)) % 4 : ANIMALS.indexOf(kind);
    points.push(point({ asas, pescoco, patas, cor: Math.round(rng() * 100) / 100 }, oneHot(label, 4)));
    kinds.push(kind);
    tilts.push((rng() - 0.5) * 0.9);
  }
  return { points, kinds, tilts };
}
const animalTrain = animalSet(64, 0, 5);
const animalVal = animalSet(40, 0, 9);
// A esteira mostra 16 dobraduras (4 de cada); a validação do treino usa as 40.
const origamiCases: ClassCase[] = animalVal.points.slice(0, 16).map((p, i) => ({
  inputs: p.in,
  expected: p.targets.indexOf(1),
  visual: { shape: 'animal', animal: animalVal.kinds[i], tilt: animalVal.tilts[i] } satisfies SorterVisual,
}));

/* ------------------------------------------------------------------ 11. Quebra-cabeça 3x3 */
/**
 * O alvo é a ÚLTIMA peça de um quebra-cabeça 3×3 (canto inferior direito): duas
 * bordas retas, uma aba e um recorte — e só a peça com a aba e o recorte do jeito
 * certo serve (a "gêmea espelhada" não existe na esteira). A peça chega girada,
 * mas o robô a gira de volta: o que decide é a CONTAGEM das bordas.
 */
const PUZZLE_IN = ['abas', 'recortes', 'retas', 'giro'];
/** Bordas [cima, direita, baixo, esquerda] da peça que ENCAIXA no alvo (1 aba, -1 recorte, 0 reta). */
const PUZZLE_TARGET: PuzzleVisual['edges'] = [-1, 0, 0, 1];
const puzzleCounts = (e: number[]) => ({ abas: e.filter((x) => x > 0).length / 2, recortes: e.filter((x) => x < 0).length / 2, retas: e.filter((x) => x === 0).length / 2 });
const puzzleFits = (e: number[]) => (e.filter((x) => x === 0).length === 2 && e.filter((x) => x > 0).length === 1 ? 1 : 0);
/** Peças que NÃO servem: cantos sem o par aba+recorte, peças de borda e peças do meio. */
const PUZZLE_DECOYS: PuzzleVisual['edges'][] = [
  [0, 0, 1, 1], [0, 0, -1, -1], // cantos com duas abas / dois recortes
  [0, 1, 1, 1], [0, -1, 1, -1], [0, 1, -1, -1], [0, -1, -1, -1], // peças de borda
  [1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, 1], [-1, -1, 1, -1], [-1, -1, -1, -1], // peças do meio
];
// A peça certa é rara (1 entre 12): entra 4 vezes para a rede não aprender a "descartar tudo".
const puzzleTrain: DataPoint[] = [PUZZLE_TARGET, PUZZLE_TARGET, PUZZLE_TARGET, PUZZLE_TARGET, ...PUZZLE_DECOYS].flatMap((e) =>
  [0, 0.5, 1].map((giro) => point({ ...puzzleCounts(e), giro }, [puzzleFits(e)])),
);
const puzzleCases: ClassCase[] = (() => {
  const rng = createRng(33);
  const order: PuzzleVisual['edges'][] = [
    PUZZLE_DECOYS[3], PUZZLE_TARGET, PUZZLE_DECOYS[0], PUZZLE_DECOYS[6], PUZZLE_TARGET, PUZZLE_DECOYS[1],
    PUZZLE_DECOYS[9], PUZZLE_DECOYS[4], PUZZLE_TARGET, PUZZLE_DECOYS[8], PUZZLE_DECOYS[2], PUZZLE_TARGET,
  ];
  return order.map((edges) => {
    const rot = rng() * Math.PI * 2;
    return {
      inputs: { ...puzzleCounts(edges), giro: Math.round((rot / (Math.PI * 2)) * 100) / 100 },
      expected: puzzleFits(edges),
      visual: { edges, rot, fits: !!puzzleFits(edges) } satisfies PuzzleVisual,
    };
  });
})();

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
    inputs: ['forma_a', 'forma_b'],
    outputs: ['gemeas'],
    targetLoss: 0.05,
    budget: 10,
    energy: 22,
    defaults: { learningRate: 0.3, epochs: 200, activation: 'tanh' },
    train: twinTrain,
    // "Iguais" é uma faixa estreita da diferença entre as duas formas: dois neurônios.
    reference: { topology: fullyConnected(['forma_a', 'forma_b'], [2], ['gemeas']) },
    minHidden: 2,
    cases: twinCases,
  },
  {
    id: 'contagem',
    pos: { x: 0.5, y: 0.2 },
    requires: ['xor'],
    skin: 'counter',
    inputs: COUNT_IN,
    outputs: COUNT_OUT,
    layers: 2,
    targetLoss: 0.08,
    budget: 16,
    energy: 36,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: contagemTrain,
    // Só o número de cantos importa: tamanho e giro ficam sem cabo (3ª estrela).
    reference: { topology: denseFrom(COUNT_IN, ['cantos'], [2], COUNT_OUT) },
    minHidden: 2,
    cases: buildCounting(),
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
    skin: 'sorter',
    inputs: ANIMAL_IN,
    outputs: ANIMALS,
    layers: 3,
    targetLoss: 0.08,
    budget: 36,
    energy: 76,
    defaults: { learningRate: 0.1, epochs: 200, activation: 'tanh' },
    train: animalTrain.points,
    validation: animalVal.points,
    // 1ª camada: asas, pescoço e patas; 2ª: quem tem asas desempata pelo pescoço, quem não tem, pelas patas. A cor do papel não importa.
    reference: { topology: denseFrom(ANIMAL_IN, ['asas', 'pescoco', 'patas'], [3, 2], ANIMALS) },
    minHidden: 2,
    cases: origamiCases,
    passRatio: 0.9,
  },

  {
    id: 'quebracabeca',
    pos: { x: 0.9, y: 0.78 },
    requires: ['origami', 'captcha'],
    skin: 'puzzle',
    inputs: PUZZLE_IN,
    outputs: ['encaixar'],
    layers: 3,
    targetLoss: 0.06,
    budget: 40,
    energy: 80,
    defaults: { learningRate: 0.3, epochs: 200, activation: 'tanh' },
    train: puzzleTrain,
    // 1ª camada: lê as contagens ("é canto?", "tem aba?", "só uma aba?"); 2ª: junta tudo. O giro e os recortes não importam.
    reference: { topology: denseFrom(PUZZLE_IN, ['abas', 'retas'], [3, 4], ['encaixar']) },
    minHidden: 2,
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
