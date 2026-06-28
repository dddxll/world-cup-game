# 🛡️ Bug 预防文档 & 回归测试用例

> **规则：每次修改代码前，AI 必须阅读本文档。修改涉及以下模块时，必须运行对应测试用例验证。**

---

## Bug #1: TypeScript 构建错误 — MatchEventSide 未导入

**日期:** 2026-06-28  
**严重度:** 🔴 阻断构建  
**文件:** `src/pages/MatchPage.tsx`

### 根因
`MatchEventSide` 类型在 `handleEventAuto` 函数中作为类型注解使用（`const side: MatchEventSide = ...`），但未从 `@/types` 导入。导致 TS2304 错误，并级联引发后续对象字面量 `type` 字段被错误推断为 `string` 而非 `MatchEventTypeV2`。

### 修复
1. 在 `src/pages/MatchPage.tsx` 第13行导入中加入 `MatchEventSide`
2. 对 `resolvedGoalEvt` 和 `offsideEvt` 对象字面量添加显式 `: MatchEventV2` 类型标注 + `as MatchEventV2` 断言

### 测试用例
```
用例1.1: 运行 `npm run build` → tsc 类型检查零错误，vite build 成功
用例1.2: 检查 `src/pages/MatchPage.tsx` import 语句包含 MatchEventSide
用例1.3: grep "MatchEventSide" src/pages/MatchPage.tsx → 至少匹配 import 行 + 使用行
```

---

## Bug #2: 重伤球员永久未移出替补席

**日期:** 2026-06-28  
**严重度:** 🔴 游戏逻辑错误  
**文件:** `src/pages/MatchPage.tsx`

### 根因
比赛中球员重伤(`injury_major`)被换下时，`setStartingPlayer()` 把受伤球员移到替补席。赛后 `post_match` 阶段虽然标记了 `suspendedUntilMatch: 999`（永不复出），但**从未从 `userTeam.bench` 数组中删除该球员**。下一场比赛替补列表仍会出现该重伤球员。

### 修复
在 `post_match` 确认按钮的 `onClick` 中，处理完所有替换后，识别 `type === 'injury_major'` 的球员，从 `userTeam.bench` 中过滤移除。

```ts
const majorInjuredIds = new Set(
  postMatchPlayers.filter(i => i.type === 'injury_major').map(i => i.playerId)
)
if (majorInjuredIds.size > 0) {
  // 从替补席永久删除重伤球员
  useGameStore.setState(s => ({
    userTeam: { ...s.userTeam, bench: s.userTeam.bench.filter(p => !majorInjuredIds.has(p.id)) }
  }))
}
```

### 测试用例
```
用例2.1: 比赛中己方球员触发 injury_major → 换人 → 赛后确认替换
         → 下一场比赛替补席中不应出现该重伤球员
用例2.2: 重伤球员的 playerSuspensions 记录 suspendedUntilMatch === 999
用例2.3: 重伤球员不在 userTeam.bench 数组中
用例2.4: 轻伤(injury_minor)球员仍应在替补席（只停赛1场，会复出）
用例2.5: 红牌球员仍应在替补席（只停赛1场，会复出）
```

---

## Bug #3: 跳过比赛卡在"模拟比赛中…"

**日期:** 2026-06-28  
**严重度:** 🔴 用户体验阻塞  
**文件:** `src/pages/MatchPage.tsx`

### 根因
`handleSkipMatch` 调用 `setPhase('skipping')` 后，通过 `setTimeout(300ms)` 延迟执行跳过逻辑。在这 300ms 窗口内，挂起的自动推进定时器（`autoTimerRef`、VAR effect、加时 effect 等）可能在 React 重渲染前触发，把 `phase` 改回 `event_active`，导致跳过逻辑永远不执行。

### 修复
添加 `skippingRef` 锁：
1. 在 `handleSkipMatch` / `handleSkipAll` 开头设置 `skippingRef.current = true`
2. 在以下 **8 个 effect** 和 **3 个回调** 开头添加 `if (skippingRef.current) return`：
   - Effects: `intro`、`event_active`、`var_check`、`var_result`、`extra_time_active`、`penalties_shootout`
   - Callbacks: `handleEventAuto`、`handleInteractiveChoice`、`advanceToNextEvent`
3. 防重入：`handleSkipMatch` 和 `handleSkipAll` 开头检查锁

### 测试用例
```
用例3.1: 比赛进行中（任意 phase）→ 点击"跳过本场" → 应直接跳转到积分榜/淘汰赛页，不卡在 spinner
用例3.2: VAR 检查中 → 点击"跳过本场" → 应正常跳过
用例3.3: 加时赛进行中 → 点击"模拟全部剩余" → 应直接到最终结果页
用例3.4: 快速连点两次"跳过本场" → 不应重复执行
用例3.5: 连续点击"跳过本场"+"模拟全部" → 只有一个生效
```

