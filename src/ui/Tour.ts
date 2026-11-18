/**
 * @module ui/Tour
 *
 * TOUR GUIADO da missão-tutorial (Berçário). Obrigatório no primeiro acesso
 * (com botão para pular) e refeito quando quiser pela Academia.
 *
 * O roteiro {@link TOUR} alterna as 9 LIÇÕES ilustradas (`ui/lessons.ts`) com
 * passos práticos na interface: um véu escuro cobre a tela, deixando aceso só
 * o elemento da vez (com moldura pulsante e seta), e um balão explica o que
 * fazer. Há três tipos de passo:
 *  - `lesson`: abre a lição n, com CONTINUAR;
 *  - `coach` sem `wait`: aponta um elemento e espera o OK;
 *  - `coach` com `wait`: espera o jogador FAZER a ação no elemento aceso — a
 *    cena avisa emitindo `tour:<wait>` (ex.: `tour:neuron` ao pôr um neurônio).
 *  - `event`: espera em silêncio um `tour:<event>` (ex.: o fim da simulação).
 *
 * O passo atual fica salvo (`GameState.tourStep`), então o tour sobrevive a
 * girar a tela, trocar de fase ou sair para o mapa: cada cena chama
 * {@link runTour} ao montar e retoma do ponto em que parou.
 *
 * Para mudar o roteiro, edite {@link TOUR} e os textos `tour.<id>.t/.d`; a cena
 * precisa expor o retângulo de cada `target` usado.
 */
import Phaser from 'phaser';
import { audio, state } from '../app/services';
import { t } from '../services/i18n';
import { NeonButton } from './NeonButton';
import { NetworkView } from './NetworkView';
import { showToast } from './Toast';
import { LessonHost, animateLessonViews, buildLesson } from './lessons';
import { C, Rect, body, title } from './theme';
import { addPanel } from './widgets';

import { TOUR, TourSceneKey } from './tourScript';

export { TOUR };
export type { TourSceneKey };

/** Passos que contam no "n de N" mostrado ao jogador (os eventos silenciosos não). */
const VISIBLE = TOUR.filter((s) => !('event' in s)).length;

export interface TourOptions {
  /** Retângulo (em coordenadas da tela) de cada alvo que a cena oferece. */
  targets: Record<string, () => Rect>;
  /** Condições já cumpridas ao retomar (ex.: a rede já está válida) — pulam a espera. */
  already?: Record<string, () => boolean>;
}

const DEPTH = 3000;
const PAD = 8;

/** Chave em `scene.data` com o "buraco" aceso do véu (cliques fora dele são ignorados). */
export const TOUR_HOLE = 'tourHole';

/** O tour está cobrindo a tela e (x, y) cai fora da área liberada? */
export function tourBlocks(scene: Phaser.Scene, x: number, y: number): boolean {
  const hole = scene.data.get(TOUR_HOLE) as Rect | null | undefined;
  if (hole === undefined || hole === null) return !!scene.data.get('tourModal');
  return x < hole.x || x > hole.x + hole.w || y < hole.y || y > hole.y + hole.h;
}

/** O tour está em andamento NESTA missão? (as cenas desligam cartas e dicas soltas durante ele) */
export function touring(missionId: string): boolean {
  return missionId === 'bercario' && state.tourActive;
}

/** Retoma o tour na cena `key`, se o passo atual pertence a ela. */
export function runTour(scene: Phaser.Scene & { go(key: string, data?: object): void }, key: TourSceneKey, opts: TourOptions): void {
  if (!state.tourActive) return;
  new TourRunner(scene, key, opts).start();
}

/** Encerra o tour pelo botão PULAR. */
function skipTour(scene: Phaser.Scene): void {
  state.endTour();
  audio.sfx('whoosh');
  showToast(scene, { title: t('tour.skipped.t'), text: t('tour.skipped.d'), color: C.orange, life: 6000 });
}

class TourRunner {
  private layer: Phaser.GameObjects.Container | null = null;
  private offs: (() => void)[] = [];
  private host: LessonHost;

  constructor(
    private scene: Phaser.Scene & { go(key: string, data?: object): void },
    private key: TourSceneKey,
    private opts: TourOptions,
  ) {
    this.host = scene as unknown as LessonHost;
  }

