'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Grid, Layers, Edit, Eye } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { language } = useLanguage();

  const categories = [
    { id: 1, nameEn: 'Function Halls & Mandapams', nameTe: 'ఫంక్షన్ హాళ్ళు & కల్యాణ మండపాలు', slug: 'function-halls', vendorsCount: 32 },
    { id: 2, nameEn: 'Catering & Cooking Teams', nameTe: 'క్యాటరింగ్ & వంట బృందాలు', slug: 'catering', vendorsCount: 45 },
    { id: 3, nameEn: 'Photography & Pre-Wedding Shoots', nameTe: 'ఫోటోగ్రఫీ & ప్రీ-వెడ్డింగ్ షూట్స్', slug: 'photography', vendorsCount: 28 },
    { id: 4, nameEn: 'Videography & Drone Coverage', nameTe: 'వీడియో గ్రఫీ & డ్రోన్ కవరేజ్', slug: 'videography', vendorsCount: 22 },
    { id: 5, nameEn: 'Stage Decoration & Mandap Setups', nameTe: 'స్టేజ్ డెకరేషన్ & మండపం సెటప్స్', slug: 'stage-decoration', vendorsCount: 36 },
    { id: 6, nameEn: 'Lighting & Serial Bulbs', nameTe: 'లైటింగ్ & సీరియల్ సెట్స్', slug: 'lighting', vendorsCount: 19 },
    { id: 7, nameEn: 'DJ & Sound Systems', nameTe: 'DJ & సౌండ్ సిస్టమ్స్', slug: 'dj-sound', vendorsCount: 24 },
    { id: 8, nameEn: 'Bridal Makeup & Mehendi', nameTe: 'బ్రైడల్ మేకప్ & మెహందీ', slug: 'bridal-makeup', vendorsCount: 18 },
    { id: 9, nameEn: 'Wedding Priests & Purohits', nameTe: 'పురోహితులు & బ్రాహ్మణులు', slug: 'wedding-priests', vendorsCount: 15 },
    { id: 10, nameEn: 'Wedding Clothes & Pattu Sarees', nameTe: 'పెళ్లి బట్టలు & పట్టు చీరలు', slug: 'wedding-clothes', vendorsCount: 14 },
    { id: 11, nameEn: 'Jewellery & Gold Ornaments', nameTe: 'బంగారు ఆభరణాలు & జ్యువెలరీ', slug: 'jewellery', vendorsCount: 11 },
    { id: 12, nameEn: 'Flowers, Garlands & Poola Jada', nameTe: 'పూలు, దండలు & పూలజడ', slug: 'flowers-garlands', vendorsCount: 26 },
    { id: 13, nameEn: 'Chairs, Tables, Utensils & Shamiana', nameTe: 'కుర్చీలు, బల్లలు, పాత్రలు & షామియానా', slug: 'chairs-tables-utensils', vendorsCount: 38 },
    { id: 14, nameEn: 'Drinking Water & Ice Supply', nameTe: 'త్రాగునీరు & ఐస్ సప్లై', slug: 'drinking-water', vendorsCount: 17 },
    { id: 15, nameEn: 'Transportation, Buses & Bridal Cars', nameTe: 'రవాణా, బస్సులు & పెళ్లి కార్లు', slug: 'transportation', vendorsCount: 21 },
    { id: 16, nameEn: 'Wedding Invitation Printing', nameTe: 'పెళ్లి పత్రికల ప్రింటింగ్', slug: 'invitation-printing', vendorsCount: 13 },
    { id: 17, nameEn: 'Cleaning & Hall Maintenance', nameTe: 'క్లీనింగ్ & నిర్వహణ సేవలు', slug: 'cleaning-maintenance', vendorsCount: 16 },
    { id: 18, nameEn: 'Band Melam & Sannai Melam', nameTe: 'బాజా మేళం & సన్నాయి మేళం', slug: 'band-melam-sannai', vendorsCount: 39, isSpecial: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? '18 వివాహ వర్గాల నిర్వహణ' : 'Wedding Service Categories (All 18)'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            Configured wedding categories and vendor distribution for Narayanpet & Mahabubnagar.
          </p>
        </div>
        <Link href="/subcategories">
          <Button variant="outline" className="text-xs">
            <Layers className="w-4 h-4 mr-1 text-[#762B46]" />
            Manage Subcategories
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id} className={`border-stone-200 bg-white shadow-sm ${cat.isSpecial ? 'ring-2 ring-[#762B46]' : ''}`}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-mono font-bold text-[#762B46] bg-[#762B46]/10 px-2 py-0.5 rounded">
                  Category #{cat.id}
                </span>
                {cat.isSpecial && (
                  <Badge className="bg-[#762B46] text-white text-[10px]">
                    Rural Spotlight
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#292524] font-heading">{cat.nameEn}</h3>
                <div className="text-xs text-stone-500 font-body mt-0.5">{cat.nameTe}</div>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs text-stone-600">
                <span>{cat.vendorsCount} Verified Vendors</span>
                <Link href={`/services/${cat.slug}`} target="_blank" className="text-[#762B46] hover:underline flex items-center gap-1 font-medium">
                  <Eye className="w-3.5 h-3.5" /> View Public
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

