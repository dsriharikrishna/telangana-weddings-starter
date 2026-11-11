'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FAQPage() {
  const { language } = useLanguage();

  const faqs = [
    {
      qTe: 'తెలంగాణ వెడ్డింగ్స్ ఉపయోగించడానికి కస్టమర్ల నుండి ఛార్జీలు వసూలు చేస్తారా?',
      qEn: 'Are there any charges for customers to browse vendors?',
      aTe: 'లేదు. కస్టమర్ల కోసం తెలంగాణ వెడ్డింగ్స్ పూర్తిగా ఉచితం. మీరు ఎటువంటి రిజిస్ట్రేషన్ ఫీజు చెల్లించాల్సిన అవసరం లేదు.',
      aEn: 'No. TelanganaWeddings is completely free for families and customers searching for wedding services.'
    },
    {
      qTe: 'మా ఊరు చిన్న పల్లెటూరు, అక్కడికి వెండర్లు వస్తారా?',
      qEn: 'Our village is remote. Will vendors travel there?',
      aTe: 'అవును. ప్రతి వెండర్ ప్రొఫైల్‌లో వారు ప్రయాణించే మండలాలు మరియు గ్రామాల వివరాలు స్పష్టంగా పేర్కొనబడి ఉంటాయి.',
      aEn: 'Yes. Each vendor lists their travel availability and villages served, including travel charges if applicable.'
    },
    {
      qTe: 'బాజా మేళం మరియు సన్నాయి మేళం ఎలా వేరు చేయబడ్డాయి?',
      qEn: 'How are Band Melam and Sannai Melam separated?',
      aTe: 'తెలంగాణ సంస్కృతి ప్రకారం ఆధునిక బ్రాస్ బృందం (బాజా మేళం) మరియు సాంప్రదాయ నాదస్వరం (సన్నాయి మేళం) రెండు వేర్వేరు ఉపవర్గాలుగా అందుబాటులో ఉన్నాయి.',
      aEn: 'Band Melam (Brass/Tasha processional band) and Sannai Melam (traditional Nadaswaram/Shehnai) are distinct subcategories.'
    },
    {
      qTe: 'ఆన్‌లైన్ ద్వారా కాకుండా ఫోన్ ద్వారా బుకింగ్ చేసుకోవచ్చా?',
      qEn: 'Can I book over phone instead of online forms?',
      aTe: 'తప్పకుండా! గ్రామీణ వినియోగదారుల సౌలభ్యం కోసం మా తెలుగు కాల్‌బ్యాక్ అసిస్టెన్స్ అందుబాటులో ఉంది.',
      aEn: 'Absolutely! Our assisted booking coordinators will handle vendor phone calls and inquiries for you.'
    },
    {
      qTe: 'వెండర్‌కు ఏదైనా సమస్య వస్తే ఫిర్యాదు ఎలా చేయాలి?',
      qEn: 'How do I raise a complaint if there is an issue?',
      aTe: 'మా హెల్ప్‌లైన్ నంబర్ +91 98765 43210 కు కాల్ చేయవచ్చు లేదా సపోర్ట్ పేజీ నుండి టికెట్ నమోదు చేయవచ్చు.',
      aEn: 'Call our helpline at +91 98765 43210 or submit an enquiry via customer support portal.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">     <Header />     <main className="flex-1">
      <section className="bg-[#762B46] text-white py-14 px-4 sm:px-6 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">FAQ</Badge>
          <h1 className="text-3xl font-bold font-heading">
            {language === 'te' ? 'తరచుగా అడిగే ప్రశ్నలు (FAQ)' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-sm md:text-base text-[#FAF7F2]/90 font-body">
            {language === 'te' ? 'వినియోగదారులు మరియు వెండర్లకు సాధారణ సమాచారం' : 'Common questions answered simply for families and vendors'}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-14 max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <Card key={i} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-base font-bold text-[#762B46] font-heading">
                {language === 'te' ? faq.qTe : faq.qEn}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-body leading-relaxed">
                {language === 'te' ? faq.aTe : faq.aEn}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
      <Footer />
    </div>
  );
}



