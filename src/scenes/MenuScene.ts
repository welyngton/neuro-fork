/**
 * @module scenes/MenuScene
 *
 * Menu inicial — o ÚNICO lugar com opções do jogo e seleção de fase.
 *
 * Layout (largura variável):
 * ```
 * +-----------+------------------------------------------+
 * | LOGO      |            MAPA DE MISSÕES               |
 * | robô      |   nós hexagonais ligados por trilhas;    |
 * | opções    |   liberados acesos, bloqueados apagados  |
 * |           +------------------------------------------+
 * |           |  briefing da missão selecionada [INICIAR]|
 * +-----------+------------------------------------------+
 * ```
 * Tocar num nó seleciona a missão; INICIAR leva ao Design.
 */
import Phaser from 'phaser';
import { analytics, audio, cloud, state } from '../app/services';
import { MISSIONS, getMission } from '../core/missions/catalog';
import { MissionDef } from '../core/missions/types';
import { Robot } from '../entities/Robot';
import { LOCALES, setLocale, t } from '../services/i18n';
import { NeonButton } from '../ui/NeonButton';
import { burst, glow } from '../ui/fx';
import { C, FONT_TITLE, Rect, body, css, offset, regularPoly, title } from '../ui/theme';
import { StarRow, addPanel } from '../ui/widgets';
import { BaseScene } from './BaseScene';

const SIDE_W = 320;
const NODE_R = 38;

export class MenuScene extends BaseScene {
  protected accent = C.violet;
  protected music = 'menu' as const;

  private selected!: MissionDef;
  private mapRect!: Rect;
  private brief!: { title: Phaser.GameObjects.Text; text: Phaser.GameObjects.Text; concept: Phaser.GameObjects.Text; stars: StarRow; start: NeonButton };
  private cursor!: Phaser.GameObjects.Graphics;
  private bot!: Robot;
  private resetArmed = false;

  constructor() {
    super('Menu');
  }

  protected build(): void {
    // Missão em foco: a última escolhida ou a primeira liberada ainda sem estrelas.
    const last = this.registry.get('selected') as string | undefined;
    this.selected =
      (last && MISSIONS.find((m) => m.id === last)) ||
      MISSIONS.find((m) => state.isUnlocked(m.id) && state.stars(m.id) === 0) ||
      MISSIONS[0];

    this.buildSidebar();
    this.mapRect = { x: SIDE_W + 30, y: 84, w: this.W - SIDE_W - 60, h: this.H - 84 - 190 };
    title(this, this.mapRect.x, 28, t('menu.map'), 26, C.cyan);
    body(this, this.W - 24, 30, `★ ${t('menu.stars', { n: state.totalStars, max: MISSIONS.length * 3 })}`, 24, C.yellow).setOrigin(1, 0);
    this.buildMap();
    this.buildBriefing();
    this.select(this.selected, false);
  }

  /* ------------------------------------------------------------------ lateral */

