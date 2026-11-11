'use client';

import React from 'react';
import { Sparkles, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TopBannerProps {
  onOpenAssistedModal: () => void;
}

export function TopBanner({ onOpenAssistedModal }: TopBannerProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-[#762B46] text-[#FAF7F2] text-xs py-1.5 px-4 sm:px-6 lg:px-14 flex items-center justify-between font-body">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
        <span className="font-medium tracking-wide truncate">
          {language === 'te'
            ? 'ప్రతి గ్రామానికి పెళ్లి సేవలు ఒకే వేదికపై.'
            : 'One Wedding. One Platform. Every Village Connected.'}
        </span>
      </div>

      {/* District Pilot Highlight in Center */}
      <div className="hidden lg:flex items-center gap-2 font-medium">
        <span className="text-[#FAF7F2]/90">
          {language === 'te'
            ? 'నారాయణపేట & మహబూబ్‌నగర్ జిల్లాల గ్రామీణ వివాహ సేవలు'
            : 'Rural Wedding Services for Narayanpet & Mahabubnagar'}
        </span>
        <span className="bg-[#C5A46D] text-[#292524] px-2 py-0.5 rounded text-[10px] font-bold">
          {language === 'te' ? 'తెలంగాణ' : 'Telangana'}
        </span>
      </div>

      {/* Callback Helpline Button */}
      <button
        onClick={onOpenAssistedModal}
        className="hidden sm:flex items-center gap-1.5 text-[11px] bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded-full font-semibold transition-all hover:scale-105 cursor-pointer shrink-0"
      >
        <PhoneCall className="w-3 h-3 text-[#C5A46D]" />
        <span>{language === 'te' ? 'కాల్ బ్యాక్ సహాయం' : 'Assisted Call-Back'}</span>
      </button>
    </div>
  );
}