---

## Bug #4: 四强获胜被分配到季军赛

**日期:** 2026-06-28  
**严重度:** 🔴 游戏流程错误  
**文件:** `src/engine/tournament.ts`、`src/pages/MatchPage.tsx`

### 根因
`roundOrder` 数组将"季军赛"排在"决赛"前面：
```
错误: ['32强', '16强', '8强', '4强', '季军赛', '决赛']
正确: ['32强', '16强', '8强', '4强', '决赛', '季军赛']
```
四强（索引3）胜者的下一轮 = 索引4 = 季军赛 ❌

### 修复
两处 `roundOrder` 数组改为正确顺序：`['32强', '16强', '8强', '4强', '决赛', '季军赛']`
- `src/engine/tournament.ts` 第385行
- `src/pages/MatchPage.tsx` 第1298行

### 测试用例
```
用例4.1: 四强获胜 → 下一轮应为"决赛"，不是"季军赛"
用例4.2: 四强落败 → 下一轮应为"季军赛"
用例4.3: 决赛获胜 → currentRound = 'finished'，名次 = 冠军
用例4.4: 季军赛获胜 → currentRound = 'finished'，名次 = 季军
用例4.5: 32强→16强→8强→4强 各级别晋级路径正确
用例4.6: grep "季军赛.*决赛" → roundOrder 中决赛在季军赛前面
```

---

## Bug #5: 最终名次显示错误

**日期:** 2026-06-28  
**严重度:** 🔴 游戏结果错误  
**文件:** `src/engine/tournament.ts` — `getFinalRankText()`

### 根因
`getFinalRankText` 在 `!isPlayerEliminated && currentRound === 'finished'` 分支中，只检查了是否赢得决赛，非冠军一律返回"🥈 亚军"。没有区分：
- 季军赛获胜者 → 应是季军，不是亚军
- 季军赛落败者 → 应是殿军，不是亚军
- 决赛落败者 → 亚军 ✅

### 修复
增加季军赛结果检测：
```ts
// 1. 决赛胜 → 冠军
// 2. 决赛参与但未胜 → 亚军
// 3. 季军赛胜 → 季军
// 4. 季军赛参与但未胜 → 殿军
```

### 测试用例
```
用例5.1: 赢得决赛 → 显示 "🏆 世界杯冠军！"
用例5.2: 输掉决赛 → 显示 "🥈 亚军"
用例5.3: 赢得季军赛 → 显示 "🥉 季军"
用例5.4: 输掉季军赛 → 显示 "🏅 殿军（第四名）"
用例5.5: 淘汰赛被淘汰 → 显示对应轮次名次（如"8强"）
用例5.6: 小组赛被淘汰 → 显示 "小组赛第 N 名"
```

---

## Bug #6: 淘汰赛 AI 互赛纯随机导致强队全灭

**日期:** 2026-06-28  
**严重度:** 🟡 游戏体验  
**文件:** `src/engine/tournament.ts` — `recordKnockoutResult()`

### 根因
淘汰赛同轮其他 AI 比赛用纯随机模拟：
```ts
// 旧代码
const h = Math.floor(Math.random() * 4)  // 0-3 纯随机
const a = Math.floor(Math.random() * 4)  // 0-3 纯随机
```
巴西和卡塔尔的胜率完全相同，导致强队大量被淘汰，玩家淘汰赛全程碰弱队。

### 修复
基于球队三围评分计算胜率：
```ts
const ratingH = 球队综合评分; const ratingA = 对手综合评分
const hWinProb = clamp(0.50 + (ratingH - ratingA) * 0.015, 0.15, 0.85)
// 平局概率：实力接近时 25%
```

### 测试用例
```
用例6.1: 巴西(tier1, 高评分) vs 卡塔尔(tier4, 低评分) → 巴西胜率应 > 80%
用例6.2: 相近实力球队对战 → 胜率应接近 50%，平局概率应存在
用例6.3: 运行完整淘汰赛 10 次 → 至少 7 次决赛队伍包含 tier1 球队
用例6.4: 查看淘汰赛 bracket → 后续轮次应该主要是强队
```

---

## Bug #7: "时间所剩无几"战术事件过早出现

**日期:** 2026-06-28  
**严重度:** 🟡 真实性问题  
**文件:** `src/engine/match-events.ts` — `assignMinutes()`

### 根因
所有战术事件共用 `minMinute: 46` 约束，"比赛进入收官阶段"和"对方全员退守禁区"可能在下半场一开始（46分钟）就出现，不符合足球现实。

