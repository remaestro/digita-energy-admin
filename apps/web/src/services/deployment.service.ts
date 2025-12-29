import { api } from '../lib/api';
import type { Deployment } from '../types';

export const deploymentService = {
  async getAll(projectId: string) {
    const { data } = await api.get<{ data: Deployment[] }>(`/projects/${projectId}/deployments`);
    return data.data;
  },

  async getById(projectId: string, deploymentId: string) {
    const { data } = await api.get<{ data: Deployment }>(
      `/projects/${projectId}/deployments/${deploymentId}`
    );
    return data.data;
  },

  async create(projectId: string, environment?: 'development' | 'staging' | 'production') {
    const { data } = await api.post<{ data: Deployment }>(
      `/projects/${projectId}/deployments`,
      { environment }
    );
    return data.data;
  },
};
