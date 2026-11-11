'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function BrandLogo() {
  const { language } = useLanguage();

  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#762B46] to-[#542034] flex items-center justify-center shadow-md border border-[#C5A46D]/50 group-hover:scale-105 transition-transform shrink-0">
        <span className="text-[#C5A46D] font-serif font-black text-lg sm:text-2xl tracking-tighter">శ్రీ</span>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-heading font-bold text-sm sm:text-lg text-[#762B46] tracking-tight leading-none group-hover:text-[#542034] transition-colors truncate">
          {language === 'te' ? 'తెలంగాణ వెడ్డింగ్స్' : 'TelanganaWeddings'}
        </span>
        <span className="text-[9px] sm:text-[11px] text-[#57534E] tracking-wide font-medium mt-0.5 sm:mt-1 truncate hidden xxs:inline">
          {language === 'te' ? 'ప్రతి గ్రామానికి పెళ్లి సేవలు' : 'Every Village Connected'}
        </span>
      </div>
    </Link>
  );
}
