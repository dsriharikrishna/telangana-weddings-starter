'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">      <Header />`n      <main className="flex-1">
      {/* Hero Banner */}
      <section className="bg-[#762B46] text-white py-16 px-4 sm:px-6 lg:px-14">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">
            {language === 'te' ? 'మా గురించి' : 'About Us'}
          </Badge>
          <h1 className="text-3xl font-bold font-heading">
            {language === 'te' 
              ? 'ప్రతి గ్రామానికి పెళ్లి సేవలు ఒకే వేదికపై' 
              : 'One Wedding. One Platform. Every Village Connected.'}
          </h1>
          <p className="text-sm md:text-base text-[#FAF7F2]/90 leading-relaxed font-body">
            {language === 'te'
              ? 'తెలంగాణ వెడ్డింగ్స్ అనేది నారాయణపేట మరియు మహబూబ్ నగర్ జిల్లాలలోని గ్రామాలు, మండల కేంద్రాలు మరియు పట్టణాలలోని వివాహ సేవా నిపుణులను పెళ్లి కుటుంబాలతో అనుసంధానించే గ్రామీణ ప్రాధాన్యత కలిగిన తొలి వేదిక.'
              : 'TelanganaWeddings is a rural-first marketplace designed to bridge rural families in Narayanpet and Mahabubnagar districts with trusted local wedding service professionals, mandal teams, and nearby town specialists.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-14 max-w-6xl mx-auto space-y-12">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-[#C5A46D]/30 shadow-sm bg-white">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#762B46]/10 flex items-center justify-center text-[#762B46]">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-[#292524]">
                {language === 'te' ? 'మా లక్ష్యం (Our Mission)' : 'Our Mission'}
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-body">
                {language === 'te'
                  ? 'గ్రామీణ ప్రాంతాలలో పెళ్లి ఖర్చులను అనవసరపు దళారీ కమిషన్లు లేకుండా తగ్గించడం, స్థానిక గ్రామీణ బాజా బజంత్రీలు, వంట మాస్టర్లు, డెకరేటర్లు, టెంట్ హౌస్ వారికి స్వగ్రామాల్లోనే గౌరవప్రదమైన ఉపాధి మరియు ఆదాయాన్ని అందించడం.'
                  : 'To simplify wedding planning for rural households without middleman commissions, while empowering grassroot village vendors—from traditional Sannai Melam artists to tent houses and caterers—with dignified direct bookings and sustained livelihood.'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#C5A46D]/30 shadow-sm bg-white">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#C5A46D]/15 flex items-center justify-center text-[#762B46]">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-[#292524]">
                {language === 'te' ? 'గ్రామీణ ప్రాధాన్యత (Rural-First Focus)' : 'Rural-First Focus'}
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-body">
                {language === 'te'
                  ? 'నారాయణపేట మరియు మహబూబ్ నగర్ జిల్లాలలోని ప్రతి కుగ్రామం వరకు కవరేజ్. మీ ఊరిలోనే ఉన్న వెండర్ లేదా పక్క మండలంలో ఉన్న ఉత్తమ సర్వీస్ ప్రొవైడర్‌ను ఒకే ఒక్క ఫోన్ కాల్ లేదా వాట్సాప్ ద్వారా మాట్లాడి బుక్ చేసుకునే సదుపాయం.'
                  : 'Covering every hamlet and village across Narayanpet and Mahabubnagar. Whether you need a decorator from your own village or a photography team from the mandal headquarters, connect transparently with travel costs clearly stated upfront.'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-2xl font-bold font-heading text-center text-[#292524] mb-8">
            {language === 'te' ? 'మా విశిష్టతలు' : 'What Sets Us Apart'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 text-center space-y-3 shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#762B46] text-white flex items-center justify-center font-bold">1</div>
              <h3 className="text-lg font-semibold font-heading text-[#292524]">
                {language === 'te' ? 'నేరుగా వెండర్లతో మాట్లాడండి' : 'Direct Vendor Contact'}
              </h3>
              <p className="text-xs text-stone-600 font-body">
                {language === 'te'
                  ? 'ఎటువంటి మధ్యవర్తులు లేరు. వెండర్ ఫోన్ నంబర్ లేదా వాట్సాప్ ద్వారా నేరుగా మాట్లాడి ధరలు నిర్ణయించుకోవచ్చు.'
                  : 'Zero broker margins. Speak directly via phone call or WhatsApp to finalize dates, custom menus, and honest quotes.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 text-center space-y-3 shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#762B46] text-white flex items-center justify-center font-bold">2</div>
              <h3 className="text-lg font-semibold font-heading text-[#292524]">
                {language === 'te' ? 'సహాయక బుకింగ్ సదుపాయం' : 'Assisted Rural Booking'}
              </h3>
              <p className="text-xs text-stone-600 font-body">
                {language === 'te'
                  ? 'ఆన్‌లైన్ ఫారాలు నింపడం రాని పెద్దల కోసం మా కాల్ సెంటర్ బృందం ఫోన్ కాల్ ద్వారా అన్ని వివరాలు నమోదు చేసి సహాయం చేస్తుంది.'
                  : 'Designed for rural parents: one-tap callback assistance in simple Telugu so anyone can book services with confidence.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 text-center space-y-3 shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#762B46] text-white flex items-center justify-center font-bold">3</div>
              <h3 className="text-lg font-semibold font-heading text-[#292524]">
                {language === 'te' ? 'ధృవీకరించబడిన నిపుణులు' : 'Physically Verified Vendors'}
              </h3>
              <p className="text-xs text-stone-600 font-body">
                {language === 'te'
                  ? 'ఫోటో గుర్తింపు కార్డులు మరియు నిజమైన పోర్ట్‌ఫోలియో తనిఖీ తర్వాతే వెండర్లకు ధృవీకరణ బ్యాడ్జ్ ఇవ్వబడుతుంది.'
                  : 'Strict manual review of ID documents, real village service history, and genuine customer satisfaction.'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#F4EDE3] border border-[#C5A46D]/40 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold font-heading text-[#762B46]">
              {language === 'te' ? 'మీరు వివాహ సేవా నిపుణులా?' : 'Are you a local wedding service provider?'}
            </h3>
            <p className="text-sm text-stone-600 font-body">
              {language === 'te'
                ? 'తెలంగాణ వెడ్డింగ్స్‌లో ఉచితంగా చేరండి మరియు మీ జిల్లా అంతటా కొత్త ఆర్డర్లు పొందండి.'
                : 'Join TelanganaWeddings today and receive verified customer enquiries directly from villages across your district.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/vendor/register">
              <Button variant="primary" className="font-medium text-sm">
                {language === 'te' ? 'వెండర్‌గా నమోదు అవ్వండి' : 'Register as Vendor'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="font-medium text-sm bg-white">
                {language === 'te' ? 'మమ్మల్ని సంప్రదించండి' : 'Contact Support'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </div>
  );
}


