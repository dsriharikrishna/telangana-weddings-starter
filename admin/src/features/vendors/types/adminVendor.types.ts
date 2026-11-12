export interface AdminVendor {
  id: string;
  businessName: string;
  phone: string;
  baseDistrict: string;
  baseMandal: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  leadWallet?: {
    balanceCredits: number;
  };
  createdAt: string;
}

export interface VerifyVendorPayload {
  vendorId: string;
  status: 'VERIFIED' | 'REJECTED';
  notes?: string;
}

export interface GrantCreditsPayload {
  vendorId: string;
  amount: number;
  reason?: string;
}

