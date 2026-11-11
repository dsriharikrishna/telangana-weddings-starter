'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState('All');

  const enquiries = [
    {
      id: 'TW-ENQ-801',
      customer: 'K. Somanna',
      phone: '98480 11223',
      village: 'Maganoor Village',
      mandal: 'Makthal',
      district: 'Narayanpet',
      category: 'Band Melam & Sannai',
      subCategory: 'Sannai Melam',
      weddingDate: '18 May 2026',
      source: 'Assisted Callback',
      status: 'Coordinator Assigned',
      assignedTo: 'Field Agent Raju S.',
    },
    {
      id: 'TW-ENQ-802',
      customer: 'Venkat Reddy',
      phone: '94401 55667',
      village: 'Damaragidda Village',
      mandal: 'Damaragidda',
      district: 'Narayanpet',
      category: 'Catering & Cooking',
      subCategory: 'Traditional Wedding Meals',
      weddingDate: '04 Jun 2026',
      source: 'Direct WhatsApp',
      status: 'Quote Sent',
      assignedTo: 'Direct Vendor',
    },
    {
      id: 'TW-ENQ-803',
      customer: 'Ramu Kurva',
      phone: '98855 33441',
      village: 'Badepally',
      mandal: 'Jadcherla',
      district: 'Mahabubnagar',
      category: 'Chairs & Tent House',
      subCategory: 'Shamiana Setup',
      weddingDate: '22 May 2026',
      source: 'Web Form',
      status: 'Completed / Booked',
      assignedTo: 'Self-Serve',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'విచారణల నిర్వహణ' : 'Rural Enquiries & Lead Desk'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            Tracking inbound assisted phone requests, WhatsApp enquiries, and online form submissions.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-amber-100 text-amber-800 border-amber-300">
            {enquiries.length} Active Inquiries
          </Badge>
        </div>
      </div>

      <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#FAF7F2] text-stone-600 font-semibold border-b">
              <tr>
                <th className="p-3.5">Ref ID & Customer</th>
                <th className="p-3.5">Village Location</th>
                <th className="p-3.5">Service Requested</th>
                <th className="p-3.5">Wedding Date</th>
                <th className="p-3.5">Channel / Source</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {enquiries.map((e) => (
                <tr key={e.id} className="hover:bg-stone-50">
                  <td className="p-3.5">
                    <div className="font-bold text-[#292524]">{e.customer}</div>
                    <div className="text-[11px] font-mono text-[#762B46]">{e.id} • +91 {e.phone}</div>
                  </td>
                  <td className="p-3.5 text-stone-600">
                    <div className="flex items-center gap-1 font-medium text-stone-800">
                      <MapPin className="w-3 h-3 text-[#762B46]" />
                      {e.village}
                    </div>
                    <div className="text-[11px] text-stone-400">{e.mandal}, {e.district}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-stone-800">{e.category}</div>
                    <div className="text-[11px] text-stone-500">{e.subCategory}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-[#762B46]">
                    {e.weddingDate}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      e.source === 'Assisted Callback' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {e.source}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Badge variant="outline" className="text-[10px]">
                      {e.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <a href={`tel:+91${e.phone}`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Phone className="w-3.5 h-3.5 mr-1 text-[#762B46]" /> Call Family
                      </Button>
                    </a>
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

