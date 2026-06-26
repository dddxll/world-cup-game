import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
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
import PkComparePage from '@/pages/PkComparePage'
import PromoPage from '@/pages/PromoPage'

export default function App() {
  return (
    <div className="min-h-screen">
      <ErrorBoundary>
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
          <Route path="/pk-compare" element={<PkComparePage />} />
          <Route path="/promo" element={<PromoPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}
