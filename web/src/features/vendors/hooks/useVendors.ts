import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorApi } from '../services/vendor.api';
import { VendorQueryParams } from '../types/vendor.types';

export const VENDOR_QUERY_KEYS = {
  all: ['vendors'] as const,
  list: (params: VendorQueryParams) => ['vendors', 'list', params] as const,
  detail: (slug: string) => ['vendors', 'detail', slug] as const,
};

export function useVendors(params: VendorQueryParams = {}) {
  return useQuery({
    queryKey: VENDOR_QUERY_KEYS.list(params),
    queryFn: () => vendorApi.getVendors(params),
  });
}

export function useVendorDetail(slug: string) {
  return useQuery({
    queryKey: VENDOR_QUERY_KEYS.detail(slug),
    queryFn: () => vendorApi.getVendorBySlug(slug),
    enabled: !!slug,
  });
}

export function useRegisterVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => vendorApi.registerVendor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VENDOR_QUERY_KEYS.all });
    },
  });
}

