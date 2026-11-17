/**
 * @module scenes/GlossaryScene
 *
 * Glossário pesquisável (aberto pelo menu e pela recapitulação de missão).
 * À esquerda, a busca (campo de texto HTML via Phaser DOM) e a lista de termos,
 * rolável com roda do mouse ou arrastando o dedo. À direita, o verbete escolhido
 * e os termos relacionados ("veja também"), que também são clicáveis.
 *
 * Dados em `services/i18n/glossary.ts`. Abre opcionalmente num termo:
 * `this.go('Glossary', { id: 'overfitting' })`.
 */
import Phaser from 'phaser';
import { audio } from '../app/services';
import { t } from '../services/i18n';
import { GLOSSARY, GlossaryEntry, entryText, searchGlossary } from '../services/i18n/glossary';
import { NeonButton } from '../ui/NeonButton';
import { C, FONT_BODY, Rect, body, css, title } from '../ui/theme';
import { addPanel } from '../ui/widgets';
import { BaseScene } from './BaseScene';

const ROW_H = 46;

export class GlossaryScene extends BaseScene {
  protected accent = C.green;
  protected music = 'menu' as const;

  private startId: string | null = null;
  private list!: Phaser.GameObjects.Container;
  private listRect!: Rect;
  private scrollY = 0;
  private maxScroll = 0;
  private items: GlossaryEntry[] = [];
  private selected: string | null = null;
  private detail!: Phaser.GameObjects.Container;
  private detailRect!: Rect;
  private countText!: Phaser.GameObjects.Text;

  constructor() {
    super('Glossary');
  }

  init(data: { id?: string }): void {
    this.startId = data?.id ?? null;
  }

  protected build(): void {
    const top = this.addPageHeader('glossary.title', C.green);
    const lw = Math.min(400, this.W * 0.34);
    const left: Rect = { x: 16, y: top + 12, w: lw, h: this.H - top - 28 };
    addPanel(this, left, C.green, 0.85);
    this.detailRect = { x: lw + 32, y: top + 12, w: this.W - lw - 48, h: this.H - top - 28 };
    addPanel(this, this.detailRect, C.panelEdge, 0.85);

    // Campo de busca (HTML real: teclado do celular, colar, acentos...).
    const input = this.add.dom(left.x + left.w / 2, left.y + 34, 'input', {
      width: `${left.w - 40}px`,
      height: '40px',
      font: `700 22px ${FONT_BODY}`,
      color: css(C.text),
      background: css(C.bg),
      border: `2px solid ${css(C.green)}`,
      padding: '0 12px',
      outline: 'none',
      boxSizing: 'border-box',
    });
    const el = input.node as HTMLInputElement;
    el.placeholder = t('glossary.search');
    el.type = 'search';
    el.addEventListener('input', () => this.filter(el.value));
    el.addEventListener('keydown', (e) => e.stopPropagation());

    this.countText = body(this, left.x + left.w - 18, left.y + 64, '', 15, C.dim).setOrigin(1, 0);
    this.listRect = { x: left.x + 10, y: left.y + 84, w: left.w - 20, h: left.h - 94 };
    this.list = this.add.container(0, 0);
    const mask = this.make.graphics({}, false).fillRect(this.listRect.x, this.listRect.y, this.listRect.w, this.listRect.h).createGeometryMask();
    this.list.setMask(mask);
    this.detail = this.add.container(0, 0);

    // Rolagem: roda do mouse ou arrastar.
    this.input.on('wheel', (_p: unknown, _o: unknown, _dx: number, dy: number) => this.scrollTo(this.scrollY + dy * 0.6));
    let dragY: number | null = null;
    let moved = 0;
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(this.listRect.x, this.listRect.y, this.listRect.w, this.listRect.h), p.x, p.y)) {
        dragY = p.y;
        moved = 0;
      }
    });
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (dragY === null || !p.isDown) return;
      moved += Math.abs(p.y - dragY);
      this.scrollTo(this.scrollY - (p.y - dragY));
      dragY = p.y;
    });
    this.input.on('pointerup', (p: Phaser.Input.Pointer) => {
      if (dragY !== null && moved < 8) this.pickAt(p.y);
      dragY = null;
    });

    this.filter('');
    this.show(this.startId ?? this.items[0]?.id ?? GLOSSARY[0].id);
  }

  private filter(q: string): void {
    this.items = searchGlossary(q);
    this.scrollY = 0;
    this.countText.setText(this.items.length ? t('glossary.count', { n: this.items.length }) : t('glossary.none'));
    this.renderList();
  }

  private renderList(): void {
    const r = this.listRect;
    this.list.removeAll(true);
    this.items.forEach((e, i) => {
      const y = r.y + i * ROW_H;
      const on = e.id === this.selected;
      const g = this.add.graphics();
      if (on) g.fillStyle(C.green, 0.25).fillRect(r.x, y + 2, r.w, ROW_H - 4);
      else if (i % 2 === 0) g.fillStyle(C.panelEdge, 0.25).fillRect(r.x, y + 2, r.w, ROW_H - 4);
      const label = body(this, r.x + 12, y + ROW_H / 2, entryText(e)[0], 19, on ? C.green : C.text).setOrigin(0, 0.5);
      if (label.width > r.w - 20) label.setScale((r.w - 20) / label.width);
      this.list.add([g, label]);
    });
    this.maxScroll = Math.max(0, this.items.length * ROW_H - r.h);
    this.list.y = -this.scrollY;
  }

  private scrollTo(y: number): void {
    this.scrollY = Phaser.Math.Clamp(y, 0, this.maxScroll);
    this.list.y = -this.scrollY;
  }

  private pickAt(py: number): void {
    const i = Math.floor((py - this.listRect.y + this.scrollY) / ROW_H);
    const e = this.items[i];
    if (e) this.show(e.id);
  }

  /** Mostra um verbete no painel da direita. */
  show(id: string): void {
    const e = GLOSSARY.find((x) => x.id === id);
    if (!e) return;
    this.selected = id;
    audio.sfx('tick', 7);
    this.renderList();
    const r = this.detailRect;
    const [name, def] = entryText(e);
    this.detail.removeAll(true);
    this.detail.add(title(this, r.x + 28, r.y + 26, name, 26, C.green).setWordWrapWidth(r.w - 56));
    const text = body(this, r.x + 28, r.y + 96, def, 24, C.text).setWordWrapWidth(r.w - 56).setLineSpacing(6);
    this.detail.add(text);
    const related = (e.see ?? []).map((sid) => GLOSSARY.find((x) => x.id === sid)).filter(Boolean) as GlossaryEntry[];
    if (!related.length) return;
    const sy = Math.min(r.y + r.h - 130, text.y + text.height + 40);
    this.detail.add(body(this, r.x + 28, sy, t('glossary.see'), 17, C.dim));
    let x = r.x + 28;
    let y = sy + 52;
    for (const rel of related) {
      const label = entryText(rel)[0].replace(/ \(.*\)$/, '');
      const w = Math.min(r.w - 56, label.length * 11 + 40);
      if (x + w > r.x + r.w - 28) {
        x = r.x + 28;
        y += 56;
      }
      this.detail.add(new NeonButton(this, x + w / 2, y, w, 46, label, () => this.show(rel.id), { color: C.cyan, size: 14 }));
      x += w + 12;
    }
  }
}
