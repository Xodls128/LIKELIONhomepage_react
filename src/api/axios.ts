import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', //백엔드 주소
  withCredentials: true,
});

// JWT 토큰 자동 첨부
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
