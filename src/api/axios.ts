import axios from 'axios';

// 커스터마이징된 axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // 모든 요청 앞에 자동으로 붙음
  withCredentials: true, // (선택) 쿠키 인증용 — JWT에서는 없어도 됨
});

// 요청 보내기 전 인터셉터 등록
// → 매 요청마다 localStorage에 저장된 JWT 토큰을 자동으로 헤더에 붙여줌
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // JWT 토큰 자동 첨부
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 이제부터는 axios 대신 instance를 사용하면 됨
// 예: instance.get('/community') → http://localhost:8000/api/community 로 자동 요청됨
export default instance;
