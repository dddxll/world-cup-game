import type { GameEvent } from '@/types'

// 暂存: 事件数据加载
let eventsCache: GameEvent[] | null = null

/** 设置事件数据 (由 data 模块初始化后调用) */
export function setEventsData(events: GameEvent[]) {
  eventsCache = events
}

/** 为一场比赛生成事件序列: 1重大 + 2-4重要 + 5-8普通, 然后随机排序 */
export function generateMatchEvents(): GameEvent[] {
  if (!eventsCache || eventsCache.length === 0) {
    console.warn('事件数据未加载, 返回空数组')
    return []
  }
  const critical = eventsCache.filter(e => e.level === 'critical')
  const major = eventsCache.filter(e => e.level === 'major')
  const minor = eventsCache.filter(e => e.level === 'minor')

  const result: GameEvent[] = []
  // 1 重大
  if (critical.length > 0) {
    result.push(critical[Math.floor(Math.random() * critical.length)])
  }
  // 2-4 重要
  const mc = 2 + Math.floor(Math.random() * 3)
  const sm = [...major].sort(() => Math.random() - 0.5)
  result.push(...sm.slice(0, Math.min(mc, sm.length)))
  // 5-8 普通
  const mnc = 5 + Math.floor(Math.random() * 4)
  const sn = [...minor].sort(() => Math.random() - 0.5)
  result.push(...sn.slice(0, Math.min(mnc, sn.length)))

  return result.sort(() => Math.random() - 0.5)
}

/** 评估事件选项得分 */
export function evaluateEventChoice(
  event: GameEvent,
  optionId: string,
  coachAdp: number
): { scoreEffect: number; resultText: string } {
  const opt = event.options.find(o => o.id === optionId)
  if (!opt) return { scoreEffect: 0, resultText: '无操作' }
  let se = opt.scoreEffect
  if (se > 0) se += Math.floor(coachAdp / 5)
  else if (se < 0 && coachAdp >= 15) se = Math.ceil(se / 2)
  return { scoreEffect: se, resultText: opt.description }
}
