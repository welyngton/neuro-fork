/**
 * @module core/simulation/maze
 *
 * Motor de simulação de LABIRINTO em grade — puro e determinístico.
 *
 * O robô ocupa uma célula e olha para uma direção. A cada passo o motor:
 *  1. lê os sensores ({@link readSensors});
 *  2. roda a rede e escolhe a ação de maior saída;
 *  3. aplica a ação e registra um quadro ({@link MazeFrame}) para a skin animar.
 *
 * Legenda do mapa (uma string por linha):
 *  `#` parede · `.` livre · `S` início · `G` objetivo · `F` firewall (precisa de `hackear`)
 *
 * Sensores (valem 0 ou 1; a rede só recebe os que a missão declarar em `inputs`):
 *  - `parede_frente|esq|dir`   : há parede na célula vizinha;
 *  - `farol_frente|esq|dir`    : andar para lá APROXIMA do objetivo (gradiente BFS);
 *  - `firewall_frente`         : há um firewall ativo logo à frente.
 *
 * Ações: `andar`, `virar_esq`, `virar_dir`, `hackear`.
 */
import { Activation, Params, Topology, decide, forward } from '../nn/network';

export interface MazeConfig {
  grid: string[];
  /** Direção inicial: 0 = leste, 1 = sul, 2 = oeste, 3 = norte. */
  startDir: number;
  maxSteps: number;
}

export type MazeEvent = 'move' | 'turn' | 'hack' | 'idle' | 'crash' | 'goal' | 'timeout';

export interface MazeFrame {
  x: number;
  y: number;
  dir: number;
  action: string;
  event: MazeEvent;
  sensors: Record<string, number>;
  /** Firewall derrubado neste passo, se houver. */
  hacked?: { x: number; y: number };
}

export interface MazeResult {
  kind: 'maze';
  frames: MazeFrame[];
  start: { x: number; y: number; dir: number };
  goal: { x: number; y: number };
  outcome: 'goal' | 'crash' | 'timeout';
  success: boolean;
}

const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

/** Localiza um caractere no mapa. */
export function findCell(grid: string[], ch: string): { x: number; y: number } {
  for (let y = 0; y < grid.length; y++) {
    const x = grid[y].indexOf(ch);
    if (x >= 0) return { x, y };
  }
  throw new Error(`Mapa sem a célula "${ch}"`);
}

/** Distância (em passos) de cada célula até o objetivo; paredes ficam com Infinity. */
export function distanceField(grid: string[]): number[][] {
  const g = findCell(grid, 'G');
  const dist = grid.map((row) => Array.from(row, () => Infinity));
  dist[g.y][g.x] = 0;
  const queue = [g];
  while (queue.length) {
    const c = queue.shift()!;
    for (let d = 0; d < 4; d++) {
      const nx = c.x + DX[d];
      const ny = c.y + DY[d];
      if (grid[ny]?.[nx] === undefined || grid[ny][nx] === '#' || dist[ny][nx] !== Infinity) continue;
      dist[ny][nx] = dist[c.y][c.x] + 1;
      queue.push({ x: nx, y: ny });
    }
  }
  return dist;
}

/**
 * Calcula todos os sensores para a pose informada.
 * @param firewalls conjunto "x,y" dos firewalls ainda ativos.
 */
export function readSensors(
  grid: string[],
  dist: number[][],
  firewalls: Set<string>,
  x: number,
  y: number,
  dir: number,
): Record<string, number> {
  const look = (turn: number) => {
    const d = (dir + turn + 4) % 4;
    const nx = x + DX[d];
    const ny = y + DY[d];
    const wall = (grid[ny]?.[nx] ?? '#') === '#';
    return { wall, closer: !wall && dist[ny][nx] < dist[y][x], fw: firewalls.has(`${nx},${ny}`) };
  };
  const f = look(0);
  const l = look(-1);
  const r = look(1);
  return {
    parede_frente: +f.wall,
    parede_esq: +l.wall,
    parede_dir: +r.wall,
    farol_frente: +f.closer,
    farol_esq: +l.closer,
    farol_dir: +r.closer,
    firewall_frente: +f.fw,
  };
}

/** Executa um episódio completo do labirinto com a rede informada. */
export function runMaze(t: Topology, p: Params, fn: Activation, cfg: MazeConfig): MazeResult {
  const { grid } = cfg;
  const start = findCell(grid, 'S');
  const goal = findCell(grid, 'G');
  const dist = distanceField(grid);
  const firewalls = new Set<string>();
  grid.forEach((row, y) => Array.from(row).forEach((ch, x) => ch === 'F' && firewalls.add(`${x},${y}`)));

  let { x, y } = start;
  let dir = cfg.startDir;
  const frames: MazeFrame[] = [];
  let outcome: MazeResult['outcome'] = 'timeout';

  for (let step = 0; step < cfg.maxSteps; step++) {
    const sensors = readSensors(grid, dist, firewalls, x, y, dir);
    const action = t.outputs[decide(t, forward(t, p, sensors, fn).outputs)];
    let event: MazeEvent = 'idle';
    let hacked: MazeFrame['hacked'];
    const fx = x + DX[dir];
    const fy = y + DY[dir];

    if (action === 'andar') {
      if (sensors.parede_frente || firewalls.has(`${fx},${fy}`)) event = 'crash';
      else {
        x = fx;
        y = fy;
        event = x === goal.x && y === goal.y ? 'goal' : 'move';
      }
    } else if (action === 'virar_esq') {
      dir = (dir + 3) % 4;
      event = 'turn';
    } else if (action === 'virar_dir') {
      dir = (dir + 1) % 4;
      event = 'turn';
    } else if (action === 'hackear' && firewalls.delete(`${fx},${fy}`)) {
      event = 'hack';
      hacked = { x: fx, y: fy };
    }

    frames.push({ x, y, dir, action, event, sensors, hacked });
    if (event === 'crash' || event === 'goal') {
      outcome = event;
      break;
    }
  }
  if (outcome === 'timeout' && frames.length) frames[frames.length - 1].event = 'timeout';
  return { kind: 'maze', frames, start: { ...start, dir: cfg.startDir }, goal, outcome, success: outcome === 'goal' };
}
