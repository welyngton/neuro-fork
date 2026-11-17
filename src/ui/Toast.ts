/**
 * @module ui/Toast
 *
 * Avisos que deslizam no canto superior direito e somem sozinhos. São o canal
 * das mensagens educativas (dicas de conceito) e das conquistas.
 *
 * ```ts
 * showToast(this, { title: 'NEURÔNIO', text: 'Soma as entradas...', color: C.violet });
 * tip(this, 'neuron');           // dica de conceito (textos em `tip.<id>.t/.d`)
 * celebrate(this);               // anuncia conquistas recém-ganhas
 * ```
 * No máximo 3 avisos ficam empilhados; tocar num aviso o dispensa.
 * Por padrão surgem à direita; uma cena pode pedir o lado esquerdo com
 * `scene.data.set('toastSide', 'left')` (o Treino faz isso para não cobrir o painel).
 */
import Phaser from 'phaser';
import { audio, state } from '../app/services';
import { t } from '../services/i18n';
import { C, FONT_BODY, FONT_TITLE, chamfer, css, offset } from './theme';

export interface ToastOptions {
  title: string;
  text: string;
  color?: number;
  /** Tempo na tela em ms (padrão 6000). */
  life?: number;
}

const stacks = new WeakMap<Phaser.Scene, Phaser.GameObjects.Container[]>();
const WIDTH = 400;
const TOP = 84;

function relayout(scene: Phaser.Scene): void {
  let y = TOP;
  for (const c of stacks.get(scene) ?? []) {
    scene.tweens.add({ targets: c, y, duration: 180, ease: 'Cubic.out' });
    y += (c.getData('h') as number) + 8;
  }
}

export function showToast(scene: Phaser.Scene, o: ToastOptions): void {
  const color = o.color ?? C.cyan;
  const title = scene.add.text(16, 10, o.title, { fontFamily: FONT_TITLE, fontSize: '17px', fontStyle: '700', color: css(color) });
  const text = scene.add.text(16, 34, o.text, { fontFamily: FONT_BODY, fontSize: '19px', fontStyle: '700', color: css(C.text), wordWrap: { width: WIDTH - 32 }, lineSpacing: 2 });
  const h = 44 + text.height;
  const bg = scene.add.graphics();
  const pts = offset(chamfer(WIDTH, h, 12), WIDTH / 2, h / 2);
  bg.fillStyle(C.panel, 0.96).fillPoints(pts, true);
  bg.lineStyle(2, color).strokePoints(pts, true, true);
  bg.fillStyle(color).fillRect(0, 12, 5, h - 24);

  const left = scene.data.get('toastSide') === 'left';
  const x = left ? 14 : scene.scale.width - WIDTH - 14;
  const away = left ? -WIDTH - 20 : scene.scale.width + 20;
  const box = scene.add.container(away, TOP, [bg, title, text]).setDepth(1500).setData('h', h);
  box.setSize(WIDTH, h);
  box.setInteractive(new Phaser.Geom.Rectangle(0, 0, WIDTH, h), Phaser.Geom.Rectangle.Contains);

  const list = stacks.get(scene) ?? [];
  stacks.set(scene, list);
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => stacks.delete(scene));
  const dismiss = () => {
    const i = list.indexOf(box);
    if (i < 0) return;
    list.splice(i, 1);
    scene.tweens.add({ targets: box, x: away, alpha: 0, duration: 200, onComplete: () => box.destroy() });
    relayout(scene);
  };
  while (list.length >= 3) {
    const old = list.shift()!;
    old.destroy();
  }
  list.push(box);
  relayout(scene);
  scene.tweens.add({ targets: box, x, duration: 260, ease: 'Back.out' });
  box.on('pointerup', dismiss);
  // Relógio real (não o da cena): na simulação acelerada o aviso não pode sumir num piscar.
  setTimeout(() => box.active && dismiss(), o.life ?? 6000);
}

/**
 * Mostra uma dica de conceito.
 * @param always `true` = mostra a cada visita à cena (ênfase, usado no Design);
 *               `false` = só na primeira vez que o jogador encontra o conceito.
 */
export function tip(scene: Phaser.Scene, id: string, always = false): void {
  const key = `tip:${id}`;
  const first = state.markTip(id);
  if (scene.data.get(key) || (!first && !always)) return;
  scene.data.set(key, true);
  audio.sfx('tick', 9);
  showToast(scene, { title: `◆ ${t(`tip.${id}.t`)}`, text: t(`tip.${id}.d`), color: C.violet });
}

const TIER_COLOR = [C.orange, C.text, C.yellow];

/** Anuncia as conquistas que subiram de nível desde a última chamada. */
export function celebrate(scene: Phaser.Scene): void {
  state.claimAchievements().forEach((a, i) => {
    scene.time.delayedCall(i * 500, () => {
      audio.sfx('star', a.level * 3);
      showToast(scene, {
        title: `★ ${t('ach.unlocked')} · ${t(`ach.tier.${a.level}`)}`,
        text: `${t(`ach.${a.id}.t`)} — ${t(`ach.${a.id}.d`)}`,
        color: TIER_COLOR[a.level - 1] ?? C.yellow,
        life: 7000,
      });
    });
  });
}
