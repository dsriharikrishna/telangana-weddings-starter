'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Globe, ChevronDown, User, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { TELANGANA_LOCATIONS } from '@/data';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderControlsProps {
  onOpenLocationModal: () => void;
}

export function HeaderControls({ onOpenLocationModal }: HeaderControlsProps) {
  const { language, setLanguage } = useLanguage();
  const { location } = useApp();

  const districtObj = TELANGANA_LOCATIONS.districts.find(d => d.id === location.district);
  const districtName = language === 'te' 
    ? (districtObj?.nameTe || 'నారాయణపేట') 
    : (districtObj?.nameEn || 'Narayanpet');

  const mandalObj = districtObj?.mandals.find(m => m.id === location.mandal);
  const mandalName = location.mandal === 'all'
    ? (language === 'te' ? 'అన్ని మండలాలు' : 'All Mandals')
    : (language === 'te' ? (mandalObj?.nameTe || location.mandal) : (mandalObj?.nameEn || location.mandal));

  const villageObj = mandalObj?.villages.find(v => v.id === location.village);
  const villageName = location.village === 'all'
    ? null
    : (language === 'te' ? (villageObj?.nameTe || location.village) : (villageObj?.nameEn || location.village));

  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
      {/* Searchable Location Dropdown Pill - hidden on smallest mobile screens to give priority to Language & Menu */}
      <button 
        onClick={onOpenLocationModal}
        className="hidden xs:flex items-center gap-1.5 sm:gap-2 bg-[#F4EDE3] hover:bg-[#E7DECF] text-[#292524] px-2 sm:px-3 py-1.5 rounded-full border border-[#C5A46D]/30 text-xs font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-sm shrink-0"
        title="Change Village, Mandal or District"
      >
        <MapPin className="w-3.5 h-3.5 text-[#762B46] shrink-0" />
        <span className="font-bold">{districtName}</span>
        <span className="text-gray-300 hidden sm:inline">/</span>
        <span className="text-[#57534E] font-medium max-w-[70px] sm:max-w-[105px] truncate hidden sm:inline">{mandalName}</span>
        {villageName && (
          <>
            <span className="text-gray-300 hidden md:inline">/</span>
            <span className="text-[#762B46] font-bold max-w-[75px] sm:max-w-[90px] truncate hidden md:inline">{villageName}</span>
          </>
        )}
        <ChevronDown className="w-3 h-3 text-[#762B46] shrink-0" />
      </button>

      {/* Language Switch */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#C5A46D]/40 bg-white text-xs font-bold text-[#762B46] hover:bg-[#FAF7F2] transition-colors cursor-pointer shrink-0"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>{language === 'te' ? 'తెలుగు' : 'English'}</span>
            <ChevronDown className="w-3 h-3 text-[#762B46]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32 bg-white border border-[#E7DECF] p-1 shadow-lg">
          <DropdownMenuItem onClick={() => setLanguage('te')} className="cursor-pointer text-xs font-semibold">
            తెలుగు (Telugu)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('en')} className="cursor-pointer text-xs font-semibold">
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sign In Button */}
      <Link href="/auth/login" className="hidden sm:inline-flex">
        <Button variant="ghost" size="sm" className="text-xs font-semibold text-[#292524] hover:text-[#762B46] whitespace-nowrap px-2.5">
          <User className="w-3.5 h-3.5 mr-1" />
          <span>{language === 'te' ? 'లాగిన్' : 'Sign In'}</span>
        </Button>
      </Link>

      {/* Primary CTA: Find Services */}
      <Link href="/vendors" className="hidden md:inline-flex">
        <Button variant="primary" size="sm" className="text-xs font-semibold px-3 py-1.5 shadow-sm whitespace-nowrap">
          <Search className="w-3.5 h-3.5 mr-1" />
          <span>{language === 'te' ? 'సేవలు వెతకండి' : 'Find Services'}</span>
        </Button>
      </Link>
    </div>
  );
}
