import type { FormationDef, Position, Player } from '@/types'

// 每个位置在半场的坐标 (百分比)
// 注意：CB/CM/ST 在 POS_COORDS 中只保留一个基准坐标，
// 实际布局由 getCoords 按数量自动分配 x 轴偏移
const POS_COORDS: Partial<Record<Position, { x: number; y: number }>> = {
  GK:  { x: 50, y: 88 },
  LB:  { x: 12, y: 65 },
  RB:  { x: 88, y: 65 },
  LWB: { x: 15, y: 55 },
  RWB: { x: 85, y: 55 },
  CDM: { x: 50, y: 52 },
  CAM: { x: 50, y: 28 },
  CB:  { x: 50, y: 72 },
  CM:  { x: 50, y: 40 },
  ST:  { x: 50, y: 10 },
  LM:  { x: 18, y: 35 },
  RM:  { x: 82, y: 35 },
  LW:  { x: 18, y: 15 },
  RW:  { x: 82, y: 15 },
}

// 位置类型分组，用于 x 轴自动分布
const POSITION_GROUPS: Position[] = ['CB', 'CM', 'ST', 'CDM', 'CAM']

/**
 * 获取第 idx 个位置的坐标。
 * 对于 CB/CM/ST 这类可能重复的位置，自动在 x 轴上均匀分布。
 * 比如 3 个 CB 会分别放在 x=25, x=50, x=75；2 个放在 x=30, x=70。
 */
function getCoords(positions: Position[], idx: number): { x: number; y: number } {
  const pos = positions[idx]

  // 如果是需要分组的类型，找到该类型所有实例并均匀分布
  if (POSITION_GROUPS.includes(pos)) {
    const allIndices = positions
      .map((p, i) => (p === pos ? i : -1))
      .filter((i) => i !== -1)
    const groupIndex = allIndices.indexOf(idx)
    const count = allIndices.length

    if (count > 1) {
      const base = POS_COORDS[pos] || { x: 50, y: 50 }
      const spacing = 80 / (count + 1)
      return { x: 10 + spacing * (groupIndex + 1), y: base.y }
    }
  }

  // 如果坐标不存在，尝试分组推算（避免多个同类型位置重叠在中心）
  if (!POS_COORDS[pos]) {
    const allSame = positions.filter(p => p === pos).length
    const sameIdx = positions.slice(0, idx).filter(p => p === pos).length
    if (allSame > 1) {
      const spacing = 80 / (allSame + 1)
      return { x: 10 + spacing * (sameIdx + 1), y: 45 }
    }
  }

  return POS_COORDS[pos] || { x: 50, y: 50 }
}

interface Props {
  formation: FormationDef
  players?: (Player | null)[]
  onSlotClick?: (index: number) => void
  highlightIndex?: number
  /** 红黄牌标记：位置索引 → 牌色 */
  cardSlots?: { index: number; type: 'yellow' | 'red' }[]
  /** 进球标记：位置索引 → 进球次数 */
  goalSlots?: { index: number; count: number }[]
  /** 助攻标记：位置索引 → 助攻次数 */
  assistSlots?: { index: number; count: number }[]
  /** 只读模式：禁用 cursor-pointer（用于比赛中的阵型展示） */
  readOnly?: boolean
}

