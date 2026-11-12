import apiService from '@/services/apiService';
import { ENQUIRY_ENDPOINTS } from './enquiryEndpoints';
import { EnquirySubmission, CallbackRequest, EnquiryResult } from '../types/enquiry.types';
import { ApiResponse } from '@/types/api';

export const enquiryApi = {
  submitEnquiry: async (data: EnquirySubmission): Promise<EnquiryResult> => {
    const res = await apiService.post<ApiResponse<EnquiryResult>>(ENQUIRY_ENDPOINTS.SUBMIT, data);
    return res.data;
  },

  requestCallback: async (data: CallbackRequest): Promise<{ referenceNumber: string }> => {
    const res = await apiService.post<ApiResponse<{ referenceNumber: string }>>(
      ENQUIRY_ENDPOINTS.REQUEST_CALL,
      data,
    );
    return res.data;
  },

  getMyEnquiries: async (): Promise<any[]> => {
    const res = await apiService.get<ApiResponse<any[]>>(ENQUIRY_ENDPOINTS.MY_ENQUIRIES);
    return res.data;
  },
};

