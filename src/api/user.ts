import axios from 'axios';
import { saveToken } from '../utils/auth';

export async function login(email: string, password: string): Promise<void> {
  const response = await axios.post('/api/auth/login/', { email, password });
  const token = response.data.access;
  saveToken(token);
}
