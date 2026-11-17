/**
 * @module core/missions/board
 *
 * "Tabuleiro" do editor de Design: quais encaixes ocultos têm neurônio e quais
 * cabos existem. É o formato salvo no progresso do jogador; a rede de verdade
 * ({@link Topology}) é derivada dele por {@link boardToTopology}.
 *
 * Colunas: 0 = sensores · 1..N = camadas ocultas · N+1 = ações.
 */
import { Topology } from '../nn/network';
import { MissionDef } from './types';

export interface Board {
  /** `hidden[coluna][encaixe]` = há neurônio ali? */
  hidden: boolean[][];
  links: [string, string][];
}

/** Id do neurônio no encaixe (coluna oculta `col`, linha `row`). */
export const slotId = (col: number, row: number) => `h${col}_${row}`;

export function emptyBoard(m: MissionDef): Board {
  return {
    hidden: Array.from({ length: m.maxHiddenLayers }, () => Array<boolean>(m.maxHiddenPerLayer).fill(false)),
    links: [],
  };
}

/** Coluna em que um nó vive, ou -1 se o id não pertence à missão/tabuleiro. */
export function nodeColumn(m: MissionDef, board: Board, id: string): number {
  if (m.inputs.includes(id)) return 0;
  if (m.outputs.includes(id)) return m.maxHiddenLayers + 1;
  const match = /^h(\d+)_(\d+)$/.exec(id);
  if (match && board.hidden[+match[1]]?.[+match[2]]) return +match[1] + 1;
  return -1;
}

/** Converte o tabuleiro na rede usada pelo treino (colunas vazias são ignoradas). */
export function boardToTopology(m: MissionDef, board: Board): Topology {
  const hidden = board.hidden
    .map((col, c) => col.map((on, r) => (on ? slotId(c, r) : '')).filter(Boolean))
    .filter((layer) => layer.length > 0);
  const links = board.links.filter(([a, b]) => {
    const ca = nodeColumn(m, board, a);
    const cb = nodeColumn(m, board, b);
    return ca >= 0 && cb > ca;
  });
  return { inputs: m.inputs, hidden, outputs: m.outputs, links };
}

/** Constrói um tabuleiro a partir de uma rede de referência (botão AUTO). */
export function boardFromTopology(m: MissionDef, t: Topology): Board {
  const board = emptyBoard(m);
  t.hidden.forEach((layer, c) => layer.forEach((_, r) => (board.hidden[c][r] = true)));
  board.links = t.links.map(([a, b]) => [a, b]);
  return board;
}
