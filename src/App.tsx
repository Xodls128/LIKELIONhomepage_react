import { Routes, Route } from 'react-router-dom'
import CommunityPage from './pages/CommunityPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CommunityPage />} />
    </Routes>
  )
}

export default App
