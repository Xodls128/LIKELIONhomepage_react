import axios from './axios';

export interface Comment { id: number; post: number; parent?: number; content: string; author: string; created_at: string; }

export const fetchComments = async (communityId: number): Promise<Comment[]> => {
  const res = await axios.get(`/community/${communityId}/comments/`);
  return res.data;
};

export const createComment = async (postId: number, content: string, parentId?: number): Promise<Comment> => {
  const res = await axios.post(`posts/${postId}/comments/`, { content, parent: parentId });
  return res.data;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await axios.delete(`comments/${commentId}/`);
};
