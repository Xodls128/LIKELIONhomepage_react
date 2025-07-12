import { useState } from 'react';
import { Comment, deleteComment, deleteReply } from '../api/comment';
import CommentForm from './CommentForm';

interface CommentListProps {
  comments: Comment[];
  communityId: number;
  onRefresh: () => void;
}

function CommentList({ comments, communityId, onRefresh }: CommentListProps) {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  const parentComments = comments.filter(c => c.parent === null);
  const getReplies = (parentId: number) =>
    comments.filter(c => c.parent === parentId);

  const handleDelete = async (comment: Comment) => {
    try {
      if (comment.parent) {
        await deleteReply(comment.parent, comment.id);
      } else {
        await deleteComment(communityId, comment.id);
      }
      onRefresh();
    } catch (err) {
      console.error('댓글 삭제 실패', err);
    }
  };

  return (
    <ul className="space-y-4">
      {parentComments.map(parent => (
        <li key={parent.id} className="border-b pb-2">
          <div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm text-gray-700">
                {parent.author.name}
              </p>
              {!parent.is_deleted && (
                <button
                  onClick={() => handleDelete(parent)}
                  className="text-xs text-red-500 hover:underline"
                >
                  삭제
                </button>
              )}
            </div>
            <p className="text-sm">
              {parent.is_deleted ? (
                <span className="text-gray-400 italic">삭제된 댓글입니다.</span>
              ) : (
                parent.content
              )}
            </p>

            {!parent.is_deleted && (
              <button
                onClick={() =>
                  setActiveReplyId(prev => (prev === parent.id ? null : parent.id))
                }
                className="text-blue-500 text-xs mt-1"
              >
                답글 달기
              </button>
            )}

            {activeReplyId === parent.id && (
              <div className="mt-2 ml-4">
                <CommentForm
                  communityId={communityId}
                  parentId={parent.id}
                  onSuccess={() => {
                    onRefresh();
                    setActiveReplyId(null);
                  }}
                />
              </div>
            )}
          </div>

          {/* 대댓글 */}
          <ul className="ml-4 mt-2 space-y-2">
            {getReplies(parent.id).map(reply => (
              <li key={reply.id} className="text-sm">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xs text-gray-600">
                    {reply.author.name}
                  </p>
                  {!reply.is_deleted && (
                    <button
                      onClick={() => handleDelete(reply)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      삭제
                    </button>
                  )}
                </div>
                <p>
                  {reply.is_deleted ? (
                    <span className="text-gray-400 italic">삭제된 댓글입니다.</span>
                  ) : (
                    reply.content
                  )}
                </p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
