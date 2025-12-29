import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deploymentService } from '../../services/deployment.service';

export function useDeployments(projectId: string) {
  return useQuery({
    queryKey: ['deployments', projectId],
    queryFn: () => deploymentService.getAll(projectId),
    enabled: !!projectId,
  });
}

export function useDeployment(projectId: string, deploymentId: string) {
  return useQuery({
    queryKey: ['deployments', projectId, deploymentId],
    queryFn: () => deploymentService.getById(projectId, deploymentId),
    enabled: !!projectId && !!deploymentId,
  });
}

export function useCreateDeployment(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (environment?: 'development' | 'staging' | 'production') =>
      deploymentService.create(projectId, environment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
  });
}
