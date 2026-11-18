/**
 * @module ui/tourScript
 * Roteiro do tour guiado da missão-tutorial (sem Phaser, para poder ser testado).
 * O motor que executa o roteiro está em `ui/Tour.ts`.
 */
export type TourSceneKey = 'Design' | 'Train' | 'Simulation';

export type Step =
  | { scene: TourSceneKey; lesson: number }
  | { scene: TourSceneKey; coach: string; target: string; wait?: string; at?: 'bottom' }
  | { scene: TourSceneKey; event: string };

/** Roteiro: lições (índice 0..8) intercaladas com a interface do Berçário. */
export const TOUR: Step[] = [
  // DESIGN
  { scene: 'Design', lesson: 0 },
  { scene: 'Design', coach: 'mission', target: 'board', at: 'bottom' },
  { scene: 'Design', lesson: 2 },
  { scene: 'Design', coach: 'sensors', target: 'sensors' },
  { scene: 'Design', lesson: 5 },
  { scene: 'Design', coach: 'actions', target: 'actions' },
  { scene: 'Design', lesson: 3 },
  { scene: 'Design', coach: 'toolNeuron', target: 'tool_neuron', wait: 'tool_neuron' },
  { scene: 'Design', coach: 'slots', target: 'slots', wait: 'neuron' },
  { scene: 'Design', lesson: 4 },
  { scene: 'Design', coach: 'toolCable', target: 'tool_cable', wait: 'tool_cable' },
  { scene: 'Design', coach: 'wire', target: 'board', wait: 'valid', at: 'bottom' },
  { scene: 'Design', coach: 'energy', target: 'energy' },
  { scene: 'Design', lesson: 1 },
  { scene: 'Design', coach: 'help', target: 'help' },
  { scene: 'Design', coach: 'toTrain', target: 'next', wait: 'train' },
  // TREINO
  { scene: 'Train', lesson: 6 },
  { scene: 'Train', coach: 'resources', target: 'resources' },
  { scene: 'Train', coach: 'chart', target: 'chart' },
  { scene: 'Train', coach: 'sliders', target: 'sliders' },
  { scene: 'Train', coach: 'train', target: 'train', wait: 'trained' },
  { scene: 'Train', lesson: 7 },
  { scene: 'Train', coach: 'toSim', target: 'sim', wait: 'sim' },
  // SIMULAÇÃO
  { scene: 'Simulation', event: 'result' },
  { scene: 'Simulation', coach: 'stars', target: 'result' },
  { scene: 'Simulation', coach: 'recap', target: 'recap' },
  { scene: 'Simulation', lesson: 8 },
];
