/**
 * @module core/progression/upgrades
 *
 * Loja de upgrades: o jogador gasta as estrelas ganhas para "upar" o robô.
 * Cada upgrade libera uma ferramenta de Design ou de Treino. {@link capsFor}
 * traduz a lista de upgrades comprados nos limites efetivos do jogo.
 *
 * Para criar um upgrade: acrescente em {@link UPGRADES}, trate-o em
 * {@link capsFor} e escreva os textos `upg.<id>.t` / `upg.<id>.d` no i18n.
 */
export interface UpgradeDef {
  id: string;
  /** Preço em estrelas. */
  cost: number;
  /** Onde o efeito aparece — só para agrupar na loja. */
  area: 'design' | 'train';
}

export const UPGRADES: UpgradeDef[] = [
  { id: 'slots', cost: 2, area: 'design' },
  { id: 'autowire', cost: 2, area: 'design' },
  { id: 'layer', cost: 3, area: 'design' },
  { id: 'features', cost: 4, area: 'design' },
  { id: 'battery', cost: 3, area: 'design' },
  { id: 'epochs', cost: 2, area: 'train' },
  { id: 'earlystop', cost: 3, area: 'train' },
  { id: 'l2', cost: 3, area: 'train' },
  { id: 'dropout', cost: 3, area: 'train' },
];

/** Limites e ferramentas disponíveis para um conjunto de upgrades. */
export interface Caps {
  /** Colunas de neurônios ocultos no editor. */
  layers: number;
  /** Encaixes por coluna oculta. */
  slots: number;
  /** Botão AUTO (liga tudo em tudo). */
  autowire: boolean;
  /** Sensores derivados (x², y², x·y) nas missões que os oferecem. */
  features: boolean;
  /** Multiplicador do teto de energia das missões. */
  energyMul: number;
  /** Opções do seletor de épocas. */
  epochValues: number[];
  earlystop: boolean;
  l2: boolean;
  dropout: boolean;
}

export function capsFor(owned: readonly string[]): Caps {
  const has = (id: string) => owned.includes(id);
  return {
    layers: has('layer') ? 2 : 1,
    slots: has('slots') ? 6 : 4,
    autowire: has('autowire'),
    features: has('features'),
    epochValues: has('epochs') ? [50, 100, 200, 400, 800] : [50, 100, 200],
    energyMul: has('battery') ? 1.3 : 1,
    earlystop: has('earlystop'),
    l2: has('l2'),
    dropout: has('dropout'),
  };
}
