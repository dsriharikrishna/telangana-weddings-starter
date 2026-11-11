'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: 'Narayanpet',
    mandal: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full"> <Header />    <main className="flex-1">
      {/* Banner */}
      <section className="bg-[#762B46] text-white py-12 px-4 sm:px-6 lg:px-14">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">
            {language === 'te' ? 'సంప్రదించండి' : 'Customer Support'}
          </Badge>
          <h1 className="text-3xl font-bold font-heading">
            {language === 'te' ? 'సహాయం కోసం మమ్మల్ని సంప్రదించండి' : 'We are Here to Help Your Family'}
          </h1>
          <p className="text-sm md:text-base text-[#FAF7F2]/90 font-body">
            {language === 'te'
              ? 'పెళ్లి ఏర్పాట్లలో మీకు ఏవైనా సందేహాలు లేదా సలహాలు కావాలంటే మా హెల్ప్‌డెస్క్‌ను సంప్రదించండి.'
              : 'Reach out to our local field coordinators in Narayanpet and Mahabubnagar for any wedding booking assistance.'}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="space-y-6 md:col-span-1">
            <Card className="border-[#C5A46D]/30 bg-white shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold font-heading text-[#292524]">
                  {language === 'te' ? 'నేరుగా మాట్లాడండి' : 'Direct Helpline'}
                </h2>

                <div className="space-y-4 text-sm text-stone-700 font-body">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#762B46] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#292524]">{language === 'te' ? 'హెల్ప్‌లైన్ నంబర్' : 'Helpline'}</div>
                      <a href="tel:+919876543210" className="text-[#762B46] font-medium hover:underline">
                        +91 98765 43210
                      </a>
                      <p className="text-xs text-stone-500">{language === 'te' ? 'ఉదయం 8:00 నుండి రాత్రి 9:00 వరకు' : '8:00 AM - 9:00 PM Daily'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#292524]">WhatsApp Support</div>
                      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-medium hover:underline">
                        +91 98765 43210
                      </a>
                      <p className="text-xs text-stone-500">{language === 'te' ? 'తక్షణ ప్రతిస్పందన' : 'Instant Reply in Telugu'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#762B46] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#292524]">Email</div>
                      <a href="mailto:support@telanganaweddings.com" className="text-[#762B46] hover:underline">
                        support@telanganaweddings.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#762B46] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#292524]">{language === 'te' ? 'క్షేత్ర కార్యాలయాలు' : 'Local Offices'}</div>
                      <p className="text-xs text-stone-600 mt-1">
                        1. Station Road, Narayanpet, Telangana - 509210<br />
                        2. Raichur Road, Mahabubnagar, Telangana - 509001
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-[#F4EDE3] p-5 rounded-xl border border-[#C5A46D]/30 space-y-2">
              <h3 className="text-sm font-bold text-[#762B46] font-heading flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {language === 'te' ? 'త్వరిత సహాయం (Quick Callback)' : 'Need Quick Callback?'}
              </h3>
              <p className="text-xs text-stone-600 font-body">
                {language === 'te'
                  ? 'మీ ఫోన్ నంబర్ నమోదు చేయండి, మా గ్రామీణ సేవా ప్రతినిధి 15 నిమిషాల్లో మీకు కాల్ చేస్తారు.'
                  : 'Submit your phone number, and our rural field coordinator will call you back within 15 minutes.'}
              </p>
            </div>
          </div>

          {/* Contact / Callback Form */}
          <div className="md:col-span-2">
            <Card className="border-stone-200 shadow-sm bg-white">
              <CardContent className="p-8">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-[#292524]">
                      {language === 'te' ? 'ధన్యవాదాలు! మీ విజ్ఞప్తి అందింది.' : 'Thank you! Request Received.'}
                    </h3>
                    <p className="text-sm text-stone-600 max-w-md mx-auto font-body">
                      {language === 'te'
                        ? 'మా సహాయ బృందం త్వరలోనే మీకు ఫోన్ చేసి మీ పెళ్లి ఏర్పాట్లకు అవసరమైన వెండర్లను కలపడంలో సహాయపడుతుంది.'
                        : 'Our local coordinator will call you shortly to assist with your wedding vendor requirements.'}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm"
                    >
                      {language === 'te' ? 'మరో సందేశం పంపండి' : 'Send Another Message'}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold font-heading text-[#292524]">
                        {language === 'te' ? 'సందేశం పంపండి' : 'Send us a Message'}
                      </h2>
                      <p className="text-xs text-stone-500 font-body mt-1">
                        {language === 'te'
                          ? 'మీరు ఏ గ్రామం నుండి సంప్రదిస్తున్నారో మరియు మీకు కావాల్సిన సేవల వివరాలు తెలపండి.'
                          : 'Tell us about your wedding location and the services you need.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-700">
                          {language === 'te' ? 'మీ పేరు' : 'Full Name'} *
                        </label>
                        <Input
                          required
                          placeholder={language === 'te' ? 'ఉదా: వెంకటేష్ గౌడ్' : 'e.g. Venkatesh Goud'}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-700">
                          {language === 'te' ? 'ఫోన్ నంబర్' : 'Phone Number'} *
                        </label>
                        <Input
                          required
                          type="tel"
                          placeholder="98765 XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-700">
                          {language === 'te' ? 'జిల్లా' : 'District'} *
                        </label>
                        <select
                          className="w-full h-10 px-3 text-sm rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]"
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        >
                          <option value="Narayanpet">Narayanpet (నారాయణపేట)</option>
                          <option value="Mahabubnagar">Mahabubnagar (మహబూబ్ నగర్)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-700">
                          {language === 'te' ? 'మండలం లేదా ఊరు' : 'Mandal / Village'} *
                        </label>
                        <Input
                          required
                          placeholder={language === 'te' ? 'ఉదా: మక్తల్ / దామరగిద్ద' : 'e.g. Makthal / Damaragidda'}
                          value={formData.mandal}
                          onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-700">
                        {language === 'te' ? 'మీకు కావాల్సిన సేవలు లేదా సందేహం' : 'Services Needed / Questions'} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full p-3 text-sm rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#762B46]"
                        placeholder={language === 'te' ? 'ఉదా: మే నెలలో పెళ్లి కోసం టెంట్ హౌస్, బాజా మేళం మరియు వంట బృందం కావాలి...' : 'Tell us your wedding date and services required...'}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full font-medium text-sm py-2.5">
                      {language === 'te' ? 'సందేశాన్ని పంపండి' : 'Submit Enquiry'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </div>
  );
}


