import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../services/category.api';

export const CATEGORY_QUERY_KEYS = {
  all: ['admin', 'categories'] as const,
};

export function useAdminCategories() {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.all,
    queryFn: () => categoryApi.getCategories(),
  });
}

