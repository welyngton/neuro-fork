/**
 * @module main
 * Ponto de entrada: carrega fontes, sobe os serviços e cria o jogo Phaser.
 */
import '@fontsource/oxanium/700.css';
import '@fontsource/oxanium/800.css';
import '@fontsource/rajdhani/700.css';
import './styles.css';
import Phaser from 'phaser';
import { audio, bootServices, state } from './app/services';
import { MISSIONS } from './core/missions/catalog';
import { logicalWidth, watchViewport } from './app/viewport';
import { installGoogleTag } from './services/googleTag';
import { AchievementsScene } from './scenes/AchievementsScene';
import { AvatarScene } from './scenes/AvatarScene';
import { BootScene } from './scenes/BootScene';
import { DesignScene } from './scenes/DesignScene';
import { EndingScene } from './scenes/EndingScene';
import { MenuScene } from './scenes/MenuScene';
import { ShopScene } from './scenes/ShopScene';
import { SimulationScene } from './scenes/SimulationScene';
import { TrainScene } from './scenes/TrainScene';
import { C, GAME_HEIGHT } from './ui/theme';

async function start(): Promise<void> {
  // O canvas só enxerga fontes já carregadas; sem isso o primeiro texto sai na fonte padrão.
  await Promise.all(
    ['700 20px Oxanium', '800 20px Oxanium', '700 20px Rajdhani'].map((f) => document.fonts.load(f).catch(() => undefined)),
  );
  installGoogleTag();

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: C.bg,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: logicalWidth(),
      height: GAME_HEIGHT,
    },
    input: { activePointers: 2 },
    render: { antialias: true, powerPreference: 'high-performance' },
    scene: [BootScene, MenuScene, ShopScene, AvatarScene, AchievementsScene, DesignScene, TrainScene, SimulationScene, EndingScene],
  });
  watchViewport(game);
  bootServices(game);

  // Áudio só pode começar após um gesto do usuário.
  const unlock = () => audio.unlock();
  window.addEventListener('pointerdown', unlock);
  window.addEventListener('keydown', unlock);
  document.addEventListener('visibilitychange', () => audio.setSuspended(document.hidden));

  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => undefined);
  }
  // Exposto para depuração no console e para os testes de fumaça.
  Object.assign(window, { __game: game, __neuro: { state, MISSIONS } });
}

void start();
