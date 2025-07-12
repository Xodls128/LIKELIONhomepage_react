import { Routes, Route } from 'react-router-dom'
import CommunityPage from './pages/CommunityPage.tsx'
import PostPage from './pages/PostPage.tsx'
import NewPostPage from './pages/NewPostPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CommunityPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/new" element={<NewPostPage />} />
      <Route path="/edit/:id" element={<NewPostPage />} />
    </Routes>
  )
}

export default App