  start(): void {
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.clear());
    // Deixa a cena terminar de montar (botões, rede) antes de medir os alvos.
    this.scene.time.delayedCall(250, () => this.step());
  }

  private clear(): void {
    this.offs.forEach((f) => f());
    this.offs = [];
    this.layer?.destroy();
    this.layer = null;
    this.scene.data?.set(TOUR_HOLE, undefined);
    this.scene.data?.set('tourModal', false);
    this.scene.data?.set('tourOk', null);
  }

  private step(): void {
    this.clear();
    if (!state.tourActive) return;
    const i = state.tourStep;
    if (i >= TOUR.length) return this.finish();
    const s = TOUR[i];
    if (s.scene !== this.key) return;
    if ('lesson' in s) this.lesson(s.lesson);
    else if ('event' in s) this.waitFor(s.event);
    else this.coach(s.coach, s.target, s.wait, s.at);
  }

  private next(): void {
    this.clear();
    const n = state.tourStep + 1;
    if (n >= TOUR.length) return this.finish();
    state.setTourStep(n);
    this.step();
  }

  private finish(): void {
    this.clear();
    state.endTour();
    audio.sfx('win');
    showToast(this.scene, { title: t('tour.done.t'), text: t('tour.done.d'), color: C.green, life: 9000 });
  }

  /** Número do passo entre os visíveis (1..N). */
  private get visibleIndex(): number {
    return TOUR.slice(0, state.tourStep + 1).filter((s) => !('event' in s)).length;
  }

  private waitFor(ev: string): void {
    if (this.opts.already?.[ev]?.()) {
      this.scene.time.delayedCall(0, () => this.next());
      return;
    }
    const handler = () => this.next();
    this.scene.events.once(`tour:${ev}`, handler);
    this.offs.push(() => this.scene.events.off(`tour:${ev}`, handler));
  }

  /* ------------------------------------------------------------------ lição */

  private lesson(index: number): void {
    const s = this.scene;
    const W = s.scale.width;
    const H = s.scale.height;
    const layer = s.add.container(0, 0).setDepth(DEPTH);
    this.layer = layer;
    s.data.set('tourModal', true);
    layer.add(s.add.rectangle(W / 2, H / 2, W, H, 0x07060f, 0.94).setInteractive());
    layer.add(title(s, 24, 22, t('tour.badge', { n: this.visibleIndex, max: VISIBLE }), 18, C.magenta));
    this.host.views = [];
    layer.add(buildLesson(this.host, index, { x: 20, y: 60, w: W - 40, h: H - 150 }));
    const views: NetworkView[] = this.host.views;
    const tick = (time: number) => animateLessonViews(views, time);
    s.events.on(Phaser.Scenes.Events.UPDATE, tick);
    this.offs.push(() => s.events.off(Phaser.Scenes.Events.UPDATE, tick));
    layer.add(new NeonButton(s, 130, H - 46, 220, 58, t('tour.skip'), () => {
      this.clear();
      skipTour(s);
    }, { color: C.orange, size: 15 }));
    layer.add(new NeonButton(s, W - 170, H - 46, 300, 62, t('tour.continue'), () => this.next(), { color: C.green, size: 20 }));
    // Onde fica o botão de avançar (usado pelo teste de fumaça).
    s.data.set('tourOk', { x: W - 170, y: H - 46 });
    layer.setAlpha(0);
    s.tweens.add({ targets: layer, alpha: 1, duration: 220 });
    audio.sfx('whoosh');
  }

  /* ------------------------------------------------------------------ balão com foco */

  private coach(id: string, target: string, wait?: string, at?: 'bottom'): void {
    const s = this.scene;
    const W = s.scale.width;
    const H = s.scale.height;
    const get = this.opts.targets[target];
    if (!get) return this.next();
    const raw = get();
    const r: Rect = { x: raw.x - PAD, y: raw.y - PAD, w: raw.w + PAD * 2, h: raw.h + PAD * 2 };
    const layer = s.add.container(0, 0).setDepth(DEPTH);
    this.layer = layer;
    s.data.set(TOUR_HOLE, r);

    // Véu com um "buraco" no alvo: quatro faixas escuras que engolem os toques.
    const veil = (x: number, y: number, w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      layer.add(s.add.rectangle(x + w / 2, y + h / 2, w, h, 0x000000, 0.66).setInteractive());
    };
    veil(0, 0, W, r.y);
    veil(0, r.y + r.h, W, H - r.y - r.h);
    veil(0, r.y, r.x, r.h);
    veil(r.x + r.w, r.y, W - r.x - r.w, r.h);
    const frame = s.add.graphics().lineStyle(4, C.yellow).strokeRect(r.x, r.y, r.w, r.h);
    layer.add(frame);
    s.tweens.add({ targets: frame, alpha: 0.35, duration: 520, yoyo: true, repeat: -1 });

    // Balão: textos primeiro (para medir), painel atrás.
    const pw = at === 'bottom' ? Math.min(900, W - 40) : Math.min(470, W - 40);
    const head = body(s, 0, 0, t('tour.badge', { n: this.visibleIndex, max: VISIBLE }), 14, C.magenta);
    const ttl = title(s, 0, 0, t(`tour.${id}.t`), 21, C.yellow).setWordWrapWidth(pw - 40);
    const txt = body(s, 0, 0, t(`tour.${id}.d`), 19, C.text).setWordWrapWidth(pw - 40).setLineSpacing(3);
    const footH = 64;
    const ph = 22 + head.height + 8 + ttl.height + 10 + txt.height + footH;
    // Alvos enormes (o tabuleiro inteiro) pedem o balão no rodapé, longe dos blocos.
    const spot = at === 'bottom' ? { x: (W - pw) / 2, y: H - ph - 6 } : this.place(r, pw, ph, W, H);
    const panel = addPanel(s, { x: spot.x, y: spot.y, w: pw, h: ph }, C.yellow, 0.98);
    const shield = s.add.rectangle(spot.x + pw / 2, spot.y + ph / 2, pw, ph, 0x000000, 0.001).setInteractive();
    head.setPosition(spot.x + 20, spot.y + 16);
    ttl.setPosition(spot.x + 20, head.y + head.height + 8);
    txt.setPosition(spot.x + 20, ttl.y + ttl.height + 10);
    layer.add([shield, panel, head, ttl, txt]);
    const by = spot.y + ph - footH / 2 - 4;
    layer.add(new NeonButton(s, spot.x + 92, by, 150, 44, t('tour.skip'), () => {
      this.clear();
      skipTour(s);
    }, { color: C.orange, size: 12 }));
    if (wait) {
      layer.add(body(s, spot.x + pw - 20, by, t('tour.doIt'), 17, C.yellow).setOrigin(1, 0.5));
      this.waitFor(wait);
    } else {
      layer.add(new NeonButton(s, spot.x + pw - 90, by, 150, 48, t('tour.ok'), () => this.next(), { color: C.green, size: 17 }));
      s.data.set('tourOk', { x: spot.x + pw - 90, y: by });
    }

    // Seta do balão até o alvo.
    if (spot.arrow) {
      const a = spot.arrow;
      // Ponta em (0, 0) apontando para baixo; o ângulo gira para o lado certo.
      const g = s.add.graphics({ x: a.x, y: a.y }).fillStyle(C.yellow).fillTriangle(-14, -22, 14, -22, 0, 0).setAngle(a.angle);
      layer.add(g);
      const rad = (a.angle * Math.PI) / 180;
      s.tweens.add({ targets: g, x: a.x + Math.sin(rad) * 10, y: a.y - Math.cos(rad) * 10, duration: 420, yoyo: true, repeat: -1 });
    }
    layer.setAlpha(0);
    s.tweens.add({ targets: layer, alpha: 1, duration: 200 });
    audio.sfx('tick', 9);
  }

  /** Escolhe onde o balão cabe: abaixo, acima, à direita, à esquerda — ou dentro do alvo, se ele for enorme. */
  private place(r: Rect, pw: number, ph: number, W: number, H: number): { x: number; y: number; arrow?: { x: number; y: number; angle: number } } {
    const gap = 30;
    const clampX = (x: number) => Phaser.Math.Clamp(x, 14, W - pw - 14);
    const clampY = (y: number) => Phaser.Math.Clamp(y, 14, H - ph - 14);
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    if (H - (r.y + r.h) >= ph + gap) return { x: clampX(cx - pw / 2), y: r.y + r.h + gap, arrow: { x: cx, y: r.y + r.h + 2, angle: 180 } };
    if (r.y >= ph + gap) return { x: clampX(cx - pw / 2), y: r.y - gap - ph, arrow: { x: cx, y: r.y - 2, angle: 0 } };
    if (W - (r.x + r.w) >= pw + gap) return { x: r.x + r.w + gap, y: clampY(cy - ph / 2), arrow: { x: r.x + r.w + 2, y: cy, angle: 90 } };
    if (r.x >= pw + gap) return { x: r.x - gap - pw, y: clampY(cy - ph / 2), arrow: { x: r.x - 2, y: cy, angle: -90 } };
    return { x: r.x + r.w - pw - 16, y: r.y + 16 };
  }
}
