/**
 * @module ui/lossHints
 * Depois de 3 derrotas (simulação perdida ou rede superaquecida), o jogo para e
 * mostra dicas de deep/machine learning para destravar o jogador.
 */
import Phaser from 'phaser';
import { audio } from '../app/services';
import { LOSS_HINTS } from '../core/progression/losses';
import { t } from '../services/i18n';
import { NeonButton } from './NeonButton';
import { C, body, title } from './theme';
import { addPanel } from './widgets';

let cursor = 0;

/** Abre o painel de dicas (duas por vez, em rodízio) por cima da cena. */
export function showLossHints(scene: Phaser.Scene, depth = 3000): void {
  const W = scene.scale.width;
  const H = scene.scale.height;
  const layer = scene.add.container(0, 0).setDepth(depth);
  layer.add(scene.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.8).setInteractive());
  const pw = Math.min(820, W - 60);
  const ph = 500;
  const px = W / 2 - pw / 2;
  const py = H / 2 - ph / 2;
  layer.add(addPanel(scene, { x: px, y: py, w: pw, h: ph }, C.violet, 0.98));
  layer.add(title(scene, W / 2, py + 40, t('hints.title'), 28, C.violet).setOrigin(0.5));
  layer.add(body(scene, W / 2, py + 78, t('hints.sub'), 18, C.dim).setOrigin(0.5).setWordWrapWidth(pw - 60).setAlign('center'));
  for (let i = 0; i < 2; i++) {
    const k = (cursor + i) % LOSS_HINTS;
    const y = py + 120 + i * 150;
    layer.add(title(scene, px + 36, y, `◆ ${t(`hint.${k}.t`)}`, 21, i ? C.cyan : C.yellow));
    layer.add(body(scene, px + 36, y + 34, t(`hint.${k}.d`), 19, C.text).setWordWrapWidth(pw - 72));
  }
  cursor = (cursor + 2) % LOSS_HINTS;
  audio.sfx('tick', 9);
  layer.add(new NeonButton(scene, W / 2, py + ph - 48, 300, 60, t('hints.ok'), () => layer.destroy(), { color: C.violet, size: 20 }));
  layer.setAlpha(0);
  scene.tweens.add({ targets: layer, alpha: 1, duration: 250 });
}
