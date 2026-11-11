'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Layers, ArrowRight, Eye } from 'lucide-react';

export default function AdminSubcategoriesPage() {
  const { language } = useLanguage();

  const specialSubcategories = [
    {
      code: '18.1',
      nameEn: 'Band Melam',
      nameTe: 'బాజా మేళం (బ్రాస్ బ్యాండ్)',
      parentCategory: 'Band Melam & Sannai Melam',
      slug: 'band-melam',
      descriptionEn: 'High-energy brass band with trumpets, clarinets, snare drums, tasha, and battery trolley lights for baraat and village processions.',
      descriptionTe: 'బరాత్ మరియు ఊరేగింపుల కోసం బ్రాస్ వాయిద్యాలు, బాజా బజంత్రీలు మరియు లైటింగ్ ట్రాలీ బృందం.',
      activeVendors: 24,
    },
    {
      code: '18.2',
      nameEn: 'Sannai Melam',
      nameTe: 'సన్నాయి మేళం (మంగళ వాయిద్యం)',
      parentCategory: 'Band Melam & Sannai Melam',
      slug: 'sannai-melam',
      descriptionEn: 'Sacred classical Nadaswaram, Tavil and Shruti artistes for auspicious Lagna Muhurtham, Talambralu, and Vedic rituals.',
      descriptionTe: 'శుభ ముహూర్తం, మంగళస్నానాలు మరియు తలంబ్రాల కోసం సాంప్రదాయ నాదస్వరం, తావిల్ మరియు శ్రుతి కళాకారులు.',
      activeVendors: 15,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-[#292524]">
          {language === 'te' ? 'ఉపవర్గాల నిర్వహణ (Subcategories)' : 'Subcategory Configuration'}
        </h1>
        <p className="text-xs text-stone-500 font-body">
          Special category 18 contains two strictly separated cultural subcategories: Band Melam and Sannai Melam.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specialSubcategories.map((sub) => (
          <Card key={sub.code} className="border-[#C5A46D]/40 bg-white shadow-sm overflow-hidden">
            <div className="bg-[#762B46] text-white px-5 py-3 flex items-center justify-between">
              <span className="font-mono text-xs font-bold bg-[#C5A46D] px-2 py-0.5 rounded text-white">
                Subcategory {sub.code}
              </span>
              <span className="text-xs text-[#FAF7F2]/80">{sub.parentCategory}</span>
            </div>

            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-lg font-bold font-heading text-[#292524]">{sub.nameEn}</h2>
                <div className="text-xs text-[#762B46] font-medium font-body mt-0.5">{sub.nameTe}</div>
              </div>

              <p className="text-xs text-stone-600 font-body leading-relaxed bg-[#FAF7F2] p-3 rounded-lg border border-stone-100">
                {sub.descriptionEn}
              </p>

              <div className="flex items-center justify-between pt-2 border-t text-xs text-stone-600">
                <span className="font-semibold text-emerald-700">{sub.activeVendors} Registered Teams</span>
                <Link href={`/services/band-melam-sannai/${sub.slug}`} target="_blank">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#762B46]">
                    <Eye className="w-3.5 h-3.5 mr-1" /> View Public Page
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

