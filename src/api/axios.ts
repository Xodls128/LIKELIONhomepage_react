import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // 실제 API 주소
  withCredentials: true, // CORS + 인증 대응 시 필요
})

export default instance
