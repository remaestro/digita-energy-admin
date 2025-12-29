import { useQuery } from '@tanstack/react-query';
import { templateService } from '../../services/template.service';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: templateService.getAll,
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: () => templateService.getById(id),
    enabled: !!id,
  });
}
