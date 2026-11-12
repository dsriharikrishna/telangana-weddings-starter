import { useQuery } from '@tanstack/react-query';
import { enquiryApi } from '../services/enquiry.api';

export const ENQUIRY_QUERY_KEYS = {
  all: ['admin', 'enquiries'] as const,
};

export function useAdminEnquiries() {
  return useQuery({
    queryKey: ENQUIRY_QUERY_KEYS.all,
    queryFn: () => enquiryApi.getAdminEnquiries(),
  });
}

