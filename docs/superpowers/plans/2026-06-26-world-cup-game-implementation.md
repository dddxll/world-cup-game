# 2026 世界杯即时策略游戏 — 实现计划

> **For agentic workers:** 使用 superpowers:subagent-driven-development 逐任务执行，每步 checkbox 追踪。

**Goal:** 纯前端世界杯策略游戏，选教练→定阵型→抽球员→48队世界杯→成绩分享。

**Architecture:** React 18 + Vite 5 SPA，Zustand + localStorage，游戏引擎纯函数，JSON 内嵌数据。

**Tech Stack:** React 18, Vite 5, TypeScript 5, Zustand 4, Tailwind CSS 3, React Router 6, Recharts 2, Framer Motion 10, html2canvas 1, Lucide React

## Global Constraints

- 纯前端 SPA，无后端无数据库
- 48 支真实世界杯参赛队，12 组×4 队赛制，48 位真实教练
- 深绿(#0D2818) + 金色(#D4A843) + 白(#FFFFFF)，深色主题
- 桌面 max-width:480px 居中，移动端全屏响应式
- 无登录，localStorage 持久化
- 每完成一个任务后 git commit

---

## 文件结构

```
world-cup-game/
├── index.html
├── package.json / vite.config.ts / tailwind.config.js / tsconfig.json / postcss.config.js
├── public/images/{flags/,coaches/,players/}
├── src/
│   ├── types/index.ts              # 全局 TypeScript 类型
│   ├── data/
│   │   ├── teams.ts                # 48 队基本信息(分档、纸面三围)
│   │   ├── coaches.ts              # 48 教练数据
│   │   ├── formations.ts           # 8 阵型 + 克制表
│   │   ├── players.ts              # 球员池(按国籍+位置索引)
│   │   └── events.ts               # 突发事件池(50+)
│   ├── engine/
│   │   ├── rating.ts               # 球队综合评分计算
│   │   ├── match.ts                # 单场比赛模拟
│   │   ├── tournament.ts           # 小组赛+淘汰赛编排
│   │   ├── ai.ts                   # AI vs AI 加权概率判定
│   │   └── events.ts               # 事件触发/选择判定
│   ├── store/
│   │   └── gameStore.ts            # Zustand 全局状态(持久化)
│   ├── components/
│   │   ├── ui/      Button.tsx Card.tsx Modal.tsx Badge.tsx ProgressBar.tsx
│   │   ├── coach/   CoachCard.tsx CoachGrid.tsx
│   │   ├── formation/ FormationPitch.tsx FormationCard.tsx
│   │   ├── player/  PlayerCard.tsx PlayerDrawer.tsx PositionSlot.tsx
│   │   ├── match/   ScoreBoard.tsx LiveText.tsx EventModal.tsx
│   │   ├── tournament/ GroupTable.tsx BracketTree.tsx
│   │   └── share/   ResultCard.tsx SharePanel.tsx
│   ├── pages/
│   │   ├── HomePage.tsx / CreateTeamPage.tsx / CoachPage.tsx / FormationPage.tsx
│   │   ├── SquadPage.tsx / BenchPage.tsx / TeamReviewPage.tsx
│   │   ├── MatchPage.tsx / GroupStandingsPage.tsx / KnockoutPage.tsx
│   │   ├── FinalResultPage.tsx / PkComparePage.tsx / PromoPage.tsx
│   │   └── PkModePage.tsx
│   ├── App.tsx / main.tsx / index.css
```

---

### Task 1: 项目脚手架

**Files:** package.json, vite.config.ts, tailwind.config.js, tsconfig.json, postcss.config.js, index.html, src/main.tsx, src/App.tsx, src/index.css

- [ ] **Step 1: 初始化项目**

```bash
cd C:\Users\29501\world-cup-game
npm init -y
```

- [ ] **Step 2: 安装全部依赖**

```bash
npm install react@^18 react-dom@^18 react-router-dom@^6 zustand@^4 recharts@^2 framer-motion@^10 html2canvas@^1 lucide-react
npm install -D typescript@^5 vite@^5 @vitejs/plugin-react @types/react @types/react-dom tailwindcss@^3 postcss autoprefixer
```

- [ ] **Step 3: 创建配置文件**

vite.config.ts:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } }
})
```

tailwind.config.js:
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: { DEFAULT: '#0D2818', light: '#1a4a2e', dark: '#081a0f' },
        gold: { DEFAULT: '#D4A843', light: '#e6c96a', dark: '#b8922e' },
      },
      maxWidth: { 'game': '480px' },
    },
  },
  plugins: [],
}
```

tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2020", "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext", "skipLibCheck": true,
    "moduleResolution": "bundler", "allowImportingTsExtensions": true,
    "resolveJsonModule": true, "isolatedModules": true, "noEmit": true,
    "jsx": "react-jsx", "strict": true,
    "noUnusedLocals": false, "noUnusedParameters": false,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

postcss.config.js:
```javascript
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

- [ ] **Step 4: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>2026世界杯 · 即时策略挑战</title>
</head>
<body class="bg-pitch text-white">
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

- [ ] **Step 5: 创建 src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-pitch text-white min-h-screen;
    font-family: -apple-system, BlinkMacSystemFont, 'Microsoft YaHei', 'PingFang SC', sans-serif;
  }
  #root { @apply max-w-game mx-auto min-h-screen; }
}
```

- [ ] **Step 6: 创建 src/main.tsx**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 7: 创建 src/App.tsx**

```tsx
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-gold text-3xl font-bold">2026世界杯 · 即时策略</h1>
    </div>
  )
}
```

- [ ] **Step 8: 更新 package.json scripts**

```json
"scripts": { "dev": "vite", "build": "tsc && vite build", "preview": "vite preview" }
```

- [ ] **Step 9: 验证启动**

```bash
npx vite --port 5173
# 访问 http://localhost:5173 看到标题文字即成功
```

---

### Task 2: 全局类型定义 + Zustand Store

**Files:** src/types/index.ts, src/store/gameStore.ts

**Produces:** 所有 TypeScript 类型 + `useGameStore` hook

- [ ] **Step 1: 创建 src/types/index.ts**

```typescript
export type PlayStyle = '高位压迫' | '传控渗透' | '防守反击' | '两翼齐飞' | '铁桶大巴'

export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'LWB' | 'RWB' | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' | 'LW' | 'RW' | 'ST'

export interface FormationDef {
  id: string; name: string; displayName: string
  positions: Position[]        // 11 个位置，按阵型从左到右、从后到前
  counters: string[]; counteredBy: string[]
}

export interface Coach {
  id: string; name: string; nameEn: string; nationality: string
  avatar: string; style: PlayStyle
  att: number; def: number; adp: number          // 各 0-20
  preferredFormations: string[]; description: string
}

export interface Player {
  id: string; name: string; nameEn: string; nationality: string
  avatar: string; rating: number; positions: Position[]
  stats: { speed: number; shooting: number; passing: number; defending: number; physical: number }
}

export interface NationalTeam {
  id: string; name: string; nameEn: string; flag: string
  tier: 1|2|3|4; group: string                   // A-L
  ratings: { attack: number; defense: number; midfield: number }
  coachId: string; coachStyle: PlayStyle
}

export interface UserTeam {
  name: string; color: string
  coach: Coach | null; formation: FormationDef | null
  startingXI: (Player | null)[]                   // 长度 11
  bench: Player[]                                 // 长度 15
  attackRating: number; defenseRating: number; midfieldRating: number; overallRating: number
}

export type EventLevel = 'minor' | 'major' | 'critical'

export interface GameEvent {
  id: string; level: EventLevel; title: string; description: string
  category: 'injury' | 'card' | 'weather' | 'tactical' | 'var'
  options: { id: string; text: string; scoreEffect: number; description: string }[]
}

export interface MatchResult {
  id: string; homeTeam: string; awayTeam: string
  homeScore: number; awayScore: number
  events: { event: GameEvent; chosenOptionId: string }[]
  stats: { possession: number; shots: number; shotsOnTarget: number }
}

export interface GroupRecord {
  teamId: string; teamName: string; flag: string
  played: number; won: number; drawn: number; lost: number
  goalsFor: number; goalsAgainst: number; goalDiff: number; points: number
}

export interface KnockoutMatch {
  id: string; round: '32强'|'16强'|'8强'|'4强'|'季军赛'|'决赛'
  homeTeam: string|null; awayTeam: string|null
  homeScore?: number; awayScore?: number; winner?: string
}

export interface TournamentState {
  groups: Record<string, GroupRecord[]>; groupMatches: MatchResult[]
  bestThirds: GroupRecord[]; knockoutRounds: KnockoutMatch[]
  playerTeamId: string; currentRound: string; isPlayerEliminated: boolean
}

export type GamePhase = 'home'|'pk-mode'|'create-team'|'coach'|'formation'|'squad'|'bench'|'team-review'|'match'|'group-standings'|'knockout'|'final-result'|'pk-compare'|'promo'

export interface PkData {
  playerA: { team: UserTeam; result: TournamentState|null }|null
  playerB: { team: UserTeam; result: TournamentState|null }|null
  currentPlayer: 'A'|'B'
}
```

