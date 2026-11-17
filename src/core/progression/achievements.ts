/**
 * @module core/progression/achievements
 *
 * Conquistas com gradações (bronze / prata / ouro), no espírito dos slides do
 * prof. Peng: parte delas premia domínio, parte premia tropeços engraçados
 * ("Desk rejection", "Artilheiro dos gols inúteis", "Marcha dos patos"...).
 *
 * Cada conquista lê um número de {@link AchContext} e o compara com seus
 * limiares (`tiers`): o nível é quantos limiares já foram atingidos.
 * Os contadores (`stats`) são incrementados pelas cenas via `state.bump(...)`.
 *
 * Para criar uma conquista: acrescente em {@link ACHIEVEMENTS} e escreva
 * `ach.<id>.t` (nome) e `ach.<id>.d` (como ganhar) no i18n.
 */
export interface AchContext {
  /** Contadores acumulados (ver lista em `state/GameState.ts`). */
  stats: Record<string, number>;
  /** Estrelas por missão. */
  stars: Record<string, number>;
  upgrades: number;
  finished: boolean;
}

export interface AchievementDef {
  id: string;
  /** Limiares de bronze, prata, ouro (1 a 3 valores). */
  tiers: number[];
  /** Valor atual a comparar com os limiares. */
  value: (c: AchContext) => number;
}

const stat = (key: string) => (c: AchContext) => c.stats[key] ?? 0;
const missionsWith = (min: number) => (c: AchContext) => Object.values(c.stars).filter((s) => s >= min).length;

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'primeiro_neuronio', tiers: [1, 25, 100], value: stat('neurons_placed') },
  { id: 'cartografo', tiers: [3, 6, 12], value: missionsWith(1) },
  { id: 'occam', tiers: [1, 6, 12], value: missionsWith(3) },
  { id: 'zerou', tiers: [1], value: (c) => ((c.stars.turing ?? 0) > 0 ? 1 : 0) },
  { id: 'nao_sou_robo', tiers: [1], value: (c) => ((c.stars.captcha ?? 0) >= 3 ? 1 : 0) },
  { id: 'sensor_inutil', tiers: [1, 4, 8], value: stat('sparse_wins') },
  { id: 'engenheiro', tiers: [1, 3], value: stat('feature_wins') },
  { id: 'gatonet', tiers: [1, 10, 50], value: stat('dropout_runs') },
  { id: 'early_stop', tiers: [1, 5], value: stat('earlystop_wins') },
  { id: 'transfer', tiers: [1, 5], value: stat('transfer_wins') },
  { id: 'maratonista', tiers: [1000, 10000, 100000], value: stat('epochs_total') },
  { id: 'cartas', tiers: [1, 10, 40], value: stat('cards_drawn') },
  { id: 'contra_tudo', tiers: [1, 5], value: stat('bad_card_wins') },
  { id: 'colecionador', tiers: [1, 7, 14], value: (c) => c.upgrades },
  { id: 'estilista', tiers: [1], value: stat('avatar_changes') },
  { id: 'poliglota', tiers: [1], value: stat('locale_changes') },
  // O lado "zoeira": tropeços que também ensinam.
  { id: 'stop_trying', tiers: [10, 50, 100], value: stat('sims') },
  { id: 'desk_rejection', tiers: [1, 5], value: stat('zero_sims') },
  { id: 'gols_inuteis', tiers: [1, 5], value: stat('good_loss_lost') },
  { id: 'marcha_patos', tiers: [1], value: stat('duck_wins') },
  { id: 'stack_overflow', tiers: [1, 5], value: stat('exploded_runs') },
  { id: 'vanishing', tiers: [1, 10], value: stat('stuck_runs') },
  { id: 'overfit', tiers: [1, 5], value: stat('overfit_runs') },
  { id: 'exagerado', tiers: [1], value: stat('full_board_wins') },
  { id: 'bomba', tiers: [1, 10, 30], value: stat('bombs') },
  { id: 'embaralhador', tiers: [5, 20, 100], value: stat('shuffles') },
  { id: 'derreteu', tiers: [1, 5], value: stat('overheats') },
];

/** Nível atual (0 = bloqueada) de cada conquista. */
export function achievementLevels(c: AchContext): Record<string, number> {
  const out: Record<string, number> = {};
  for (const a of ACHIEVEMENTS) {
    const v = a.value(c);
    out[a.id] = a.tiers.filter((t) => v >= t).length;
  }
  return out;
}
