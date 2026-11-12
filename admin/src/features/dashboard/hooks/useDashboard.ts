import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../services/dashboard.api';

export const DASHBOARD_QUERY_KEYS = {
  metrics: ['admin', 'dashboard', 'metrics'] as const,
};

export function usePlatformMetrics() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.metrics,
    queryFn: () => dashboardApi.getMetrics(),
  });
}

