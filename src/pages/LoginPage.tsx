import { useState } from 'react';
import { login as loginAPI } from '../api/user';  // 이름 충돌 방지
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 전역 상태 관리

function LoginPage() {
  const { login } = useAuth();  // 토큰 저장 및 상태 갱신 함수
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginAPI(email, password);  // 1. 서버에 로그인 요청
      const token = response.data.access_token;
      login(token);  // 2. 전역 상태 갱신
      navigate('/'); // 3. 홈으로 이동 (원하는 곳으로 변경 가능)
    } catch (err) {
      console.error('로그인 실패:', err);
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
