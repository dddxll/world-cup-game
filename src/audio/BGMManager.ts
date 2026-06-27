/**
 * BGM 管理器 — 使用 HTML5 Audio 播放本地世界杯歌曲
 *
 * 曲目：
 * - home/selection/match/result/champion  →  public/audio/ 下的对应 mp3 文件
 * - 文件不存在时自动回退程序化合成（SynthFallback）
 *
 * 音量默认 35%，右下角按钮静音。
 * 用法：
 *   const bgm = BGMManager.getInstance()
 *   bgm.play('home')
 *   bgm.stop()
 */

export type BGMTheme = 'home' | 'selection' | 'match' | 'result' | 'champion'

/** 各主题对应的音频文件名 (public/audio/)，自动检测 .flac → .mp3 → .ogg */
const AUDIO_NAMES: Record<BGMTheme, string> = {
  home:      'home',
  selection: 'selection',
  match:     'match',
  result:    'result',
  champion:  'champion',
}
const TRY_FORMATS = ['.flac', '.mp3', '.ogg', '.wav', '.m4a']

/** 检测单个 URL 是否可访问 */
function checkFile(url: string): Promise<boolean> {
  return new Promise(resolve => {
    const audio = new Audio()
    audio.volume = 0
    // 用 loadeddata 事件（比 loadedmetadata 更可靠，确保浏览器真正请求了文件）
    const timeout = setTimeout(() => { audio.remove(); resolve(false) }, 5000)
    const done = (ok: boolean) => { clearTimeout(timeout); audio.remove(); resolve(ok) }
    audio.onloadeddata = () => done(true)
    audio.onerror = () => done(false)
    audio.src = url
    // 强制加载：即使 src 设置后浏览器不自动加载，也手动触发
    audio.load()
  })
}

/** 检测并返回可播放的音频路径 */
async function resolveAudioPath(name: string): Promise<string | null> {
  for (const ext of TRY_FORMATS) {
    const path = `/audio/${name}${ext}`
    const ok = await checkFile(path)
    if (ok) return path
  }
  return null
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
  private fallbackMode = false
  private fallbackSynth: any = null
  private availabilityChecked = false
  private initPromise: Promise<void> | null = null

  private constructor() {}

  static getInstance(): BGMManager {
    if (!BGMManager.instance) BGMManager.instance = new BGMManager()
    return BGMManager.instance
  }

  // ========== 初始化 ==========

  /** 检测本地音频文件是否存在，不存在则启用合成回退 */
  private async doInit(): Promise<void> {
    const homePath = await resolveAudioPath(AUDIO_NAMES.home)
    if (!homePath) {
      console.log('[BGM] 未检测到本地音频，使用合成回退。放入 public/audio/ 即可：')
      for (const name of Object.values(AUDIO_NAMES)) {
        console.log(`[BGM]   public/audio/${name}.flac (或 .mp3)`)
      }
      this.enterFallbackMode()
    } else {
      for (const theme of ['home', 'selection', 'match', 'result', 'champion'] as BGMTheme[]) {
        const path = await resolveAudioPath(AUDIO_NAMES[theme])
        if (path) this.audioPaths.set(theme, path)
      }
      console.log(`[BGM] ✅ 本地音频已就绪 (${this.audioPaths.size}/5)`)
      this.preloadAll()
    }
  }

  /** 确保只初始化一次，返回 Promise 供 play() 等待 */
  private ensureInit(): Promise<void> {
    if (this.initPromise) return this.initPromise
    this.initPromise = this.doInit()
    return this.initPromise
  }

  /** 预加载所有音频文件 */
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
      audio.onerror = () => {
        if (theme === this.currentTheme) {
          console.warn(`[BGM] 播放失败: ${path}`)
          this.enterFallbackMode()
        }
      }
    }
  }

  // ========== 回退模式 ==========

  private enterFallbackMode(): void {
    if (this.fallbackMode) return
    this.fallbackMode = true
    this.stopAllAudio()
    import('@/audio/SynthFallback').then(m => {
      this.fallbackSynth = m.synthFallback
      if (this.playing && this.currentTheme) {
        this.fallbackSynth.play(this.currentTheme)
      }
    }).catch(() => {
      console.warn('[BGM] 合成回退加载失败，音乐不可用')
    })
  }

  // ========== 播放控制 ==========

  play(theme: BGMTheme): void {
    this.currentTheme = theme
    this.playing = true

    // 始终等 ensureInit 完成，消除竞态：第二次 play() 调用时 init 可能还未完成
    this.ensureInit().then(() => {
      // init 完成后可能已进入 fallback 模式（文件不存在）
      if (this.fallbackMode) {
        if (this.fallbackSynth) this.fallbackSynth.play(theme)
        return
      }
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
      console.warn('[BGM] 播放失败，切换至合成模式:', err.message)
      this.enterFallbackMode()
      if (this.fallbackSynth) this.fallbackSynth.play(theme)
    })
  }

  stop(): void {
    this.playing = false
    this.stopAllAudio()
    if (this.fallbackSynth) this.fallbackSynth.stop()
  }

  private stopAllAudio(): void {
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
    if (this.fallbackSynth) this.fallbackSynth.setMuted(muted)
  }

  get isMuted(): boolean { return this.muted }
  get current(): BGMTheme | null { return this.currentTheme }
  get isFallback(): boolean { return this.fallbackMode }
}
