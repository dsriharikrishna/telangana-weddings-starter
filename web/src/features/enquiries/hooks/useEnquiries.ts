import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enquiryApi } from '../services/enquiry.api';
import { EnquirySubmission, CallbackRequest } from '../types/enquiry.types';

export const ENQUIRY_QUERY_KEYS = {
  my: ['enquiries', 'my'] as const,
};

export function useMyEnquiries() {
  return useQuery({
    queryKey: ENQUIRY_QUERY_KEYS.my,
    queryFn: () => enquiryApi.getMyEnquiries(),
  });
}

export function useSubmitEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EnquirySubmission) => enquiryApi.submitEnquiry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENQUIRY_QUERY_KEYS.my });
    },
  });
}

export function useRequestCallback() {
  return useMutation({
    mutationFn: (data: CallbackRequest) => enquiryApi.requestCallback(data),
  });
}

