'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full"> <Header />    <main className="flex-1">
      <section className="bg-[#762B46] text-white py-14 px-4 sm:px-6 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">Terms of Service</Badge>
          <h1 className="text-3xl font-bold font-heading">
            {language === 'te' ? 'నిబంధనలు & షరతులు' : 'Terms & Conditions'}
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
                1. Platform Role
              </h2>
              <p>
                TelanganaWeddings operates as a discovery and assisted coordination platform connecting rural wedding clients with independent service providers in Narayanpet and Mahabubnagar districts.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                2. Vendor Obligations
              </h2>
              <p>
                Registered vendors agree to maintain accurate pricing, legitimate service areas, authentic portfolio photographs, and prompt responsiveness to rural inquiries and assisted bookings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                3. Customer Engagements
              </h2>
              <p>
                Customers are advised to review vendor quotes, verify service dates, and agree upon advance deposits in writing or recorded WhatsApp messages before finalizing ceremonies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                4. Jurisdiction
              </h2>
              <p>
                These terms are governed by the laws of Telangana, India. Disputes arising shall be subject to the exclusive jurisdiction of the competent courts in Narayanpet and Mahabubnagar.
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



