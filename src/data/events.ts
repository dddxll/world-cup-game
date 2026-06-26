import type { GameEvent } from '@/types'

export const eventsData: GameEvent[] = [
  // ===== 重大事件 (critical) =====
  {
    id: 'evt-c-01', level: 'critical', category: 'injury',
    title: '🔥 核心球员受伤倒地！',
    description: '你的核心球员在一次拼抢中被铲倒，表情痛苦地捂着脚踝。',
    options: [
      { id: 'a', text: '立即换下，保护球员', scoreEffect: 1, description: '保住球员健康，但损失了场上核心。' },
      { id: 'b', text: '打封闭坚持比赛', scoreEffect: 4, description: '球员咬牙坚持，但冒险可能加重伤情。' },
      { id: 'c', text: '观察5分钟再做决定', scoreEffect: 2, description: '保守策略，先看看情况。' },
    ],
  },
  {
    id: 'evt-c-02', level: 'critical', category: 'var',
    title: '📺 VAR！点球争议！',
    description: '裁判正在回看VAR，疑似对方禁区内手球。全场屏息等待。',
    options: [
      { id: 'a', text: '冷静等待判罚', scoreEffect: 3, description: '裁判判罚点球！获得绝佳机会。' },
      { id: 'b', text: '向裁判施压', scoreEffect: -4, description: '裁判反而给了你一张黄牌。' },
      { id: 'c', text: '利用暂停布置战术', scoreEffect: 2, description: '临场应变高的教练趁机调整，收益更大。' },
    ],
  },
  {
    id: 'evt-c-03', level: 'critical', category: 'tactical',
    title: '🔄 对方突然变阵！',
    description: '对方主教练在场边做出手势，阵型发生了明显变化。',
    options: [
      { id: 'a', text: '我也变阵应对', scoreEffect: 3, description: '针对性调整，但取决于教练的变阵熟练度。' },
      { id: 'b', text: '以不变应万变', scoreEffect: 1, description: '保持现有打法，相信球员执行力。' },
      { id: 'c', text: '微调位置不换阵', scoreEffect: 2, description: '折中方案，小幅调整站位。' },
    ],
  },
  {
    id: 'evt-c-04', level: 'critical', category: 'tactical',
    title: '⏰ 比分落后，只剩15分钟！',
    description: '你需要进球才能改变局面，是时候做出选择了。',
    options: [
      { id: 'a', text: '换上前锋全线压上', scoreEffect: 4, description: '全力进攻，但后防空虚。' },
      { id: 'b', text: '稳扎稳打等机会', scoreEffect: 0, description: '保持耐心，等待对方犯错。' },
      { id: 'c', text: '变阵改打法搏一把', scoreEffect: 2, description: '改变战术，出其不意。' },
    ],
  },
  {
    id: 'evt-c-05', level: 'critical', category: 'card',
    title: '🟥 红牌！你的球员被罚下！',
    description: '裁判直接出示红牌！你的球队将少一人作战。',
    options: [
      { id: 'a', text: '换下前锋换后卫保平', scoreEffect: -1, description: '稳固防守，争取不再丢球。' },
      { id: 'b', text: '保持进攻阵型', scoreEffect: -4, description: '少一人还强攻，后防漏洞百出。' },
      { id: 'c', text: '战术调整消耗时间', scoreEffect: 1, description: '减少有效比赛时间，稳住局面。' },
    ],
  },
  // ===== 重要事件 (major) =====
  {
    id: 'evt-m-01', level: 'major', category: 'injury',
    title: '球员肌肉不适',
    description: '一名球员示意腿部肌肉有些紧绷，但看起来还能坚持。',
    options: [
      { id: 'a', text: '提前换下防伤', scoreEffect: 0, description: '安全第一，避免加重伤情。' },
      { id: 'b', text: '再撑一会儿', scoreEffect: 2, description: '球员表示可以继续，冒险一把。' },
    ],
  },
  {
    id: 'evt-m-02', level: 'major', category: 'injury',
    title: '对方核心球员受伤下场',
    description: '对方最好的球员受伤了！他们正在做换人调整。',
    options: [
      { id: 'a', text: '趁对方调整猛攻', scoreEffect: 3, description: '打对方一个措手不及！' },
      { id: 'b', text: '保持原有节奏', scoreEffect: 1, description: '按自己的节奏踢。' },
    ],
  },
  {
    id: 'evt-m-03', level: 'major', category: 'card',
    title: '🟨 后卫吃到黄牌',
    description: '你的后卫因为战术犯规吃到黄牌，防守时会束手束脚。',
    options: [
      { id: 'a', text: '换下避免红牌', scoreEffect: 0, description: '安全换人，但消耗一个换人名额。' },
      { id: 'b', text: '让他继续但注意动作', scoreEffect: 1, description: '球员承诺会小心防守。' },
    ],
  },
  {
    id: 'evt-m-04', level: 'major', category: 'card',
    title: '对方球员两黄变红！',
    description: '对方有球员被罚下！现在你多一人作战。',
    options: [
      { id: 'a', text: '立刻压上猛攻', scoreEffect: 4, description: '趁人数优势扩大比分！' },
      { id: 'b', text: '控球消耗对方体能', scoreEffect: 2, description: '慢慢消磨，稳中求胜。' },
    ],
  },
  {
    id: 'evt-m-05', level: 'major', category: 'weather',
    title: '🌧️ 突降暴雨',
    description: '天空突然下起暴雨，场地积水严重，传控变得困难。',
    options: [
      { id: 'a', text: '改打长传冲吊', scoreEffect: 3, description: '适应天气，放弃地面传控。' },
      { id: 'b', text: '坚持短传渗透', scoreEffect: -2, description: '坚持打法但场地条件糟糕。' },
    ],
  },
  {
    id: 'evt-m-06', level: 'major', category: 'weather',
    title: '☀️ 高温消耗巨大',
    description: '今天气温极高，球员体能消耗比平时快得多。',
    options: [
      { id: 'a', text: '降低逼抢强度', scoreEffect: 1, description: '节省体能，合理分配。' },
      { id: 'b', text: '咬牙保持高强度', scoreEffect: -2, description: '上半场优势但下半场可能崩盘。' },
    ],
  },
  {
    id: 'evt-m-07', level: 'major', category: 'weather',
    title: '💨 大风影响传中',
    description: '现场风力很大，边路传中的精度受到严重影响。',
    options: [
      { id: 'a', text: '减少传中打中路', scoreEffect: 2, description: '调整进攻方向，合理利用条件。' },
      { id: 'b', text: '继续边路进攻', scoreEffect: -1, description: '不信邪，但传中屡屡被风吹偏。' },
    ],
  },
  {
    id: 'evt-m-08', level: 'major', category: 'tactical',
    title: '比分领先，时间不多',
    description: '你领先1球，比赛只剩下不到10分钟了。',
    options: [
      { id: 'a', text: '全线退守保胜利', scoreEffect: 1, description: '摆大巴，守住三分最重要。' },
      { id: 'b', text: '控球消耗时间', scoreEffect: 2, description: '把球控制在脚下，不给对方机会。' },
      { id: 'c', text: '继续正常踢', scoreEffect: 0, description: '不改变节奏，以我为主。' },
    ],
  },
  {
    id: 'evt-m-09', level: 'major', category: 'var',
    title: '禁区疑似犯规，裁判没吹',
    description: '对方禁区内有手球嫌疑，但裁判示意比赛继续。',
    options: [
      { id: 'a', text: '围堵裁判施压', scoreEffect: -3, description: '激怒裁判，可能吃到黄牌。' },
      { id: 'b', text: '专注比赛继续踢', scoreEffect: 1, description: '保持心态，机会还会再来。' },
    ],
  },
  {
    id: 'evt-m-10', level: 'major', category: 'var',
    title: '补时时间争议',
    description: '裁判给了5分钟补时，你觉得太多了。',
    options: [
      { id: 'a', text: '加快节奏抢攻', scoreEffect: 2, description: '抢在补时阶段再进一球。' },
      { id: 'b', text: '冷静守住现有比分', scoreEffect: 0, description: '稳扎稳打度过最后5分钟。' },
    ],
  },
  // ===== 普通事件 (minor — 自动滚动) =====
  { id: 'evt-n-01', level: 'minor', category: 'card', title: '🟨 球员吃到黄牌', description: '一次鲁莽的铲球吃到黄牌。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-02', level: 'minor', category: 'injury', title: '小碰撞，问题不大', description: '两人争顶头球碰撞，都无大碍。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-03', level: 'minor', category: 'tactical', title: '对方教练在场边怒吼', description: '对方主教练对裁判判罚不满。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-04', level: 'minor', category: 'weather', title: '📣 观众席爆发出巨大助威声', description: '现场球迷热情高涨，为球队加油。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-05', level: 'minor', category: 'card', title: '任意球机会', description: '在前场获得一个位置不错的任意球。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-06', level: 'minor', category: 'card', title: '角球！', description: '赢得一个角球机会。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-07', level: 'minor', category: 'injury', title: '球员抽筋', description: '一名对方球员出现抽筋，短暂暂停。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-08', level: 'minor', category: 'card', title: '越位！', description: '你的前锋被判越位，进球无效。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-09', level: 'minor', category: 'injury', title: '队医进场', description: '队医迅速进场处理小伤口。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
  { id: 'evt-n-10', level: 'minor', category: 'card', title: '界外球战术', description: '球队精心设计的界外球战术。', options: [{ id: 'a', text: '继续', scoreEffect: 0, description: '' }] },
]
