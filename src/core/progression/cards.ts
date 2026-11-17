/**
 * @module core/progression/cards
 *
 * Cartas de treino. No MEIO de cada rodada o treino para e o jogo sorteia 2
 * ou 3 cartas: táticas viradas para cima (uma decisão, cada uma com seu preço)
 * e uma carta do destino virada para baixo (sorte ou azar). O jogador escolhe
 * UMA — ou segue sem carta — e o efeito vale para o resto da rodada.
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
  { id: 'rewind', kind: 'sorte', mods: { rewind: true } },
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
 * Sorteia a mesa do meio do treino: 2 ou 3 cartas, sendo a última sempre a do
 * destino (60% sorte, 40% azar, virada para baixo) e as demais táticas diferentes.
 * @param rng fonte de aleatoriedade (injetável para testes).
 */
export function dealCards(rng: () => number = Math.random): { tactics: CardDef[]; fate: CardDef } {
  const pick = <T>(list: T[]) => list[Math.floor(rng() * list.length)];
  const pool = CARDS.filter((c) => c.kind === 'tatica');
  const tactics: CardDef[] = [];
  const n = rng() < 0.5 ? 1 : 2;
  while (tactics.length < n) {
    const c = pick(pool.filter((x) => !tactics.includes(x)));
    tactics.push(c);
  }
  const fate = pick(CARDS.filter((c) => c.kind === (rng() < 0.6 ? 'sorte' : 'azar')));
  return { tactics, fate };
}
