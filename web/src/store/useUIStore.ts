import { create } from 'zustand';

interface UIState {
  isLocationModalOpen: boolean;
  mobileSheetOpen: boolean;
  isAssistedModalOpen: boolean;
  assistedModalVendor: { id?: string; name?: string; categorySlug?: string } | null;
  
  // Actions
  openLocationModal: () => void;
  closeLocationModal: () => void;
  toggleLocationModal: () => void;
  
  openMobileSheet: () => void;
  closeMobileSheet: () => void;
  setMobileSheetOpen: (open: boolean) => void;
  
  openAssistedModal: (vendorInfo?: { id?: string; name?: string; categorySlug?: string }) => void;
  closeAssistedModal: () => void;
  setIsAssistedModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLocationModalOpen: false,
  mobileSheetOpen: false,
  isAssistedModalOpen: false,
  assistedModalVendor: null,

  openLocationModal: () => set({ isLocationModalOpen: true }),
  closeLocationModal: () => set({ isLocationModalOpen: false }),
  toggleLocationModal: () => set((state) => ({ isLocationModalOpen: !state.isLocationModalOpen })),

  openMobileSheet: () => set({ mobileSheetOpen: true }),
  closeMobileSheet: () => set({ mobileSheetOpen: false }),
  setMobileSheetOpen: (open) => set({ mobileSheetOpen: open }),

  openAssistedModal: (vendorInfo) => set({ 
    isAssistedModalOpen: true, 
    assistedModalVendor: vendorInfo || null 
  }),
  closeAssistedModal: () => set({ 
    isAssistedModalOpen: false, 
    assistedModalVendor: null 
  }),
  setIsAssistedModalOpen: (open) => set({ 
    isAssistedModalOpen: open, 
    ...(!open ? { assistedModalVendor: null } : {}) 
  }),
}));

