import { api } from '../lib/api';
import type { Project } from '../types';

export const projectService = {
  async getAll() {
    const { data } = await api.get<{ data: Project[] }>('/projects');
    return data.data;
  },

  async getById(id: string) {
    const { data } = await api.get<{ data: Project }>(`/projects/${id}`);
    return data.data;
  },

  async create(projectData: {
    name: string;
    description?: string;
    templateId: string;
    config?: Record<string, any>;
  }) {
    const { data } = await api.post<{ data: Project }>('/projects', projectData);
    return data.data;
  },

  async update(id: string, projectData: {
    name?: string;
    description?: string;
    config?: Record<string, any>;
  }) {
    const { data } = await api.put<{ data: Project }>(`/projects/${id}`, projectData);
    return data.data;
  },

  async delete(id: string) {
    await api.delete(`/projects/${id}`);
  },

  async generate(id: string) {
    const { data } = await api.post<{ data: any }>(`/projects/${id}/generate`);
    return data.data;
  },
};
