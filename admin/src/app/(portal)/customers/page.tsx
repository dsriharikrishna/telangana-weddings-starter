'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Calendar, UserCheck } from 'lucide-react';

export default function AdminCustomersPage() {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');

  const customers = [
    {
      id: 'CUST-1001',
      name: 'Ramesh Reddy',
      phone: '98480 99112',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Maganoor Village',
      weddingDate: '18 May 2026',
      enquiriesCount: 4,
      bookingsCount: 2,
      joined: '12 Feb 2026',
    },
    {
      id: 'CUST-1002',
      name: 'Venkataiah Goud',
      phone: '94401 88334',
      district: 'Narayanpet',
      mandal: 'Damaragidda',
      village: 'Kyathanpally',
      weddingDate: '02 Jun 2026',
      enquiriesCount: 6,
      bookingsCount: 3,
      joined: '20 Mar 2026',
    },
    {
      id: 'CUST-1003',
      name: 'Suresh Kurva',
      phone: '99890 77221',
      district: 'Mahabubnagar',
      mandal: 'Jadcherla',
      village: 'Badepally',
      weddingDate: '15 Jul 2026',
      enquiriesCount: 3,
      bookingsCount: 1,
      joined: '05 Apr 2026',
    },
    {
      id: 'CUST-1004',
      name: 'Anjamma Mudhiraj',
      phone: '98492 66110',
      district: 'Mahabubnagar',
      mandal: 'Koilkonda',
      village: 'Koilkonda Town',
      weddingDate: '24 May 2026',
      enquiriesCount: 5,
      bookingsCount: 2,
      joined: '18 Apr 2026',
    },
  ];

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.village.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'కస్టమర్ల నిర్వహణ' : 'Customer Registry'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            Families planning rural weddings in Narayanpet & Mahabubnagar.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-semibold">
          {customers.length} Registered Accounts
        </Badge>
      </div>

      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <Input
              placeholder="Search by customer name, phone, village..."
              className="pl-9 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#FAF7F2] text-stone-600 font-semibold border-b">
              <tr>
                <th className="p-3.5">Customer Name & ID</th>
                <th className="p-3.5">Phone Contact</th>
                <th className="p-3.5">Wedding Village / Location</th>
                <th className="p-3.5">Upcoming Wedding Date</th>
                <th className="p-3.5">Enquiries</th>
                <th className="p-3.5">Bookings</th>
                <th className="p-3.5 text-right">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50">
                  <td className="p-3.5 font-bold text-[#292524]">
                    <div>{c.name}</div>
                    <div className="text-[10px] text-stone-400 font-mono">{c.id}</div>
                  </td>
                  <td className="p-3.5 font-mono text-stone-600">
                    +91 {c.phone}
                  </td>
                  <td className="p-3.5 text-stone-600">
                    <div className="flex items-center gap-1 font-medium text-stone-800">
                      <MapPin className="w-3 h-3 text-[#762B46]" />
                      {c.village}
                    </div>
                    <div className="text-[11px] text-stone-400">{c.mandal}, {c.district}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-[#762B46]">{c.weddingDate}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-stone-700">
                    {c.enquiriesCount}
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-700">
                    {c.bookingsCount}
                  </td>
                  <td className="p-3.5 text-stone-400 text-right">
                    {c.joined}
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

