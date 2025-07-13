import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Comment } from '../api/comment';
import { fetchComments } from '../api/comment';
import { toggleLike } from '../api/community';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import api from '../api/axios';

interface CommunityData {
  id: number;
  title: string;
  code: string;
  likes_count: number;
  liked_by_me: boolean;
}

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const communityId = Number(id);

  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCommunity = async (id: number): Promise<CommunityData> => {
    const response = await api.get(`/community/${id}/`);
    return response.data;
  };

  // 게시글 및 댓글 불러오기
  const loadData = async () => {
    setLoading(true);
    try {
      const [communityData, commentData] = await Promise.all([
        fetchCommunity(communityId),
        fetchComments(communityId),
      ]);
      setCommunity(communityData);
      setComments(commentData);
    } catch (err) {
      console.error('게시글 또는 댓글 불러오기 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [communityId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">게시글 상세 페이지</h1>

      {/* 👉 게시글 좋아요 버튼 */}
      {community && (
        <div className="mb-4">
          <p className="mb-1 text-lg font-semibold">{community.title}</p>
          <pre className="bg-gray-100 p-3 rounded">{community.code}</pre>

          <button
            onClick={async () => {
              try {
                const res = await toggleLike(community.id);
                setCommunity(prev =>
                  prev
                    ? {
                        ...prev,
                        liked_by_me: res.liked,
                        likes_count: res.liked
                          ? prev.likes_count + 1
                          : prev.likes_count - 1,
                      }
                    : null
                );
              } catch (err) {
                console.error('좋아요 토글 실패', err);
              }
            }}
            className={`mt-2 px-3 py-1 rounded text-sm ${
              community.liked_by_me
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            ❤️ 좋아요 ({community.likes_count})
          </button>
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold mb-2">댓글</h2>

        {loading ? (
          <p className="text-gray-500">로딩 중...</p>
        ) : (
          <>
            <CommentForm
              communityId={communityId}
              onSuccess={loadData}
            />
            <CommentList
              comments={comments}
              communityId={communityId}
              onRefresh={loadData}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default PostPage;
