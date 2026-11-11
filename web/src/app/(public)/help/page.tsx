'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, HelpCircle } from 'lucide-react';

export default function HelpCenterPage() {
  const { language } = useLanguage();

  const guides = [
    {
      titleTe: 'నా గ్రామానికి సమీపంలోని వెండర్లను ఎలా వెతకాలి?',
      titleEn: 'How do I find vendors near my village?',
      descTe: 'హోమ్‌పేజీలో లేదా లొకేషన్ ఎంపికలో మీ జిల్లా, మండలం మరియు ఊరి పేరు ఎంచుకోండి. సిస్టమ్ సమీపంలోని వెండర్లను ప్రదర్శిస్తుంది.',
      descEn: 'Select your district, mandal, and village in the header. The system highlights local vendors and those who travel to your area.',
    },
    {
      titleTe: 'కాల్‌బ్యాక్ సహాయం ఎలా అడగాలి?',
      titleEn: 'How do I request callback assistance?',
      descTe: 'ప్రతి పేజీలో "కాల్‌బ్యాక్ సహాయం" బటన్ ఉంటుంది. మీ ఫోన్ నంబర్ ఇవ్వగానే మా ప్రతినిధి మీకు కాల్ చేస్తారు.',
      descEn: 'Click the Assisted Booking button or call our helpline directly. Our Telugu-speaking agent will coordinate your vendors.',
    },
    {
      titleTe: 'ప్రయాణ ఛార్జీలు (Travel Charges) ఎలా లెక్కించబడతాయి?',
      titleEn: 'How are travel charges calculated?',
      descTe: 'మండల కేంద్రం లేదా పట్టణం నుండి గ్రామీణ ప్రాంతాలకు వెళ్లేందుకు వెండర్ ప్రొఫైల్‌లో ప్రయాణ నిబంధనలు స్పష్టంగా ఉంటాయి.',
      descEn: 'Each vendor specifies their travel range and per-km or fixed travel fee for villages beyond their base mandal.',
    },
    {
      titleTe: 'వెండర్‌కు నేరుగా డబ్బులు చెల్లించవచ్చా?',
      titleEn: 'Can I pay the vendor directly?',
      descTe: 'అవును, కస్టమర్ మరియు వెండర్ మధ్య ఒప్పందం ప్రకారం నగదు, UPI లేదా బ్యాంక్ బదిలీ ద్వారా చెల్లింపులు చేయవచ్చు.',
      descEn: 'Yes, families can transact directly with vendors via cash, UPI, or bank transfer according to mutually agreed milestones.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <section className="bg-[#762B46] text-white py-14 px-4 sm:px-6 lg:px-14 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">
              {language === 'te' ? 'సహాయ కేంద్రం' : 'Help & Support'}
            </Badge>
            <h1 className="text-3xl font-bold font-heading">
              {language === 'te' ? 'మీకు ఏ విధంగా సహాయపడగలం?' : 'How Can We Assist You?'}
            </h1>
            <p className="text-sm md:text-base text-[#FAF7F2]/90 font-body">
              {language === 'te'
                ? 'నారాయణపేట & మహబూబ్ నగర్ జిల్లాలలోని గ్రామీణ వినియోగదారుల కోసం అందుబాటులో ఉన్న సహాయ మార్గదర్శి.'
                : 'Help guides and customer service for rural wedding planning in Narayanpet and Mahabubnagar.'}
            </p>
          </div>
        </section>

        {/* Guide Cards */}
        <section className="py-12 px-4 sm:px-6 lg:px-14 max-w-5xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((item, idx) => (
              <Card key={idx} className="border-stone-200 bg-white shadow-sm">
                <CardContent className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-[#762B46] font-bold text-sm">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>{language === 'te' ? item.titleTe : item.titleEn}</span>
                  </div>
                  <p className="text-xs text-stone-600 font-body leading-relaxed pl-6">
                    {language === 'te' ? item.descTe : item.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Strip */}
          <div className="bg-[#F4EDE3] border border-[#C5A46D]/30 rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold font-heading text-[#292524]">
              {language === 'te' ? 'ఇంకా సందేహాలు ఉన్నాయా?' : 'Still have questions?'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-body max-w-md mx-auto">
              {language === 'te'
                ? 'మా కస్టమర్ కేర్ ఎగ్జిక్యూటివ్‌తో తెలుగులో నేరుగా మాట్లాడండి.'
                : 'Our local field coordinators are available to speak with you in Telugu.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:+919876543210">
                <Button variant="primary" className="text-sm font-medium">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 98765 43210
                </Button>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-sm font-medium bg-white text-emerald-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp Chat
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}



