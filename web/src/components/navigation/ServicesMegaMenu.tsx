'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, UtensilsCrossed, Camera, Video, Sparkles, 
  Zap, Volume2, HeartHandshake, Flame, Shirt, Gem, 
  Flower2, Armchair, Droplets, Car, MailOpen, ShieldCheck, 
  Music, ChevronDown, ArrowRight 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { WEDDING_CATEGORIES } from '@/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  Building2, UtensilsCrossed, Camera, Video, Sparkles,
  Zap, Volume2, HeartHandshake, Flame, Shirt, Gem,
  Flower2, Armchair, Droplets, Car, MailOpen, ShieldCheck,
  Music,
};

interface ServicesMegaMenuProps {
  onOpenAssistedModal: () => void;
}

export function ServicesMegaMenu({ onOpenAssistedModal }: ServicesMegaMenuProps) {
  const { language } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 hover:text-[#762B46] transition-colors outline-none cursor-pointer whitespace-nowrap py-2">
        <span>{language === 'te' ? 'సేవలు (18)' : 'Services'}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#C5A46D]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        sideOffset={14}
        className="w-[94vw] max-w-5xl bg-white/98 backdrop-blur-md border border-[#C5A46D]/40 p-5 shadow-2xl rounded-2xl max-h-[85vh] overflow-y-auto z-50 animate-in fade-in zoom-in-95"
      >
        {/* Header & Category 18 Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 mb-3 border-b border-[#E7DECF]/80">
          <div className="md:col-span-1 space-y-1">
            <span className="text-xs uppercase font-black text-[#762B46] tracking-wider block">
              {language === 'te' ? '18 వివాహ సేవలు' : '18 Wedding Service Categories'}
            </span>
            <p className="text-[11px] text-stone-500 font-body leading-relaxed">
              {language === 'te' 
                ? 'నారాయణపేట & మహబూబ్ నగర్ జిల్లాలలోని ప్రతి గ్రామానికి నేరుగా లభించే విశ్వసనీయ సేవలు.' 
                : 'Verified service providers in your village, nearby mandals, and towns with transparent pricing.'}
            </p>
          </div>

          {/* Spotlight 18.1 Band Melam & 18.2 Sannai Melam */}
          <div className="md:col-span-2 bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A46D]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A46D] flex items-center gap-1 justify-center sm:justify-start">
                <Music className="w-3.5 h-3.5 text-[#762B46]" />
                <span>{language === 'te' ? 'ప్రత్యేక కేటగిరీ 18' : 'Spotlight Category 18'}</span>
              </div>
              <div className="text-xs font-bold text-[#762B46]">
                {language === 'te' ? 'బాజా మేళం & సన్నాయి మేళం' : 'Band Melam & Sannai Melam'}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link 
                href="/services/band-melam-sannai/band-melam"
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white border border-[#C5A46D]/40 hover:bg-[#762B46] hover:text-white transition-all text-center text-xs font-semibold text-[#292524] shadow-sm flex items-center justify-center gap-1"
              >
                <span>🎺 18.1 Band Melam</span>
              </Link>
              <Link 
                href="/services/band-melam-sannai/sannai-melam"
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white border border-[#C5A46D]/40 hover:bg-[#762B46] hover:text-white transition-all text-center text-xs font-semibold text-[#292524] shadow-sm flex items-center justify-center gap-1"
              >
                <span>🪈 18.2 Sannai Melam</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {WEDDING_CATEGORIES.map(category => {
            const Icon = CATEGORY_ICON_MAP[category.iconName] || Sparkles;
            return (
              <DropdownMenuItem key={category.id} asChild>
                <Link 
                  href={`/services/${category.slug}`}
                  className="flex items-center gap-2.5 p-2 hover:bg-[#FAF7F2] rounded-xl cursor-pointer transition-colors border border-transparent hover:border-[#E7DECF]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#762B46] flex items-center justify-center shrink-0 border border-[#E7DECF]">
                    <Icon className="w-4 h-4 text-[#762B46]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#292524] truncate">
                      {category.number}. {category.nameEn}
                    </span>
                    <span className="text-[10px] text-[#57534E] truncate">
                      {category.nameTe}
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>

        {/* Mega Menu Footer Assistance */}
        <div className="mt-4 pt-3 border-t border-[#E7DECF] flex items-center justify-between text-xs">
          <span className="text-stone-500">
            {language === 'te' ? 'మీకు కావాల్సిన సేవ కనిపించలేదా?' : "Can't find a specific wedding vendor?"}
          </span>
          <button
            onClick={onOpenAssistedModal}
            className="font-bold text-[#762B46] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'te' ? 'కాల్ బ్యాక్ అడగండి' : 'Request Assisted Call-Back'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