- [ ] **Step 2: 创建 src/store/gameStore.ts**

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserTeam, TournamentState, PkData, Coach, FormationDef, Player, GamePhase } from '@/types'

interface GameStore {
  phase: GamePhase; setPhase: (p: GamePhase) => void

  userTeam: UserTeam
  setTeamName: (name: string) => void; setTeamColor: (color: string) => void
  setCoach: (coach: Coach) => void; setFormation: (form: FormationDef) => void
  setStartingPlayer: (index: number, player: Player) => void
  addBenchPlayer: (player: Player) => void; removeBenchPlayer: (playerId: string) => void
  setTeamRatings: (a:number,d:number,m:number,o:number) => void

  tournament: TournamentState|null; setTournament: (t: TournamentState) => void

  pkData: PkData; initPkMode: () => void
  savePkResult: (player:'A'|'B', team:UserTeam, result:TournamentState) => void
  switchPkPlayer: () => void

  resetGame: () => void
}

const defaultTeam: UserTeam = {
  name:'', color:'#D4A843', coach:null, formation:null,
  startingXI:Array(11).fill(null), bench:[],
  attackRating:0,defenseRating:0,midfieldRating:0,overallRating:0,
}

export const useGameStore = create<GameStore>()(persist((set,get) => ({
  phase:'home', setPhase:(p)=>set({phase:p}),

  userTeam:{...defaultTeam},
  setTeamName:(name)=>set(s=>({userTeam:{...s.userTeam,name}})),
  setTeamColor:(color)=>set(s=>({userTeam:{...s.userTeam,color}})),
  setCoach:(coach)=>set(s=>({userTeam:{...s.userTeam,coach}})),
  setFormation:(formation)=>set(s=>({userTeam:{...s.userTeam,formation,startingXI:Array(11).fill(null)}})),
  setStartingPlayer:(i,player)=>set(s=>{
    const xi=[...s.userTeam.startingXI]; xi[i]=player
    return {userTeam:{...s.userTeam,startingXI:xi}}
  }),
  addBenchPlayer:(player)=>set(s=>{
    if(s.userTeam.bench.length>=15||s.userTeam.bench.find(p=>p.id===player.id))return s
    return {userTeam:{...s.userTeam,bench:[...s.userTeam.bench,player]}}
  }),
  removeBenchPlayer:(id)=>set(s=>({userTeam:{...s.userTeam,bench:s.userTeam.bench.filter(p=>p.id!==id)}})),
  setTeamRatings:(a,d,m,o)=>set(s=>({userTeam:{...s.userTeam,attackRating:a,defenseRating:d,midfieldRating:m,overallRating:o}})),

  tournament:null, setTournament:(t)=>set({tournament:t}),

  pkData:{playerA:null,playerB:null,currentPlayer:'A'},
  initPkMode:()=>set({pkData:{playerA:null,playerB:null,currentPlayer:'A'},phase:'create-team'}),
  savePkResult:(player,team,result)=>set(s=>({pkData:{...s.pkData,[`player${player}`]:{team,result}}})),
  switchPkPlayer:()=>set(s=>({
    pkData:{...s.pkData,currentPlayer:s.pkData.currentPlayer==='A'?'B':'A'},
    userTeam:{...defaultTeam},tournament:null,phase:'create-team',
  })),

  resetGame:()=>set({phase:'home',userTeam:{...defaultTeam},tournament:null,pkData:{playerA:null,playerB:null,currentPlayer:'A'}}),
}),{name:'wc-game-storage'}))
```

- [ ] **Step 3: 验证编译**

```bash
npx tsc --noEmit
```

---

### Task 3: 基础 UI 组件

**Files:** src/components/ui/Button.tsx, Card.tsx, Modal.tsx, Badge.tsx, ProgressBar.tsx

- [ ] **Step 1: Button.tsx**

```tsx
import { motion } from 'framer-motion'

interface Props { children: React.ReactNode; onClick?: ()=>void; variant?: 'primary'|'secondary'|'ghost'; size?: 'sm'|'md'|'lg'; disabled?: boolean; className?: string }

export function Button({ children, onClick, variant='primary', size='md', disabled, className='' }: Props) {
  const base='rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  const v={
    primary:'bg-gold text-pitch hover:bg-gold-light',
    secondary:'bg-white/10 text-white hover:bg-white/20 border border-white/20',
    ghost:'text-white/60 hover:text-white hover:bg-white/5',
  }
  const s={ sm:'px-3 py-1.5 text-sm', md:'px-5 py-2.5 text-base', lg:'px-8 py-3 text-lg' }
  return <motion.button whileTap={{scale:0.97}} className={`${base} ${v[variant]} ${s[size]} ${className}`} onClick={onClick} disabled={disabled}>{children}</motion.button>
}
```

- [ ] **Step 2: Card.tsx**

```tsx
import { motion } from 'framer-motion'

