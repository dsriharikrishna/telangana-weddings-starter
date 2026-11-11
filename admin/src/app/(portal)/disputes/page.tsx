'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldAlert, CheckCircle2, PhoneCall, RefreshCcw } from 'lucide-react';

export default function AdminDisputesPage() {
  const { language } = useLanguage();

  const disputes = [
    {
      id: 'DISP-101',
      bookingRef: 'TW-BKG-9840',
      customer: 'K. Balakrishna',
      vendor: 'Sri Sai Caterers',
      issue: 'Customer requested date change due to Muhurtham timing modification; vendor unavailable on newly requested date.',
      status: 'In Mediation',
      filedDate: '07 Nov 2026',
      assignedCoordinator: 'Field Coordinator Raju',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'వివాదాలు & రీఫండ్‌లు' : 'Mediation Desk & Dispute Resolution'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            Fair mediation between rural families and wedding service providers.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {disputes.map((d) => (
          <Card key={d.id} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#762B46]">{d.id}</span>
                  <span className="text-xs text-stone-400">• Ref: {d.bookingRef}</span>
                  <Badge variant="outline" className="text-amber-700 border-amber-300 text-[10px]">
                    {d.status}
                  </Badge>
                </div>
                <div className="text-xs font-semibold text-[#292524]">
                  {d.customer} vs {d.vendor}
                </div>
                <p className="text-xs text-stone-600 font-body bg-[#FAF7F2] p-2.5 rounded">
                  {d.issue}
                </p>
                <div className="text-[11px] text-stone-400">
                  Assigned Officer: {d.assignedCoordinator} • Filed {d.filedDate}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="text-xs">
                  <PhoneCall className="w-3.5 h-3.5 mr-1 text-[#762B46]" /> Call Parties
                </Button>
                <Button variant="primary" size="sm" className="text-xs">
                  Issue Mutual Refund
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

