/**
 * @module ui/fx
 * Efeitos visuais reutilizáveis (texturas geradas por código, partículas, brilho).
 * Nenhuma imagem externa: {@link ensureTextures} desenha tudo em tempo de execução.
 */
import Phaser from 'phaser';

/** Cria as texturas-base (`tri`, `dot`, `glow`) uma única vez. Chamada pela BootScene. */
export function ensureTextures(scene: Phaser.Scene): void {
  if (scene.textures.exists('tri')) return;
  const g = scene.make.graphics({ x: 0, y: 0 }, false);
  g.fillStyle(0xffffff).fillTriangle(8, 0, 16, 16, 0, 16);
  g.generateTexture('tri', 16, 16);
  g.clear().fillStyle(0xffffff).fillRect(0, 0, 6, 6);
  g.generateTexture('dot', 6, 6);
  g.destroy();

  const size = 128;
  const tex = scene.textures.createCanvas('glow', size, size)!;
  const ctx = tex.getContext();
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,0.9)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.3)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  tex.refresh();
}

/** Explosão de estilhaços triangulares. */
export function burst(scene: Phaser.Scene, x: number, y: number, color: number, count = 14, speed = 260): void {
  const p = scene.add.particles(x, y, 'tri', {
    speed: { min: speed * 0.3, max: speed },
    angle: { min: 0, max: 360 },
    lifespan: { min: 300, max: 700 },
    scale: { start: 0.9, end: 0 },
    rotate: { min: 0, max: 360 },
    tint: color,
    blendMode: Phaser.BlendModes.ADD,
    emitting: false,
  });
  p.setDepth(900);
  p.explode(count);
  scene.time.delayedCall(900, () => p.destroy());
}

/** Halo de neon (imagem aditiva) — use atrás de nós, do robô, de botões importantes. */
export function glow(scene: Phaser.Scene, x: number, y: number, color: number, scale = 1, alpha = 0.5): Phaser.GameObjects.Image {
  return scene.add.image(x, y, 'glow').setTint(color).setScale(scale).setAlpha(alpha).setBlendMode(Phaser.BlendModes.ADD);
}

/** Texto que sobe e some (ex.: "+1"). */
export function floatText(scene: Phaser.Scene, x: number, y: number, str: string, color: string, size = 30): void {
  const t = scene.add
    .text(x, y, str, { fontFamily: 'Orbitron, sans-serif', fontSize: `${size}px`, fontStyle: '700', color })
    .setOrigin(0.5)
    .setDepth(950);
  scene.tweens.add({ targets: t, y: y - 60, alpha: 0, duration: 800, ease: 'Cubic.out', onComplete: () => t.destroy() });
}
