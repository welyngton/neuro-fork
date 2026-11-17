/**
 * @module ui/NetworkView
 *
 * Desenha a rede neural (blocos + cabos) e responde a perguntas de "o que
 * está embaixo do dedo?". É usado em duas cenas:
 *
 *  - **Design**: mostra os encaixes vazios, o cabo sendo arrastado e destaques;
 *  - **Treino**: pinta cada cabo pelo peso (ciano = positivo, magenta = negativo,
 *    espessura = força) e acende os blocos conforme a ativação.
 *
 * O componente só DESENHA: quem altera o tabuleiro é a cena. Chame
 * {@link render} a cada frame (os pontinhos que correm pelos cabos são animados).
 *
 * Formas: sensor = losango amarelo · neurônio = hexágono violeta · ação = placa verde.
 */
import Phaser from 'phaser';
import { Blueprint, Board, nodeColumn, slotId } from '../core/missions/board';
import { Params, linkKey } from '../core/nn/network';
import { t } from '../services/i18n';
import { C, Rect, body, chamfer, offset, regularPoly } from './theme';

export interface NetworkViewOptions {
  /** Espaço reservado de cada lado para os rótulos de sensores/ações. */
  labelPad?: number;
  /** Raio dos blocos. */
  nodeRadius?: number;
  /** Mostra encaixes vazios (modo Design). */
  showSlots?: boolean;
  /** Mostra os títulos das colunas. */
  showHeaders?: boolean;
}

export class NetworkView extends Phaser.GameObjects.Container {
  /** Tabuleiro exibido. Troque a referência ou edite e o próximo render reflete. */
  board: Board;
  /** Pesos para colorir os cabos (null = cabos "neutros"). */
  params: Params | null = null;
  /** Ativação por nó (0..1) para acender blocos. */
  activity: Record<string, number> = {};
  /** Cabo provisório do arrasto: do nó `from` até o ponto (x, y). */
  tempCable: { from: string; x: number; y: number } | null = null;
  /** Nó destacado (alvo do arrasto / origem armada). */
  highlight: string | null = null;

  readonly radius: number;
  private g: Phaser.GameObjects.Graphics;
  private pos = new Map<string, { x: number; y: number }>();
  private showSlots: boolean;

  constructor(scene: Phaser.Scene, private bp: Blueprint, board: Board, rect: Rect, opts: NetworkViewOptions = {}) {
    super(scene, 0, 0);
    this.board = board;
    this.radius = Math.min(opts.nodeRadius ?? 30, bp.slots > 4 ? 26 : 99);
    this.showSlots = opts.showSlots ?? false;
    const pad = opts.labelPad ?? 190;
    const cols = bp.layers + 2;
    // Com muitos sensores/encaixes as linhas ficam próximas: encolhe os rótulos.
    const font = Math.max(bp.inputs.length, bp.outputs.length) > 4 ? 19 : 22;
    const top = rect.y + (opts.showHeaders ? 34 : 0);
    const height = rect.h - (opts.showHeaders ? 34 : 0);
    const colX = (c: number) => rect.x + pad + ((rect.w - pad * 2) * c) / (cols - 1);
    const rowY = (i: number, n: number) => top + (height * (i + 1)) / (n + 1);

    this.g = scene.add.graphics();
    this.add(this.g);

    bp.inputs.forEach((id, i) => {
      const p = { x: colX(0), y: rowY(i, bp.inputs.length) };
      this.pos.set(id, p);
      this.add(body(scene, p.x - this.radius - 14, p.y, t(`io.${id}`), font, bp.inputs.indexOf(id) >= 0 && /^(x2|y2|xy)$/.test(id) ? C.orange : C.yellow).setOrigin(1, 0.5));
    });
    for (let c = 0; c < bp.layers; c++) {
      for (let r = 0; r < bp.slots; r++) {
        this.pos.set(slotId(c, r), { x: colX(c + 1), y: rowY(r, bp.slots) });
      }
    }
    bp.outputs.forEach((id, i) => {
      const p = { x: colX(cols - 1), y: rowY(i, bp.outputs.length) };
      this.pos.set(id, p);
      this.add(body(scene, p.x + this.radius + 14, p.y, t(`io.${id}`), font, C.green).setOrigin(0, 0.5));
    });
    if (opts.showHeaders) {
      const head = (c: number, s: string, color: number) => this.add(body(scene, colX(c), rect.y + 4, s, 18, color).setOrigin(0.5, 0).setAlpha(0.8));
      head(0, t('design.col.in'), C.yellow);
      for (let c = 0; c < bp.layers; c++) head(c + 1, t('design.col.hidden', { n: c + 1 }), C.violet);
      head(cols - 1, t('design.col.out'), C.green);
    }
    scene.add.existing(this);
  }

  /** Posição (em coordenadas de cena) de um nó ou encaixe. */
  posOf(id: string): { x: number; y: number } {
    return this.pos.get(id) ?? { x: 0, y: 0 };
  }

  /** O nó existe no tabuleiro atual? (encaixes vazios não contam). */
  private has(id: string): boolean {
    return nodeColumn(this.bp, this.board, id) >= 0;
  }

