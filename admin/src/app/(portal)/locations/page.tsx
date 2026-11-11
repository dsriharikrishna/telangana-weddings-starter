'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminLocationsPage() {
  const { language } = useLanguage();

  const districts = [
    {
      nameEn: 'Narayanpet',
      nameTe: 'నారాయణపేట',
      slug: 'narayanpet',
      mandalsCount: 11,
      villagesCount: 284,
      vendorsCount: 92,
      mandals: ['Makthal', 'Narayanpet', 'Damaragidda', 'Utkoor', 'Marikal', 'Maganoor', 'Krishna', 'Dhanwada', 'Maddur', 'Koilkonda Border', 'Kosgi'],
    },
    {
      nameEn: 'Mahabubnagar',
      nameTe: 'మహబూబ్ నగర్',
      slug: 'mahabubnagar',
      mandalsCount: 16,
      villagesCount: 412,
      vendorsCount: 56,
      mandals: ['Mahabubnagar Urban', 'Mahabubnagar Rural', 'Jadcherla', 'Bhoothpur', 'Koilkonda', 'Devarkadra', 'Nawabpet', 'Balanagar', 'Midjil', 'Addakal'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'జిల్లాల & గ్రామాల నిర్వహణ' : 'Location Hierarchy (Districts, Mandals & Villages)'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            State → District → Mandal → Village mapping for rural-first wedding discovery.
          </p>
        </div>
        <Link href="/locations" target="_blank">
          <Button variant="outline" className="text-xs">
            <Eye className="w-3.5 h-3.5 mr-1" /> View Public Directory
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {districts.map((d) => (
          <Card key={d.slug} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-heading text-[#292524]">{d.nameEn}</h2>
                  <div className="text-xs text-[#762B46] font-medium font-body">{d.nameTe} జిల్లా</div>
                </div>
                <Badge className="bg-[#762B46] text-white text-xs">{d.vendorsCount} Vendors</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-2.5 bg-[#FAF7F2] rounded border">
                  <div className="font-bold text-sm text-[#292524]">{d.mandalsCount}</div>
                  <div className="text-stone-500">Mandals Covered</div>
                </div>
                <div className="p-2.5 bg-[#FAF7F2] rounded border">
                  <div className="font-bold text-sm text-[#292524]">{d.villagesCount}+</div>
                  <div className="text-stone-500">Mapped Villages</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-stone-700 mb-2">Key Mandals:</div>
                <div className="flex flex-wrap gap-1.5">
                  {d.mandals.map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-stone-100 rounded text-[11px] text-stone-600">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end">
                <Link href={`/locations/${d.slug}`}>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-[#762B46]">
                    Explore District Mandals →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
