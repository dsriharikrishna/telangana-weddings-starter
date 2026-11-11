import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SAMPLE_VENDORS, WEDDING_CATEGORIES, TELANGANA_LOCATIONS } from '@/data';
import { useAppStore } from '@/store/useAppStore';
import { Vendor, Category, AssistedEnquiry } from '@/types';

// Query Keys
export const queryKeys = {
  vendors: (district?: string, mandal?: string, category?: string, query?: string) =>
    ['vendors', { district, mandal, category, query }] as const,
  vendorDetail: (slugOrId: string) => ['vendor', slugOrId] as const,
  categories: ['categories'] as const,
  categoryDetail: (slug: string) => ['category', slug] as const,
  locations: ['locations'] as const,
  assistedEnquiries: ['enquiries'] as const,
};

// 1. Fetch Vendors with Reactivity to Location, Category & Search from Zustand Store
export function useVendors() {
  const location = useAppStore((s) => s.location);
  const selectedCategory = useAppStore((s) => s.selectedCategory);
  const searchQuery = useAppStore((s) => s.searchQuery);

  return useQuery({
    queryKey: queryKeys.vendors(location.district, location.mandal, selectedCategory, searchQuery),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 60));
      let results: Vendor[] = [...SAMPLE_VENDORS];

      // District Filter
      if (location.district && location.district !== 'all') {
        results = results.filter((v: Vendor) => v.district.toLowerCase() === location.district.toLowerCase());
      }

      // Mandal Filter
      if (location.mandal && location.mandal !== 'all') {
        results = results.filter((v: Vendor) => v.mandal.toLowerCase() === location.mandal.toLowerCase());
      }

      // Category Filter
      if (selectedCategory && selectedCategory !== 'all') {
        results = results.filter((v: Vendor) => v.categorySlug === selectedCategory);
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        results = results.filter(
          (v: Vendor) =>
            v.businessName.toLowerCase().includes(q) ||
            v.ownerName.toLowerCase().includes(q) ||
            v.aboutEn.toLowerCase().includes(q) ||
            v.aboutTe.toLowerCase().includes(q)
        );
      }

      return results;
    },
  });
}

// 2. Fetch Single Vendor Details by ID or slug
export function useVendorDetail(slugOrId: string) {
  return useQuery({
    queryKey: queryKeys.vendorDetail(slugOrId),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 50));
      const found = SAMPLE_VENDORS.find(
        (v: Vendor) => v.id === slugOrId || v.businessName.toLowerCase().replace(/\s+/g, '-') === slugOrId
      );
      return found || null;
    },
    enabled: Boolean(slugOrId),
  });
}

// 3. Fetch Categories
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 30));
      return WEDDING_CATEGORIES;
    },
  });
}

// 4. Fetch Single Category Details
export function useCategoryDetail(slug: string) {
  return useQuery({
    queryKey: queryKeys.categoryDetail(slug),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 30));
      const found = WEDDING_CATEGORIES.find((c: Category) => c.slug === slug);
      return found || null;
    },
    enabled: Boolean(slug),
  });
}

// 5. Fetch Locations Hierarchy
export function useLocations() {
  return useQuery({
    queryKey: queryKeys.locations,
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 30));
      return TELANGANA_LOCATIONS;
    },
  });
}

// 6. Assisted Enquiry Mutation (Sends enquiry & updates local store)
export function useSubmitAssistedEnquiryMutation() {
  const queryClient = useQueryClient();
  const submitEnquiry = useAppStore((s) => s.submitAssistedEnquiry);

  return useMutation({
    mutationFn: async (
      payload: Omit<AssistedEnquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>
    ) => {
      await new Promise((r) => setTimeout(r, 120));
      return submitEnquiry(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assistedEnquiries });
    },
  });
}
