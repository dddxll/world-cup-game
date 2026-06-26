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

export const useGameStore = create<GameStore>()(persist((set) => ({
  phase:'home', setPhase:(p)=>set({phase:p}),

  userTeam:{...defaultTeam},
  setTeamName:(name)=>set(s=>({userTeam:{...s.userTeam,name}})),
  setTeamColor:(color)=>set(s=>({userTeam:{...s.userTeam,color}})),
  setCoach:(coach)=>set(s=>({userTeam:{...s.userTeam,coach}})),
  setFormation:(formation)=>set(s=>({userTeam:{...s.userTeam,formation,startingXI:Array(11).fill(null)}})),
  setStartingPlayer:(i,player)=>set(s=>{const xi=[...s.userTeam.startingXI];xi[i]=player;return {userTeam:{...s.userTeam,startingXI:xi}}}),
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
