'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useUIStore } from '@/store/useUIStore';

export function useApp() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  
  const location = useAppStore((state) => state.location);
  const setLocation = useAppStore((state) => state.setLocation);
  
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  
  const selectedSubcategory = useAppStore((state) => state.selectedSubcategory);
  const setSelectedSubcategory = useAppStore((state) => state.setSelectedSubcategory);
  
  const formatCurrency = useAppStore((state) => state.formatCurrency);
  const enquiries = useAppStore((state) => state.enquiries);
  const submitAssistedEnquiry = useAppStore((state) => state.submitAssistedEnquiry);

  // UI state from Zustand UI store
  const isAssistedModalOpen = useUIStore((state) => state.isAssistedModalOpen);
  const setIsAssistedModalOpen = useUIStore((state) => state.setIsAssistedModalOpen);
  const assistedModalVendor = useUIStore((state) => state.assistedModalVendor);
  const openAssistedModal = useUIStore((state) => state.openAssistedModal);

  return {
    language,
    setLanguage,
    location,
    setLocation,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    formatCurrency,
    enquiries,
    submitAssistedEnquiry,
    isAssistedModalOpen,
    setIsAssistedModalOpen,
    assistedModalVendor,
    openAssistedModal,
  };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