  private buildSidebar(): void {
    addPanel(this, { x: 14, y: 14, w: SIDE_W - 14, h: this.H - 28 }, C.panelEdge, 0.8);
    const cx = 14 + (SIDE_W - 14) / 2;
    glow(this, cx, 60, C.magenta, 2.6, 0.25);
    this.add.text(cx, 50, 'NEUROBOT', { fontFamily: FONT_TITLE, fontSize: '40px', fontStyle: '800', color: css(C.cyan) }).setOrigin(0.5).setShadow(3, 3, css(C.magenta), 0);
    body(this, cx, 86, t('menu.subtitle'), 17, C.magenta).setOrigin(0.5);
    const mascot = new Robot(this, cx, 176, 0.95);
    this.time.addEvent({ delay: 4000, loop: true, callback: () => mascot.hop() });

    const s = state.settings;
    const pct = (v: number) => Math.round(v * 100);
    const cycle = (v: number) => [0, 0.3, 0.6, 1][([0, 0.3, 0.6, 1].findIndex((x) => Math.abs(x - v) < 0.05) + 1) % 4];
    const items: { label: string; color?: number; act: (b: NeonButton) => void }[] = [
      {
        label: t('opt.lang'),
        act: () => {
          const next = LOCALES[(LOCALES.indexOf(s.locale) + 1) % LOCALES.length];
          state.updateSettings({ locale: next });
          setLocale(next);
          analytics.track('setting_changed', { key: 'locale', value: next });
          this.scene.restart();
        },
      },
      {
        label: t('opt.music', { v: pct(s.music) }),
        act: (b) => {
          state.updateSettings({ music: cycle(state.settings.music) });
          audio.setVolumes(state.settings.music, state.settings.sfx);
          b.setLabel(t('opt.music', { v: pct(state.settings.music) }));
        },
      },
      {
        label: t('opt.sfx', { v: pct(s.sfx) }),
        act: (b) => {
          state.updateSettings({ sfx: cycle(state.settings.sfx) });
          audio.setVolumes(state.settings.music, state.settings.sfx);
          b.setLabel(t('opt.sfx', { v: pct(state.settings.sfx) }));
          audio.sfx('good');
        },
      },
    ];
    if (this.scale.fullscreen.available) {
      items.push({ label: t('opt.fullscreen'), act: () => this.scale.toggleFullscreen() });
    }
    items.push({
      label: t('opt.reset'),
      color: C.red,
      act: (b) => {
        if (!this.resetArmed) {
          this.resetArmed = true;
          b.setLabel(t('opt.resetConfirm'));
          this.time.delayedCall(3000, () => {
            this.resetArmed = false;
            if (b.active) b.setLabel(t('opt.reset'));
          });
          return;
        }
        state.reset();
        this.registry.remove('selected');
        audio.sfx('bomb');
        this.scene.restart();
      },
    });
    // Conta: login com Google (só aparece se o Firebase estiver configurado).
    const user = cloud.user;
    if (cloud.enabled) {
      items.push({
        label: user ? t('opt.logout', { name: user.name.split(' ')[0].toUpperCase() }) : t('opt.login'),
        color: user ? C.dim : C.green,
        act: (b) => {
          const job = user ? cloud.signOut() : cloud.signIn().then(() => analytics.track('login', { method: 'google' }));
          // Ao entrar/sair, `bootServices` reinicia o menu; aqui só tratamos a falha.
          job.catch(() => {
            audio.sfx('error');
            if (b.active) b.setLabel(t('opt.loginError'));
          });
        },
      });
    }
    const bh = 52;
    const gapY = 8;
    let y = this.H - 46 - items.length * (bh + gapY) + bh / 2;
    for (const it of items) {
      const b: NeonButton = new NeonButton(this, cx, y, SIDE_W - 50, bh, it.label, () => it.act(b), { color: it.color ?? C.cyan, size: 16 });
      y += bh + gapY;
    }
    const status = !cloud.enabled ? 'opt.cloudOff' : user ? 'opt.cloudOn' : 'opt.cloudHint';
    body(this, cx, this.H - 32, t(status), 16, user ? C.green : C.dim).setOrigin(0.5);
  }

  /* ------------------------------------------------------------------ mapa */

  private nodePos(m: MissionDef): { x: number; y: number } {
    return { x: this.mapRect.x + m.pos.x * this.mapRect.w, y: this.mapRect.y + m.pos.y * this.mapRect.h };
  }

