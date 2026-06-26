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
const POSITION_GROUPS: Position[] = ['CB', 'CM', 'ST']

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

  return POS_COORDS[pos] || { x: 50, y: 50 }
}

interface Props {
  formation: FormationDef
  players?: (Player | null)[]
  onSlotClick?: (index: number) => void
  highlightIndex?: number
}

export function FormationPitch({ formation, players, onSlotClick, highlightIndex }: Props) {
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
          return (
            <g
              key={`${pos}-${i}`}
              onClick={() => onSlotClick?.(i)}
              className={onSlotClick ? 'cursor-pointer' : ''}
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
            </g>
          )
        })}
      </svg>
    </div>
  )
}