interface Props { children: React.ReactNode; className?: string; onClick?: ()=>void; selected?: boolean }

export function Card({ children, className='', onClick, selected }: Props) {
  return <motion.div whileHover={onClick?{scale:1.02}:undefined} whileTap={onClick?{scale:0.98}:undefined}
    onClick={onClick}
    className={`bg-white/5 backdrop-blur rounded-xl border p-4 transition-colors
      ${selected?'border-gold shadow-lg shadow-gold/20':'border-white/10 hover:border-white/20'}
      ${onClick?'cursor-pointer':''} ${className}`}>
    {children}
  </motion.div>
}
```

- [ ] **Step 3: Modal.tsx**

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props { open: boolean; onClose: ()=>void; title?: string; children: React.ReactNode }

export function Modal({ open, onClose, title, children }: Props) {
  return <AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm"
    onClick={onClose}>
    <motion.div initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} exit={{y:100,opacity:0}}
      transition={{type:'spring',damping:25}} onClick={e=>e.stopPropagation()}
      className="bg-[#132a1c] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-5">
      <div className="flex items-center justify-between mb-4">
        {title&&<h3 className="text-lg font-bold text-gold">{title}</h3>}
        <button onClick={onClose} className="text-white/50 hover:text-white ml-auto"><X size={20}/></button>
      </div>
      {children}
    </motion.div>
  </motion.div>}</AnimatePresence>
}
```

- [ ] **Step 4: Badge.tsx + ProgressBar.tsx**

```tsx
// Badge.tsx
export function Badge({ children, color='gold' }: { children: React.ReactNode; color?: 'gold'|'green'|'red'|'blue' }) {
  const c={ gold:'bg-gold/20 text-gold border-gold/30', green:'bg-green-500/20 text-green-400 border-green-500/30', red:'bg-red-500/20 text-red-400 border-red-500/30', blue:'bg-blue-500/20 text-blue-400 border-blue-500/30' }
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${c[color]}`}>{children}</span>
}

// ProgressBar.tsx
export function ProgressBar({ value, max=100, label, color='bg-gold' }: { value:number; max?:number; label?:string; color?:string }) {
  const pct=Math.min(100,Math.round((value/max)*100))
  return <div className="w-full">
    {label&&<div className="flex justify-between text-xs text-white/60 mb-1"><span>{label}</span><span>{value}</span></div>}
    <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className={`h-full ${color} rounded-full transition-all duration-500`} style={{width:`${pct}%`}}/></div>
  </div>
}
```

---

### Task 4: 游戏引擎

**Files:** src/engine/rating.ts, src/engine/match.ts, src/engine/ai.ts, src/engine/tournament.ts, src/engine/events.ts

- [ ] **Step 1: rating.ts — 球队评分计算**

```typescript
import type { UserTeam, Player, Position } from '@/types'

const STYLE_COUNTER: Record<string,string[]> = {
  '高位压迫':['传控渗透','两翼齐飞'],'传控渗透':['防守反击','铁桶大巴'],
  '防守反击':['高位压迫','两翼齐飞'],'两翼齐飞':['铁桶大巴','防守反击'],
  '铁桶大巴':['高位压迫','两翼齐飞'],
}
const FORMATION_COUNTER: Record<string,string[]> = {
  '4-3-3':['4-4-2'],'4-2-3-1':['4-3-3','4-4-2'],'4-4-2':['3-5-2','5-3-2'],
  '3-5-2':['4-2-3-1','4-4-2'],'5-3-2':['4-3-3','3-4-3'],
  '4-1-4-1':['4-2-3-1','3-5-2'],'3-4-3':['3-5-2','4-1-4-1'],'4-3-2-1':['4-2-3-1'],
}

const POSITION_WEIGHTS: Record<Position, Partial<Record<keyof Player['stats'],number>>> = {
  GK:{defending:1,physical:0.5,speed:0.3}, CB:{defending:1,physical:0.8,speed:0.4},
  LB:{speed:0.8,defending:0.7,passing:0.5,physical:0.5}, RB:{speed:0.8,defending:0.7,passing:0.5,physical:0.5},
  LWB:{speed:0.9,passing:0.6,defending:0.5,physical:0.6}, RWB:{speed:0.9,passing:0.6,defending:0.5,physical:0.6},
  CDM:{defending:0.8,passing:0.6,physical:0.7}, CM:{passing:0.8,shooting:0.4,defending:0.4,physical:0.5},
  CAM:{passing:0.8,shooting:0.7,speed:0.5}, LM:{speed:0.8,passing:0.6,shooting:0.4}, RM:{speed:0.8,passing:0.6,shooting:0.4},
  LW:{speed:0.9,shooting:0.7,passing:0.5}, RW:{speed:0.9,shooting:0.7,passing:0.5},
  ST:{shooting:1,speed:0.5,physical:0.6},
}

