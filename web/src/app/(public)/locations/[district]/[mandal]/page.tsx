"use client";

import React, { use } from "react";
import Link from "next/link";

import { TELANGANA_LOCATIONS, SAMPLE_VENDORS } from "@/data";
import { Header } from "@/components/layout/Header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { VendorCard } from "@/features/vendors";
import { Footer } from "@/components/layout/Footer";

export default function MandalLocationPage({ params }: { params: Promise<{ district: string; mandal: string }> }) {
  const resolvedParams = use(params);
  const { district: districtId, mandal: mandalId } = resolvedParams;

  const district = TELANGANA_LOCATIONS.districts.find(d => d.id === districtId) || TELANGANA_LOCATIONS.districts[0];
  const mandal = district.mandals.find(m => m.id === mandalId) || district.mandals[0];

  const vendors = SAMPLE_VENDORS.filter(v =>
    v.mandal === mandal.id || v.servesMandals?.includes(mandal.id) || v.willTravel
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Locations", href: "/locations" },
            { label: district.nameEn, href: `/locations/${district.id}` },
            { label: `${mandal.nameEn} Mandal` }
          ]}
        />

        <div className="p-6 rounded-2xl bg-[#762B46] text-white space-y-1">
          <span className="text-[10px] font-bold uppercase text-[#C5A46D]">{district.nameEn} District</span>
          <h1 className="text-xl sm:text-2xl font-bold">{mandal.nameEn} Mandal ({mandal.nameTe})</h1>
          <p className="text-xs text-gray-200">
            Wedding vendors serving {mandal.villages.length} villages in {mandal.nameEn} mandal.
          </p>
        </div>

        {/* Villages List */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-[#292524]">Villages & Towns in {mandal.nameEn} Mandal:</h2>
          <div className="flex flex-wrap gap-2">
            {mandal.villages.map(v => (
              <Link
                key={v.id}
                href={`/locations/${district.id}/${mandal.id}/${v.id}`}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E7DECF] hover:border-[#762B46] text-xs font-medium text-[#292524] transition-colors"
              >
                {v.nameEn} ({v.nameTe}) {v.isTown ? "• Town" : ""}
              </Link>
            ))}
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="space-y-4 pt-4 border-t border-[#E7DECF]">
          <h2 className="text-base font-bold text-[#292524]">
            Wedding Providers Available in {mandal.nameEn} Mandal
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

