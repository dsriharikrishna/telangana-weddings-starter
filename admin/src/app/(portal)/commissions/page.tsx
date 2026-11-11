'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

export default function AdminCommissionsPage() {
  const { language } = useLanguage();

  const settlements = [
    { id: 'SET-501', vendor: 'Sri Raghavendra Band & Sannai', bankAccount: 'SBI Makthal (...8841)', grossBooking: '₹30,000', platformFee: '₹1,500 (5%)', payoutAmount: '₹28,500', status: 'Settled to Bank', date: '09 Nov 2026' },
    { id: 'SET-502', vendor: 'Gayatri Traditional Sannai', bankAccount: 'Andhra Bank Narayanpet (...1204)', grossBooking: '₹14,000', platformFee: '₹700 (5%)', payoutAmount: '₹13,300', status: 'Settled to Bank', date: '08 Nov 2026' },
    { id: 'SET-503', vendor: 'Tirumala Shamiana & Tent', bankAccount: 'Canara Bank Jadcherla (...9902)', grossBooking: '₹45,000', platformFee: '₹2,250 (5%)', payoutAmount: '₹42,750', status: 'Pending Payout Batch', date: 'Today' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'కమిషన్లు & సెటిల్మెంట్లు' : 'Vendor Settlements & Commission'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            Transparent low platform fees (5%) supporting rural vendor livelihoods.
          </p>
        </div>
        <Button variant="primary" size="sm" className="text-xs">
          Process Weekly Payout Batch
        </Button>
      </div>

      <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#FAF7F2] text-stone-600 font-semibold border-b">
              <tr>
                <th className="p-3.5">Batch Ref</th>
                <th className="p-3.5">Vendor Name</th>
                <th className="p-3.5">Bank Details</th>
                <th className="p-3.5">Gross Event</th>
                <th className="p-3.5">Platform Fee</th>
                <th className="p-3.5">Net Payout</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50">
                  <td className="p-3.5 font-mono text-[#762B46] font-medium">{s.id}</td>
                  <td className="p-3.5 font-bold text-[#292524]">{s.vendor}</td>
                  <td className="p-3.5 text-stone-600 font-mono text-[11px]">{s.bankAccount}</td>
                  <td className="p-3.5 text-stone-700">{s.grossBooking}</td>
                  <td className="p-3.5 text-[#762B46] font-semibold">{s.platformFee}</td>
                  <td className="p-3.5 font-bold text-emerald-700 text-sm">{s.payoutAmount}</td>
                  <td className="p-3.5 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      s.status.includes('Settled') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

