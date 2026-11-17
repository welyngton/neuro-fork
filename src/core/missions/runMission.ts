/**
 * @module core/missions/runMission
 * Ponto único que roda a simulação de uma missão, escolhendo o motor certo.
 */
import { Activation, Params, Topology } from '../nn/network';
import { ClassResult, runClassification } from '../simulation/classification';
import { MazeResult, runMaze } from '../simulation/maze';
import { MissionDef } from './types';

export type SimResult = ClassResult | MazeResult;

export function runMission(m: MissionDef, t: Topology, p: Params, fn: Activation): SimResult {
  if (m.maze) return runMaze(t, p, fn, m.maze);
  return runClassification(t, p, fn, m.cases ?? [], m.passRatio ?? 1);
}