export function getPositionMatch(player:Player, target:Position): number {
  if(player.positions.includes(target))return 1.0
  const near:Record<Position,Position[]>={GK:[],CB:['LB','RB','LWB','RWB'],LB:['LWB','RB','CB'],RB:['RWB','LB','CB'],LWB:['LB','LM'],RWB:['RB','RM'],CDM:['CM','CAM'],CM:['CDM','CAM','LM','RM'],CAM:['CM','CDM','LW','RW'],LM:['LW','LWB','CM'],RM:['RW','RWB','CM'],LW:['LM','RW','ST'],RW:['RM','LW','ST'],ST:['LW','RW','CAM']}
  if(player.positions.some(p=>(near[target]||[]).includes(p)))return 0.8
  return 0.5
}

export function getEffectiveRating(player:Player, position:Position): number {
  const w=POSITION_WEIGHTS[position]||{}
  let ws=0,tw=0
  for(const k of ['speed','shooting','passing','defending','physical']as const){ws+=player.stats[k]*(w[k]||0);tw+=w[k]||0}
  return (tw>0?ws/tw:player.rating)*getPositionMatch(player,position)
}

export function calculateTeamRatings(team:UserTeam): {attack:number;defense:number;midfield:number;overall:number} {
  const {startingXI,formation,coach}=team
  if(!formation||!coach)return {attack:0,defense:0,midfield:0,overall:0}
  const pos=formation.positions
  let fSum=0,fCnt=0,dSum=0,dCnt=0,mSum=0,mCnt=0
  for(let i=0;i<pos.length;i++){
    if(!startingXI[i])continue
    const er=getEffectiveRating(startingXI[i]!,pos[i])
    if(['ST','LW','RW'].includes(pos[i])){fSum+=er;fCnt++}
    else if(['CM','CDM','CAM','LM','RM'].includes(pos[i])){mSum+=er;mCnt++}
    else {dSum+=er;dCnt++}
  }
  let fbBonus=0
  for(let i=0;i<pos.length;i++){if(['LB','RB','LWB','RWB'].includes(pos[i])&&startingXI[i]){fbBonus+=(startingXI[i]!.stats.speed+startingXI[i]!.stats.passing)/2}}
  const avgF=fCnt>0?fSum/fCnt:50,avgM=mCnt>0?mSum/mCnt:50,avgD=dCnt>0?dSum/dCnt:50

  let cdmBonus=0,gkBonus=0
  for(let i=0;i<pos.length;i++){if(pos[i]==='CDM'&&startingXI[i])cdmBonus=getEffectiveRating(startingXI[i]!,'CDM')*0.25;if(pos[i]==='GK'&&startingXI[i])gkBonus=getEffectiveRating(startingXI[i]!,'GK')*0.25}

  const attack=Math.round(avgF*0.5+avgM*0.3+fbBonus*0.2+coach.att)
  const defense=Math.round(avgD*0.5+cdmBonus+gkBonus+coach.def)
  const midfield=Math.round(avgM*0.6+(cdmBonus/0.25)*0.4)
  const overall=Math.round(attack*0.35+defense*0.35+midfield*0.30)
  return {attack,defense,midfield,overall}
}

export function getStyleCounterBonus(myStyle:string, oppStyle:string): number {
  if(STYLE_COUNTER[myStyle]?.includes(oppStyle))return 8
  if(STYLE_COUNTER[oppStyle]?.includes(myStyle))return -8
  return 0
}

export function getFormationCounterBonus(myFormId:string, oppFormId:string): number {
  if(FORMATION_COUNTER[myFormId]?.includes(oppFormId))return 5
  if(FORMATION_COUNTER[oppFormId]?.includes(myFormId))return -5
  return 0
}

export function getFormationChangePenalty(coachAdp:number, isFamiliar:boolean, countersOpp:boolean): number {
  if(isFamiliar)return countersOpp?5:0
  const base=coachAdp>=15?-2:-5
  return countersOpp?base+5:base
}
```

- [ ] **Step 2: ai.ts — AI vs AI 模拟**

```typescript
import type { NationalTeam } from '@/types'

