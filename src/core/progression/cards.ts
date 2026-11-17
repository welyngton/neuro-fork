/**
 * @module core/progression/cards
 *
 * Cartas de treino, em dois momentos:
 *  - LOJA DE TÁTICAS: no meio de cada rodada o treino para e oferece 2 cartas
 *    de tática à vista, cada uma com preço em energia. O jogador compra UMA
 *    ou segue sem comprar;
 *  - DESTINO: às vezes, num momento aleatório da rodada, surge sozinha uma
 *    carta virada (sorte ou azar). O jogador aceita (e descobre) ou passa.
 * O efeito vale para o resto da rodada.
 *
 * Cada carta é um conceito de ML/deep learning em forma de regra — os nomes
 * vêm do baralho proposto nos slides do prof. Peng (tunagem, dropout/GatoNet,
 * overfit, early stop, stack overflow, transfer learning, vanishing gradient).
 *
 * Uma carta só descreve seus efeitos em {@link RunMods}; quem os aplica é a
 * TrainScene. Textos em `card.<id>.t` (título) e `card.<id>.d` (explicação).
 */
export type CardKind = 'tatica' | 'sorte' | 'azar';

/** Modificadores aplicados no meio de uma rodada. Valores neutros em {@link NO_MODS}. */
export interface RunMods {
  /** Multiplica a taxa de aprendizado. */
  lrMul: number;
  /** Multiplica as épocas que FALTAM na rodada. */
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
  /** Multiplica todos os pesos na hora. */
  weightScale: number;
  /** Volta já para os melhores pesos vistos nesta rodada. */
  rewind: boolean;
  /** Ao terminar, volta aos melhores pesos vistos na validação. */
  earlyStop: boolean;
  /** Troca os pesos atuais pelos melhores já salvos nesta missão. */
  transfer: boolean;
  /** Soma (ou tira) água do tanque, em fração do tanque cheio. */
  waterFrac: number;
  /** Devolve energia à reserva de treino. */
  energyRefund: number;
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
  rewind: false,
  earlyStop: false,
  transfer: false,
  waterFrac: 0,
  energyRefund: 0,
};

export interface CardDef {
  id: string;
  kind: CardKind;
  mods: Partial<RunMods>;
  /** Preço em energia (só táticas). */
  price?: number;
}

export const CARDS: CardDef[] = [
  // Táticas (compradas com energia): trocas conscientes.
  { id: 'tunagem', kind: 'tatica', price: 2, mods: { lrMul: 0.5, epochsMul: 1.5 } },
  { id: 'forca_bruta', kind: 'tatica', price: 3, mods: { epochsMul: 2 } },
  { id: 'gatonet', kind: 'tatica', price: 2, mods: { dropoutAdd: 0.2 } },
  { id: 'regularizacao', kind: 'tatica', price: 2, mods: { l2Add: 0.002 } },
  { id: 'early_stop', kind: 'tatica', price: 3, mods: { earlyStop: true } },
  { id: 'transfer', kind: 'tatica', price: 4, mods: { transfer: true } },
  { id: 'augmentation', kind: 'tatica', price: 2, mods: { augment: true } },
  { id: 'gelo', kind: 'tatica', price: 3, mods: { waterFrac: 0.4 } },
  // Sorte.
  { id: 'rewind', kind: 'sorte', mods: { rewind: true } },
  { id: 'turbo', kind: 'sorte', mods: { lrMul: 1.5, epochsMul: 1.25 } },
  { id: 'foco', kind: 'sorte', mods: { earlyStop: true, epochsMul: 1.5 } },
  { id: 'chuva', kind: 'sorte', mods: { waterFrac: 0.5 } },
  { id: 'subsidio', kind: 'sorte', mods: { energyRefund: 4 } },
  // Azar.
  { id: 'vanishing', kind: 'azar', mods: { lrMul: 0.15 } },
  { id: 'ruido', kind: 'azar', mods: { noise: 0.15 } },
  { id: 'neuronio_morto', kind: 'azar', mods: { killNeuron: true } },
  { id: 'stack_overflow', kind: 'azar', mods: { weightScale: 4 } },
  { id: 'overfit', kind: 'azar', mods: { dataKeep: 0.4 } },
  { id: 'vazamento', kind: 'azar', mods: { waterFrac: -0.3 } },
];

export function getCard(id: string): CardDef | undefined {
  return CARDS.find((c) => c.id === id);
}

/** Junta os efeitos de uma carta aos valores neutros. */
export function modsOf(card: CardDef | undefined): RunMods {
  return { ...NO_MODS, ...card?.mods };
}

/** Loja do meio do treino: sempre 2 táticas diferentes. */
export function dealTactics(rng: () => number = Math.random): [CardDef, CardDef] {
  const pool = CARDS.filter((c) => c.kind === 'tatica');
  const a = pool[Math.floor(rng() * pool.length)];
  const rest = pool.filter((c) => c !== a);
  return [a, rest[Math.floor(rng() * rest.length)]];
}

/** Carta do destino: 60% sorte, 40% azar. */
export function dealFate(rng: () => number = Math.random): CardDef {
  const kind = rng() < 0.6 ? 'sorte' : 'azar';
  const pool = CARDS.filter((c) => c.kind === kind);
  return pool[Math.floor(rng() * pool.length)];
}
