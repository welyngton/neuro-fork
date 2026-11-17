/**
 * @module services/audio/AudioEngine
 *
 * Áudio 100% procedural (Web Audio API) — o jogo não carrega nenhum arquivo de som.
 *
 * Duas partes:
 *  1. **Música**: um sequenciador de 16 avos que lê um {@link MusicTheme}
 *     (ver `themes.ts`) e agenda baixo, arpejo, pad, bumbo, caixa e chimbal.
 *  2. **Efeitos**: pequenos sintetizadores disparados por nome ({@link SfxName}).
 *
 * Navegadores só liberam áudio após um gesto do usuário: chame {@link unlock}
 * no primeiro toque/tecla (feito em `main.ts`). Antes disso tudo é no-op.
 *
 * Grafo:  vozes -> musicBus/sfxBus -> master -> compressor -> saída
 *                         \-> delay (eco) -/
 */
import { MUSIC_THEMES, MusicTheme, ThemeId } from './themes';

export type SfxName =
  | 'click'
  | 'place'
  | 'connect'
  | 'erase'
  | 'error'
  | 'bomb'
  | 'tick'
  | 'good'
  | 'bad'
  | 'step'
  | 'turn'
  | 'zap'
  | 'type'
  | 'whoosh'
  | 'star'
  | 'win'
  | 'lose';

