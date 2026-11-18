/**
 * @module core/missions/board
 *
 * "Tabuleiro" do editor de Design: quais encaixes ocultos têm neurônio e quais
 * cabos existem. É o formato salvo no progresso do jogador; a rede de verdade
 * ({@link Topology}) é derivada dele por {@link boardToTopology}.
 *
 * O tamanho do tabuleiro vem de uma {@link Blueprint}: os sensores e ações da
 * missão mais os limites que os upgrades do jogador permitem.
 *
 * Colunas: 0 = sensores · 1..N = camadas ocultas · N+1 = ações.
 */
import { Activation, Topology, linkKey } from '../nn/network';
import { Caps } from '../progression/upgrades';
import { MissionDef } from './types';

/** Teto de camadas ocultas do editor. */
export const MAX_LAYERS = 3;

/** Planta do editor para uma missão + upgrades. */
export interface Blueprint {
  inputs: string[];
  outputs: string[];
  /** Colunas de neurônios ocultos. */
  layers: number;
  /** Encaixes por coluna. */
  slots: number;
}

export function blueprintFor(m: MissionDef, caps: Caps): Blueprint {
  return {
    inputs: caps.features && m.extraInputs ? [...m.inputs, ...m.extraInputs] : m.inputs,
    outputs: m.outputs,
    layers: Math.min(MAX_LAYERS, (m.layers ?? 1) + caps.extraLayers),
    slots: caps.slots,
  };
}

export interface Board {
  /** `hidden[coluna][encaixe]` = há neurônio ali? */
  hidden: boolean[][];
  links: [string, string][];
  /** Ativação escolhida por neurônio (ferramenta ATIVAÇÃO); ausente = padrão. */
  acts?: Record<string, Activation>;
  /** Cabos congelados (ferramenta TRAVA), como chaves `origem->destino`. */
  frozen?: string[];
}

/** Id do neurônio no encaixe (coluna oculta `col`, linha `row`). */
export const slotId = (col: number, row: number) => `h${col}_${row}`;

export function emptyBoard(bp: Blueprint): Board {
  return { hidden: Array.from({ length: bp.layers }, () => Array<boolean>(bp.slots).fill(false)), links: [] };
}

/**
 * Ajusta um tabuleiro salvo ao tamanho da planta atual (o jogador pode ter
 * comprado mais camadas/encaixes desde o último save). Altera e devolve `board`.
 */
export function fitBoard(bp: Blueprint, board: Board): Board {
  const old = board.hidden ?? [];
  board.hidden = Array.from({ length: bp.layers }, (_, c) => Array.from({ length: bp.slots }, (_, r) => old[c]?.[r] ?? false));
  // Saves antigos podem ter cabos sensor->ação, hoje proibidos: saem aqui.
  board.links = (board.links ?? []).filter(([a, b]) => isAllowedLink(bp, board, a, b));
  board.acts ??= {};
  board.frozen ??= [];
  return board;
}

/** Coluna em que um nó vive, ou -1 se o id não pertence à planta/tabuleiro. */
export function nodeColumn(bp: Blueprint, board: Board, id: string): number {
  if (bp.inputs.includes(id)) return 0;
  if (bp.outputs.includes(id)) return bp.layers + 1;
  const match = /^h(\d+)_(\d+)$/.exec(id);
  if (match && board.hidden[+match[1]]?.[+match[2]]) return +match[1] + 1;
  return -1;
}

/**
 * Regra de fiação do jogo: cabos andam para a direita e um sensor NUNCA se
 * liga direto numa ação — todo sinal passa por pelo menos um neurônio.
 */
export function isAllowedLink(bp: Blueprint, board: Board, a: string, b: string): boolean {
  const ca = nodeColumn(bp, board, a);
  const cb = nodeColumn(bp, board, b);
  return ca >= 0 && cb > ca && !(ca === 0 && cb === bp.layers + 1);
}

/** Converte o tabuleiro na rede usada pelo treino (colunas vazias são ignoradas). */
export function boardToTopology(bp: Blueprint, board: Board): Topology {
  const hidden = board.hidden
    .map((col, c) => col.map((on, r) => (on ? slotId(c, r) : '')).filter(Boolean))
    .filter((layer) => layer.length > 0);
  const links = board.links.filter(([a, b]) => isAllowedLink(bp, board, a, b));
  const keys = new Set(links.map(([a, b]) => linkKey(a, b)));
  const alive = new Set(hidden.flat());
  const acts = Object.fromEntries(Object.entries(board.acts ?? {}).filter(([id]) => alive.has(id)));
  return { inputs: bp.inputs, hidden, outputs: bp.outputs, links, acts, frozen: (board.frozen ?? []).filter((k) => keys.has(k)) };
}

/** Liga tudo em tudo entre colunas vizinhas ocupadas (botão AUTO). Não cria neurônios. */
export function autoWire(bp: Blueprint, board: Board): [string, string][] {
  const layers = [bp.inputs, ...boardToTopology(bp, board).hidden, bp.outputs];
  const links: [string, string][] = [];
  // Sem neurônios não há o que ligar (sensor não fala direto com ação).
  if (layers.length < 3) return [];
  for (let l = 0; l < layers.length - 1; l++) for (const a of layers[l]) for (const b of layers[l + 1]) links.push([a, b]);
  return links;
}

/** Constrói um tabuleiro a partir de uma rede (usado nos testes e no teste de fumaça). */
export function boardFromTopology(bp: Blueprint, t: Topology): Board {
  const board = emptyBoard(bp);
  t.hidden.forEach((layer, c) => layer.forEach((_, r) => (board.hidden[c][r] = true)));
  board.links = t.links.map(([a, b]) => [a, b]);
  if (t.acts) board.acts = { ...t.acts };
  if (t.frozen) board.frozen = [...t.frozen];
  return board;
}
