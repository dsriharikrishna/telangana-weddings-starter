export const API_ENDPOINTS = {
  HEALTH: '/health',
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',
  REFRESH_TOKEN: '/auth/refresh',
  SWITCH_ROLE: '/auth/switch-role',
  ME: '/auth/me',
  CUSTOMER_PROFILE: '/customers/profile',
  CATEGORIES: '/categories',
  CATEGORY_BY_SLUG: (slug: string) => `/categories/${slug}`,
  DISTRICTS: '/locations/districts',
  MANDALS: (districtId: string) => `/locations/districts/${districtId}/mandals`,
  VILLAGES: (mandalId: string) => `/locations/mandals/${mandalId}/villages`,
  LOCATIONS_SEARCH: '/locations/search',
  VENDORS: '/vendors',
  VENDOR_BY_SLUG: (slug: string) => `/vendors/${slug}`,
  VENDOR_REGISTER: '/vendors/register',
  ENQUIRIES: '/enquiries',
  REQUEST_CALL: '/enquiries/request-call',
  MY_ENQUIRIES: '/enquiries/my',
  VENDOR_LEADS: '/vendor/leads',
  UNLOCK_LEAD: (assignmentId: string) => `/vendor/leads/${assignmentId}/unlock`,
  // Vendor Portal Endpoints
  VENDOR_PORTAL_PROFILE: '/vendor/portal/profile',
  VENDOR_PORTAL_SERVICES: '/vendor/portal/services',
  VENDOR_PORTAL_SERVICE_BY_ID: (id: string) => `/vendor/portal/services/${id}`,
  VENDOR_PORTAL_WALLET: '/vendor/portal/wallet',
  VENDOR_PORTAL_WALLET_RECHARGE: '/vendor/portal/wallet/recharge',
  VENDOR_PORTAL_REVIEWS: '/vendor/portal/reviews',
};

export default API_ENDPOINTS;

