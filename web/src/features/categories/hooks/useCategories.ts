import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../services/category.api';

export const CATEGORY_QUERY_KEYS = {
  all: ['categories'] as const,
  detail: (slug: string) => ['categories', slug] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.all,
    queryFn: () => categoryApi.getCategories(),
  });
}

export function useCategoryDetail(slug: string) {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.detail(slug),
    queryFn: () => categoryApi.getCategoryBySlug(slug),
    enabled: !!slug,
  });
}

