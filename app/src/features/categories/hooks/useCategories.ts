import { useState, useEffect } from 'react';
import { categoryApi } from '../services/category.api';
import { Category } from '@/types/category.types';

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    categoryApi
      .getCategories()
      .then((cats) => setData(cats))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

