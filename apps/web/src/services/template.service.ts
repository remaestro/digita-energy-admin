import { api } from '../lib/api';
import type { Template } from '../types';

export const templateService = {
  async getAll() {
    const { data } = await api.get<{ data: Template[] }>('/templates');
    return data.data;
  },

  async getById(id: string) {
    const { data } = await api.get<{ data: Template }>(`/templates/${id}`);
    return data.data;
  },
};
