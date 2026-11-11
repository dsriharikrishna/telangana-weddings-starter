'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Phone, MessageSquare, Headphones, HelpCircle } from 'lucide-react';
import { VendorPageHeader } from '@/components/ui/vendor-page-header';

export default function VendorSupportPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <VendorPageHeader
        title={language === 'te' ? 'వెండర్ సపోర్ట్ & హెల్ప్‌డెస్క్' : 'Vendor Support Desk'}
        subtitle={language === 'te' ? 'సేవలు, బ్యాంక్ సెటిల్మెంట్లు లేదా ఆర్డర్ల సమస్యల పరిష్కారం కోసం నేరుగా సంప్రదించండి.' : 'Dedicated coordinator assistance for wedding vendors in Narayanpet & Mahabubnagar.'}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#762B46]/10 text-[#762B46] flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold font-heading text-[#292524]">
              {language === 'te' ? 'వెండర్ హెల్ప్‌లైన్' : 'Dedicated Vendor Helpline'}
            </h2>
            <p className="text-xs text-stone-600 font-body leading-relaxed">
              {language === 'te'
                ? 'మీ ప్రొఫైల్ మార్పులు, తేదీల లభ్యత లేదా కస్టమర్ సమస్యల కోసం మా ప్రత్యేక వెండర్ సమన్వయకర్తతో మాట్లాడండి.'
                : 'Need help updating service rates, managing calendar blocks, or following up on payments? Speak directly with our vendor relations desk.'}
            </p>
            <div className="space-y-2 pt-2">
              <a href="tel:+919876543210" className="block">
                <Button variant="primary" className="w-full text-xs font-medium">
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  +91 98765 43210 (Call Now)
                </Button>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full text-xs font-medium text-emerald-700">
                  <MessageSquare className="w-3.5 h-3.5 mr-2" />
                  WhatsApp Support
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#C5A46D]/15 text-[#762B46] flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold font-heading text-[#292524]">
              {language === 'te' ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Common Vendor Guides'}
            </h2>
            <div className="space-y-3 text-xs text-stone-700 font-body">
              <div className="p-2.5 bg-[#FAF7F2] rounded border border-stone-200">
                <div className="font-semibold text-[#762B46]">
                  {language === 'te' ? 'ప్రయాణ ఛార్జీలను ఎలా సవరించాలి?' : 'How to update village travel charges?'}
                </div>
                <div className="text-stone-500 mt-1">
                  {language === 'te' ? 'సర్వీస్ ఏరియాస్ పేజీకి వెళ్లి కొత్త రేట్లను నమోదు చేయండి.' : 'Visit "Service Areas" menu to edit mandal coverage and per-km fuel allowance.'}
                </div>
              </div>
              <div className="p-2.5 bg-[#FAF7F2] rounded border border-stone-200">
                <div className="font-semibold text-[#762B46]">
                  {language === 'te' ? 'అడ్వాన్స్ పేమెంట్ ఎప్పుడు అందుతుంది?' : 'When are booking payouts processed?'}
                </div>
                <div className="text-stone-500 mt-1">
                  {language === 'te' ? 'బుకింగ్ నిర్ధారించబడిన 24 గంటల్లోపు బ్యాంక్ బదిలీ చేయబడుతుంది.' : 'Online advance payouts are released directly to your verified bank within 24 hours.'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

