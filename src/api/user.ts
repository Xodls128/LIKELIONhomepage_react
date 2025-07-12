import api from 'axios';
import { saveToken } from '../utils/auth';

export async function login(email: string, password: string): Promise<void> {
  const response = await api.post('/api/auth/login/', { email, password });
  const token = response.data.access;
  saveToken(token);
}

export async function register(email: string, password1: string, password2: string): Promise<void> {
  await api.post('/auth/registration/', {
    email,
    password1,
    password2,
  });
}
