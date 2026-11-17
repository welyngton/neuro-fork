/**
 * @module app/services
 *
 * Ponto de montagem dos serviços globais (um "service locator" simples).
 * As cenas importam daqui: `import { state, audio, analytics, cloud } from '../app/services'`.
 *
 * Trocar uma implementação (ex.: outro backend de nuvem) é mudar UMA linha aqui.
 */
import type Phaser from 'phaser';
import { AnalyticsService } from '../services/AnalyticsService';
import { CloudBackend, FirebaseService } from '../services/FirebaseService';
import { AudioEngine } from '../services/audio/AudioEngine';
import { setLocale } from '../services/i18n';
import { GameState } from '../state/GameState';

export const state = new GameState();
export const audio = new AudioEngine();
export const cloud: CloudBackend = new FirebaseService();
export const analytics = new AnalyticsService(cloud);

/**
 * Aplica as opções salvas e conecta a nuvem em segundo plano.
 *
 * Quando o jogador entra com Google: baixa o progresso remoto, mescla com o
 * local (fica o melhor de cada missão) e passa a enviar as mudanças, agrupadas
 * a cada 2 s. Ao entrar ou sair, o menu é redesenhado para refletir a conta.
 */
export function bootServices(game: Phaser.Game): void {
  setLocale(state.settings.locale);
  audio.setVolumes(state.settings.music, state.settings.sfx);
  if (!cloud.enabled) return;

  let timer: ReturnType<typeof setTimeout> | undefined;
  state.onChange(() => {
    if (!cloud.user) return;
    clearTimeout(timer);
    timer = setTimeout(() => void cloud.pushSave(state.snapshot()).catch((err) => console.warn('[cloud] falha ao salvar:', err)), 2000);
  });

  void cloud.init(async (user) => {
    if (user) {
      try {
        const remote = await cloud.loadSave();
        if (remote) state.merge(remote);
        else await cloud.pushSave(state.snapshot());
      } catch (err) {
        console.warn('[cloud] falha ao sincronizar:', err);
      }
    }
    if (game.scene.isActive('Menu')) game.scene.getScene('Menu').scene.restart();
  });
}
