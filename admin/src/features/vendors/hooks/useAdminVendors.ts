import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminVendorApi } from '../services/adminVendor.api';
import { VerifyVendorPayload, GrantCreditsPayload } from '../types/adminVendor.types';
import { useAdminStore } from '@/store/useAdminStore';
import { Vendor } from '@/types';

export const ADMIN_VENDOR_QUERY_KEYS = {
  all: ['admin', 'vendors'] as const,
  list: (district?: string, mandal?: string, category?: string) =>
    ['admin', 'vendors', 'list', { district, mandal, category }] as const,
  detail: (id: string) => ['admin', 'vendors', 'detail', id] as const,
};

export function useAdminVendors() {
  const selectedDistrict = useAdminStore((s) => s.selectedDistrict);
  const selectedMandal = useAdminStore((s) => s.selectedMandal);
  const selectedCategory = useAdminStore((s) => s.selectedCategory);
  const searchQuery = useAdminStore((s) => s.searchQuery);

  return useQuery({
    queryKey: ADMIN_VENDOR_QUERY_KEYS.list(selectedDistrict, selectedMandal, selectedCategory),
    queryFn: async () => {
      let vendorList: Vendor[] = await adminVendorApi.getVendors();

      if (selectedDistrict && selectedDistrict !== 'all') {
        vendorList = vendorList.filter((v: Vendor) => v.district.toLowerCase() === selectedDistrict.toLowerCase());
      }
      if (selectedMandal && selectedMandal !== 'all') {
        vendorList = vendorList.filter((v: Vendor) => v.mandal.toLowerCase() === selectedMandal.toLowerCase());
      }
      if (selectedCategory && selectedCategory !== 'all') {
        vendorList = vendorList.filter((v: Vendor) => v.categorySlug === selectedCategory);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        vendorList = vendorList.filter(
          (v: Vendor) =>
            v.businessName.toLowerCase().includes(q) ||
            v.ownerName.toLowerCase().includes(q) ||
            (v.phone ? v.phone.includes(q) : false)
        );
      }
      return vendorList;
    },
  });
}

export function useAdminVendorDetail(vendorId: string) {
  return useQuery({
    queryKey: ADMIN_VENDOR_QUERY_KEYS.detail(vendorId),
    queryFn: () => adminVendorApi.getVendorDetail(vendorId),
    enabled: Boolean(vendorId),
  });
}

export function useVerifyVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: VerifyVendorPayload) => adminVendorApi.verifyVendor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_VENDOR_QUERY_KEYS.all });
    },
  });
}

export function useGrantCredits() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: GrantCreditsPayload) => adminVendorApi.grantCredits(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_VENDOR_QUERY_KEYS.all });
    },
  });
}
