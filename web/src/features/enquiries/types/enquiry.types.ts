export interface EnquirySubmission {
  customerName: string;
  customerPhone: string;
  categorySlug: string;
  vendorId?: string;
  eventDate: string;
  district: string;
  mandal: string;
  villageOrTown?: string;
  budget?: number;
  notes?: string;
}

export interface CallbackRequest {
  customerName: string;
  customerPhone: string;
  district: string;
  mandal?: string;
  categorySlug?: string;
  notes?: string;
}

export interface EnquiryResult {
  id: string;
  referenceNumber: string;
  status: string;
}

