import { useQuery } from '@tanstack/react-query';
import { locationApi } from '../services/location.api';

export const LOCATION_QUERY_KEYS = {
  all: ['admin', 'locations'] as const,
};

export function useAdminLocations() {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.all,
    queryFn: () => locationApi.getLocations(),
  });
}

