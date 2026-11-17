/**
 * @module scenes/BootScene
 * Primeira cena: gera as texturas procedurais e segue para o menu.
 * (Não há assets para baixar; as fontes já foram carregadas em `main.ts`.)
 */
import Phaser from 'phaser';
import { ensureTextures } from '../ui/fx';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    ensureTextures(this);
    this.scene.start('Menu');
  }
}
