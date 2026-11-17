/**
 * @module core/progression/avatars
 *
 * Avatares, cores e níveis do robô do jogador.
 *  - o MODELO e a COR são escolhidos na tela de Avatar e liberados pelo total
 *    de estrelas já conquistadas (não se gasta nada);
 *  - o NÍVEL sobe sozinho com as estrelas e acrescenta enfeites ao robô
 *    (aura, coroa, órbitas...). O desenho de cada um fica em `entities/Robot.ts`.
 */
export interface AvatarDef {
  id: string;
  /** Estrelas totais necessárias para liberar. */
  stars: number;
}

/** Modelos de robô. "gato" é a GatoNet dos slides do prof. Peng. */
export const AVATARS: AvatarDef[] = [
  { id: 'neuro', stars: 0 },
  { id: 'gato', stars: 4 },
  { id: 'ciclope', stars: 9 },
  { id: 'tanque', stars: 16 },
  { id: 'fantasma', stars: 24 },
];

export interface AvatarColor {
  id: string;
  hex: number;
  stars: number;
}

export const AVATAR_COLORS: AvatarColor[] = [
  { id: 'ciano', hex: 0x00f0ff, stars: 0 },
  { id: 'magenta', hex: 0xff2bd6, stars: 0 },
  { id: 'amarelo', hex: 0xfcee0a, stars: 2 },
  { id: 'verde', hex: 0x39ff88, stars: 6 },
  { id: 'laranja', hex: 0xff8a1f, stars: 12 },
  { id: 'branco', hex: 0xffffff, stars: 20 },
];

/** Estrelas totais em que o robô sobe de nível (nível 1 é o inicial). */
export const LEVEL_STARS = [0, 5, 12, 20, 30];

/** Nível (1..5) para um total de estrelas. */
export function avatarLevel(totalStars: number): number {
  return LEVEL_STARS.filter((s) => totalStars >= s).length;
}

/** Aparência do robô: o que a tela de Avatar grava no save. */
export interface AvatarLook {
  avatar: string;
  color: string;
}
