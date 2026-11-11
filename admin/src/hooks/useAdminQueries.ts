import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SAMPLE_VENDORS, WEDDING_CATEGORIES, TELANGANA_LOCATIONS } from '@/data';
import { useAdminStore } from '@/store/useAdminStore';
import { Vendor, Category, AssistedEnquiry } from '@/types';

// Mock assisted enquiries for initial admin queue adhering strictly to AssistedEnquiry interface
export const MOCK_ADMIN_ENQUIRIES: AssistedEnquiry[] = [
  {
    id: 'TW-ENQ-104',
    referenceNumber: 'TW-VILL-2026-104',
    source: 'callback_request',
    customerName: 'K. Somanna',
    customerPhone: '+91 98480 12345',
    categorySlug: 'band-melam-sannai',
    district: 'narayanpet',
    mandal: 'makthal',
    villageOrTown: 'Maganoor Village',
    preferredLanguage: 'te',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TW-ENQ-103',
    referenceNumber: 'TW-VILL-2026-103',
    source: 'whatsapp_assisted',
    customerName: 'B. Venkatamma',
    customerPhone: '+91 94401 54321',
    categorySlug: 'catering',
    district: 'mahabubnagar',
    mandal: 'koilkonda',
    villageOrTown: 'Koilkonda Village',
    preferredLanguage: 'te',
    status: 'contacted',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TW-ENQ-102',
    referenceNumber: 'TW-VILL-2026-102',
    source: 'simple_enquiry',
    customerName: 'R. Narsimha',
    customerPhone: '+91 99890 98765',
    categorySlug: 'stage-decoration',
    district: 'narayanpet',
    mandal: 'damaragidda',
    villageOrTown: 'Damaragidda Village',
    preferredLanguage: 'te',
    status: 'assigned',
    createdAt: new Date().toISOString(),
  },
];

// Query Keys
export const adminQueryKeys = {
  dashboard: ['admin', 'dashboard'] as const,
  vendors: (district?: string, mandal?: string, category?: string) => 
    ['admin', 'vendors', { district, mandal, category }] as const,
  vendorDetail: (id: string) => ['admin', 'vendor', id] as const,
  categories: ['admin', 'categories'] as const,
  locations: ['admin', 'locations'] as const,
  enquiries: ['admin', 'enquiries'] as const,
};

// 1. Dashboard Metrics Hook
export function useAdminDashboardMetrics() {
  return useQuery({
    queryKey: adminQueryKeys.dashboard,
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 60));
      return {
        totalVendors: SAMPLE_VENDORS.length,
        verifiedVendors: SAMPLE_VENDORS.filter((v: Vendor) => v.isVerified).length,
        pendingVerification: 14,
        totalBookings: 312,
        grossVolumePaise: 486000000,
        assistedEnquiriesCount: MOCK_ADMIN_ENQUIRIES.length,
        activeDistricts: TELANGANA_LOCATIONS.districts.length,
      };
    },
  });
}

// 2. Vendors List Hook with Filters
export function useAdminVendors() {
  const selectedDistrict = useAdminStore((s) => s.selectedDistrict);
  const selectedMandal = useAdminStore((s) => s.selectedMandal);
  const selectedCategory = useAdminStore((s) => s.selectedCategory);
  const searchQuery = useAdminStore((s) => s.searchQuery);

  return useQuery({
    queryKey: adminQueryKeys.vendors(selectedDistrict, selectedMandal, selectedCategory),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 60));
      let filtered: Vendor[] = [...SAMPLE_VENDORS];

      if (selectedDistrict && selectedDistrict !== 'all') {
        filtered = filtered.filter((v: Vendor) => v.district.toLowerCase() === selectedDistrict.toLowerCase());
      }
      if (selectedMandal && selectedMandal !== 'all') {
        filtered = filtered.filter((v: Vendor) => v.mandal.toLowerCase() === selectedMandal.toLowerCase());
      }
      if (selectedCategory && selectedCategory !== 'all') {
        filtered = filtered.filter((v: Vendor) => v.categorySlug === selectedCategory);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (v: Vendor) =>
            v.businessName.toLowerCase().includes(q) ||
            v.ownerName.toLowerCase().includes(q) ||
            (v.phone ? v.phone.includes(q) : false)
        );
      }
      return filtered;
    },
  });
}

// 3. Vendor Details Hook
export function useAdminVendorDetail(vendorId: string) {
  return useQuery({
    queryKey: adminQueryKeys.vendorDetail(vendorId),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 60));
      const vendor = SAMPLE_VENDORS.find((v: Vendor) => v.id === vendorId);
      return vendor || null;
    },
    enabled: Boolean(vendorId),
  });
}

// 4. Categories & Taxonomy Hook
export function useAdminCategories() {
  return useQuery({
    queryKey: adminQueryKeys.categories,
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 40));
      return WEDDING_CATEGORIES;
    },
  });
}

// 5. Locations Hierarchy Hook
export function useAdminLocations() {
  return useQuery({
    queryKey: adminQueryKeys.locations,
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 40));
      return TELANGANA_LOCATIONS;
    },
  });
}

// 6. Assisted Enquiries Hook
export function useAdminEnquiries() {
  return useQuery({
    queryKey: adminQueryKeys.enquiries,
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 60));
      return MOCK_ADMIN_ENQUIRIES;
    },
  });
}

// 7. Verify / Approve Vendor Mutation
export function useVerifyVendorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ vendorId, approve }: { vendorId: string; approve: boolean }) => {
      await new Promise((r) => setTimeout(r, 120));
      return { success: true, vendorId, isVerified: approve };
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'vendors'] });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.vendorDetail(vendorId) });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.dashboard });
    },
  });
}
