'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Shield, ArrowRight, Phone, MessageSquare } from 'lucide-react';

export default function BecomeAVendorPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">     <Header />      <main className="flex-1">
      {/* Banner */}
      <section className="bg-[#762B46] text-white py-16 px-4 sm:px-6 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">
            {language === 'te' ? 'వెండర్ నమోదు' : 'Vendor Onboarding'}
          </Badge>
          <h1 className="text-3xl font-bold font-heading">
            {language === 'te' ? 'మీ వివాహ వ్యాపారాన్ని గ్రామీణ స్థాయి నుండి విస్తరించండి' : 'Grow Your Wedding Business Across Telangana'}
          </h1>
          <p className="text-sm md:text-base text-[#FAF7F2]/90 font-body">
            {language === 'te'
              ? 'నారాయణపేట మరియు మహబూబ్ నగర్ జిల్లాలలోని గ్రామాలలో జరిగే పెళ్లిళ్ల నుండి నేరుగా ఆర్డర్లు మరియు అడ్వాన్స్‌లు పొందండి.'
              : 'Join as a verified vendor and get discovered by thousands of families in Narayanpet and Mahabubnagar.'}
          </p>
          <div className="pt-2">
            <Link href="/vendor/register">
              <Button variant="gold" className="text-sm font-semibold px-8 py-3 shadow-md">
                {language === 'te' ? 'ఇప్పుడే ఉచితంగా నమోదు అవ్వండి' : 'Register Free as a Vendor'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-12 px-4 sm:px-6 lg:px-14 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'తెలంగాణ వెడ్డింగ్స్‌లో ఎందుకు చేరాలి?' : 'Why Partner With TelanganaWeddings?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-body">
            {language === 'te'
              ? 'స్థానిక గ్రామీణ నిపుణులకు నిజమైన గౌరవం మరియు సంపాదన.'
              : 'A dedicated platform designed to elevate rural wedding professionals.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#762B46]/10 text-[#762B46] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#292524]">
                {language === 'te' ? 'ఎక్కువ ఆర్డర్లు మరియు వ్యాపారం' : 'More Direct Bookings'}
              </h3>
              <p className="text-xs text-stone-600 font-body leading-relaxed">
                {language === 'te'
                  ? 'మీ స్వగ్రామం మరియు చుట్టుపక్కల మండలాలలోని గ్రామస్థులు మీ సేవలను సులభంగా కనుగొని నేరుగా సంప్రదిస్తారు.'
                  : 'Expand beyond word of mouth. Reach families in adjacent mandals and villages who actively search for your service.'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#292524]">
                {language === 'te' ? 'మధ్యవర్తి కమిషన్లు లేవు' : 'Direct Customer Interaction'}
              </h3>
              <p className="text-xs text-stone-600 font-body leading-relaxed">
                {language === 'te'
                  ? 'కస్టమర్లతో నేరుగా మీరే మాట్లాడి ధరలు, తేదీలు మరియు అడ్వాన్స్‌లు ఖరారు చేసుకోవచ్చు. పారదర్శక వ్యాపారం.'
                  : 'Receive enquiries directly on your mobile or WhatsApp. Negotiate packages and take advances on your own terms.'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#C5A46D]/15 text-[#762B46] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#292524]">
                {language === 'te' ? 'వెరిఫైడ్ బ్యాడ్జ్ మరియు నమ్మకం' : 'Verified Vendor Trust'}
              </h3>
              <p className="text-xs text-stone-600 font-body leading-relaxed">
                {language === 'te'
                  ? 'మా క్షేత్ర బృందం ధృవీకరణ ద్వారా మీకు అధికారిక బ్యాడ్జ్ లభిస్తుంది, ఇది కస్టమర్లలో మీ పట్ల విశ్వాసాన్ని పెంచుతుంది.'
                  : 'Get a verified trust badge on your profile showing clients you are a verified professional in the district.'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 18 Categories Highlight */}
        <div className="bg-[#FAF7F2] border border-[#C5A46D]/40 rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold font-heading text-[#762B46]">
              {language === 'te' ? 'అన్ని 18 వివాహ సేవలకు ఆహ్వానం' : 'Welcoming All 18 Wedding Categories'}
            </h3>
            <p className="text-xs text-stone-600 font-body">
              {language === 'te'
                ? 'బాజా మేళం, సన్నాయి మేళం, టెంట్ హౌస్, వంట మాస్టర్లు, ఫంక్షన్ హాళ్లు మొదలైన అన్ని రకాల నిపుణులు నమోదు చేసుకోవచ్చు.'
                : 'Special category support for Band Melam, Sannai Melam, Catering, Shamiana, Photographers, and Purohits.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            {['Function Halls', 'Catering', 'Photography', 'Stage Decoration', 'Band Melam', 'Sannai Melam', 'Tent & Chairs', 'Bridal Makeup', 'Wedding Priests', 'Transportation', 'Jewellery', 'Invitation Printing'].map((cat, i) => (
              <div key={i} className="p-2.5 bg-white rounded-lg border border-stone-200 text-xs font-medium text-[#292524]">
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Support Helpline Box */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold font-heading text-[#292524]">
              {language === 'te' ? 'ఆన్‌లైన్ ఫారమ్ నింపడం కష్టంగా ఉందా?' : 'Need Help With Registration?'}
            </h4>
            <p className="text-xs text-stone-500 font-body">
              {language === 'te'
                ? 'మా వెండర్ హెల్ప్‌లైన్‌కు కాల్ చేయండి లేదా వాట్సాప్ చేయండి, మా సిబ్బంది మీ వివరాలు నమోదు చేస్తారు.'
                : 'Call or WhatsApp our vendor support team; we will register your profile over the phone in Telugu.'}
            </p>
          </div>
          <div className="flex gap-3">
            <a href="tel:+919876543210">
              <Button variant="outline" className="text-xs font-medium">
                <Phone className="w-3.5 h-3.5 mr-1 text-[#762B46]" />
                +91 98765 43210
              </Button>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="text-xs font-medium text-emerald-700">
                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                WhatsApp
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


