import axios from './axios'

export const fetchPosts = async () => {
  const res = await axios.get('/posts/')
  return res.data
}

export const fetchPost = async (id: number) => {
  const res = await axios.get(`/posts/${id}/`)
  return res.data
}

export const createPost = async (data: { title: string; content: string }) => {
  const res = await axios.post('/posts/', data)
  return res.data
}
