import axios from './axios'

export interface Post { id: number; title: string; content: string; author: string; created_at: string; /* 엔드포인트 참고 */ }

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await axios.get('posts/');
  return res.data;
};

export const fetchPost = async (id: number): Promise<Post> => {
  const res = await axios.get(`posts/${id}/`);
  return res.data;
};

export const createPost = async (data: { title: string; content: string }): Promise<Post> => {
  const res = await axios.post('posts/', data);
  return res.data;
};

export const updatePost = async (id: number, data: { title: string; content: string }): Promise<Post> => {
  const res = await axios.patch(`posts/${id}/`, data);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`posts/${id}/`);
};
