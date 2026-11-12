export const LOCATION_ENDPOINTS = {
  DISTRICTS: '/locations/districts',
  MANDALS: (districtId: string) => `/locations/districts/${districtId}/mandals`,
  VILLAGES: (mandalId: string) => `/locations/mandals/${mandalId}/villages`,
  SEARCH: (query: string) => `/locations/search?q=${encodeURIComponent(query)}`,
};

