import type { FormationDef } from '@/types'

export const formations: FormationDef[] = [
  {
    id: '4-3-3', name: '4-3-3', displayName: '4-3-3 攻击型',
    positions: ['GK','LB','CB','CB','RB','CM','CM','CM','LW','ST','RW'],
    counters: ['4-4-2'], counteredBy: ['4-2-3-1','5-3-2'],
  },
  {
    id: '4-2-3-1', name: '4-2-3-1', displayName: '4-2-3-1 均衡型',
    positions: ['GK','LB','CB','CB','RB','CDM','CDM','CAM','LW','RW','ST'],
    counters: ['4-3-3','4-4-2'], counteredBy: ['3-5-2','4-1-4-1'],
  },
  {
    id: '4-4-2', name: '4-4-2', displayName: '4-4-2 经典',
    positions: ['GK','LB','CB','CB','RB','LM','CM','CM','RM','ST','ST'],
    counters: ['3-5-2','5-3-2'], counteredBy: ['4-3-3','4-2-3-1'],
  },
  {
    id: '3-5-2', name: '3-5-2', displayName: '3-5-2 中场控制',
    positions: ['GK','CB','CB','CB','CDM','CM','CM','LM','RM','ST','ST'],
    counters: ['4-2-3-1','4-4-2'], counteredBy: ['4-3-3','3-4-3'],
  },
  {
    id: '5-3-2', name: '5-3-2', displayName: '5-3-2 铁桶阵',
    positions: ['GK','LWB','CB','CB','CB','RWB','CM','CM','CM','ST','ST'],
    counters: ['4-3-3','3-4-3'], counteredBy: ['4-4-2','4-1-4-1'],
  },
  {
    id: '4-1-4-1', name: '4-1-4-1', displayName: '4-1-4-1 单后腰',
    positions: ['GK','LB','CB','CB','RB','CDM','LM','CM','CM','RM','ST'],
    counters: ['4-2-3-1','3-5-2'], counteredBy: ['4-4-2','3-4-3'],
  },
  {
    id: '3-4-3', name: '3-4-3', displayName: '3-4-3 全攻全守',
    positions: ['GK','CB','CB','CB','CM','CM','LM','RM','LW','ST','RW'],
    counters: ['3-5-2','4-1-4-1'], counteredBy: ['5-3-2','4-3-3'],
  },
  {
    id: '4-3-2-1', name: '4-3-2-1', displayName: '4-3-2-1 圣诞树',
    positions: ['GK','LB','CB','CB','RB','CM','CM','CM','CAM','CAM','ST'],
    counters: ['4-2-3-1'], counteredBy: ['4-3-3','4-4-2'],
  },
]
