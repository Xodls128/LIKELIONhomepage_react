import api from 'axios';
import { saveToken } from '../utils/auth';

export async function login(email: string, password: string): Promise<void> {
  const response = await api.post('/api/auth/login/', { email, password });
  const token = response.data.access;
  saveToken(token);
}
