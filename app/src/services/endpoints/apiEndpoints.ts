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
};

export default API_ENDPOINTS;

