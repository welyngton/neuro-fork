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
import { Activation } from '../nn/network';
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
  { id: 'fiber', cost: 4, area: 'design' },
  { id: 'quantum', cost: 4, area: 'design' },
  { id: 'radial', cost: 4, area: 'design' },
  { id: 'epochs', cost: 2, area: 'train' },
  { id: 'earlystop', cost: 3, area: 'train' },
  { id: 'l2', cost: 3, area: 'train' },
  { id: 'dropout', cost: 3, area: 'train' },
  { id: 'cooler', cost: 3, area: 'train' },
  { id: 'chip', cost: 4, area: 'train' },
];

/** Limites e ferramentas disponíveis para um conjunto de upgrades. */
export interface Caps {
  /** Camadas ocultas além das que a missão oferece (upgrade "camada extra"). */
  extraLayers: number;
  /** Encaixes por coluna oculta. */
  slots: number;
  /** Botão LIGAR TUDO (liga tudo em tudo). */
  autowire: boolean;
  /** Sensores derivados (x², y², x·y) nas missões que os oferecem. */
  features: boolean;
  /** Multiplicador da bateria das missões. */
  energyMul: number;
  /** Preço de cada cabo (cabos multidimensionais custam metade). */
  cablePrice: number;
  /** Ativações que o pincel de ATIVAÇÃO oferece. */
  activations: Activation[];
  /** Opções do seletor de épocas. */
  epochValues: number[];
  earlystop: boolean;
  l2: boolean;
  dropout: boolean;
  /** Multiplicador do tanque de água (radiador criogênico). */
  waterMul: number;
  /** Multiplicador da energia gasta por época (chip neuromórfico). */
  trainEnergyMul: number;
}

export function capsFor(owned: readonly string[]): Caps {
  const has = (id: string) => owned.includes(id);
  const activations: Activation[] = ['tanh', 'relu', 'sigmoid'];
  if (has('quantum')) activations.push('sine');
  if (has('radial')) activations.push('gauss');
  return {
    extraLayers: has('layer') ? 1 : 0,
    slots: has('slots') ? 6 : 4,
    autowire: has('autowire'),
    features: has('features'),
    energyMul: has('battery') ? 1.3 : 1,
    cablePrice: has('fiber') ? 0.5 : 1,
    activations,
    epochValues: has('epochs') ? [50, 100, 200, 400, 800] : [50, 100, 200],
    earlystop: has('earlystop'),
    l2: has('l2'),
    dropout: has('dropout'),
    waterMul: has('cooler') ? 1.5 : 1,
    trainEnergyMul: has('chip') ? 0.7 : 1,
  };
}