  private buildMap(): void {
    const trails = this.add.graphics();
    const lit: { a: { x: number; y: number }; mid: { x: number; y: number }; b: { x: number; y: number } }[] = [];
    for (const m of MISSIONS) {
      const b = this.nodePos(m);
      for (const reqId of m.requires) {
        const a = this.nodePos(getMission(reqId));
        // Trilha de circuito: um trecho horizontal e um diagonal.
        const mid = { x: a.x + (b.x - a.x) * 0.5, y: a.y };
        const on = state.stars(reqId) > 0;
        trails.lineStyle(on ? 10 : 6, on ? C.cyan : C.dim, on ? 0.15 : 0.25).lineBetween(a.x, a.y, mid.x, mid.y).lineBetween(mid.x, mid.y, b.x, b.y);
        trails.lineStyle(on ? 4 : 3, on ? C.cyan : C.dim, on ? 1 : 0.6).lineBetween(a.x, a.y, mid.x, mid.y).lineBetween(mid.x, mid.y, b.x, b.y);
        if (on) lit.push({ a, mid, b });
      }
    }
    // Pulsos de energia correndo pelas trilhas acesas.
    for (const seg of lit) {
      const dot = this.add.rectangle(seg.a.x, seg.a.y, 10, 10, 0xffffff).setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.chain({
        targets: dot,
        loop: -1,
        tweens: [
          { x: seg.mid.x, y: seg.mid.y, duration: 700, ease: 'Linear' },
          { x: seg.b.x, y: seg.b.y, duration: 700, ease: 'Linear' },
          { x: seg.a.x, y: seg.a.y, duration: 0 },
        ],
      });
    }

    this.cursor = this.add.graphics();
    this.tweens.add({ targets: this.cursor, angle: 360, duration: 6000, repeat: -1 });

    MISSIONS.forEach((m, i) => {
      const p = this.nodePos(m);
      const unlocked = state.isUnlocked(m.id);
      const stars = state.stars(m.id);
      const color = !unlocked ? C.dim : stars > 0 ? C.green : m.id === 'turing' ? C.magenta : C.cyan;
      if (unlocked) {
        const halo = glow(this, p.x, p.y, color, 1.5, 0.35);
        this.tweens.add({ targets: halo, alpha: 0.75, scale: 1.9, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      }
      const g = this.add.graphics({ x: p.x, y: p.y });
      const hex = regularPoly(6, NODE_R, 0);
      g.fillStyle(C.bg).fillPoints(hex, true);
      g.fillStyle(color, unlocked ? 0.22 : 0.08).fillPoints(hex, true);
      g.lineStyle(4, color, unlocked ? 1 : 0.6).strokePoints(hex, true, true);
      if (unlocked) {
        title(this, p.x, p.y, String(i + 1), 30, color).setOrigin(0.5);
      } else {
        // Cadeado poligonal.
        g.lineStyle(4, C.dim).strokeRect(-8, -16, 16, 14);
        g.fillStyle(C.dim).fillRect(-13, -6, 26, 20);
      }
      body(this, p.x, p.y + NODE_R + 8, t(`mission.${m.id}.title`), 17, unlocked ? C.text : C.dim).setOrigin(0.5, 0);
      if (stars > 0) new StarRow(this, p.x, p.y - NODE_R - 16, 9, 4).setStars(stars);

      const zone = this.add.zone(p.x, p.y, NODE_R * 2 + 36, NODE_R * 2 + 36).setInteractive({ useHandCursor: true });
      zone.on('pointerup', () => this.select(m, true));
    });

    this.bot = new Robot(this, 0, 0, 0.5).setDepth(5);
  }

  /* ------------------------------------------------------------------ briefing */

  private buildBriefing(): void {
    const r: Rect = { x: SIDE_W + 30, y: this.H - 178, w: this.W - SIDE_W - 54, h: 164 };
    addPanel(this, r, C.cyan);
    const textW = r.w - 290;
    this.brief = {
      title: title(this, r.x + 24, r.y + 18, '', 26, C.cyan),
      text: body(this, r.x + 24, r.y + 58, '', 22, C.text).setWordWrapWidth(textW),
      concept: body(this, r.x + 24, r.y + 122, '', 19, C.violet).setWordWrapWidth(textW),
      stars: new StarRow(this, r.x + r.w - 130, r.y + 36, 16, 8),
      start: new NeonButton(this, r.x + r.w - 130, r.y + 108, 220, 70, `${t('menu.start')} ▶`, () => this.startMission(), { color: C.green, size: 24 }),
    };
  }

  private select(m: MissionDef, withFx: boolean): void {
    this.selected = m;
    this.registry.set('selected', m.id);
    const unlocked = state.isUnlocked(m.id);
    const p = this.nodePos(m);
    const b = this.brief;
    b.title.setText(t(`mission.${m.id}.title`)).setColor(css(unlocked ? C.cyan : C.dim));
    b.text.setText(
      unlocked
        ? t(`mission.${m.id}.brief`)
        : t('menu.lockedHint', { list: m.requires.filter((r) => state.stars(r) === 0).map((r) => t(`mission.${r}.title`)).join(' + ') }),
    );
    b.concept.setText(`${t('menu.concept')}: ${t(`mission.${m.id}.concept`)}`);
    b.stars.setStars(state.stars(m.id));
    b.start.setEnabled(unlocked).setLabel(unlocked ? `${t('menu.start')} ▶` : t('menu.locked'));

    this.cursor.clear().setPosition(p.x, p.y);
    this.cursor.lineStyle(3, C.yellow).strokePoints(offset(regularPoly(6, NODE_R + 12, 0), 0, 0), true, true);
    for (const v of regularPoly(6, NODE_R + 12, 0)) this.cursor.fillStyle(C.yellow).fillRect(v.x - 4, v.y - 4, 8, 8);

    this.tweens.killTweensOf(this.bot);
    if (withFx) {
      audio.sfx(unlocked ? 'turn' : 'error');
      if (unlocked) burst(this, p.x, p.y, C.yellow, 8, 160);
      this.tweens.add({ targets: this.bot, x: p.x + NODE_R + 20, y: p.y - NODE_R - 6, duration: 350, ease: 'Cubic.out' });
    } else {
      this.bot.setPosition(p.x + NODE_R + 20, p.y - NODE_R - 6);
    }
    this.bot.setMood(unlocked ? 'idle' : 'sad');
  }

  private startMission(): void {
    analytics.track('mission_start', { mission: this.selected.id });
    this.go('Design', { missionId: this.selected.id });
  }
}
