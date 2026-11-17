/**
 * @module services/audio/themes
 *
 * Trilhas do jogo descritas como DADOS — para compor uma música nova basta
 * adicionar um objeto aqui e usar o id em `audio.playMusic(id)`.
 *
 * Notação:
 *  - `bass` / `arp`: um valor por 16 avos; número = grau da escala relativo ao
 *    acorde do compasso, `null` = pausa. O padrão se repete se for menor que 32.
 *  - `kick` / `snare` / `hat`: strings em que `x` toca e `.` cala.
 *  - `chords`: grau da escala que serve de base a cada compasso (a progressão).
 *
 * Clima geral: escalas menores e frígias, andamento médio e baixo serrilhado —
 * synthwave escuro / cyberpunk.
 */
export type ThemeId = 'menu' | 'design' | 'train' | 'sim' | 'boss' | 'ending';

export interface MusicTheme {
  bpm: number;
  /** Nota MIDI da tônica (grave). */
  root: number;
  /** Semitons da escala a partir da tônica. */
  scale: number[];
  chords: number[];
  bass: (number | null)[];
  arp: (number | null)[];
  arpWave: OscillatorType;
  kick: string;
  snare: string;
  hat: string;
  pad: boolean;
}

const MINOR = [0, 2, 3, 5, 7, 8, 10];
const PHRYGIAN = [0, 1, 3, 5, 7, 8, 10];
const DORIAN = [0, 2, 3, 5, 7, 9, 10];
const LYDIAN = [0, 2, 4, 6, 7, 9, 11];
const _ = null;

export const MUSIC_THEMES: Record<ThemeId, MusicTheme> = {
  /** Menu: lento, espaçoso, misterioso. */
  menu: {
    bpm: 84,
    root: 33,
    scale: MINOR,
    chords: [0, 0, 5, 3],
    bass: [0, _, _, _, _, _, 0, _, _, _, 0, _, _, _, _, _],
    arp: [0, _, 2, _, 4, _, 7, _, 4, _, 2, _, 6, _, 4, _],
    arpWave: 'triangle',
    kick: 'x...............',
    snare: '................',
    hat: '....x.......x...',
    pad: true,
  },
  /** Design: brincalhão, saltitante — clima de "oficina". */
  design: {
    bpm: 100,
    root: 36,
    scale: DORIAN,
    chords: [0, 3, 0, 4],
    bass: [0, _, _, 0, _, _, 4, _, 0, _, _, 0, _, 7, _, _],
    arp: [7, _, 4, 2, _, 4, _, 7, 9, _, 7, 4, _, 2, 4, _],
    arpWave: 'square',
    kick: 'x.....x...x.....',
    snare: '....x.......x...',
    hat: 'x.x.x.x.x.x.x.xx',
    pad: false,
  },
  /** Treino: motor ligado, baixo em 16 avos. */
  train: {
    bpm: 122,
    root: 33,
    scale: MINOR,
    chords: [0, 0, 5, 6],
    bass: [0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 7, 0, 3, 0, 4, 7],
    arp: [_, _, 4, _, _, 7, _, _, 9, _, _, 7, _, 4, _, _],
    arpWave: 'sawtooth',
    kick: 'x...x...x...x...',
    snare: '....x.......x...',
    hat: '..x...x...x...xx',
    pad: true,
  },
  /** Simulação: tenso, frígio. */
  sim: {
    bpm: 130,
    root: 31,
    scale: PHRYGIAN,
    chords: [0, 0, 1, 0],
    bass: [0, _, 0, 0, _, 0, 7, _, 0, _, 0, 0, _, 1, 0, _],
    arp: [0, 4, 7, 4, 1, 4, 7, 4, 0, 4, 8, 4, 1, 4, 7, 11],
    arpWave: 'square',
    kick: 'x...x...x...x.x.',
    snare: '....x.......x...',
    hat: 'x.xxx.xxx.xxx.xx',
    pad: false,
  },
  /** Chefão (CAPTCHA e Turing): mais lento e pesado. */
  boss: {
    bpm: 108,
    root: 29,
    scale: PHRYGIAN,
    chords: [0, 0, 3, 1],
    bass: [0, _, _, 0, 0, _, _, 0, _, 0, _, _, 1, _, 0, _],
    arp: [7, _, _, 8, _, _, 7, _, 4, _, _, 3, _, _, 1, _],
    arpWave: 'sawtooth',
    kick: 'x..x..x...x..x..',
    snare: '....x.......x..x',
    hat: 'x.x.x.x.x.x.x.x.',
    pad: true,
  },
  /** Final: abre para o lídio — a única trilha "clara" do jogo. */
  ending: {
    bpm: 104,
    root: 36,
    scale: LYDIAN,
    chords: [0, 4, 5, 3],
    bass: [0, _, 0, _, 4, _, 0, _, 0, _, 0, _, 7, _, 4, _],
    arp: [0, 2, 4, 7, 9, 7, 4, 2, 0, 2, 4, 7, 11, 9, 7, 4],
    arpWave: 'triangle',
    kick: 'x...x...x...x...',
    snare: '....x.......x...',
    hat: 'x.x.x.x.x.x.x.x.',
    pad: true,
  },
};
