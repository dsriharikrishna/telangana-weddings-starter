'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, MapPin, PhoneCall, User, Store } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { WEDDING_CATEGORIES, TELANGANA_LOCATIONS } from '@/data';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface MobileNavSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenLocationModal: () => void;
  onOpenAssistedModal: () => void;
}

export function MobileNavSheet({
  isOpen,
  onOpenChange,
  onOpenLocationModal,
  onOpenAssistedModal,
}: MobileNavSheetProps) {
  const { language } = useLanguage();
  const { location } = useApp();

  const districtObj = TELANGANA_LOCATIONS.districts.find(d => d.id === location.district);
  const districtName = language === 'te' 
    ? (districtObj?.nameTe || 'నారాయణపేట') 
    : (districtObj?.nameEn || 'Narayanpet');

  const mandalObj = districtObj?.mandals.find(m => m.id === location.mandal);
  const mandalName = location.mandal === 'all'
    ? (language === 'te' ? 'అన్ని మండలాలు' : 'All Mandals')
    : (language === 'te' ? (mandalObj?.nameTe || location.mandal) : (mandalObj?.nameEn || location.mandal));

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button 
          className="lg:hidden p-2 text-[#762B46] hover:bg-[#F4EDE3] rounded-lg transition-colors cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] sm:max-w-md bg-[#FAF7F2] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left flex items-center gap-2 text-[#762B46]">
            <span className="w-8 h-8 rounded-lg bg-[#762B46] text-[#C5A46D] flex items-center justify-center font-serif text-lg font-bold">శ్రీ</span>
            <span>TelanganaWeddings</span>
          </SheetTitle>
        </SheetHeader>

        <div className="py-4 space-y-4 font-body">
          {/* Selected Location in Mobile */}
          <div className="p-3 rounded-xl bg-white border border-[#E7DECF] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#57534E]">Selected Wedding Location</span>
            <button
              onClick={() => { onOpenLocationModal(); onOpenChange(false); }}
              className="flex items-center justify-between w-full text-xs font-bold text-[#762B46]"
            >
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>{districtName} • {mandalName}</span>
              </span>
              <span className="text-[11px] text-[#C5A46D] underline">Change</span>
            </button>
          </div>

          {/* Callback Button */}
          <Button 
            variant="secondary" 
            className="w-full justify-start text-xs font-bold"
            onClick={() => { onOpenAssistedModal(); onOpenChange(false); }}
          >
            <PhoneCall className="w-4 h-4 text-emerald-600 mr-2" />
            <span>{language === 'te' ? 'కాల్ బ్యాక్ సహాయం అడగండి' : 'Request Assisted Call-Back'}</span>
          </Button>

          {/* Navigation Links Accordion */}
          <div className="flex flex-col space-y-1 text-sm font-medium text-[#292524]">
            <Link 
              href="/" 
              onClick={() => onOpenChange(false)}
              className="py-2 px-3 rounded-lg hover:bg-white hover:text-[#762B46] transition-colors"
            >
              {language === 'te' ? 'హోమ్' : 'Home'}
            </Link>

            {/* Services Accordion */}
            <Accordion type="single" collapsible className="w-full border-none">
              <AccordionItem value="services" className="border-none">
                <AccordionTrigger className="py-2 px-3 hover:no-underline hover:bg-white rounded-lg">
                  <span>{language === 'te' ? 'వివాహ సేవలు (18 Categories)' : 'Wedding Services (18)'}</span>
                </AccordionTrigger>
                <AccordionContent className="pl-4 space-y-1 pt-1">
                  {/* Spotlight Band & Sannai */}
                  <Link
                    href="/services/band-melam-sannai/band-melam"
                    onClick={() => onOpenChange(false)}
                    className="block py-1.5 text-xs text-[#762B46] font-bold"
                  >
                    🎺 18.1 Band Melam (బ్యాండ్ మేళం)
                  </Link>
                  <Link
                    href="/services/band-melam-sannai/sannai-melam"
                    onClick={() => onOpenChange(false)}
                    className="block py-1.5 text-xs text-[#762B46] font-bold"
                  >
                    🪈 18.2 Sannai Melam (సన్నాయి మేళం)
                  </Link>

                  {WEDDING_CATEGORIES.map(category => (
                    <Link
                      key={category.id}
                      href={`/services/${category.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="block py-1 text-xs text-[#57534E] hover:text-[#762B46]"
                    >
                      {category.number}. {category.nameEn}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link 
              href="/vendors" 
              onClick={() => onOpenChange(false)}
              className="py-2 px-3 rounded-lg hover:bg-white hover:text-[#762B46] transition-colors"
            >
              {language === 'te' ? 'విక్రేతల శోధన' : 'Explore All Vendors'}
            </Link>

            <Link 
              href="/locations" 
              onClick={() => onOpenChange(false)}
              className="py-2 px-3 rounded-lg hover:bg-white hover:text-[#762B46] transition-colors"
            >
              {language === 'te' ? 'గ్రామాలు & మండలాలు' : 'Villages & Mandals'}
            </Link>

            <Link 
              href="/how-it-works" 
              onClick={() => onOpenChange(false)}
              className="py-2 px-3 rounded-lg hover:bg-white hover:text-[#762B46] transition-colors"
            >
              {language === 'te' ? 'ఎలా పనిచేస్తుంది' : 'How It Works'}
            </Link>

            <Link 
              href="/become-a-vendor" 
              onClick={() => onOpenChange(false)}
              className="py-2 px-3 rounded-lg bg-[#F4EDE3] text-[#762B46] font-bold"
            >
              {language === 'te' ? 'విక్రేత నమోదు' : 'Become a Vendor'}
            </Link>

            <div className="pt-4 border-t border-[#E7DECF] flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full justify-center">
                <Link href="/auth/login" onClick={() => onOpenChange(false)}>
                  <User className="w-4 h-4 mr-1.5" />
                  <span>{language === 'te' ? 'కస్టమర్ లాగిన్' : 'Sign In'}</span>
                </Link>
              </Button>
              
              <Button variant="primary" asChild className="w-full justify-center">
                <Link href="/vendor/register" onClick={() => onOpenChange(false)}>
                  <Store className="w-4 h-4 mr-1.5" />
                  <span>{language === 'te' ? 'విక్రేత పోర్టల్' : 'Vendor Portal'}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
