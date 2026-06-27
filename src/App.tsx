import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { BGMTracker, useBGM } from '@/hooks/useBGM'
import HomePage from '@/pages/HomePage'
import CreateTeamPage from '@/pages/CreateTeamPage'
import CoachPage from '@/pages/CoachPage'
import FormationPage from '@/pages/FormationPage'
import SquadPage from '@/pages/SquadPage'
import BenchPage from '@/pages/BenchPage'
import TeamReviewPage from '@/pages/TeamReviewPage'
import MatchPage from '@/pages/MatchPage'
import GroupStandingsPage from '@/pages/GroupStandingsPage'
import KnockoutPage from '@/pages/KnockoutPage'
import FinalResultPage from '@/pages/FinalResultPage'
import PromoPage from '@/pages/PromoPage'

/** 全局悬浮静音按钮 */
function MuteButton() {
  const { toggleMute, isMuted } = useBGM()

  return (
    <button
      onClick={toggleMute}
      title={isMuted ? '开启背景音乐' : '关闭背景音乐'}
      className="fixed bottom-4 right-4 z-[9999] w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/15
        flex items-center justify-center text-sm hover:bg-black/70 hover:border-white/25 transition-all
        shadow-lg"
    >
      {isMuted ? '🔇' : '🎵'}
    </button>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <ErrorBoundary>
        {/* BGM 自动切换 — 纯逻辑组件，无 DOM */}
        <BGMTracker />
        {/* 全局静音按钮 */}
        <MuteButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateTeamPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/formation" element={<FormationPage />} />
          <Route path="/squad" element={<SquadPage />} />
          <Route path="/squad-bench" element={<BenchPage />} />
          <Route path="/team-review" element={<TeamReviewPage />} />
          <Route path="/match/:round" element={<MatchPage />} />
          <Route path="/group-standings" element={<GroupStandingsPage />} />
          <Route path="/knockout-bracket" element={<KnockoutPage />} />
          <Route path="/final-result" element={<FinalResultPage />} />
          <Route path="/promo" element={<PromoPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}
