/**
 * BGM 管理器 — 使用 HTML5 Audio 播放本地 FLAC 世界杯歌曲
 *
 * 曲目：home/selection/match/result/champion
 * 音频位置：public/audio/*.flac
 * 音量默认 35%，右下角按钮静音。
 */

export type BGMTheme = 'home' | 'selection' | 'match' | 'result' | 'champion'

const AUDIO_NAMES: Record<BGMTheme, string> = {
  home: 'home', selection: 'selection', match: 'match', result: 'result', champion: 'champion',
}

const DEFAULT_VOLUME = 0.35

export class BGMManager {
  private static instance: BGMManager | null = null

  private audioElements = new Map<BGMTheme, HTMLAudioElement>()
  private audioPaths = new Map<BGMTheme, string>()
  private currentTheme: BGMTheme | null = null
  private playing = false
  private muted = false
  private volume = DEFAULT_VOLUME
  private hasAudio = false
  private initPromise: Promise<void> | null = null

  private constructor() {}

  static getInstance(): BGMManager {
    if (!BGMManager.instance) BGMManager.instance = new BGMManager()
    return BGMManager.instance
  }

  // ========== 初始化 ==========

  /** 直接加载音频（跳过检测，避免大文件超时误判） */
  private async doInit(): Promise<void> {
    const base = import.meta.env.BASE_URL || './'
    // 直接按 FLAC 构造路径，不检测文件是否存在（文件太大检测超时）
    for (const theme of ['home', 'selection', 'match', 'result', 'champion'] as BGMTheme[]) {
      this.audioPaths.set(theme, `${base}audio/${AUDIO_NAMES[theme]}.flac`)
    }
    this.hasAudio = true
    console.log('[BGM] ✅ 音频路径已配置 (5首 FLAC)')
    this.preloadAll()
  }

  /** 确保只初始化一次 */
  private ensureInit(): Promise<void> {
    if (this.initPromise) return this.initPromise
    this.initPromise = this.doInit()
    return this.initPromise
  }

  /** 预加载所有检测到的音频文件 */
  private preloadAll(): void {
    for (const theme of ['home', 'selection', 'match', 'result', 'champion'] as BGMTheme[]) {
      const path = this.audioPaths.get(theme)
      if (!path) continue
      const audio = new Audio()
      audio.preload = 'auto'
      audio.loop = true
      audio.volume = this.muted ? 0 : this.volume
      audio.src = path
      this.audioElements.set(theme, audio)

      audio.onended = () => {
        if (this.currentTheme === theme && this.playing) {
          audio.currentTime = 0
          audio.play().catch(() => {})
        }
      }
    }
  }

  // ========== 播放控制 ==========

  play(theme: BGMTheme): void {
    this.currentTheme = theme
    this.playing = true

    // 等待 init 完成后再播放
    this.ensureInit().then(() => {
      // init 完成后如果没有音频文件，静默跳过
      if (!this.hasAudio) return
      // 防止快速切换主题导致播放旧请求
      if (this.currentTheme !== theme || !this.playing) return
      this.startPlayback(theme)
    })
  }

  private startPlayback(theme: BGMTheme): void {
    // 停止其他主题
    for (const [t, audio] of this.audioElements) {
      if (t !== theme) {
        audio.pause()
        audio.currentTime = 0
      }
    }

    // 播放目标主题
    const audio = this.audioElements.get(theme)
    if (!audio) return

    audio.currentTime = 0
    audio.volume = this.muted ? 0 : this.volume
    audio.play().catch(err => {
      console.warn('[BGM] 播放失败:', err.message)
    })
  }

  stop(): void {
    this.playing = false
    for (const [, audio] of this.audioElements) {
      audio.pause()
      audio.currentTime = 0
    }
  }

  // ========== 音量 ==========

  setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol))
    if (!this.muted) {
      for (const [, audio] of this.audioElements) {
        audio.volume = this.volume
      }
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    for (const [, audio] of this.audioElements) {
      audio.volume = muted ? 0 : this.volume
    }
  }

  get isMuted(): boolean { return this.muted }
  get current(): BGMTheme | null { return this.currentTheme }
}
