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
export type SkinId = 'sorter' | 'maze' | 'captcha' | 'turing' | 'field' | 'origami';

/** Um exemplo rotulado com as leituras por NOME de sensor (inclui sensores derivados). */
export interface DataPoint {
  in: Record<string, number>;
  targets: number[];
}

/** Dados visuais de um item da esteira (skin `sorter`). */
export interface SorterVisual {
  /**
   * `chip` = chip de dois LEDs (XOR); `tray` = bandeja com encaixes (Contagem);
   * `parallelogram` = peça inclinada do Tangram; `puzzle` = peça de quebra-cabeça
   * diante do vão onde deve encaixar.
   */
  shape: 'circle' | 'triangle' | 'square' | 'chip' | 'tray' | 'parallelogram' | 'puzzle';
  big?: boolean;
  /** Cor alternativa (sensor "cor" da Triagem). */
  alt?: boolean;
  /** Para `chip`: estado dos dois LEDs. */
  a?: number;
  b?: number;
  /** Para `tray`: o que há em cada encaixe (null = vazio). */
  cells?: (('circle' | 'triangle' | 'square') | null)[];
  /** Para `puzzle`: bordas da peça e do vão (1 = aba para fora, 0 = recorte). */
  piece?: [number, number];
  hole?: [number, number];
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

/** Vinco da folha de origami (skin `origami`): posição ao longo do papel, -1..1. */
export interface OrigamiVisual {
  x: number;
}

/** Ponto do campo 2D (skin `field`), em coordenadas -1..1. */
export interface FieldVisual {
  x: number;
  y: number;
}

export interface MissionDef {
  /** Id estável — usado em saves, analytics e chaves de tradução (`mission.<id>.*`). */
  id: string;
  /** Posição no mapa, normalizada (0..1) dentro da área do mapa. */
  pos: { x: number; y: number };
  /** Missões que precisam estar concluídas para liberar esta. */
  requires: string[];
  skin: SkinId;
  /** Sensores sempre disponíveis (ids traduzidos em `io.<id>`). */
  inputs: string[];
  /** Sensores derivados, liberados pelo upgrade "features" (ex.: x², y², x·y). */
  extraInputs?: string[];
  /** Ações disponíveis. */
  outputs: string[];
  /**
   * Camadas ocultas que o tabuleiro oferece nesta missão (padrão 1). Cresce ao
   * longo do mapa — 1 no começo, 2 no meio, 3 no fim — e o upgrade "camada
   * extra" soma mais uma (até 3).
   */
  layers?: number;
  /** Perda máxima (na validação, se houver) para a 2ª estrela. */
  targetLoss: number;
  /**
   * Limiar de eficiência: energia TOTAL (desenho + treino) para a 3ª estrela.
   * NÃO é mostrado ao jogador — descobrir o desenho e o treino enxutos faz parte do jogo.
   * No catálogo escreve-se só a parte do desenho; `withTraining` soma a do treino.
   */
  budget: number;
  /** Bateria da missão (visível): paga o desenho e, com o que sobra, o treino. */
  energy: number;
  /** Tanque de água de resfriamento do treino (preenchido por `withTraining`). */
  water: number;
  /** Hiperparâmetros iniciais sugeridos. */
  defaults: Hyper;
  /** Exemplos de TREINO (podem conter ruído e rótulos trocados). */
  train: DataPoint[];
  /** Exemplos de VALIDAÇÃO, nunca vistos no treino. Ausente = valida no próprio treino. */
  validation?: DataPoint[];
  /**
   * Solução de referência: prova (nos testes) que a missão tem saída dentro do
   * orçamento. `needs` lista os upgrades que ela pressupõe; `earlyStop` indica
   * que ela conta com a parada antecipada (melhores pesos na validação).
   */
  reference: { topology: Topology; hyper?: Partial<Hyper>; earlyStop?: boolean; needs?: string[] };
  /**
   * Menor número de neurônios ocultos que resolve (padrão 1). Os testes conferem
   * que uma rede densa com um a menos NÃO vence.
   */
  minHidden?: number;
  /** Casos da simulação (skins de classificação). */
  cases?: ClassCase[];
  /** Fração mínima de acertos (padrão 1). */
  passRatio?: number;
  /** Configuração do labirinto (skin `maze`). */
  maze?: MazeConfig;
}

/** Converte pontos nomeados em amostras na ordem dos sensores da rede. */
export function toSamples(t: Topology, points: DataPoint[]): Sample[] {
  return points.map((p) => ({ inputs: t.inputs.map((id) => p.in[id] ?? 0), targets: p.targets }));
}
