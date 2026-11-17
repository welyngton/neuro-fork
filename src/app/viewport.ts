/**
 * @module app/viewport
 *
 * Responsividade. O jogo é desenhado em uma tela lógica de ALTURA FIXA (720)
 * e LARGURA VARIÁVEL, calculada pela proporção da janela:
 *
 *   - celular deitado 19,5:9  -> ~1560 x 720
 *   - notebook/TV 16:9        -> 1280 x 720
 *   - tablet 4:3              -> 1100 x 720 (limite mínimo; sobram faixas)
 *
 * O Phaser (Scale.FIT) estica essa tela lógica até caber na janela. Como as
 * cenas posicionam tudo a partir de `this.W` / `this.H`, elas se adaptam
 * sozinhas. Quando a proporção muda (girar o aparelho, redimensionar a
 * janela), ajustamos a largura lógica e reiniciamos as cenas ativas — o
 * estado vive em `GameState`, então nada se perde.
 *
 * Em retrato num celular, o `index.html` mostra o aviso "gire o aparelho".
 */
import Phaser from 'phaser';
import { GAME_HEIGHT } from '../ui/theme';

export const MIN_WIDTH = 1100;
export const MAX_WIDTH = 1600;

/** Largura lógica ideal para a janela atual. */
export function logicalWidth(): number {
  const w = window.innerWidth;
  const h = Math.max(1, window.innerHeight);
  // Em retrato usamos a proporção "deitada": é como o jogo aparecerá ao girar.
  const aspect = w >= h ? w / h : h / w;
  return Math.round(Phaser.Math.Clamp(GAME_HEIGHT * aspect, MIN_WIDTH, MAX_WIDTH));
}

/** Liga o ajuste automático da largura lógica ao tamanho da janela. */
export function watchViewport(game: Phaser.Game): void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const apply = () => {
    const w = logicalWidth();
    if (Math.abs(w - game.scale.gameSize.width) < 8) return;
    game.scale.setGameSize(w, GAME_HEIGHT);
    for (const scene of game.scene.getScenes(true)) scene.scene.restart(scene.sys.settings.data);
  };
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(apply, 200);
  };
  window.addEventListener('resize', schedule);
  window.addEventListener('orientationchange', schedule);
}
