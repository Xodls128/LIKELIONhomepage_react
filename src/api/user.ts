import api from './axios'; // 상대경로 수정 권장
import { saveToken } from '../utils/auth';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login/', { email, password });
  const token = response.data.access;

  saveToken(token);  // 로컬 저장도 유지하되
  return response;   // 호출하는 쪽에서 token에 접근할 수 있도록 응답 반환
}
