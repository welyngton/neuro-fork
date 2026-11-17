/**
 * @module core/progression/cards
 *
 * Cartas de treino (opcionais). Antes de cada rodada o jogador pode abrir a
 * mesa: aparecem DUAS cartas de tática viradas para cima (uma decisão, cada
 * uma com seu preço) e UMA carta do destino virada para baixo (sorte ou azar).
 * A carta escolhida vale só para a próxima rodada de treino.
 *
 * Cada carta é um conceito de ML/deep learning em forma de regra — os nomes
 * vêm do baralho proposto nos slides do prof. Peng (tunagem, dropout/GatoNet,
 * overfit, early stop, stack overflow, transfer learning, vanishing gradient).
 *
 * Uma carta só descreve seus efeitos em {@link RunMods}; quem os aplica é a
 * TrainScene. Textos em `card.<id>.t` (título) e `card.<id>.d` (explicação).
 */
export type CardKind = 'tatica' | 'sorte' | 'azar';

/** Modificadores de UMA rodada de treino. Valores neutros em {@link NO_MODS}. */
export interface RunMods {
  /** Multiplica a taxa de aprendizado. */
  lrMul: number;
  /** Multiplica o número de épocas da rodada. */
  epochsMul: number;
  /** Soma à regularização L2. */
  l2Add: number;
  /** Soma ao dropout. */
  dropoutAdd: number;
  /** Ruído extra nas leituras de treino (desvio em unidades do sensor). */
  noise: number;
  /** Fração do conjunto de treino mantida (1 = tudo). */
  dataKeep: number;
  /** Duplica o treino com pequenas variações (data augmentation). */
  augment: boolean;
  /** Zera os cabos de entrada de um neurônio oculto ao acaso. */
  killNeuron: boolean;
  /** Multiplica todos os pesos no início da rodada. */
  weightScale: number;
  /** Sorteia N inicializações e fica com a de menor perda (0 = não sorteia). */
  bestOfSeeds: number;
  /** Ao terminar, volta aos melhores pesos vistos na validação. */
  earlyStop: boolean;
  /** Começa a rodada dos melhores pesos já salvos nesta missão. */
  transfer: boolean;
}

export const NO_MODS: RunMods = {
  lrMul: 1,
  epochsMul: 1,
  l2Add: 0,
  dropoutAdd: 0,
  noise: 0,
  dataKeep: 1,
  augment: false,
  killNeuron: false,
  weightScale: 1,
  bestOfSeeds: 0,
  earlyStop: false,
  transfer: false,
};

export interface CardDef {
  id: string;
  kind: CardKind;
  mods: Partial<RunMods>;
}

export const CARDS: CardDef[] = [
  // Táticas: trocas conscientes.
  { id: 'tunagem', kind: 'tatica', mods: { lrMul: 0.5, epochsMul: 1.5 } },
  { id: 'forca_bruta', kind: 'tatica', mods: { epochsMul: 2 } },
  { id: 'gatonet', kind: 'tatica', mods: { dropoutAdd: 0.2 } },
  { id: 'regularizacao', kind: 'tatica', mods: { l2Add: 0.002 } },
  { id: 'early_stop', kind: 'tatica', mods: { earlyStop: true } },
  { id: 'transfer', kind: 'tatica', mods: { transfer: true } },
  { id: 'augmentation', kind: 'tatica', mods: { augment: true } },
  // Sorte.
  { id: 'semente', kind: 'sorte', mods: { bestOfSeeds: 8 } },
  { id: 'turbo', kind: 'sorte', mods: { lrMul: 1.5, epochsMul: 1.25 } },
  { id: 'foco', kind: 'sorte', mods: { earlyStop: true, epochsMul: 1.5 } },
  // Azar.
  { id: 'vanishing', kind: 'azar', mods: { lrMul: 0.15 } },
  { id: 'ruido', kind: 'azar', mods: { noise: 0.15 } },
  { id: 'neuronio_morto', kind: 'azar', mods: { killNeuron: true } },
  { id: 'stack_overflow', kind: 'azar', mods: { weightScale: 4 } },
  { id: 'overfit', kind: 'azar', mods: { dataKeep: 0.4 } },
];

export function getCard(id: string): CardDef | undefined {
  return CARDS.find((c) => c.id === id);
}

/** Junta os efeitos de uma carta aos valores neutros. */
export function modsOf(card: CardDef | undefined): RunMods {
  return { ...NO_MODS, ...card?.mods };
}

/**
 * Abre a mesa: duas táticas diferentes e uma carta do destino (60% sorte, 40% azar).
 * @param rng fonte de aleatoriedade (injetável para testes).
 */
export function dealCards(rng: () => number = Math.random): { tactics: [CardDef, CardDef]; fate: CardDef } {
  const pick = <T>(list: T[]) => list[Math.floor(rng() * list.length)];
  const tactics = CARDS.filter((c) => c.kind === 'tatica');
  const a = pick(tactics);
  const b = pick(tactics.filter((c) => c !== a));
  const fate = pick(CARDS.filter((c) => c.kind === (rng() < 0.6 ? 'sorte' : 'azar')));
  return { tactics: [a, b], fate };
}
