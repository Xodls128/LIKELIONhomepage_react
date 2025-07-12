import { useEffect, useState } from 'react'
import { fetchPosts } from '../api/community'

function CommunityPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error)
  }, [])

  return (
    <div>
      <h1>커뮤니티 글 목록</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommunityPage
