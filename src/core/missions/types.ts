/**
 * @module core/missions/types
 * Contrato de uma missão. Para criar uma missão nova basta adicionar um objeto
 * {@link MissionDef} em `catalog.ts` e os textos em `services/i18n` — nenhuma
 * cena precisa ser alterada se uma das skins existentes servir.
 */
import { Hyper, Sample, Topology } from '../nn/network';
import { ClassCase } from '../simulation/classification';
import { MazeConfig } from '../simulation/maze';

/** Skin = "como a simulação é desenhada". Cada valor tem um arquivo em `scenes/skins`. */
export type SkinId = 'sorter' | 'maze' | 'captcha' | 'turing';

/** Dados visuais de um item da esteira (skin `sorter`). */
export interface SorterVisual {
  shape: 'circle' | 'triangle' | 'square' | 'chip';
  big?: boolean;
  /** Para `chip`: estado dos dois LEDs. */
  a?: number;
  b?: number;
}

/** Dados visuais de um quadro do CAPTCHA. */
export interface CaptchaVisual {
  /** Número de lados (0 = círculo). */
  sides: number;
  rot: number;
  noise: number;
  round: number;
}

/** Dados de uma rodada do Teste de Turing: índice das falas em `turing.q{n}` / `turing.a{n}`. */
export interface TuringVisual {
  n: number;
}

export interface MissionDef {
  /** Id estável — usado em saves, analytics e chaves de tradução (`mission.<id>.*`). */
  id: string;
  /** Posição no mapa, normalizada (0..1) dentro da área do mapa. */
  pos: { x: number; y: number };
  /** Missões que precisam estar concluídas para liberar esta. */
  requires: string[];
  skin: SkinId;
  /** Sensores disponíveis (ids traduzidos em `io.<id>`). */
  inputs: string[];
  /** Ações disponíveis. */
  outputs: string[];
  /** Quantas colunas de neurônios ocultos o editor oferece. */
  maxHiddenLayers: number;
  /** Quantos encaixes por coluna oculta. */
  maxHiddenPerLayer: number;
  /** Limite de neurônios ocultos para a 3ª estrela. */
  idealHidden: number;
  /** Perda máxima para a 2ª estrela. */
  targetLoss: number;
  /** Hiperparâmetros iniciais sugeridos. */
  defaults: Hyper;
  /** Exemplos rotulados usados no treino. */
  dataset: Sample[];
  /** Rede de referência que resolve a missão (usada nos testes e no botão AUTO). */
  idealTopology: Topology;
  /** Casos da simulação (skins de classificação). */
  cases?: ClassCase[];
  /** Fração mínima de acertos (padrão 1). */
  passRatio?: number;
  /** Configuração do labirinto (skin `maze`). */
  maze?: MazeConfig;
}