export function simulateAIMatch(teamA:NationalTeam, teamB:NationalTeam): {homeScore:number;awayScore:number} {
  const diff=teamA.tier-teamB.tier
  let wp:number,dp:number
  if(diff>=3){wp=0.85;dp=0.12}else if(diff===2){wp=0.75;dp=0.18}else if(diff===1){wp=0.62;dp=0.25}else if(diff===0){wp=0.40;dp=0.30}else if(diff===-1){wp=0.25;dp=0.30}else if(diff===-2){wp=0.15;dp=0.22}else{wp=0.07;dp=0.15}
  const roll=Math.random()
  if(roll<wp)return {homeScore:1+Math.floor(Math.random()*3),awayScore:Math.floor(Math.random()*2)}
  else if(roll<wp+dp){const g=Math.floor(Math.random()*3);return {homeScore:g,awayScore:g}}
  return {homeScore:Math.floor(Math.random()*2),awayScore:1+Math.floor(Math.random()*3)}
}
```

- [ ] **Step 3: match.ts — 单场比赛模拟**

```typescript
import type { UserTeam, NationalTeam, GameEvent, MatchResult } from '@/types'
import { calculateTeamRatings, getStyleCounterBonus, getFormationCounterBonus, getFormationChangePenalty } from './rating'

export function simulateMatch(
  home:UserTeam, away:NationalTeam|UserTeam, chosenEvents:{event:GameEvent;optionId:string}[]
): MatchResult {
  const hr=calculateTeamRatings(home)
  let P=hr.overall
  let awayP:number
  let awayStyle:string|undefined, awayFormId:string|undefined
  if('coach' in away&&away.coach){const ar=calculateTeamRatings(away);awayP=ar.overall;awayStyle=away.coach.style;awayFormId=away.formation?.id}
  else{const nt=away as NationalTeam;awayP=Math.round((nt.ratings.attack+nt.ratings.defense+nt.ratings.midfield)/3);awayStyle=nt.coachStyle}

  let T=0
  if(home.coach&&awayStyle)T+=getStyleCounterBonus(home.coach.style,awayStyle)
  if(home.formation&&awayFormId)T+=getFormationCounterBonus(home.formation.id,awayFormId)

  let E=0
  const evtRecords:{event:GameEvent;chosenOptionId:string}[]=[]
  for(const{event,optionId}of chosenEvents){
    const opt=event.options.find(o=>o.id===optionId)
    if(!opt)continue
    let se=opt.scoreEffect
    if(se>0)se+=Math.floor((home.coach?.adp||0)/5)
    else if(se<0&&(home.coach?.adp||0)>=15)se=Math.ceil(se/2)
    E+=se;evtRecords.push({event,chosenOptionId:optionId})
  }

  const randomFactor=(Math.random()-0.5)*0.10
  const fatigueMap:Record<string,number>={'高位压迫':-4,'传控渗透':-2,'两翼齐飞':-3,'防守反击':-1,'铁桶大巴':-1}
  const fatigue=home.coach?(fatigueMap[home.coach.style]||0):-2

  const hs=P*0.55+T*0.25+E*0.15+P*randomFactor+fatigue
  const as=awayP*0.55+(-T)*0.25+awayP*(Math.random()-0.5)*0.10
  const diff=hs-as

  let hg:number,ag:number
  if(diff>8){hg=3+Math.floor(Math.random()*2);ag=Math.floor(Math.random()*2)}
  else if(diff>2){hg=1+Math.floor(Math.random()*2);ag=Math.floor(Math.random()*2)}
  else if(diff>-2){hg=Math.floor(Math.random()*2);ag=Math.floor(Math.random()*2)}
  else if(diff>-8){hg=Math.floor(Math.random()*2);ag=1+Math.floor(Math.random()*2)}
  else{hg=Math.floor(Math.random()*2);ag=3+Math.floor(Math.random()*2)}
  if(diff>2&&hg<=ag)hg=ag+1+Math.floor(Math.random()*2)
  if(diff<-2&&ag<=hg)ag=hg+1+Math.floor(Math.random()*2)

  return {
    id:`match-${Date.now()}`,homeTeam:home.name,
    awayTeam:'name'in away?(away as NationalTeam).name:(away as UserTeam).name,
    homeScore:hg,awayScore:ag,events:evtRecords,
    stats:{possession:Math.round(50+diff*0.8+(Math.random()-0.5)*10),shots:Math.round(10+hg*3+Math.random()*5),shotsOnTarget:Math.round(4+hg*2+Math.random()*3)},
  }
}