### 修复
在 `assignMinutes` 中按标题分类：
- 含"收官阶段"或"退守禁区" → `minMinute: 80, maxMinute: 90`
- 其他战术事件 → `minMinute: 46, maxMinute: 88`

### 测试用例
```
用例7.1: "⏱️ 比赛进入收官阶段"事件的 minute 应 ≥ 80
用例7.2: "🧱 对方全员退守禁区"事件的 minute 应 ≥ 80
用例7.3: "⚡ 对方加快比赛节奏"事件的 minute 应 ≥ 46
用例7.4: 其他战术事件 minute 应在 46~88 之间
```

---

## Bug #8: 红牌"抗议裁判"开场即出现

**日期:** 2026-06-28  
**严重度:** 🟡 真实性问题  
**文件:** `src/engine/match-events.ts` — `assignMinutes()`

### 根因
红牌/两黄变红事件走"普通事件"分配路径，分钟数可早至第 5 分钟。"抗议裁判"红牌在开场几分钟内出现不符合现实——球员情绪累积需要时间。

### 修复
在 `assignMinutes` 中为红牌事件添加时间约束：
- 含"抗议裁判" → `minMinute: 45, maxMinute: 90`
- 其他红牌 → `minMinute: 10, maxMinute: 90`
- 黄牌不受影响（开场黄牌正常）

### 测试用例
```
用例8.1: 描述含"抗议裁判"的红牌事件 minute 应 ≥ 45
用例8.2: 其他红牌（铲球、肘击等）minute 应 ≥ 10
用例8.3: 黄牌事件 minute 无限制（可以 < 10）
用例8.4: 红牌总数不应因时间约束而减少（只影响时间，不影响数量）
```

---

## Bug #9: 合成音效回退系统

**日期:** 2026-06-28  
**严重度:** 🟢 优化  
**文件:** `src/audio/SynthFallback.ts`（已删除）、`src/audio/BGMManager.ts`（已简化）

### 根因
`SynthFallback.ts` 在本地音频文件不存在时用 Web Audio API 合成程序化音效，但用户不需要合成音效。

### 修复
1. 删除 `src/audio/SynthFallback.ts`
2. `BGMManager.ts` 去除所有 `fallbackMode`/`enterFallbackMode`/SynthFallback 动态 import
3. 本地音频文件检测不到时静默跳过

### 测试用例
```
用例9.1: public/audio/ 存在 mp3 → 正常播放下载的 BGM
用例9.2: public/audio/ 不存在 → 静默，不报错，不合成音效
用例9.3: npm run build → 产物中不含 SynthFallback 模块
用例9.4: 静音按钮功能正常
```

---

## 📐 关键数据约束速查表

| 约束项 | 值 | 位置 |
|--------|-----|------|
| 每场伤病次数 | 0-1 | `match-events.ts:generateMatchEvents` |
| 伤病方分配 | 50/50（home/away） | 同上 |
| 重伤概率(占总伤病) | 30% | 同上 |
| 重伤停赛场次 | 999（永不复出） | `MatchPage.tsx:post_match` |
| 淘汰赛轮次顺序 | `32强→16强→8强→4强→决赛→季军赛` | `tournament.ts:roundOrder` |
| AI互赛胜率范围 | 15%~85% | `tournament.ts:recordKnockoutResult` |
| "收官阶段"分钟 | 80-90 | `match-events.ts:assignMinutes` |
| "抗议裁判"红牌分钟 | 45-90 | 同上 |
| 其他红牌分钟 | 10-90 | 同上 |
| 战术调整分钟 | 46-88 | 同上 |
| 疲劳事件分钟 | 58-85 | 同上 |
| 伤病事件分钟 | 25-80 | 同上 |

---

## 🔄 变更记录

| 日期 | Bug# | 变更 |
|------|------|------|
| 2026-06-28 | #1-#9 | 初始文档，收录全部已修复 Bug |
| 2026-06-28 | #2 | 重伤球员 Bug 首次修复 |
| 2026-06-28 | #3 | 跳过比赛卡住首次修复 |
| 2026-06-28 | #4-#5 | 四强路线 + 名次判定修复 |
| 2026-06-28 | #6 | 淘汰赛 AI 实力模拟修复 |
| 2026-06-28 | #7-#8 | 事件时机约束修复 |
| 2026-06-28 | #9 | 合成音效删除 |

---

> ⚠️ **AI 修改代码前必读：** 修改上述任一文件时，先查阅本文档对应 Bug 的测试用例，修改后运行 `npm run build` 验证，确保不引入回归。
