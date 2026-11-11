"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  Music,
  MapPin,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SAMPLE_VENDORS } from "@/data";
import { VendorCard } from "@/features/vendors";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Header } from "@/components/layout/Header";
import { Footer } from '@/components/layout/Footer';
import { AssistedBookingModal } from "@/features/booking";

export default function BandMelamSubcategoryPage({ params }: { params: Promise<{ subcategorySlug: string }> }) {
  const resolvedParams = use(params);
  const subSlug = resolvedParams.subcategorySlug;
  const isBand = subSlug === "band-melam";

  const { language, openAssistedModal, isAssistedModalOpen, setIsAssistedModalOpen } = useApp();

  const titleEn = isBand ? "Band Melam (Baraat Brass Band)" : "Sannai Melam (Classical Nadaswaram)";
  const titleTe = isBand ? "బ్యాండ్ మేళం (బారాత్ బ్యాండ్)" : "సన్నాయి మేళం (మంగళ వాయిద్యాలు)";
  const descEn = isBand
    ? "Energetic wedding brass band teams with trumpets, drums, mobile illumination, and uniforms for grand Baraat processions across Narayanpet & Mahabubnagar."
    : "Generational classical Nadaswaram & Thavil master vidwans for sacred Vedic Telugu rituals, mangala snanam, kanyadanam, and traditional Muhurtham.";

  // Filter vendors matching subcategory
  const matchingVendors = SAMPLE_VENDORS.filter(v => v.subcategorySlug === subSlug);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/#categories" },
            { label: "Band Melam & Sannai", href: "/services/band-melam-sannai" },
            { label: isBand ? "Band Melam" : "Sannai Melam" }
          ]}
        />

        {/* Hero Section */}
        <div className="rounded-3xl bg-[#292524] text-white p-6 sm:p-10 border-4 border-[#C5A46D] space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
            <Music className="w-3.5 h-3.5" />
            <span>Subcategory {isBand ? "18.1" : "18.2"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {titleEn}
          </h1>
          <p className="text-base text-[#C5A46D] font-serif">
            {titleTe}
          </p>

          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {descEn}
          </p>

          <div className="pt-2 flex gap-3">
            <Button
              variant="gold"
              size="sm"
              onClick={() => openAssistedModal({ categorySlug: "band-melam-sannai" })}
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
              <span>Book by Phone Call</span>
            </Button>
            <Button variant="outline" size="sm" asChild className="text-white border-white hover:bg-white hover:text-black">
              <Link href={isBand ? "/services/band-melam-sannai/sannai-melam" : "/services/band-melam-sannai/band-melam"}>
                <span>Switch to {isBand ? "Sannai Melam" : "Band Melam"}</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Vendors List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#292524]">
            Verified {isBand ? "Brass Band Teams" : "Sannai Vidwans"} in Telangana
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>

      </main>

      <Footer />

      <AssistedBookingModal
        isOpen={isAssistedModalOpen}
        onClose={() => setIsAssistedModalOpen(false)}
        defaultVendorInfo={{ categorySlug: "band-melam-sannai" }}
      />
    </div>
  );
}