export function simulateKnockoutMatch(home:UserTeam,away:NationalTeam|UserTeam,events:{event:GameEvent;optionId:string}[]): MatchResult {
  const result=simulateMatch(home,away,events)
  if(result.homeScore===result.awayScore){
    const etHome=result.homeScore+(Math.random()>0.6?1:0),etAway=result.awayScore+(Math.random()>0.6?1:0)
    return {...result,homeScore:etHome,awayScore:etAway}
  }
  return result
}
```

- [ ] **Step 4: tournament.ts — 赛事编排**

```typescript
import type { UserTeam, NationalTeam, TournamentState, GroupRecord, MatchResult } from '@/types'
import { simulateAIMatch } from './ai'

const GROUPS=['A','B','C','D','E','F','G','H','I','J','K','L']

export function generateTournament(playerTeam:UserTeam, allTeams:NationalTeam[], playerGroup:string): TournamentState {
  const groups:Record<string,GroupRecord[]>={}
  const groupMatches:MatchResult[]=[]
  const playerTeamId='PLAYER'

  for(const g of GROUPS){
    const gts=allTeams.filter(t=>t.group===g)
    groups[g]=gts.map(t=>({teamId:t.id,teamName:t.name,flag:t.flag,played:0,won:0,drawn:0,lost:0,goalsFor:0,goalsAgainst:0,goalDiff:0,points:0}))
    if(g===playerGroup)groups[g].push({teamId:playerTeamId,teamName:playerTeam.name,flag:'🎮',played:0,won:0,drawn:0,lost:0,goalsFor:0,goalsAgainst:0,goalDiff:0,points:0})
  }

  for(const g of GROUPS){
    if(g===playerGroup)continue
    const gts=allTeams.filter(t=>t.group===g)
    for(let i=0;i<gts.length;i++){
      for(let j=i+1;j<gts.length;j++){
        const r=simulateAIMatch(gts[i],gts[j])
        groupMatches.push({id:`AI-${g}-${i}-${j}`,homeTeam:gts[i].name,awayTeam:gts[j].name,homeScore:r.homeScore,awayScore:r.awayScore,events:[],stats:{possession:50,shots:10,shotsOnTarget:4}})
        updateRecord(groups[g],gts[i].id,gts[j].id,r.homeScore,r.awayScore)
      }
    }
    groups[g].sort(sortRecords)
  }
  return {groups,groupMatches,bestThirds:[],knockoutRounds:[],playerTeamId,currentRound:'group',isPlayerEliminated:false}
}

export function updateGroupRecord(records:GroupRecord[],aid:string,bid:string,sa:number,sb:number){
  const a=records.find(r=>r.teamId===aid)!,b=records.find(r=>r.teamId===bid)!
  a.played++;b.played++;a.goalsFor+=sa;a.goalsAgainst+=sb;b.goalsFor+=sb;b.goalsAgainst+=sa
  a.goalDiff=a.goalsFor-a.goalsAgainst;b.goalDiff=b.goalsFor-b.goalsAgainst
  if(sa>sb){a.won++;a.points+=3;b.lost++}else if(sa<sb){b.won++;b.points+=3;a.lost++}else{a.drawn++;b.drawn++;a.points++;b.points++}
}

export function sortRecords(a:GroupRecord,b:GroupRecord): number {
  if(a.points!==b.points)return b.points-a.points
  if(a.goalDiff!==b.goalDiff)return b.goalDiff-a.goalDiff
  return b.goalsFor-a.goalsFor
}
```

- [ ] **Step 5: events.ts — 事件引擎**

```typescript
import type { GameEvent } from '@/types'
import { eventsData } from '@/data/events'

export function generateMatchEvents(): GameEvent[] {
  const critical=eventsData.filter(e=>e.level==='critical')
  const major=eventsData.filter(e=>e.level==='major')
  const minor=eventsData.filter(e=>e.level==='minor')
  const result:GameEvent[]=[]
  result.push(critical[Math.floor(Math.random()*critical.length)])
  const mc=2+Math.floor(Math.random()*3)
  result.push(...[...major].sort(()=>Math.random()-0.5).slice(0,mc))
  const mnc=5+Math.floor(Math.random()*4)
  result.push(...[...minor].sort(()=>Math.random()-0.5).slice(0,mnc))
  return result.sort(()=>Math.random()-0.5)
}

