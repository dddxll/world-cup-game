import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import CreateTeamPage from '@/pages/CreateTeamPage'
import CoachPage from '@/pages/CoachPage'

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTeamPage />} />
        <Route path="/coach" element={<CoachPage />} />
      </Routes>
    </div>
  )
}
