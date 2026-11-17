/**
 * @module app/services
 *
 * Ponto de montagem dos serviços globais (um "service locator" simples).
 * As cenas importam daqui: `import { state, audio, analytics } from '../app/services'`.
 *
 * Trocar uma implementação (ex.: outro backend de nuvem) é mudar UMA linha aqui.
 */
import { AnalyticsService } from '../services/AnalyticsService';
import { FirebaseService } from '../services/FirebaseService';
import { AudioEngine } from '../services/audio/AudioEngine';
import { setLocale } from '../services/i18n';
import { GameState } from '../state/GameState';

export const state = new GameState();
export const audio = new AudioEngine();
export const cloud = new FirebaseService();
export const analytics = new AnalyticsService(cloud);

/** Situação da nuvem para a UI (`true` após login anônimo bem-sucedido). */
export const cloudStatus = { online: false };

/**
 * Aplica as opções salvas e, se o Firebase estiver configurado, conecta em
 * segundo plano: baixa o save remoto, mescla e passa a enviar as mudanças
 * (com espera de 2 s para agrupar gravações).
 */
export function bootServices(): void {
  setLocale(state.settings.locale);
  audio.setVolumes(state.settings.music, state.settings.sfx);
  if (!cloud.enabled) return;
  void cloud.init().then(async (ok) => {
    cloudStatus.online = ok;
    if (!ok) return;
    try {
      const remote = await cloud.loadSave();
      if (remote) state.merge(remote);
    } catch (err) {
      console.warn('[cloud] falha ao baixar save:', err);
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    state.onChange(() => {
      clearTimeout(timer);
      timer = setTimeout(() => void cloud.pushSave(state.snapshot()).catch(() => undefined), 2000);
    });
  });
}
