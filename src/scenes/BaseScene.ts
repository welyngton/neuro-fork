/**
 * @module scenes/BaseScene
 *
 * Classe-mãe de todas as cenas. Concentra o que é comum:
 *  - medidas da tela lógica (`W`, `H`) para layout responsivo;
 *  - fundo, fade de entrada/saída e troca de cena ({@link go});
 *  - barra superior padrão das fases de missão ({@link addTopBar});
 *  - utilitários assíncronos ({@link wait}, {@link tween}) para roteirizar animações com `await`.
 *
 * Cenas concretas implementam {@link build} (em vez de `create`) e, se
 * precisarem, `update`. Como o viewport pode reiniciar a cena a qualquer
 * momento (girar o celular), `build` deve reconstruir tudo a partir do
 * `GameState` e dos dados recebidos em `init`.
 */
import Phaser from 'phaser';
import { audio, state } from '../app/services';
import { MissionDef } from '../core/missions/types';
import { t } from '../services/i18n';
import type { ThemeId } from '../services/audio/themes';
import { NeonButton } from '../ui/NeonButton';
import { addPolyBackground } from '../ui/background';
import { C, body, title } from '../ui/theme';
import { addChip } from '../ui/widgets';

/** Dados passados entre as cenas de missão. */
export interface MissionSceneData {
  missionId: string;
}

export type Phase = 'design' | 'train' | 'sim';

export abstract class BaseScene extends Phaser.Scene {
  /** Cor de destaque do fundo desta cena. */
  protected accent: number = C.cyan;
  /** Trilha desta cena (null = mantém a atual). */
  protected music: ThemeId | null = null;
  private leaving = false;

  get W(): number {
    return this.scale.width;
  }

  get H(): number {
    return this.scale.height;
  }

  create(): void {
    this.leaving = false;
    // Dados por visita (ex.: dicas já mostradas nesta entrada da cena).
    this.data.reset();
    addPolyBackground(this, this.accent, this.scene.key.length);
    if (this.music) audio.playMusic(this.music);
    this.cameras.main.fadeIn(220, 7, 6, 15);
    this.build();
  }

  /** Monta a cena. Chamado a cada entrada/reinício. */
  protected abstract build(): void;

  /** Troca de cena com fade. Ignora chamadas repetidas durante a transição. */
  go(key: string, data?: object): void {
    if (this.leaving) return;
    this.leaving = true;
    audio.sfx('whoosh');
    this.cameras.main.fadeOut(160, 7, 6, 15);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(key, data));
  }

  /** Promessa que resolve após `ms` (respeita `time.timeScale`). */
  wait(ms: number): Promise<void> {
    return new Promise((resolve) => this.time.delayedCall(ms, resolve));
  }

  /** Tween como promessa: `await this.tween({ targets, x: 100, duration: 200 })`. */
  tween(config: Phaser.Types.Tweens.TweenBuilderConfig): Promise<void> {
    return new Promise((resolve) => this.tweens.add({ ...config, onComplete: () => resolve() }));
  }

  /**
   * Cabeçalho das páginas do menu (Loja, Avatar, Conquistas): botão VOLTAR,
   * título e o saldo de estrelas. @returns a altura ocupada.
   */
  protected addPageHeader(titleKey: string, color: number): number {
    const h = 68;
    this.add.graphics().fillStyle(C.bg, 0.75).fillRect(0, 0, this.W, h).lineStyle(2, C.panelEdge).lineBetween(0, h, this.W, h);
    new NeonButton(this, 96, h / 2, 160, 50, `◀ ${t('nav.back')}`, () => this.go('Menu'), { color: C.orange, size: 18 });
    title(this, 196, h / 2, t(titleKey), 26, color).setOrigin(0, 0.5);
    body(this, this.W - 24, h / 2, t('menu.balance', { n: state.balance }), 24, C.yellow).setOrigin(1, 0.5);
    return h;
  }

  /**
   * Barra superior das cenas de missão: botão MAPA, título e os três chips de fase.
   * @returns a altura ocupada (para a cena posicionar o resto abaixo).
   */
  protected addTopBar(mission: MissionDef, phase: Phase): number {
    const h = 68;
    this.add.graphics().fillStyle(C.bg, 0.75).fillRect(0, 0, this.W, h).lineStyle(2, C.panelEdge).lineBetween(0, h, this.W, h);
    new NeonButton(this, 84, h / 2, 136, 50, `◀ ${t('nav.map')}`, () => this.go('Menu'), { color: C.orange, size: 18 });
    title(this, 170, h / 2, t(`mission.${mission.id}.title`), 24, C.text).setOrigin(0, 0.5);
    const phases: Phase[] = ['design', 'train', 'sim'];
    const colors = { design: C.yellow, train: C.magenta, sim: C.cyan };
    let x = this.W - 24;
    for (const p of [...phases].reverse()) {
      const chip = addChip(this, 0, h / 2, `${phases.indexOf(p) + 1} ${t(`phase.${p}`)}`, colors[p], p === phase);
      chip.setX(x - chip.width / 2);
      x -= chip.width + 10;
    }
    return h;
  }
}
