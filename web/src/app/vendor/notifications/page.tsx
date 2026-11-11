'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, PhoneCall, CheckCircle2, MessageSquare } from 'lucide-react';
import { VendorPageHeader } from '@/components/ui/vendor-page-header';

export default function VendorNotificationsPage() {
  const { language } = useLanguage();

  const notifications = [
    {
      id: 1,
      titleTe: 'కొత్త బుకింగ్ విచారణ అందింది',
      titleEn: 'New Booking Enquiry Received',
      descTe: 'నారాయణపేట జిల్లా మద్దూరు గ్రామం నుండి మే 14 తేదీకి బాజా మేళం కోసం విచారణ వచ్చింది.',
      descEn: 'Family from Maddur village, Narayanpet requested quote for Band Melam on 14 May 2026.',
      time: '10 mins ago',
      unread: true,
      icon: MessageSquare,
      color: 'bg-[#762B46]',
    },
    {
      id: 2,
      titleTe: 'అసిస్టెడ్ బుకింగ్ కాల్‌బ్యాక్ రిక్వెస్ట్',
      titleEn: 'Assisted Callback Assigned',
      descTe: 'మా కస్టమర్ కేర్ బృందం దామరగిద్ద గ్రామం నుండి రఘురామ్ అనే కస్టమర్‌ను మీకు అనుసంధానించింది.',
      descEn: 'Support desk linked customer Raghuram from Damaragidda to your Sannai Melam package.',
      time: '2 hours ago',
      unread: true,
      icon: PhoneCall,
      color: 'bg-emerald-600',
    },
    {
      id: 3,
      titleTe: 'అడ్వాన్స్ పేమెంట్ ధృవీకరించబడింది',
      titleEn: 'Advance Payment Confirmed',
      descTe: 'రూ. 5,000 అడ్వాన్స్ మొత్తం మీ బ్యాంక్ ఖాతాకు సెటిల్మెంట్ చేయబడింది (Ref: SET-8821).',
      descEn: 'Advance payment of ₹5,000 deposited to your linked bank account for booking #TW-NPT-2026.',
      time: '1 day ago',
      unread: false,
      icon: CheckCircle2,
      color: 'bg-[#C5A46D]',
    },
  ];

  return (
    <div className="space-y-6">
      <VendorPageHeader
        title={language === 'te' ? 'నోటిఫికేషన్లు' : 'Notifications & Alerts'}
        subtitle={language === 'te' ? 'ఆర్డర్లు, పేమెంట్లు మరియు విచారణలకు సంబంధించిన హెచ్చరికలు.' : 'Real-time updates regarding customer inquiries, bookings, and payments.'}
      >
        <Badge className="bg-[#762B46] text-white">2 New</Badge>
      </VendorPageHeader>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <Card key={n.id} className={`border-stone-200 bg-white shadow-sm ${n.unread ? 'border-l-4 border-l-[#762B46]' : ''}`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`w-9 h-9 rounded-full ${n.color} text-white flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#292524] font-heading">
                      {language === 'te' ? n.titleTe : n.titleEn}
                    </h4>
                    <span className="text-[11px] text-stone-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-stone-600 font-body">
                    {language === 'te' ? n.descTe : n.descEn}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

