'use client';

import React from 'react';
import { useHeaderUI } from '@/hooks/useHeaderUI';
import { LocationSelectorModal } from '@/features/locations';
import {
  TopBanner,
  BrandLogo,
  DesktopNav,
  HeaderControls,
  MobileNavSheet,
} from '../navigation';

export function Header() {
  const {
    isLocationModalOpen,
    mobileSheetOpen,
    openLocationModal,
    closeLocationModal,
    setMobileSheetOpen,
    openAssistedModal,
  } = useHeaderUI();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7DECF] shadow-xs">
        <TopBanner onOpenAssistedModal={openAssistedModal} />
        <div className="layout-fullwidth">
          <div className="flex items-center justify-between h-18 py-2">
            <BrandLogo />
            <DesktopNav onOpenAssistedModal={openAssistedModal} />
            <HeaderControls onOpenLocationModal={openLocationModal} />
          </div>
        </div>
      </header>

      <MobileNavSheet
        isOpen={mobileSheetOpen}
        onOpenChange={setMobileSheetOpen}
        onOpenLocationModal={openLocationModal}
        onOpenAssistedModal={openAssistedModal}
      />

      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={closeLocationModal}
      />
    </>
  );
}
