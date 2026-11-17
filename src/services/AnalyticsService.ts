/**
 * @module services/AnalyticsService
 *
 * Fachada de telemetria. As cenas chamam `analytics.track('evento', {...})`
 * sem saber para onde o evento vai. Hoje o destino é o Google Analytics 4 via
 * Firebase ({@link CloudBackend.logEvent}); em desenvolvimento os eventos só
 * aparecem no console e ficam em `analytics.buffer` para inspeção/testes.
 *
 * Catálogo de eventos (mantenha esta lista em dia ao criar novos):
 *  - `mission_start`    { mission }
 *  - `design_done`      { mission, hidden, links }
 *  - `train_run`        { mission, epochs, loss, activation }
 *  - `sim_result`       { mission, success, stars, loss, hidden }
 *  - `game_finished`    { stars }
 *  - `setting_changed`  { key, value }
 */
import type { CloudBackend } from './FirebaseService';

export type AnalyticsEvent =
  | 'mission_start'
  | 'design_done'
  | 'train_run'
  | 'sim_result'
  | 'game_finished'
  | 'setting_changed';

export type EventParams = Record<string, string | number | boolean>;

export class AnalyticsService {
  /** Últimos eventos disparados (máx. 100) — útil para depurar e testar. */
  readonly buffer: { name: AnalyticsEvent; params: EventParams; at: number }[] = [];

  constructor(private backend: CloudBackend | null = null) {}

  track(name: AnalyticsEvent, params: EventParams = {}): void {
    this.buffer.push({ name, params, at: Date.now() });
    if (this.buffer.length > 100) this.buffer.shift();
    if (import.meta.env?.DEV) console.debug('[analytics]', name, params);
    try {
      this.backend?.logEvent(name, params);
    } catch {
      /* telemetria nunca pode quebrar o jogo */
    }
  }
}
