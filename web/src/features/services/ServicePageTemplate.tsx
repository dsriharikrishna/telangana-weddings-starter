"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Search,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { WEDDING_CATEGORIES, SAMPLE_VENDORS } from "@/data";
import { VendorCard } from "@/features/vendors";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Header } from "@/components/layout/Header";
import { Footer } from '@/components/layout/Footer';
import { AssistedBookingModal } from "@/features/booking";

interface PageProps {
  categorySlug: string;
  titleEn: string;
  titleTe: string;
}

export function generateServicePageComponent({ categorySlug, titleEn, titleTe }: PageProps) {
  return function ServicePage() {
    const { language, openAssistedModal, isAssistedModalOpen, setIsAssistedModalOpen } = useApp();
    const category = WEDDING_CATEGORIES.find(c => c.slug === categorySlug) || WEDDING_CATEGORIES[0];
    const vendors = SAMPLE_VENDORS.filter(v => v.categorySlug === categorySlug);

    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
        <Header />

        <main className="flex-1 layout-fullwidth py-6 space-y-6">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/#categories" },
              { label: titleEn }
            ]}
          />

          <div className="rounded-3xl bg-[#762B46] text-white p-6 sm:p-10 border border-[#E7DECF] space-y-3">
            <span className="text-xs uppercase font-bold text-[#C5A46D] px-2.5 py-0.5 rounded-full bg-white/10">
              Wedding Service Category #{category.number}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{titleEn}</h1>
            <p className="text-base text-[#C5A46D] font-serif">{titleTe}</p>
            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
              {language === "te" ? category.descriptionTe : category.descriptionEn}
            </p>

            <div className="pt-2 flex gap-3">
              <Button
                variant="gold"
                size="sm"
                onClick={() => openAssistedModal({ categorySlug })}
              >
                <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                <span>Request Free Phone Quote</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#292524]">
              Verified {titleEn} Providers
            </h2>

            {vendors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map(vendor => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-6 rounded-2xl bg-white border border-[#E7DECF] max-w-lg mx-auto space-y-2">
                <p className="font-semibold text-sm text-[#292524]">Verified listings available on phone coordination</p>
                <p className="text-xs text-[#57534E]">Our field team is onboarding more local teams in this district for your wedding date.</p>
                <Button variant="primary" size="sm" onClick={() => openAssistedModal({ categorySlug })}>
                  Request a Provider
                </Button>
              </div>
            )}
          </div>
        </main>

        <Footer />

        <AssistedBookingModal
          isOpen={isAssistedModalOpen}
          onClose={() => setIsAssistedModalOpen(false)}
          defaultVendorInfo={{ categorySlug }}
        />
      </div>
    );
  };
}

