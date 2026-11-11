'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { VendorPageHeader } from '@/components/ui/vendor-page-header';

export default function VendorReviewsPage() {
  const { language } = useLanguage();

  const reviews = [
    {
      id: 1,
      customerName: 'Anji Reddy',
      village: 'Maganoor Village, Makthal',
      rating: 5,
      date: '12 Oct 2026',
      service: 'Band Melam & Sannai Combo',
      comment: 'Excellent traditional sannai performance during Muhurtham. Very punctual arrival at our village wedding hall. Highly recommended!',
    },
    {
      id: 2,
      customerName: 'Ramulu Kurva',
      village: 'Damaragidda Village',
      rating: 5,
      date: '28 Sep 2026',
      service: 'Brass Band Melam',
      comment: 'The baraat procession had tremendous energy. Full 12-member team arrived in uniform on time. Very reasonable travel charges.',
    },
    {
      id: 3,
      customerName: 'Srinivas Goud',
      village: 'Narayanpet Town',
      rating: 4.8,
      date: '15 Aug 2026',
      service: 'Sannai Melam Traditional',
      comment: 'Very polite musicians who played pure classical notes for the wedding rituals. Thank you team.',
    },
  ];

  return (
    <div className="space-y-6">
      <VendorPageHeader
        title={language === 'te' ? 'కస్టమర్ సమీక్షలు (Reviews)' : 'Customer Reviews & Feedback'}
        subtitle={language === 'te' ? 'మీ పెళ్లి సేవలను ఉపయోగించిన కస్టమర్ల సమీక్షలు మరియు రేటింగ్‌లు.' : 'Verified feedback from rural families who booked your services.'}
      />

      {/* Aggregate Score Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-stone-200 bg-white">
          <CardContent className="p-6 text-center space-y-2">
            <div className="text-3xl font-bold font-heading text-[#762B46]">4.9 / 5.0</div>
            <div className="flex justify-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs text-stone-500">{language === 'te' ? 'మొత్తం 38 సమీక్షలు' : 'Based on 38 verified bookings'}</div>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white">
          <CardContent className="p-6 text-center space-y-2">
            <div className="text-3xl font-bold font-heading text-emerald-700">100%</div>
            <div className="text-xs font-semibold text-stone-700">{language === 'te' ? 'సమయానికి హాజరు' : 'Punctual Arrival'}</div>
            <div className="text-xs text-stone-500">{language === 'te' ? 'గ్రామాలకు నిర్దేశిత సమయానికి చేరారు' : 'Arrived before Muhurtham time'}</div>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white">
          <CardContent className="p-6 text-center space-y-2">
            <div className="text-3xl font-bold font-heading text-[#C5A46D]">98%</div>
            <div className="text-xs font-semibold text-stone-700">{language === 'te' ? 'సిఫార్సు రేటు' : 'Recommendation Rate'}</div>
            <div className="text-xs text-stone-500">{language === 'te' ? 'ఇతరులకు సిఫార్సు చేస్తామని తెలిపారు' : 'Would recommend to relatives'}</div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <Card key={r.id} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-5 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#292524]">{r.customerName}</span>
                  <Badge variant="outline" className="text-[10px] text-emerald-700 border-emerald-300">
                    <CheckCircle className="w-3 h-3 mr-1 inline" /> Verified Booking
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>{r.date}</span>
                </div>
              </div>

              <div className="text-xs text-stone-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#762B46]" />
                <span>{r.village}</span>
                <span className="mx-1">•</span>
                <span className="font-medium text-[#762B46]">{r.service}</span>
              </div>

              <p className="text-xs text-stone-700 font-body leading-relaxed bg-[#FAF7F2] p-3 rounded-md">
                &ldquo;{r.comment}&rdquo;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

