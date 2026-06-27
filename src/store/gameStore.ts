import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserTeam, TournamentState, Coach, FormationDef, Player, GamePhase, MatchResult } from '@/types'
import { recordGroupMatchResult, recordKnockoutResult } from '@/engine/tournament'

interface GameStore {
  phase: GamePhase; setPhase: (p: GamePhase) => void

  userTeam: UserTeam
  setTeamName: (name: string) => void; setTeamColor: (color: string) => void
  setCoach: (coach: Coach) => void; setFormation: (form: FormationDef) => void
  setStartingPlayer: (index: number, player: Player) => void
  addBenchPlayer: (player: Player) => void; removeBenchPlayer: (playerId: string) => void
  swapWithBench: (xiIndex: number, benchIndex: number) => void
  setTeamRatings: (a:number,d:number,m:number,o:number) => void

  tournament: TournamentState|null; setTournament: (t: TournamentState) => void

  recordGroupResult: (result: MatchResult, opponentId: string) => void
  recordKnockoutResult: (matchId: string, homeScore: number, awayScore: number, playerWon: boolean) => void

  resetGame: () => void
}

const defaultTeam: UserTeam = {
  name:'', color:'#D4A843', coach:null, formation:null,
  startingXI:Array(11).fill(null), bench:[],
  attackRating:0,defenseRating:0,midfieldRating:0,overallRating:0,
}

export const useGameStore = create<GameStore>()(persist((set) => ({
  phase:'home', setPhase:(p)=>set({phase:p}),

  userTeam:{...defaultTeam},
  setTeamName:(name)=>set(s=>({userTeam:{...s.userTeam,name}})),
  setTeamColor:(color)=>set(s=>({userTeam:{...s.userTeam,color}})),
  setCoach:(coach)=>set(s=>({userTeam:{...s.userTeam,coach}})),
  setFormation:(formation)=>set(s=>({userTeam:{...s.userTeam,formation,startingXI:Array(11).fill(null)}})),
  setStartingPlayer:(i,player)=>set(s=>{
    const xi=[...s.userTeam.startingXI]
    const oldPlayer=xi[i]  // 被换下的旧首发球员
    xi[i]=player
    // 从替补席移除新换上来的球员（避免重复）
    let bench=s.userTeam.bench.filter(p=>p.id!==player.id)
    // 被换下的旧首发球员移至替补席（避免从阵容中丢失）
    if(oldPlayer && !bench.find(p=>p.id===oldPlayer.id)){
      bench=[...bench,oldPlayer]
    }
    return {userTeam:{...s.userTeam,startingXI:xi,bench}}
  }),
  addBenchPlayer:(player)=>set(s=>{
    if(s.userTeam.bench.length>=15||s.userTeam.bench.find(p=>p.id===player.id))return s
    return {userTeam:{...s.userTeam,bench:[...s.userTeam.bench,player]}}
  }),
  removeBenchPlayer:(id)=>set(s=>({userTeam:{...s.userTeam,bench:s.userTeam.bench.filter(p=>p.id!==id)}})),
  swapWithBench:(xiIndex,benchIndex)=>set(s=>{
    const xi=[...s.userTeam.startingXI]
    const bench=[...s.userTeam.bench]
    const xiPlayer=xi[xiIndex]
    const benchPlayer=bench[benchIndex]
    if(!xiPlayer||!benchPlayer)return s
    xi[xiIndex]=benchPlayer
    bench[benchIndex]=xiPlayer
    return {userTeam:{...s.userTeam,startingXI:xi,bench}}
  }),
  setTeamRatings:(a,d,m,o)=>set(s=>({userTeam:{...s.userTeam,attackRating:a,defenseRating:d,midfieldRating:m,overallRating:o}})),

  tournament:null, setTournament:(t)=>set({tournament:t}),

  recordGroupResult:(result,opponentId)=>set(s=>{
    if(!s.tournament)return s
    return {tournament:recordGroupMatchResult(s.tournament,result,opponentId)}
  }),
  recordKnockoutResult:(matchId,homeScore,awayScore,playerWon)=>set(s=>{
    if(!s.tournament)return s
    return {tournament:recordKnockoutResult(s.tournament,matchId,homeScore,awayScore,playerWon)}
  }),

  resetGame:()=>set({phase:'home',userTeam:{...defaultTeam},tournament:null}),
}),{name:'wc-game-storage'}))
