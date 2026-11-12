import { useQuery } from '@tanstack/react-query';
import { locationApi } from '../services/location.api';

export const LOCATION_QUERY_KEYS = {
  districts: ['locations', 'districts'] as const,
  mandals: (districtId: string) => ['locations', 'mandals', districtId] as const,
  villages: (mandalId: string) => ['locations', 'villages', mandalId] as const,
  search: (query: string) => ['locations', 'search', query] as const,
};

export function useDistricts() {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.districts,
    queryFn: () => locationApi.getDistricts(),
  });
}

export function useMandals(districtId: string) {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.mandals(districtId),
    queryFn: () => locationApi.getMandals(districtId),
    enabled: !!districtId,
  });
}

export function useVillages(mandalId: string) {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.villages(mandalId),
    queryFn: () => locationApi.getVillages(mandalId),
    enabled: !!mandalId,
  });
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.search(query),
    queryFn: () => locationApi.searchLocations(query),
    enabled: query.length >= 2,
  });
}

