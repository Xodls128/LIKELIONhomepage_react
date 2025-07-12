import { useState } from 'react';
import { register } from '../api/user';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password1 !== password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await register(email, password1, password2);
      setSuccess(true);
    } catch (err: any) {
      setError('회원가입에 실패했습니다. 이메일이 이미 존재하거나 비밀번호 조건이 맞지 않습니다.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
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
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">
            회원가입이 완료되었습니다. 이메일 인증 후 로그인해주세요.
          </p>
        )}
        <button type="submit" className="bg-green-600 text-white w-full py-2 rounded">
          회원가입
        </button>
      </form>
      <p className="text-sm mt-3 text-center">
        이미 계정이 있으신가요?{' '}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => navigate('/login')}
        >
          로그인
        </span>
      </p>
    </div>
  );
}

export default RegisterPage;
