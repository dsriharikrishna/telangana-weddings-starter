'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';

export default function AdminReportsPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === 'te' ? 'నివేదికలు & విశ్లేషణ' : 'District Wedding Reports & Export'}
        description="Download wedding season metrics, vendor density, and assisted enquiry audit trails."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardContent className="p-5 space-y-3">
            <FileText className="w-6 h-6 text-[#762B46]" />
            <h3 className="font-bold text-sm text-[#292524] font-heading">
              Narayanpet Vendor Registry (CSV)
            </h3>
            <p className="text-xs text-stone-500 font-body">
              Complete list of 92 verified service providers, mandals, and verified phone contacts.
            </p>
            <Button variant="outline" size="sm" className="w-full text-xs">
              <Download className="w-3.5 h-3.5 mr-1" /> Download CSV
            </Button>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white shadow-sm">
          <CardContent className="p-5 space-y-3">
            <FileText className="w-6 h-6 text-emerald-700" />
            <h3 className="font-bold text-sm text-[#292524] font-heading">
              Mahabubnagar Vendor Registry (CSV)
            </h3>
            <p className="text-xs text-stone-500 font-body">
              56 verified wedding service providers across 16 mandals with travel policies.
            </p>
            <Button variant="outline" size="sm" className="w-full text-xs">
              <Download className="w-3.5 h-3.5 mr-1" /> Download CSV
            </Button>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white shadow-sm">
          <CardContent className="p-5 space-y-3">
            <FileText className="w-6 h-6 text-[#C5A46D]" />
            <h3 className="font-bold text-sm text-[#292524] font-heading">
              Assisted Booking Phone Log
            </h3>
            <p className="text-xs text-stone-500 font-body">
              Full audit log of telephone callbacks, lead conversions, and family feedback.
            </p>
            <Button variant="outline" size="sm" className="w-full text-xs">
              <Download className="w-3.5 h-3.5 mr-1" /> Download CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

