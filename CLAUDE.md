# CLAUDE.md — 世界杯策略游戏

## ⚠️ 修改代码前必读

**在修改任何源代码之前，必须先阅读 `docs/BUG-PREVENTION.md`**，了解所有已知 Bug 的根因、修复方案和回归测试用例，避免重复引入相同的错误。

## 项目信息

- **类型:** 纯前端 SPA（无后端/无数据库/无登录）
- **技术栈:** React 18 + Vite 5 + TypeScript 5 + Zustand 4 + Tailwind CSS 3
- **构建命令:** `npm run build`（先 tsc 类型检查，再 vite build）
- **开发命令:** `npm run dev`（默认端口 5173）
- **部署平台:** Vercel（自动部署 main 分支）

## 关键架构约定

- 所有游戏数据内嵌在 `src/data/*.ts` 中
- 游戏引擎是纯函数，在 `src/engine/*.ts` 中
- 全局状态由 Zustand 管理，持久化到 localStorage（key: `wc-game-storage`）
- 桌面端优先（max-width: 480px 居中），移动端响应式
- 主题色：深绿(#0D2818) + 金色(#D4A843)

## 修改完代码后的检查清单

1. `npm run build` 必须零错误通过
2. 如果修改了 `BUG-PREVENTION.md` 中覆盖的文件，运行对应测试用例
3. 如果修复了新 Bug，必须更新 `docs/BUG-PREVENTION.md`

## 重要文件索引

| 模块 | 路径 |
|------|------|
| 类型定义 | `src/types/index.ts` |
| 全局状态 | `src/store/gameStore.ts` |
| 比赛事件引擎 | `src/engine/match-events.ts` |
| 赛事编排 | `src/engine/tournament.ts` |
| 比赛页面（最大文件） | `src/pages/MatchPage.tsx` |
| Bug 预防文档 | `docs/BUG-PREVENTION.md` |
