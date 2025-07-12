import axios from './axios';

export interface Author {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  community: number;
  author: Author;
  content: string;
  created: string;
  updated: string;
  parent: number | null;
  is_deleted: boolean;
}

// 1. 댓글 목록 조회
export const fetchComments = async (communityId: number): Promise<Comment[]> => {
  const res = await axios.get(`/community/${communityId}/comments/`);
  return res.data;
};

// 2. 댓글 작성
export const createComment = async (communityId: number, content: string): Promise<Comment> => {
  const res = await axios.post(`/community/${communityId}/comments/`, { content });
  return res.data;
};

// 3. 대댓글 작성
export const createReply = async (parentCommentId: number, content: string): Promise<Comment> => {
  const res = await axios.post(`/community/comments/${parentCommentId}/replies/create/`, { content });
  return res.data;
};

// 4. 댓글 삭제
export const deleteComment = async (communityId: number, commentId: number): Promise<void> => {
  await axios.delete(`/community/${communityId}/comments/${commentId}/`);
};

// 5. 대댓글 삭제
export const deleteReply = async (parentCommentId: number, replyId: number): Promise<void> => {
  await axios.delete(`/community/comments/${parentCommentId}/replies/${replyId}/`);
};