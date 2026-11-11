'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarCheck, MapPin, CheckCircle2, Eye, Phone } from 'lucide-react';

export default function AdminBookingsPage() {
  const { language } = useLanguage();

  const bookings = [
    {
      id: 'TW-BKG-9901',
      customer: 'Ramesh Reddy',
      vendor: 'Sri Raghavendra Band & Sannai Melam',
      service: 'Band Melam & Sannai Combo',
      date: '18 May 2026',
      location: 'Maganoor Village, Makthal',
      amount: '₹30,000',
      advancePaid: '₹5,000',
      status: 'Confirmed & Advance Paid',
    },
    {
      id: 'TW-BKG-9902',
      customer: 'Venkataiah Goud',
      vendor: 'Tirumala Shamiana & Tent House',
      service: 'Tent House & Utensils',
      date: '02 Jun 2026',
      location: 'Kyathanpally, Damaragidda',
      amount: '₹45,000',
      advancePaid: '₹10,000',
      status: 'Confirmed & Advance Paid',
    },
    {
      id: 'TW-BKG-9903',
      customer: 'Suresh Kurva',
      vendor: 'Gayatri Traditional Sannai Brundam',
      service: 'Sannai Melam Traditional',
      date: '15 Jul 2026',
      location: 'Badepally, Jadcherla',
      amount: '₹14,000',
      advancePaid: '₹3,000',
      status: 'Booking Completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'వివాహ బుకింగ్‌ల నిర్వహణ' : 'Wedding Bookings & Event Ledger'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            Master list of verified wedding contracts across Narayanpet & Mahabubnagar.
          </p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
          312 Total Weddings Coordinated
        </Badge>
      </div>

      <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#FAF7F2] text-stone-600 font-semibold border-b">
              <tr>
                <th className="p-3.5">Booking Ref</th>
                <th className="p-3.5">Customer & Village</th>
                <th className="p-3.5">Service Provider</th>
                <th className="p-3.5">Event Date</th>
                <th className="p-3.5">Total & Advance</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-stone-50">
                  <td className="p-3.5 font-mono font-bold text-[#762B46]">{b.id}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-[#292524]">{b.customer}</div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#762B46]" />
                      {b.location}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-stone-800">{b.vendor}</div>
                    <div className="text-[11px] text-stone-500">{b.service}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-[#762B46]">
                    {b.date}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-stone-900">{b.amount}</div>
                    <div className="text-[10px] text-emerald-700">Adv: {b.advancePaid}</div>
                  </td>
                  <td className="p-3.5">
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1 inline" /> {b.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-[#762B46]">
                      <Eye className="w-3.5 h-3.5 mr-1" /> View Contract
                    </Button>
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

