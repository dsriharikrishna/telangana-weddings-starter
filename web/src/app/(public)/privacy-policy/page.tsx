'use client';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full"> <Header />    <main className="flex-1">
      <section className="bg-[#762B46] text-white py-14 px-4 sm:px-6 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <Badge className="bg-[#C5A46D] text-white font-medium px-3 py-1">Privacy Policy</Badge>
          <h1 className="text-3xl font-bold font-heading">
            {language === 'te' ? 'గోప్యతా విధానం' : 'Privacy Policy'}
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
                1. Information We Collect
              </h2>
              <p>
                We collect information provided directly by users and wedding service providers during registration and enquiry submission. This includes names, phone numbers, district, mandal, village location details, and wedding dates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                2. How We Use Your Information
              </h2>
              <p>
                Your phone number and location details are strictly used to connect you with verified local wedding service providers and facilitate callback assistance. We do not sell or trade your personal data to third-party telemarketers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                3. Vendor Verification Data
              </h2>
              <p>
                Vendor Aadhaar cards, business registrations, or trade licenses submitted for verification purposes are stored securely and reviewed exclusively by authorized platform compliance officers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-[#292524] mb-2">
                4. Contact Us
              </h2>
              <p>
                For privacy inquiries or data removal requests, email us at <span className="font-semibold text-[#762B46]">privacy@telanganaweddings.com</span>.
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


