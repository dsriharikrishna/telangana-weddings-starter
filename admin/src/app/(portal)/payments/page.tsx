'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { CheckCircle2 } from 'lucide-react';

export default function AdminPaymentsPage() {
  const { language } = useLanguage();

  const transactions = [
    { id: 'TXN-9021', date: 'Today, 10:15 AM', bookingRef: 'TW-BKG-9901', customer: 'Ramesh Reddy', vendor: 'Sri Raghavendra Melam', amount: '₹5,000', method: 'UPI (PhonePe)', status: 'Success' },
    { id: 'TXN-9020', date: 'Yesterday, 04:30 PM', bookingRef: 'TW-BKG-9902', customer: 'Venkataiah Goud', vendor: 'Tirumala Shamiana', amount: '₹10,000', method: 'Bank Transfer (NEFT)', status: 'Success' },
    { id: 'TXN-9019', date: '08 Nov 2026', bookingRef: 'TW-BKG-9889', customer: 'L. Chennappa', vendor: 'Muralidhar Studio', amount: '₹8,000', method: 'UPI (Google Pay)', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'చెల్లింపుల లావాదేవీలు' : 'Payment Gateway Transactions'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            Escrow deposits and verified customer advance transactions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-stone-200 bg-white">
          <CardContent className="p-5 text-center space-y-1">
            <div className="text-xs text-stone-500">Gross Advances Collected</div>
            <div className="text-2xl font-bold font-heading text-emerald-700">₹8,45,000</div>
          </CardContent>
        </Card>
        <Card className="border-stone-200 bg-white">
          <CardContent className="p-5 text-center space-y-1">
            <div className="text-xs text-stone-500">Successful Settlements</div>
            <div className="text-2xl font-bold font-heading text-[#762B46]">₹8,20,000</div>
          </CardContent>
        </Card>
        <Card className="border-stone-200 bg-white">
          <CardContent className="p-5 text-center space-y-1">
            <div className="text-xs text-stone-500">In Escrow Hold</div>
            <div className="text-2xl font-bold font-heading text-[#C5A46D]">₹25,000</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#FAF7F2] text-stone-600 font-semibold border-b">
              <tr>
                <th className="p-3.5">Txn ID</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Booking Ref</th>
                <th className="p-3.5">Customer & Vendor</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-stone-50">
                  <td className="p-3.5 font-mono font-medium text-stone-700">{t.id}</td>
                  <td className="p-3.5 text-stone-500">{t.date}</td>
                  <td className="p-3.5 font-mono text-[#762B46]">{t.bookingRef}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-[#292524]">{t.customer}</div>
                    <div className="text-[11px] text-stone-500">{t.vendor}</div>
                  </td>
                  <td className="p-3.5 text-stone-600">{t.method}</td>
                  <td className="p-3.5 font-bold text-stone-900">{t.amount}</td>
                  <td className="p-3.5 text-right">
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1 inline" /> {t.status}
                    </Badge>
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