  /** Id do nó existente sob o ponto, ou null. A área de toque é maior que o desenho. */
  nodeAt(x: number, y: number): string | null {
    const reach = this.radius + 18;
    for (const [id, p] of this.pos) {
      if (this.has(id) && Phaser.Math.Distance.Between(x, y, p.x, p.y) <= reach) return id;
    }
    return null;
  }

  /** Encaixe oculto VAZIO sob o ponto, ou null. */
  slotAt(x: number, y: number): { col: number; row: number } | null {
    const reach = this.radius + 18;
    for (let c = 0; c < this.bp.layers; c++) {
      for (let r = 0; r < this.bp.slots; r++) {
        const p = this.posOf(slotId(c, r));
        if (!this.board.hidden[c][r] && Phaser.Math.Distance.Between(x, y, p.x, p.y) <= reach) return { col: c, row: r };
      }
    }
    return null;
  }

  /** Índice (em `board.links`) do cabo mais próximo do ponto, ou -1. */
  linkAt(x: number, y: number): number {
    let best = -1;
    let bestD = 20;
    this.board.links.forEach(([a, b], i) => {
      if (!this.has(a) || !this.has(b)) return;
      const pa = this.posOf(a);
      const pb = this.posOf(b);
      const line = new Phaser.Geom.Line(pa.x, pa.y, pb.x, pb.y);
      const near = Phaser.Geom.Line.GetNearestPoint(line, new Phaser.Geom.Point(x, y));
      const inside = near.x >= Math.min(pa.x, pb.x) - 1 && near.x <= Math.max(pa.x, pb.x) + 1;
      const d = Phaser.Math.Distance.Between(x, y, near.x, near.y);
      if (inside && d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }

  /** Redesenha tudo. `time` (ms) anima o fluxo nos cabos. */
  render(time: number): void {
    const g = this.g;
    const R = this.radius;
    g.clear();

    if (this.showSlots) {
      for (let c = 0; c < this.bp.layers; c++) {
        for (let r = 0; r < this.bp.slots; r++) {
          if (this.board.hidden[c][r]) continue;
          const p = this.posOf(slotId(c, r));
          g.lineStyle(2, C.dim, 0.7).strokePoints(offset(regularPoly(6, R, 0), p.x, p.y), true, true);
          g.lineStyle(3, C.dim, 0.7).lineBetween(p.x - 8, p.y, p.x + 8, p.y).lineBetween(p.x, p.y - 8, p.x, p.y + 8);
        }
      }
    }

    this.board.links.forEach(([a, b], i) => {
      if (!this.has(a) || !this.has(b)) return;
      const pa = this.posOf(a);
      const pb = this.posOf(b);
      const w = this.params?.weights[linkKey(a, b)];
      const color = w === undefined ? C.cyan : w >= 0 ? C.cyan : C.magenta;
      const thick = w === undefined ? 4 : Phaser.Math.Clamp(2 + Math.abs(w) * 2.2, 2, 13);
      g.lineStyle(thick + 6, color, 0.12).lineBetween(pa.x, pa.y, pb.x, pb.y);
      g.lineStyle(thick, color, 0.85).lineBetween(pa.x, pa.y, pb.x, pb.y);
      // Pulsos correndo do sensor para a ação.
      for (let k = 0; k < 2; k++) {
        const f = (time / 1100 + i * 0.173 + k * 0.5) % 1;
        g.fillStyle(0xffffff, 0.9).fillRect(pa.x + (pb.x - pa.x) * f - 3, pa.y + (pb.y - pa.y) * f - 3, 6, 6);
      }
    });

    if (this.tempCable) {
      const pa = this.posOf(this.tempCable.from);
      const { x, y } = this.tempCable;
      const len = Phaser.Math.Distance.Between(pa.x, pa.y, x, y);
      const n = Math.max(1, Math.floor(len / 18));
      g.fillStyle(C.yellow);
      for (let k = 0; k <= n; k++) {
        const f = (k / n + (time / 600) / n) % 1;
        g.fillRect(pa.x + (x - pa.x) * f - 3, pa.y + (y - pa.y) * f - 3, 6, 6);
      }
    }

    for (const [id, p] of this.pos) {
      const col = nodeColumn(this.bp, this.board, id);
      if (col < 0) continue;
      const isIn = col === 0;
      const isOut = col === this.bp.layers + 1;
      const color = isIn ? C.yellow : isOut ? C.green : C.violet;
      const pts = offset(isIn ? regularPoly(4, R + 2) : isOut ? chamfer(R * 1.9, R * 1.6, 10) : regularPoly(6, R, 0), p.x, p.y);
      const act = Phaser.Math.Clamp(Math.abs(this.activity[id] ?? 0), 0, 1);
      const hot = this.highlight === id;
      g.fillStyle(C.bg).fillPoints(pts, true);
      g.fillStyle(color, 0.15 + act * 0.7).fillPoints(pts, true);
      g.lineStyle(hot ? 6 : 3, hot ? 0xffffff : color).strokePoints(pts, true, true);
      if (!isIn && !isOut) g.fillStyle(color).fillPoints(offset(regularPoly(3, 8), p.x, p.y), true);
    }
  }
}
