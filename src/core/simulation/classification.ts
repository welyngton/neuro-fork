/**
 * @module core/simulation/classification
 *
 * Motor de simulação por CLASSIFICAÇÃO — puro e determinístico.
 *
 * Serve a todas as missões em que o robô recebe "casos" um a um e precisa
 * escolher uma resposta: encaixar formas, triagem, porta XOR, CAPTCHA e o
 * Teste de Turing. A aparência de cada uma fica nas *skins* de cena
 * (`src/scenes/skins`); aqui só decidimos certo/errado.
 */
import { Activation, Params, Topology, decide, forward } from '../nn/network';

/** Um caso apresentado ao robô. `visual` é opaco para o motor e interpretado pela skin. */
export interface ClassCase<V = Record<string, unknown>> {
  /** Leituras dos sensores por id. */
  inputs: Record<string, number>;
  /** Índice da resposta correta (0/1 para saída única; índice da saída para várias). */
  expected: number;
  visual: V;
}

export interface ClassStep<V = Record<string, unknown>> {
  case: ClassCase<V>;
  outputs: Record<string, number>;
  chosen: number;
  correct: boolean;
}

export interface ClassResult<V = Record<string, unknown>> {
  kind: 'classification';
  steps: ClassStep<V>[];
  correctCount: number;
  /** `true` se a fração de acertos atingiu `passRatio`. */
  success: boolean;
}

/**
 * Roda a rede sobre todos os casos.
 * @param passRatio fração mínima de acertos para vencer (1 = gabaritar).
 */
export function runClassification<V>(
  t: Topology,
  p: Params,
  fn: Activation,
  cases: ClassCase<V>[],
  passRatio = 1,
): ClassResult<V> {
  const steps = cases.map((c) => {
    const { outputs } = forward(t, p, c.inputs, fn);
    const chosen = decide(t, outputs);
    return { case: c, outputs, chosen, correct: chosen === c.expected };
  });
  const correctCount = steps.filter((s) => s.correct).length;
  return {
    kind: 'classification',
    steps,
    correctCount,
    success: cases.length > 0 && correctCount / cases.length >= passRatio - 1e-9,
  };
}
