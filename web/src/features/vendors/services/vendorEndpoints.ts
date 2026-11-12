export const VENDOR_ENDPOINTS = {
  LIST: '/vendors',
  BY_SLUG: (slug: string) => `/vendors/${slug}`,
  REGISTER: '/vendors/register',
  LEADS: '/vendor/leads',
  UNLOCK_LEAD: (assignmentId: string) => `/vendor/leads/${assignmentId}/unlock`,
};

