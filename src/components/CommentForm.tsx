import { useState } from 'react';
import { createComment, createReply } from '../api/comment';
import { useAuth } from '../context/AuthContext';

interface CommentFormProps {
  communityId: number;
  parentId?: number; // 대댓글일 경우
  onSuccess: () => void;
}

function CommentForm({ communityId, parentId, onSuccess }: CommentFormProps) {
  const { isLoggedIn } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="text-gray-500 text-sm italic">
        댓글을 작성하려면 로그인하세요.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      if (parentId) {
        await createReply(parentId, content);
      } else {
        await createComment(communityId, content);
      }
      setContent('');
      onSuccess();
    } catch (err) {
      console.error('댓글 작성 실패', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full border p-2 rounded text-sm"
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "답글을 작성하세요..." : "댓글을 작성하세요..."}
        disabled={loading}
      />
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded"
          disabled={loading}
        >
          {loading ? '작성 중...' : '작성'}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
