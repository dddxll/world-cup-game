import { Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <div className="min-h-screen">
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
      </Routes>
    </div>
  )
}
