'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CancellationPolicyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">     <Header />    <main className="flex-1">
      <section className="bg-[#762B46] text-white py-14 px-4 sm:px-6 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">Cancellation & Refunds</Badge>
          <h1 className="text-3xl font-bold font-heading">
            {language === 'te' ? 'రద్దు & వాపసు విధానం' : 'Cancellation & Refund Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-body">
            {language === 'te' ? 'చివరి నవీకరణ: నవంబర్ 2026' : 'Last updated: November 2026'}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-14 max-w-4xl mx-auto space-y-6">
        <Card className="border-stone-200 bg-white shadow-sm">
          <CardContent className="p-8 space-y-6 text-sm text-stone-700 font-body leading-relaxed">
            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                1. Standard Cancellation Timeline
              </h2>
              <p>
                Weddings require advance scheduling of labor, raw materials, and date reservations. Cancellation terms are defined individually by each service provider in their quotation terms:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-stone-600">
                <li><strong>More than 30 days before event:</strong> Standard 80% refund of advance deposit, less non-refundable date-hold charges.</li>
                <li><strong>15 - 30 days before event:</strong> 50% refund of advance deposit.</li>
                <li><strong>Under 15 days before event:</strong> Advance deposits are typically non-refundable due to blocked dates and raw material procurements.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                2. Vendor Cancellation / Emergency No-Show
              </h2>
              <p>
                In the rare event that a verified vendor cannot fulfill an event due to an unavoidable emergency, the vendor is obligated to provide an equivalent replacement provider or issue a 100% immediate refund of all advances collected.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                3. Mediation Support
              </h2>
              <p>
                Our rural customer support team will assist in mediating disputes between families and service providers to reach a fair resolution. Contact us at <span className="font-semibold text-[#762B46]">+91 98765 43210</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
      <Footer />
    </div>
  );
}



