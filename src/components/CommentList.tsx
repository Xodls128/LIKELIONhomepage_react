import { Comment } from '../api/comment';

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  // 부모 댓글만
  const parentComments = comments.filter(c => c.parent === null);

  // 대댓글 찾기
  const getReplies = (parentId: number) =>
    comments.filter(c => c.parent === parentId);

  return (
    <ul className="space-y-4">
      {parentComments.map(parent => (
        <li key={parent.id} className="border-b pb-2">
          <div>
            <p className="font-semibold text-sm text-gray-700">
              {parent.author.name}
            </p>
            <p className="text-sm">
              {parent.is_deleted ? (
                <span className="text-gray-400 italic">삭제된 댓글입니다.</span>
              ) : (
                parent.content
              )}
            </p>
          </div>

          {/* 대댓글 */}
          <ul className="ml-4 mt-2 space-y-2">
            {getReplies(parent.id).map(reply => (
              <li key={reply.id} className="text-sm">
                <p className="font-semibold text-xs text-gray-600">
                  {reply.author.name}
                </p>
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
