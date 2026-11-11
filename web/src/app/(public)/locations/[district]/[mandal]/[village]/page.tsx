"use client";

import React, { use } from "react";
import { PhoneCall } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS, SAMPLE_VENDORS } from "@/data";
import { Header } from "@/components/layout/Header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { VendorCard } from "@/features/vendors";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

export default function VillageLocationPage({ params }: { params: Promise<{ district: string; mandal: string; village: string }> }) {
  const resolvedParams = use(params);
  const { district: districtId, mandal: mandalId, village: villageId } = resolvedParams;
  const { openAssistedModal } = useApp();

  const district = TELANGANA_LOCATIONS.districts.find(d => d.id === districtId) || TELANGANA_LOCATIONS.districts[0];
  const mandal = district.mandals.find(m => m.id === mandalId) || district.mandals[0];
  const village = mandal.villages.find(v => v.id === villageId) || mandal.villages[0];

  const vendors = SAMPLE_VENDORS.filter(v =>
    v.townOrVillage === village.id ||
    v.servesVillages?.includes(village.id) ||
    v.servesMandals?.includes(mandal.id) ||
    v.willTravel
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Locations", href: "/locations" },
            { label: district.nameEn, href: `/locations/${district.id}` },
            { label: mandal.nameEn, href: `/locations/${district.id}/${mandal.id}` },
            { label: `${village.nameEn} ${village.isTown ? "Town" : "Village"}` }
          ]}
        />

        <div className="p-6 rounded-2xl bg-[#762B46] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#C5A46D]">{district.nameEn} • {mandal.nameEn} Mandal</span>
            <h1 className="text-xl sm:text-2xl font-bold">{village.nameEn} ({village.nameTe})</h1>
            <p className="text-xs text-gray-200">
              Discover local vendors in this {village.isTown ? "town" : "village"} and providers from neighboring areas willing to travel here.
            </p>
          </div>

          <Button variant="gold" size="sm" onClick={() => openAssistedModal()}>
            <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
            <span>Assisted Helpline</span>
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#292524]">
            Wedding Providers Available for {village.nameEn}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

