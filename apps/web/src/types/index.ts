export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  icon?: string;
  category?: string;
  variables: Record<string, string>;
  metadata?: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  templateId: string;
  userId: string;
  status: 'created' | 'generating' | 'ready' | 'error';
  config?: Record<string, any>;
  repoUrl?: string;
  createdAt: string;
  updatedAt: string;
  template?: {
    name: string;
    type: string;
    icon?: string;
  };
  deployments?: Deployment[];
}

export interface Deployment {
  id: string;
  projectId: string;
  environment: 'development' | 'staging' | 'production';
  status: 'pending' | 'building' | 'deploying' | 'success' | 'failed';
  buildUrl?: string;
  deploymentUrl?: string;
  logs?: string;
  triggeredBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}