export function evaluateEventChoice(event:GameEvent,optionId:string,coachAdp:number): {scoreEffect:number;resultText:string}{
  const opt=event.options.find(o=>o.id===optionId)
  if(!opt)return {scoreEffect:0,resultText:'无操作'}
  let se=opt.scoreEffect
  if(se>0)se+=Math.floor(coachAdp/5);else if(se<0&&coachAdp>=15)se=Math.ceil(se/2)
  return {scoreEffect:se,resultText:opt.description}
}
```

- [ ] **Step 6: 验证编译**

```bash
npx tsc --noEmit
```

---

### Task 5: 数据文件 — 阵型 + 事件

**Files:** src/data/formations.ts, src/data/events.ts

创建 formations.ts (8 阵型 + 克制关系，参见设计文档 5.1-5.2 节) 和 events.ts (30+ 事件，参见设计文档 8.3 节)。由于内容较长，从设计文档直接复制对应数据即可。

---

### Task 6: 数据文件 — 48 队 + 48 教练

**Files:** src/data/teams.ts, src/data/coaches.ts

需搜集 2026 世界杯 48 队分组数据(设计文档已列)及各队主教练信息。每队写入:
- teams.ts: id(3字母缩写), name, nameEn, flag路径, tier(1-4), group(A-L), ratings(attack/defense/midfield 各0-100), coachId, coachStyle
- coaches.ts: id, name, nameEn, nationality, avatar路径, style(5选1), att/def/adp(0-20), preferredFormations(2-3个), description

共 48 条 × 2，用 ChatGPT/DeepSeek 辅助批量生成。

---

### Task 7: 球员数据

**Files:** src/data/players.ts

约 1248 名球员，按国籍+位置索引:
```typescript
export const playersByCountry: Record<string, Partial<Record<Position, Player[]>>> = {
  FRA: { ST: [{id:'FRA-Mbappe',name:'姆巴佩',nameEn:'Kylian Mbappe',nationality:'FRA',...}], ... },
  ...
}
export function getPlayers(countryId:string, position:Position): Player[] {
  return playersByCountry[countryId]?.[position] || []
}
```

用 AI 批量生成，覆盖 48 国×约 26 人。

---

### Task 8-18: 页面实现

按路由表逐步实现 12 个页面 + 相关子组件。每个页面核心逻辑概要:

| Task | 页面 | 核心逻辑 | 关键子组件 |
|------|------|---------|-----------|
| 8 | `/` HomePage | Trophy图标动画 + 双按钮 | — |
| 9 | `/create` CreateTeamPage | 队名(≤12字)+颜色(8色grid) | — |
| 10 | `/coach` CoachPage | 48教练grid + 按风格筛选 + 属性展示 | CoachCard, CoachGrid |
| 11 | `/formation` FormationPage | 教练擅长阵型(2-3个)SVG展示 + 克制提示 | FormationPitch, FormationCard |
| 12 | `/squad` SquadPage | 阵型图+逐位置弹窗(随机国→球员列表→最多重随2次→选人) | FormationPitch, PlayerDrawer, PlayerCard, PositionSlot |
| 13 | `/squad-bench` BenchPage | 15替补逐位抽选+位置推荐提示 | PlayerDrawer, PlayerCard |
| 14 | `/team-review` TeamReviewPage | 26人名单+Recharts雷达图+确认开赛 | 雷达图组件 |
| 15 | `/match/:round` MatchPage | 文字直播流+ScoreBoard+EventModal(倒计时) | ScoreBoard, LiveText, EventModal |
| 16 | `/group-standings` GroupStandingsPage | 小组积分榜表格+赛果+晋级标注 | GroupTable |
| 17 | `/knockout-bracket` KnockoutPage | 32强树形对阵图+玩家路径高亮 | BracketTree |
| 18 | `/final-result` FinalResultPage | 成绩卡片+html2canvas截图+Recharts雷达图 | ResultCard, SharePanel |

所有页面使用 Framer Motion `AnimatePresence` 做页面切换动画。

---

### Task 19: PK 对比 + 推广页

**Files:** src/pages/PkComparePage.tsx, src/pages/PromoPage.tsx

- PkComparePage: 并排展示双方球队+世界杯成绩+胜负判定
- PromoPage: 游戏介绍+玩法4步+二维码

---

### Task 20: 响应式适配 + 部署

- 确认所有页面 `max-w-game mx-auto` 居中
- 移动端触摸友好(按钮≥44px)
- `npm run build` → dist/ → 部署 Vercel/Netlify

---

## 执行依赖图

```
Task1(脚手架) → Task2(类型+Store) → Task3(UI组件)
                                    ↓
Task4(引擎)←── Task5(阵型+事件数据)── Task6(48队+教练数据)── Task7(球员数据)
    ↓
Task8→9→10→11→12→13→14→15→16→17→18→19→20
(页面按流程顺序：首页→建队→教练→阵型→首发→替补→总览→比赛→积分→淘汰→结算→PK+推广)
```

---

> **下一步:** 用户审核计划后，选择执行方式(Subagent-Driven / Inline Execution)。
