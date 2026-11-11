import { useUIStore } from '@/store/useUIStore';

export function useHeaderUI() {
  const isLocationModalOpen = useUIStore((state) => state.isLocationModalOpen);
  const mobileSheetOpen = useUIStore((state) => state.mobileSheetOpen);
  
  const openLocationModal = useUIStore((state) => state.openLocationModal);
  const closeLocationModal = useUIStore((state) => state.closeLocationModal);
  const openMobileSheet = useUIStore((state) => state.openMobileSheet);
  const closeMobileSheet = useUIStore((state) => state.closeMobileSheet);
  const setMobileSheetOpen = useUIStore((state) => state.setMobileSheetOpen);
  
  const openAssistedModal = useUIStore((state) => state.openAssistedModal);
  const closeAssistedModal = useUIStore((state) => state.closeAssistedModal);

  return {
    isLocationModalOpen,
    mobileSheetOpen,
    openLocationModal,
    closeLocationModal,
    openMobileSheet,
    closeMobileSheet,
    setMobileSheetOpen,
    openAssistedModal,
    closeAssistedModal,
  };
}