export function FormationPitch({ formation, players, onSlotClick, highlightIndex, cardSlots, goalSlots, assistSlots, readOnly }: Props) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '120%' }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {/* 球场背景 */}
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="1"
          fill="#0a3d18"
          stroke="#ffffff30"
          strokeWidth="0.3"
        />
        {/* 中线 */}
        <line x1="2" y1="50" x2="98" y2="50" stroke="#ffffff15" strokeWidth="0.2" />
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke="#ffffff15"
          strokeWidth="0.2"
        />
        {/* 上禁区（对方半场） */}
        <rect
          x="25"
          y="4"
          width="50"
          height="18"
          fill="none"
          stroke="#ffffff15"
          strokeWidth="0.2"
        />
        {/* 上小禁区 */}
        <rect
          x="35"
          y="10"
          width="30"
          height="8"
          fill="none"
          stroke="#ffffff10"
          strokeWidth="0.2"
        />
        {/* 下禁区（己方半场） */}
        <rect
          x="25"
          y="78"
          width="50"
          height="18"
          fill="none"
          stroke="#ffffff15"
          strokeWidth="0.2"
        />
        {/* 下小禁区 */}
        <rect
          x="35"
          y="84"
          width="30"
          height="8"
          fill="none"
          stroke="#ffffff10"
          strokeWidth="0.2"
        />

        {/* 球员圆点 */}
        {formation.positions.map((pos, i) => {
          const { x, y } = getCoords(formation.positions, i)
          const player = players?.[i]
          const isHighlight = highlightIndex === i
          const goalSlot = goalSlots?.find(g => g.index === i)
          const assistSlot = assistSlots?.find(a => a.index === i)
          return (
            <g
              key={`${pos}-${i}`}
              onClick={() => onSlotClick?.(i)}
              className={onSlotClick && !readOnly ? 'cursor-pointer' : ''}
            >
              <circle
                cx={x}
                cy={y}
                r={isHighlight ? 5 : 3.5}
                fill={player ? '#D4A843' : '#ffffff20'}
                stroke={isHighlight ? '#D4A843' : '#ffffff40'}
                strokeWidth={isHighlight ? 0.8 : 0.3}
                className="transition-all duration-300"
              />
              {player ? (
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  fill="white"
                  fontSize="2.5"
                  fontWeight="bold"
                >
                  {player.rating}
                </text>
              ) : (
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  fill="#ffffff40"
                  fontSize="3"
                >
                  +
                </text>
              )}
              <text
                x={x}
                y={y - 5}
                textAnchor="middle"
                fill="#ffffff50"
                fontSize="2"
              >
                {pos}
              </text>
              {/* ★ 球员姓名：圆点下方 */}
              {player && (
                <text
                  x={x}
                  y={y + 7}
                  textAnchor="middle"
                  fill="#ffffff70"
                  fontSize="2"
                  fontWeight="normal"
                >
                  {player.name.length > 6 ? player.name.slice(0, 6) + '…' : player.name}
                </text>
              )}
              {/* 红黄牌标记：右上角 */}
              {cardSlots?.some(c => c.index === i) && (() => {
                const card = cardSlots.find(c => c.index === i)!
                return (
                  <rect key={`card-${i}`}
                    x={x + 1.8} y={y - 5.5}
                    width={2.2} height={3}
                    rx={0.4}
                    fill={card.type === 'red' ? '#ef4444' : '#eab308'}
                    stroke="#ffffffcc"
                    strokeWidth={0.15}
                  />
                )
              })()}
              {/* 进球标记：右下角金色圆点（多球显示×N） */}
              {goalSlot && (
                <g key={`goal-${i}`}>
                  <circle
                    cx={x + 2.5} cy={y + 2.5}
                    r={1.5}
                    fill="#D4A843"
                    stroke="#ffffffcc"
                    strokeWidth={0.15}
                  />
                  <text x={x + 2.5} y={y + 2.9} textAnchor="middle" fill="white" fontSize="1.4" fontWeight="bold">G</text>
                  {goalSlot.count > 1 && (
                    <text x={x + 4.2} y={y + 3.2} textAnchor="start" fill="#D4A843" fontSize="1.3" fontWeight="bold">×{goalSlot.count}</text>
                  )}
                </g>
              )}
              {/* 助攻标记：右下角偏下青色圆点（与进球位置重叠时自动偏移） */}
              {assistSlot && (
                <g key={`assist-${i}`}>
                  <circle
                    cx={x + 2.5} cy={y + (goalSlot ? 4.5 : 2.5)}
                    r={1.5}
                    fill="#06b6d4"
                    stroke="#ffffffcc"
                    strokeWidth={0.15}
                  />
                  <text
                    x={x + 2.5}
                    y={y + (goalSlot ? 4.9 : 2.9)}
                    textAnchor="middle" fill="white" fontSize="1.4" fontWeight="bold"
                  >A</text>
                  {assistSlot.count > 1 && (
                    <text
                      x={x + 4.2}
                      y={y + (goalSlot ? 5.2 : 3.2)}
                      textAnchor="start" fill="#06b6d4" fontSize="1.3" fontWeight="bold"
                    >×{assistSlot.count}</text>
                  )}
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
