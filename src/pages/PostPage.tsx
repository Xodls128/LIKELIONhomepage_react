import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Comment } from '../api/comment';
import { fetchComments } from '../api/comment';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const communityId = Number(id);

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // 댓글 불러오기
  const loadComments = async () => {
    try {
      const data = await fetchComments(communityId);
      setComments(data);
    } catch (err) {
      console.error('댓글 불러오기 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [communityId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">게시글 상세 페이지</h1>

      {/* 여기에 게시글 본문 내용이 들어갈 수 있음 */}

      <section>
        <h2 className="text-lg font-semibold mb-2">댓글</h2>

        {loading ? (
          <p className="text-gray-500">로딩 중...</p>
        ) : (
          <>
            <CommentForm
              communityId={communityId}
              onSuccess={loadComments}
            />
            <CommentList comments={comments} />
          </>
        )}
      </section>
    </div>
  );
}

export default PostPage;
