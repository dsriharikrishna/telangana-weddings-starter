import { TELANGANA_LOCATIONS } from '@/data';
import { AdminLocationHierarchy } from '../types/location.types';

export const locationApi = {
  getLocations: async (): Promise<AdminLocationHierarchy> => {
    return TELANGANA_LOCATIONS;
  },
};

