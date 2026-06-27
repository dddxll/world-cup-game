/**
 * 程序化合成回退 — YouTube 不可用时的兜底方案
 * 与 BGMManager 的接口兼容：{ play, stop, setMuted }
 */

type BGMTheme = 'home' | 'selection' | 'match' | 'result' | 'champion'

// 音符表
const C3 = 130.81; const D3 = 146.83; const E3 = 164.81; const F3 = 174.61
const G3 = 196.00; const A3 = 220.00; const B3 = 246.94; const Bb3 = 233.08
const C4 = 261.63; const D4 = 293.66; const E4 = 329.63; const F4 = 349.23
const G4 = 392.00; const A4 = 440.00; const Bb4 = 466.16; const B4 = 493.88
const C5 = 523.25; const D5 = 587.33; const E5 = 659.25; const F5 = 698.46; const G5 = 783.99

interface ThemeConfig {
  bpm: number; melody: number[]; bassDrone: number; gain: number; label: string
}

const THEMES: Record<BGMTheme, ThemeConfig> = {
  home: {
    bpm: 120, gain: 0.40, bassDrone: C3, label: '世界杯狂欢',
    melody: [
      C5, G4, E4, G4, C5, G4, E4, G4,
      C5, E5, G5, E5, C5, G4, E4, 0,
      F4, A4, C5, A4, F4, C5, A4, F4,
      G4, C5, E5, C5, G4, E4, C4, 0,
    ],
  },
  selection: {
    bpm: 105, gain: 0.40, bassDrone: D3, label: '备战进行曲',
    melody: [
      D4, F4, A4, 0, D5, 0, A4, F4,
      G4, Bb4, D5, 0, F5, 0, D5, Bb4,
      D4, F4, A4, D5, 0, C5, Bb4, A4,
      G4, A4, Bb4, G4, 0, F4, 0, D4,
    ],
  },
  match: {
    bpm: 128, gain: 0.30, bassDrone: E3, label: '比赛进行时',
    melody: [
      E4, 0, G4, 0, A4, 0, B4, 0,
      E4, G4, A4, B4, 0, D5, 0, C5,
      E4, 0, F4, 0, G4, 0, A4, 0,
      B4, A4, G4, F4, E4, 0, 0, 0,
    ],
  },
  result: {
    bpm: 62, gain: 0.35, bassDrone: F3, label: '赛后余韵',
    melody: [
      F4, 0, A4, 0, C5, 0, F4, 0,
      D4, 0, F4, 0, Bb4, 0, A4, 0,
      F4, A4, C5, F5, 0, E5, D5, C5,
      Bb4, A4, G4, F4, 0, 0, F4, 0,
    ],
  },
  champion: {
    bpm: 88, gain: 0.45, bassDrone: C3, label: '冠军凯旋',
    melody: [
      C4, E4, G4, C5, 0, E5, 0, G5,
      C5, E5, D5, C5, 0, G4, 0, E4,
      F4, A4, C5, F5, 0, E5, D5, C5,
      G4, C5, E5, G5, C5, G4, E4, C4,
    ],
  },
}

class SynthPlayer {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private bassOsc: OscillatorNode | null = null
  private bassGain: GainNode | null = null
  private melodyTimer: ReturnType<typeof setInterval> | null = null
  private noteIndex = 0
  private currentTheme: BGMTheme | null = null
  private muted = false

  private ensureCtx(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioContext()
    }
    if (this.ctx.state === 'suspended') this.ctx.resume()
    if (!this.masterGain) {
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = 0
      this.masterGain.connect(this.ctx.destination)
    }
    return this.ctx
  }

  play(theme: BGMTheme): void {
    if (this.currentTheme === theme) return
    this.stop()
    this.currentTheme = theme
    const ctx = this.ensureCtx()
    const cfg = THEMES[theme]
    const vol = this.muted ? 0 : cfg.gain

    this.masterGain!.gain.cancelScheduledValues(ctx.currentTime)
    this.masterGain!.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.5)

    // 低音
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    osc.type = 'sine'; osc.frequency.value = cfg.bassDrone
    filter.type = 'lowpass'; filter.frequency.value = cfg.bassDrone * 2; filter.Q.value = 1
    gain.gain.value = 0
    gain.gain.linearRampToValueAtTime(vol * 0.60, ctx.currentTime + 1.5)
    osc.connect(filter); filter.connect(gain); gain.connect(this.masterGain!)
    osc.start()
    this.bassOsc = osc; this.bassGain = gain

    // 旋律
    const noteInterval = (60 / cfg.bpm) * 1000 * 0.5
    this.noteIndex = 0
    this.melodyTimer = setInterval(() => {
      const freq = cfg.melody[this.noteIndex % cfg.melody.length]
      this.noteIndex++
      if (freq === 0 || !this.ctx || !this.masterGain) return
      const now = this.ctx.currentTime
      const no = this.ctx.createOscillator()
      const ng = this.ctx.createGain()
      const nf = this.ctx.createBiquadFilter()
      no.type = 'triangle'; no.frequency.value = freq
      nf.type = 'bandpass'; nf.frequency.value = freq * 1.5; nf.Q.value = 0.8
      const dur = 60 / cfg.bpm * 1.6
      ng.gain.setValueAtTime(0, now)
      ng.gain.linearRampToValueAtTime(vol * 0.85, now + 0.02)
      ng.gain.linearRampToValueAtTime(vol * 0.85 * 0.6, now + dur * 0.7)
      ng.gain.linearRampToValueAtTime(0, now + dur)
      no.connect(nf); nf.connect(ng); ng.connect(this.masterGain!)
      no.start(now); no.stop(now + dur + 0.1)
    }, noteInterval)
  }

  stop(): void {
    if (this.melodyTimer) { clearInterval(this.melodyTimer); this.melodyTimer = null }
    if (this.bassOsc) { try { this.bassOsc.stop() } catch {}; this.bassOsc = null }
    if (this.bassGain) { this.bassGain.disconnect(); this.bassGain = null }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3)
    }
    this.currentTheme = null
  }

  setMuted(m: boolean): void {
    this.muted = m
    if (this.masterGain && this.ctx) {
      const vol = m ? 0 : (this.currentTheme ? THEMES[this.currentTheme].gain : 0)
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
      this.masterGain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.3)
    }
  }
}

export const synthFallback = new SynthPlayer()
