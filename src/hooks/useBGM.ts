/**
 * useBGM — React Hook，封装 BGMManager
 *
 * <BGMTracker /> 挂载在 App 中，通过路由自动切换 BGM。
 * 夺冠自动切 'champion'。YouTube 不可用时回退程序化合成。
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BGMManager, type BGMTheme } from '@/audio/BGMManager'
import { useGameStore } from '@/store/gameStore'

/** 根据当前路径返回 BGM 主题 */
function pathToBGMTheme(pathname: string): BGMTheme | null {
  // 夺冠检测（在 /final-result 页检查是否赢了决赛）
  if (pathname === '/final-result') {
    const state = useGameStore.getState()
    const final = state.tournament?.knockoutRounds?.find(k => k.round === '决赛')
    if (final?.winner && final.winner === state.userTeam.name) {
      return 'champion'
    }
    return 'result'
  }

  // 首页
  if (pathname === '/' || pathname === '/promo') return 'home'

  // 选人阶段（创建球队 → 选教练 → 阵型 → 大名单 → 替补 → 复核）
  if (['/create', '/coach', '/formation', '/squad', '/squad-bench', '/team-review'].includes(pathname)) {
    return 'selection'
  }

  // 比赛
  if (pathname.startsWith('/match/')) return 'match'

  // 赛后（积分榜 / 淘汰赛签表 / 最终结果）
  if (['/group-standings', '/knockout-bracket', '/final-result'].includes(pathname)) {
    return 'result'
  }

  return null
}

/**
 * React Hook — 在组件中控制 BGM
 */
export function useBGM() {
  const manager = useRef(BGMManager.getInstance()).current
  const [muted, setMuted] = useState(manager.isMuted)

  const playTheme = useCallback((theme: BGMTheme | null) => {
    if (theme) manager.play(theme)
    else manager.stop()
  }, [manager])

  const stop = useCallback(() => manager.stop(), [manager])

  const toggleMute = useCallback(() => {
    manager.setMuted(!manager.isMuted)
    setMuted(manager.isMuted)
  }, [manager])

  return { playTheme, stop, toggleMute, isMuted: muted, manager }
}

/**
 * BGMTracker — 挂载在 App 中，通过 react-router 的 useLocation 自动切换 BGM。
 * 首次用户交互时初始化播放。
 */
export function BGMTracker() {
  const location = useLocation()
  const manager = useRef(BGMManager.getInstance()).current
  const started = useRef(false)
  const prevTheme = useRef<BGMTheme | null>(null)

  // 当前路径对应的 BGM 主题
  const theme = pathToBGMTheme(location.pathname)

  // 首次用户交互开始播放
  useEffect(() => {
    if (started.current) return
    const start = () => {
      if (started.current) return
      started.current = true
      const t = pathToBGMTheme(location.pathname)
      if (t) { manager.play(t); prevTheme.current = t }
      document.removeEventListener('click', start)
      document.removeEventListener('keydown', start)
      document.removeEventListener('touchstart', start)
    }
    document.addEventListener('click', start)
    document.addEventListener('keydown', start)
    document.addEventListener('touchstart', start)
    return () => {
      document.removeEventListener('click', start)
      document.removeEventListener('keydown', start)
      document.removeEventListener('touchstart', start)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 路由变化切换主题
  useEffect(() => {
    if (!started.current || !theme) return
    if (theme === prevTheme.current) return  // 同主题不重复切
    prevTheme.current = theme
    manager.play(theme)
  }, [theme, manager])

  return null
}

export default useBGM
