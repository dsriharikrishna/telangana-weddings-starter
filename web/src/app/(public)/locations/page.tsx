"use client";

import React from "react";
import Link from "next/link";
import { MapPin, PhoneCall } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS } from "@/data";
import { Header } from "@/components/layout/Header";
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AssistedBookingModal } from "@/features/booking";

export default function LocationsDirectoryPage() {
  const { language, openAssistedModal, isAssistedModalOpen, setIsAssistedModalOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-6 space-y-6">
        <Breadcrumbs items={[{ label: "Locations Directory", href: "/locations" }]} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E7DECF]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#762B46]/10 text-[#762B46] text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Pilot Districts: Narayanpet & Mahabubnagar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#292524] tracking-tight">
              {language === "te" ? "గ్రామీణ ప్రాంతాల వేదిక" : "Supported Wedding Locations"}
            </h1>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              {language === "te"
                ? "నారాయణపేట మరియు మహబూబ్‌నగర్ జిల్లాలలోని అన్ని మండలాలు మరియు గ్రామాలు."
                : "Real geographic hierarchy connecting village families with providers willing to travel across mandal borders."}
            </p>
          </div>

          <Button variant="secondary" size="sm" onClick={() => openAssistedModal()}>
            <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
            <span>Assisted Helpline</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TELANGANA_LOCATIONS.districts.map(district => (
            <div key={district.id} className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#762B46] text-white flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">{district.nameEn} District</h2>
                  <p className="text-xs text-[#C5A46D]">{district.nameTe}</p>
                </div>
                <Button variant="gold" size="sm" asChild>
                  <Link href={`/locations/${district.id}`}>
                    Explore District →
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {district.mandals.map(mandal => (
                  <Card key={mandal.id} className="border border-[#E7DECF] bg-white p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/locations/${district.id}/${mandal.id}`}
                        className="font-bold text-xs sm:text-sm text-[#292524] hover:text-[#762B46] transition-colors"
                      >
                        {mandal.nameEn}
                      </Link>
                      <span className="text-[10px] text-[#762B46] font-semibold">{mandal.nameTe}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 text-[10px] text-[#57534E]">
                      {mandal.villages.map(v => (
                        <Link
                          key={v.id}
                          href={`/locations/${district.id}/${mandal.id}/${v.id}`}
                          className="px-1.5 py-0.5 rounded bg-[#FAF7F2] hover:bg-[#F4EDE3] border border-[#E7DECF]"
                        >
                          {v.nameEn}
                        </Link>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />

      <AssistedBookingModal
        isOpen={isAssistedModalOpen}
        onClose={() => setIsAssistedModalOpen(false)}
      />
    </div>
  );
}

