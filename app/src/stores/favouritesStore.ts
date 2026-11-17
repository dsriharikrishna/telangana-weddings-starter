import { create } from 'zustand';
import { Vendor } from '../services/marketplaceApi';

interface FavouritesState {
  savedVendors: Vendor[];
  toggleSaveVendor: (vendor: Vendor) => void;
  isSaved: (vendorId: string) => boolean;
}

export const useFavouritesStore = create<FavouritesState>((set, get) => ({
  savedVendors: [],
  toggleSaveVendor: (vendor: Vendor) => {
    const { savedVendors } = get();
    const exists = savedVendors.some((v) => v.id === vendor.id);
    if (exists) {
      set({ savedVendors: savedVendors.filter((v) => v.id !== vendor.id) });
    } else {
      set({ savedVendors: [...savedVendors, vendor] });
    }
  },
  isSaved: (vendorId: string) => {
    return get().savedVendors.some((v) => v.id === vendorId);
  },
}));

