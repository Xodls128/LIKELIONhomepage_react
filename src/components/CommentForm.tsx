import { useState } from 'react';
import { createComment, createReply } from '../api/comment';

interface CommentFormProps {
  communityId: number;
  parentId?: number;
  onSuccess?: () => void;
}

function CommentForm({ communityId, parentId, onSuccess }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

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
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('댓글 작성 실패', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        className="w-full border p-2 rounded resize-none text-sm"
        rows={3}
        placeholder={parentId ? '답글을 입력하세요...' : '댓글을 입력하세요...'}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? '작성 중...' : '작성'}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
