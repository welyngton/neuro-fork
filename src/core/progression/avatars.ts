/**
 * @module core/progression/avatars
 *
 * Avatares, cores e níveis do robô do jogador.
 *  - o MODELO é liberado pelo total de estrelas já conquistadas (não se gasta nada);
 *  - cada NÍVEL de melhoria (enfeites: ombreiras, aura, coroa, órbitas — desenhados
 *    em `entities/Robot.ts`) e cada COR extra custam 3★ da loja do avatar;
 *  - comprar tudo rende a conquista "Visual completo".
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
  /** Preço em estrelas (a cor inicial é de graça). */
  cost: number;
}

/** Preço de cada nível de melhoria e de cada cor (em ★). */
export const AVATAR_LEVEL_COST = 3;
export const AVATAR_COLOR_COST = 3;
/** Nível máximo do robô (o nível 1 é o inicial). */
export const AVATAR_MAX_LEVEL = 5;

export const AVATAR_COLORS: AvatarColor[] = [
  { id: 'ciano', hex: 0x00f0ff, cost: 0 },
  { id: 'magenta', hex: 0xff2bd6, cost: AVATAR_COLOR_COST },
  { id: 'amarelo', hex: 0xfcee0a, cost: AVATAR_COLOR_COST },
  { id: 'verde', hex: 0x39ff88, cost: AVATAR_COLOR_COST },
  { id: 'laranja', hex: 0xff8a1f, cost: AVATAR_COLOR_COST },
  { id: 'branco', hex: 0xffffff, cost: AVATAR_COLOR_COST },
];

/** Compras do avatar guardadas no save. */
export interface AvatarShop {
  /** Nível atual do robô (1..{@link AVATAR_MAX_LEVEL}). */
  level: number;
  /** Ids das cores já compradas. */
  colors: string[];
}

export const DEFAULT_AVATAR_SHOP: AvatarShop = { level: 1, colors: ['ciano'] };

/** Estrelas gastas nas compras do avatar. */
export function avatarSpent(shop: AvatarShop): number {
  const colors = AVATAR_COLORS.filter((c) => shop.colors.includes(c.id)).reduce((n, c) => n + c.cost, 0);
  return (shop.level - 1) * AVATAR_LEVEL_COST + colors;
}

/** `true` quando todos os níveis e todas as cores foram comprados. */
export function avatarComplete(shop: AvatarShop): boolean {
  return shop.level >= AVATAR_MAX_LEVEL && AVATAR_COLORS.every((c) => shop.colors.includes(c.id));
}

/** Nível "de graça" que os saves antigos (nível pelas estrelas) mantêm. */
export function legacyAvatarLevel(totalStars: number): number {
  return [0, 5, 12, 20, 30].filter((s) => totalStars >= s).length;
}

/** Aparência do robô: o que a tela de Avatar grava no save. */
export interface AvatarLook {
  avatar: string;
  color: string;
}
