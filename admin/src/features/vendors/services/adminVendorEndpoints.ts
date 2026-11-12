export const ADMIN_VENDOR_ENDPOINTS = {
  LIST: '/admin/vendors',
  VERIFY: (vendorId: string) => `/admin/vendors/${vendorId}/verification`,
  CREDITS: (vendorId: string) => `/admin/vendors/${vendorId}/credits`,
};

