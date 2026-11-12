'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, ArrowLeft, Ban } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

interface VendorDetailViewProps {
  vendorId: string;
}

export function VendorDetailView({ vendorId }: VendorDetailViewProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/vendors">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-stone-600">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Vendors
          </Button>
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-xs font-mono text-stone-500">{vendorId}</span>
      </div>

      {/* Vendor Header Card */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-heading text-[#292524]">
                  Sri Raghavendra Band & Sannai Melam
                </h1>
                <StatusBadge status="verified" label="Physically Verified" />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 font-body">
                <span>Prop: <strong>K. Venkatesham</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#762B46]" /> Makthal Town, Narayanpet</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#762B46]" /> +91 98480 12345</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-xs text-rose-700 border-rose-300 hover:bg-rose-50">
                <Ban className="w-3.5 h-3.5 mr-1" /> Suspend
              </Button>
              <Button variant="primary" className="text-xs">
                Edit Vendor Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-stone-200 bg-white md:col-span-2">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold font-heading text-[#292524] mb-3">
                Service Capabilities & Packages
              </h2>
              <div className="space-y-2 text-xs text-stone-700">
                <div className="p-3 bg-[#FAF7F2] rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#762B46]">18.1 Band Melam (Processional Brass)</div>
                    <div className="text-stone-500">12-member brass group with uniform & battery sound unit</div>
                  </div>
                  <span className="font-bold text-stone-800">From ₹18,000</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#762B46]">18.2 Sannai Melam (Traditional Muhurtham)</div>
                    <div className="text-stone-500">Traditional Nadaswaram, Tavil and Shruti for ritual ceremonies</div>
                  </div>
                  <span className="font-bold text-stone-800">From ₹12,000</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-base font-bold font-heading text-[#292524] mb-3">
                Rural Service Coverage
              </h2>
              <p className="text-xs text-stone-600 mb-2">
                Base location: <strong>Makthal Mandal Headquarters</strong>. Covers all hamlets within 35 km radius:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Makthal', 'Maganoor', 'Krishna', 'Narayanpet', 'Damaragidda', 'Utkoor', 'Marikal'].map((m) => (
                  <span key={m} className="px-2 py-1 bg-stone-100 rounded text-[11px] text-stone-700 font-medium">
                    {m} Mandal
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification & KYC Details */}
        <Card className="border-stone-200 bg-white">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-base font-bold font-heading text-[#292524]">
              KYC & Verification Audit
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-stone-500">Verification ID:</span>
                <span className="font-mono font-bold text-stone-800">KYC-2026-088</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-stone-500">Auditor:</span>
                <span className="font-semibold text-stone-800">Raju S. (Field Coordinator)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-stone-500">Physical Visit Date:</span>
                <span className="text-stone-800">02 May 2026</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-stone-500">Identity Document:</span>
                <span className="font-medium text-emerald-700">Aadhaar Verified</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-stone-500">Lead Wallet Balance:</span>
                <span className="font-bold text-[#762B46]">12 Credits</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
