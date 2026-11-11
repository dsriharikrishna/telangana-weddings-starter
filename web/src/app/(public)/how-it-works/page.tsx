'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, PhoneCall, CheckCircle, ArrowRight, ShieldCheck, FileCheck, Users } from 'lucide-react';

export default function HowItWorksPage() {
  const { language } = useLanguage();

  const steps = [
    {
      number: '01',
      titleTe: 'మీ గ్రామం మరియు మండలాన్ని ఎంచుకోండి',
      titleEn: 'Choose Your Village & Mandal',
      descTe: 'నారాయణపేట లేదా మహబూబ్ నగర్ జిల్లాలలోని మీ వాస్తవ పెళ్లి వేదిక గ్రామాన్ని ఎంచుకోండి.',
      descEn: 'Select the actual village or town in Narayanpet or Mahabubnagar where the wedding ceremonies will take place.',
      icon: MapPin,
    },
    {
      number: '02',
      titleTe: '18 వివాహ సేవలను బ్రౌజ్ చేయండి',
      titleEn: 'Browse 18 Wedding Categories',
      descTe: 'ఫంక్షన్ హాళ్లు, క్యాటరింగ్, బాజా మేళం, సన్నాయి మేళం, టెంట్ హౌస్, ఫోటోగ్రఫీ మొదలైన స్థానిక వెండర్ల వివరాలు చూడండి.',
      descEn: 'Explore local decorators, Band Melam teams, Sannai artists, caterers, and tent houses serving your area.',
      icon: Search,
    },
    {
      number: '03',
      titleTe: 'నేరుగా మాట్లాడండి లేదా వాట్సాప్ చేయండి',
      titleEn: 'Contact Directly or WhatsApp',
      descTe: 'ఎటువంటి మధ్యవర్తి కమిషన్ లేకుండా వెండర్ ఫోన్ నంబర్‌కు కాల్ చేయండి లేదా నేరుగా వాట్సాప్‌లో ధరల వివరాలు తెలుసుకోండి.',
      descEn: 'Speak directly with business owners. Zero broker commission. Request custom packages or request assisted callback.',
      icon: PhoneCall,
    },
    {
      number: '04',
      titleTe: 'నిశ్చింతగా పెళ్లి ఏర్పాట్లు పూర్తి చేయండి',
      titleEn: 'Confirm & Celebrate With Peace',
      descTe: 'ధృవీకరించబడిన వెండర్లతో మీ తేదీలు ఖరారు చేసుకుని పారదర్శకమైన కొటేషన్లతో శుభకార్యాన్ని జరుపుకోండి.',
      descEn: 'Finalize bookings with verified professionals, clear travel policies, and transparent village-level quotations.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full"> <Header />    <main className="flex-1">
      {/* Header Banner */}
      <section className="bg-[#762B46] text-white py-14 px-4 sm:px-6 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">
            {language === 'te' ? 'ఎలా పనిచేస్తుంది?' : 'Step-by-Step Guide'}
          </Badge>
          <h1 className="text-3xl font-bold font-heading">
            {language === 'te' ? 'తెలంగాణ వెడ్డింగ్స్ ఎలా ఉపయోగించాలి?' : 'How TelanganaWeddings Works'}
          </h1>
          <p className="text-sm md:text-base text-[#FAF7F2]/90 font-body">
            {language === 'te'
              ? 'గ్రామీణ కుటుంబాలు తమ ఊరిలోనే నమ్మకమైన పెళ్లి సేవలను సులభంగా బుక్ చేసుకునే విధానం.'
              : 'A transparent, rural-first platform built for village families to coordinate weddings without stress.'}
          </p>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.number} className="border-[#C5A46D]/20 shadow-sm bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#762B46]/5 text-[#762B46] font-bold text-4xl px-4 py-2 rounded-bl-2xl">
                  {step.number}
                </div>
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#762B46] text-white flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-[#292524]">
                    {language === 'te' ? step.titleTe : step.titleEn}
                  </h3>
                  <p className="text-sm text-stone-600 font-body leading-relaxed">
                    {language === 'te' ? step.descTe : step.descEn}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Rural Trust & Verification Section */}
        <div className="mt-16 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold font-heading text-[#292524]">
              {language === 'te' ? 'గ్రామీణ భద్రత మరియు నమ్మకం' : 'Rural Trust & Verification'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-body">
              {language === 'te'
                ? 'మేము నకిలీ వివరాలను లేదా తప్పుడు ధరలను ప్రోత్సహించము. ప్రతీ వెండర్ సమాచారం మా నిబంధనల ప్రకారం ఉంటుంది.'
                : 'We prioritize physical verification and direct accountability across villages.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#FAF7F2] space-y-2 border border-stone-100">
              <ShieldCheck className="w-7 h-7 text-[#762B46]" />
              <h4 className="text-base font-semibold text-[#292524] font-heading">
                {language === 'te' ? 'భౌతిక ధృవీకరణ' : 'Physical Verification'}
              </h4>
              <p className="text-xs text-stone-600 font-body">
                {language === 'te'
                  ? 'వెండర్ల గుర్తింపు కార్డులు మరియు నిజమైన పని నమూనాలు మా స్థానిక సమన్వయకర్తల ద్వారా పరిశీలించబడతాయి.'
                  : 'Aadhaar, business premises, and actual wedding equipment are verified by local field staff.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF7F2] space-y-2 border border-stone-100">
              <FileCheck className="w-7 h-7 text-[#762B46]" />
              <h4 className="text-base font-semibold text-[#292524] font-heading">
                {language === 'te' ? 'పారదర్శక ప్రయాణ ఛార్జీలు' : 'Clear Travel Policies'}
              </h4>
              <p className="text-xs text-stone-600 font-body">
                {language === 'te'
                  ? 'మండల కేంద్రం నుండి మీ గ్రామానికి వచ్చే ప్రయాణ ఖర్చులు ముందే స్పష్టంగా తెలపబడతాయి.'
                  : 'Upfront travel charges for rural hamlets so there are zero unexpected surprises on wedding day.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF7F2] space-y-2 border border-stone-100">
              <Users className="w-7 h-7 text-[#762B46]" />
              <h4 className="text-base font-semibold text-[#292524] font-heading">
                {language === 'te' ? 'సహాయక కాల్ సెంటర్' : 'Assisted Telugu Helpline'}
              </h4>
              <p className="text-xs text-stone-600 font-body">
                {language === 'te'
                  ? 'ఆన్‌లైన్ వాడకం రాని కుటుంబ పెద్దలకు మా తెలుగు కస్టమర్ కేర్ నేరుగా ఫోన్ ద్వారా పూర్తి సహకారం అందిస్తుంది.'
                  : 'Full telephone assistance in Telugu for elders to finalize dates, check availability, and coordinate.'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
          <Link href="/vendors">
            <Button variant="primary" className="text-sm font-medium px-6 py-2.5">
              {language === 'te' ? 'వెండర్లను బ్రౌజ్ చేయండి' : 'Explore Wedding Vendors'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="text-sm font-medium px-6 py-2.5 bg-white">
              {language === 'te' ? 'కాల్ బ్యాక్ సహాయం అడగండి' : 'Request Callback Assistance'}
            </Button>
          </Link>
        </div>
      </section>
    </main>
      <Footer />
    </div>
  );
}



