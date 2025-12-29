import { api } from '../lib/api';
import type { AuthResponse, User } from '../types';

export const authService = {
  async register(email: string, password: string, name?: string) {
    const { data } = await api.post<{ data: AuthResponse }>('/auth/register', {
      email,
      password,
      name,
    });
    if (data.data.token) {
      localStorage.setItem('auth_token', data.data.token);
    }
    return data.data;
  },

  async login(email: string, password: string) {
    const { data } = await api.post<{ data: AuthResponse }>('/auth/login', {
      email,
      password,
    });
    if (data.data.token) {
      localStorage.setItem('auth_token', data.data.token);
    }
    return data.data;
  },

  async logout() {
    localStorage.removeItem('auth_token');
  },

  async me() {
    const { data } = await api.get<{ data: User }>('/auth/me');
    return data.data;
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
