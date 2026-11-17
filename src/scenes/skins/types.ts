/**
 * @module scenes/skins/types
 *
 * Contrato das SKINS de simulação. Uma skin é "como a simulação aparece":
 * recebe o resultado já calculado pelo motor puro (`core/simulation`) e o
 * encena passo a passo. Ela NÃO decide nada — só anima.
 *
 * Para criar uma skin nova:
 *  1. escreva uma função {@link SkinFactory} em `scenes/skins/<nome>.ts`;
 *  2. registre-a em `scenes/skins/index.ts`;
 *  3. use o id em `MissionDef.skin`.
 */
import { MissionDef } from '../../core/missions/types';
import { SimResult } from '../../core/missions/runMission';
import { Rect } from '../../ui/theme';
import { BaseScene } from '../BaseScene';

export interface SkinContext<R extends SimResult = SimResult> {
  scene: BaseScene;
  /** Área do palco reservada para a skin. */
  rect: Rect;
  mission: MissionDef;
  result: R;
  /** Atualiza o texto do rodapé (sensores/ação do passo atual). */
  hud(text: string): void;
  /** Consulta a rede do jogador: leituras por sensor -> saída por ação. */
  predict(inputs: Record<string, number>): Record<string, number>;
}

export interface SimSkin {
  /** Quantos passos a encenação tem. */
  readonly steps: number;
  /** Anima o passo `i` e resolve quando terminar. */
  play(i: number): Promise<void>;
}

export type SkinFactory = (ctx: SkinContext) => SimSkin;
