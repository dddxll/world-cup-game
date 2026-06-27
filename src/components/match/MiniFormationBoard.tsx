import { useMemo } from 'react'
import { FormationPitch } from '@/components/formation/FormationPitch'
import type { FormationDef, Player, MatchStateV2 } from '@/types'

interface Props {
  formation: FormationDef
  startingXI: (Player | null)[]
  matchState: MatchStateV2 | null
  bench: Player[]
}

/**
 * 比赛中始终可见的大尺寸阵型面板
 * 在球员位置上叠加红黄牌和进球标记
 * 换人后即时更新场上球员显示
 */
export function MiniFormationBoard({ formation, startingXI, matchState, bench }: Props) {
  // ★ 修复：直接用 matchState 作为 useMemo 依赖，确保每次 matchState 更新都重新计算
  // 之前只用 subCount 在某些渲染批处理场景下可能不会触发更新
  const subCount = matchState?.substitutions.length || 0

  // 计算当前场上的 11 人（应用换人后的阵容）
  // 查找策略：先按 ID 精确匹配，再按 name 模糊匹配
  const currentXI = useMemo(() => {
    if (!matchState || subCount === 0) return startingXI

    const xi = [...startingXI]
    for (const sub of matchState.substitutions) {
      const outIdx = xi.findIndex(p =>
        p && (p.id === sub.playerOutName || p.name === sub.playerOutName)
      )
      if (outIdx < 0) continue
      // 先按 name 在替补席找，找不到再按 ID 找
      let subPlayer = bench.find(p => p.name === sub.playerInName)
      if (!subPlayer) {
        subPlayer = bench.find(p => p.id === sub.playerInName)
      }
      if (subPlayer) {
        xi[outIdx] = subPlayer
      }
    }
    return xi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchState, startingXI, bench])

  // 被换下球员的名字集合（用于清除他们的标记）
  const subbedOutNames = useMemo(() => {
    if (!matchState) return new Set<string>()
    return new Set(matchState.substitutions.map(s => s.playerOutName).filter(Boolean))
  }, [matchState])

  // 根据 matchState 计算哪些位置需要标记
  // 关键：被换下球员的标记会从阵型上移除；多进球/多助攻显示计数
  const { cardSlots, goalSlots, assistSlots } = useMemo(() => {
    const cardSlots: { index: number; type: 'yellow' | 'red' }[] = []
    const goalSlots: { index: number; count: number }[] = []
    const assistSlots: { index: number; count: number }[] = []

    if (!matchState) return { cardSlots, goalSlots, assistSlots }

    // 红黄牌：跳过已被换下的球员，两张黄牌→红牌
    for (const card of matchState.cards) {
      if (!card.playerId) continue
      if (subbedOutNames.has(card.playerName)) continue
      const idx = startingXI.findIndex(p => p?.id === card.playerId)
      if (idx < 0) continue
      const existingCard = cardSlots.find(c => c.index === idx)
      if (existingCard) {
        // 已有黄牌 → 再吃一黄/红 → 升级为红牌
        if (existingCard.type === 'yellow' && (card.type === 'yellow' || card.type === 'red')) {
          existingCard.type = 'red'
        }
      } else {
        cardSlots.push({ index: idx, type: card.type })
      }
    }

    // 进球（仅己方）：跳过已被换下的球员，累计次数
    for (const g of matchState.goalScorers) {
      if (g.side !== 'home') continue
      if (subbedOutNames.has(g.playerName)) continue
      const idx = startingXI.findIndex(p => p?.name === g.playerName)
      if (idx < 0) continue
      const existing = goalSlots.find(gs => gs.index === idx)
      if (existing) {
        existing.count++
      } else {
        goalSlots.push({ index: idx, count: 1 })
      }
    }

    // 助攻（仅己方）：跳过已被换下的球员，累计次数
    for (const a of (matchState.assists || [])) {
      if (subbedOutNames.has(a.playerName)) continue
      const idx = startingXI.findIndex(p => p?.name === a.playerName)
      if (idx < 0) continue
      const existing = assistSlots.find(as => as.index === idx)
      if (existing) {
        existing.count++
      } else {
        assistSlots.push({ index: idx, count: 1 })
      }
    }

    return { cardSlots, goalSlots, assistSlots }
  }, [matchState, startingXI, subbedOutNames])

  const cardCount = cardSlots.length
  const goalCount = goalSlots.length
  const assistCount = assistSlots.length
  const hasRed = cardSlots.some(c => c.type === 'red')

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <FormationPitch
          formation={formation}
          players={currentXI}
          cardSlots={cardSlots}
          goalSlots={goalSlots}
          assistSlots={assistSlots}
          readOnly={true}
        />
      </div>

      {/* 底部标记统计条 */}
      <div className="flex items-center gap-2 px-3 py-1 text-[10px] text-white/40">
        <span className="text-white/30">{formation.displayName}</span>
        {hasRed && <span className="text-red-400">🟥{cardSlots.filter(c => c.type === 'red').length}</span>}
        {cardSlots.some(c => c.type === 'yellow') && (
          <span className="text-yellow-400">🟨{cardSlots.filter(c => c.type === 'yellow').length}</span>
        )}
        {goalCount > 0 && <span className="text-gold">⚽{goalCount}</span>}
        {assistCount > 0 && <span className="text-cyan-400">🅰{assistCount}</span>}
        {subCount > 0 && <span className="text-white/20">🔄{subCount}次换人</span>}
      </div>
    </div>
  )
}