/** Converte nota MIDI em frequência (Hz). */
const midiHz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private musicBus!: GainNode;
  private sfxBus!: GainNode;
  private delaySend!: GainNode;
  private noiseBuf!: AudioBuffer;

  private musicVol = 0.6;
  private sfxVol = 0.8;

  private theme: MusicTheme | null = null;
  private themeId: ThemeId | null = null;
  private step = 0;
  private nextTime = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  /** Cria/retoma o AudioContext. Seguro chamar várias vezes. */
  unlock(): void {
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = (this.ctx = new Ctor());
      const comp = ctx.createDynamicsCompressor();
      comp.connect(ctx.destination);
      this.master = ctx.createGain();
      this.master.gain.value = 0.8;
      this.master.connect(comp);
      this.musicBus = ctx.createGain();
      this.sfxBus = ctx.createGain();
      this.musicBus.connect(this.master);
      this.sfxBus.connect(this.master);

      // Eco com realimentação: dá o "espaço" de neon molhado.
      const delay = ctx.createDelay(1);
      delay.delayTime.value = 0.33;
      const fb = ctx.createGain();
      fb.gain.value = 0.35;
      const damp = ctx.createBiquadFilter();
      damp.type = 'lowpass';
      damp.frequency.value = 2200;
      this.delaySend = ctx.createGain();
      this.delaySend.gain.value = 0.5;
      this.delaySend.connect(delay);
      delay.connect(damp);
      damp.connect(fb);
      fb.connect(delay);
      damp.connect(this.master);

      this.noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

      this.setVolumes(this.musicVol, this.sfxVol);
      if (this.themeId) this.startScheduler();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  }

  /** Ajusta volumes (0..1) de música e efeitos. */
  setVolumes(music: number, sfx: number): void {
    this.musicVol = music;
    this.sfxVol = sfx;
    if (!this.ctx) return;
    this.musicBus.gain.setTargetAtTime(music * 0.55, this.ctx.currentTime, 0.05);
    this.sfxBus.gain.setTargetAtTime(sfx, this.ctx.currentTime, 0.02);
  }

  /** Pausa/retoma tudo (aba em segundo plano). */
  setSuspended(suspended: boolean): void {
    if (!this.ctx) return;
    if (suspended) void this.ctx.suspend();
    else void this.ctx.resume();
  }

  /* ------------------------------------------------------------------ música */

  /** Troca a trilha. Chamar com o mesmo id não reinicia a música. */
  playMusic(id: ThemeId): void {
    if (this.themeId === id) return;
    this.themeId = id;
    this.theme = MUSIC_THEMES[id];
    this.step = 0;
    if (this.ctx) this.startScheduler();
  }

  private startScheduler(): void {
    if (!this.ctx) return;
    this.nextTime = this.ctx.currentTime + 0.08;
    if (this.timer) return;
    // "Lookahead": a cada 25 ms agenda as notas dos próximos 120 ms com relógio de áudio preciso.
    this.timer = setInterval(() => {
      if (!this.ctx || !this.theme || this.ctx.state !== 'running') return;
      // Se a aba ficou parada, não tenta "recuperar" notas atrasadas.
      if (this.nextTime < this.ctx.currentTime - 0.2) this.nextTime = this.ctx.currentTime + 0.05;
      while (this.nextTime < this.ctx.currentTime + 0.12) {
        this.scheduleStep(this.theme, this.step, this.nextTime);
        this.nextTime += 60 / this.theme.bpm / 4;
        this.step++;
      }
    }, 25);
  }

  /** Grau da escala -> nota MIDI (graus acima do tamanho da escala sobem de oitava). */
  private degree(th: MusicTheme, d: number, octave = 0): number {
    const n = th.scale.length;
    return th.root + th.scale[((d % n) + n) % n] + 12 * (Math.floor(d / n) + octave);
  }

  private scheduleStep(th: MusicTheme, step: number, at: number): void {
    const dur = 60 / th.bpm / 4;
    const i = step % 32;
    const bar = Math.floor(step / 16);
    const chord = th.chords[bar % th.chords.length];

    if (th.kick[i % th.kick.length] === 'x') this.kick(at);
    if (th.snare[i % th.snare.length] === 'x') this.noise(at, 0.13, 0.22, 'bandpass', 1900, this.musicBus);
    if (th.hat[i % th.hat.length] === 'x') this.noise(at, 0.035, 0.07, 'highpass', 8000, this.musicBus);

    const b = th.bass[i % th.bass.length];
    if (b !== null) {
      this.voice({ at, dur: dur * 0.9, freq: midiHz(this.degree(th, chord + b)), type: 'sawtooth', gain: 0.2, cutoff: 520, cutoffEnd: 140, bus: this.musicBus });
    }
    const a = th.arp[i % th.arp.length];
    if (a !== null) {
      this.voice({ at, dur: dur * 0.8, freq: midiHz(this.degree(th, chord + a, 2)), type: th.arpWave, gain: 0.07, cutoff: 2600, bus: this.musicBus, echo: 0.6 });
    }
    if (i % 16 === 0 && th.pad) {
      for (const d of [0, 2, 4]) {
        const f = midiHz(this.degree(th, chord + d, 1));
        for (const detune of [-7, 7]) {
          this.voice({ at, dur: dur * 16, freq: f, type: 'sawtooth', gain: 0.022, cutoff: 900, attack: dur * 4, detune, bus: this.musicBus });
        }
      }
    }
  }

  /* ------------------------------------------------------------------ síntese */

  private voice(o: {
    at: number;
    dur: number;
    freq: number;
    freqEnd?: number;
    type: OscillatorType;
    gain: number;
    cutoff?: number;
    cutoffEnd?: number;
    attack?: number;
    detune?: number;
    bus: AudioNode;
    echo?: number;
  }): void {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = o.type;
    osc.frequency.setValueAtTime(o.freq, o.at);
    if (o.freqEnd) osc.frequency.exponentialRampToValueAtTime(o.freqEnd, o.at + o.dur);
    if (o.detune) osc.detune.value = o.detune;
    const g = ctx.createGain();
    const attack = o.attack ?? 0.005;
    g.gain.setValueAtTime(0.0001, o.at);
    g.gain.exponentialRampToValueAtTime(o.gain, o.at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, o.at + Math.max(o.dur, attack + 0.01));
    let node: AudioNode = osc;
    if (o.cutoff) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.Q.value = 4;
      f.frequency.setValueAtTime(o.cutoff, o.at);
      if (o.cutoffEnd) f.frequency.exponentialRampToValueAtTime(o.cutoffEnd, o.at + o.dur);
      osc.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(o.bus);
    if (o.echo) {
      const send = ctx.createGain();
      send.gain.value = o.echo;
      g.connect(send);
      send.connect(this.delaySend);
    }
    osc.start(o.at);
    osc.stop(o.at + o.dur + 0.05);
  }

  private noise(at: number, dur: number, gain: number, type: BiquadFilterType, freq: number, bus: AudioNode): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(f);
    f.connect(g);
    g.connect(bus);
    src.start(at, Math.random() * 0.5, dur + 0.02);
  }

  private kick(at: number): void {
    this.voice({ at, dur: 0.18, freq: 130, freqEnd: 38, type: 'sine', gain: 0.55, bus: this.musicBus });
  }

  /* ------------------------------------------------------------------ efeitos */

  /**
   * Toca um efeito sonoro.
   * @param pitch deslocamento em semitons (ex.: `place` usa a linha do bloco para tocar uma escala).
   */
  sfx(name: SfxName, pitch = 0): void {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running' || this.sfxVol <= 0) return;
    const at = ctx.currentTime + 0.005;
    const bus = this.sfxBus;
    const k = Math.pow(2, pitch / 12);
    const v = (freq: number, dur: number, type: OscillatorType, gain: number, extra: Partial<Parameters<AudioEngine['voice']>[0]> = {}, delay = 0) =>
      this.voice({ at: at + delay, dur, freq: freq * k, type, gain, bus, ...extra });

    switch (name) {
      case 'click':
        v(880, 0.06, 'square', 0.12, { cutoff: 3000 });
        break;
      case 'place':
        v(330, 0.16, 'triangle', 0.3, { echo: 0.4 });
        v(660, 0.1, 'square', 0.06, { cutoff: 2500 }, 0.03);
        break;
      case 'connect':
        v(520, 0.09, 'sawtooth', 0.12, { freqEnd: 1040 * k, cutoff: 3200, echo: 0.5 });
        v(1560, 0.12, 'sine', 0.1, {}, 0.07);
        break;
      case 'erase':
        v(600, 0.14, 'sawtooth', 0.14, { freqEnd: 120, cutoff: 1800 });
        this.noise(at, 0.1, 0.1, 'highpass', 3000, bus);
        break;
      case 'error':
        v(160, 0.16, 'square', 0.16, { cutoff: 900 });
        v(120, 0.2, 'square', 0.16, { cutoff: 900 }, 0.12);
        break;
      case 'bomb':
        this.noise(at, 0.5, 0.5, 'lowpass', 900, bus);
        v(110, 0.45, 'sine', 0.5, { freqEnd: 30 });
        break;
      case 'tick':
        v(440, 0.045, 'square', 0.05, { cutoff: 2400 });
        break;
      case 'good':
        v(660, 0.1, 'triangle', 0.22, { echo: 0.4 });
        v(990, 0.16, 'triangle', 0.22, { echo: 0.4 }, 0.09);
        break;
      case 'bad':
        v(220, 0.25, 'sawtooth', 0.2, { freqEnd: 90, cutoff: 1200 });
        break;
      case 'step':
        v(180, 0.05, 'square', 0.1, { cutoff: 700 });
        break;
      case 'turn':
        v(300, 0.08, 'triangle', 0.14, { freqEnd: 420 * k });
        break;
      case 'zap':
        v(1800, 0.25, 'sawtooth', 0.14, { freqEnd: 200, cutoff: 5000, echo: 0.6 });
        this.noise(at, 0.2, 0.15, 'bandpass', 4000, bus);
        break;
      case 'type':
        v(1200 + Math.random() * 300, 0.02, 'square', 0.04);
        break;
      case 'whoosh':
        this.noise(at, 0.35, 0.18, 'bandpass', 900, bus);
        break;
      case 'star':
        v(880, 0.12, 'triangle', 0.25, { echo: 0.6 });
        v(1320, 0.25, 'triangle', 0.25, { echo: 0.6 }, 0.08);
        break;
      case 'win':
        [0, 4, 7, 12, 16].forEach((s, i) => v(440 * Math.pow(2, s / 12), 0.22, 'triangle', 0.22, { echo: 0.5 }, i * 0.1));
        break;
      case 'lose':
        [0, -1, -5, -12].forEach((s, i) => v(330 * Math.pow(2, s / 12), 0.28, 'sawtooth', 0.14, { cutoff: 1200 }, i * 0.14));
        break;
    }
  }
}
