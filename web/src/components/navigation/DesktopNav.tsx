'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ServicesMegaMenu } from './ServicesMegaMenu';

interface DesktopNavProps {
  onOpenAssistedModal: () => void;
}

export function DesktopNav({ onOpenAssistedModal }: DesktopNavProps) {
  const { language } = useLanguage();

  return (
    <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-[#292524] shrink-0">
      <Link href="/" className="hover:text-[#762B46] transition-colors whitespace-nowrap">
        {language === 'te' ? 'హోమ్' : 'Home'}
      </Link>

      {/* Services Dropdown Mega Menu */}
      <ServicesMegaMenu onOpenAssistedModal={onOpenAssistedModal} />

      <Link href="/vendors" className="hover:text-[#762B46] transition-colors whitespace-nowrap">
        {language === 'te' ? 'విక్రేతల జాబితా' : 'Explore Vendors'}
      </Link>

      <Link href="/locations" className="hover:text-[#762B46] transition-colors whitespace-nowrap">
        {language === 'te' ? 'ప్రాంతాలు' : 'Locations'}
      </Link>

      <Link href="/how-it-works" className="hover:text-[#762B46] transition-colors whitespace-nowrap">
        {language === 'te' ? 'ఎలా పనిచేస్తుంది' : 'How It Works'}
      </Link>

      <Link href="/become-a-vendor" className="hover:text-[#762B46] transition-colors whitespace-nowrap">
        {language === 'te' ? 'విక్రేతగా చేరండి' : 'Become a Vendor'}
      </Link>
    </nav>
  );
}
