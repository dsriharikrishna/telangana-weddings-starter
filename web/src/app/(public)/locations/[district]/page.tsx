"use client";

import React, { use } from "react";
import Link from "next/link";

import { TELANGANA_LOCATIONS, SAMPLE_VENDORS } from "@/data";
import { Header } from "@/components/layout/Header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";


import { VendorCard } from "@/features/vendors";
import { Footer } from "@/components/layout/Footer";

export default function DistrictLocationPage({ params }: { params: Promise<{ district: string }> }) {
  const resolvedParams = use(params);
  const districtId = resolvedParams.district;

  const district = TELANGANA_LOCATIONS.districts.find(d => d.id === districtId) || TELANGANA_LOCATIONS.districts[0];
  const districtVendors = SAMPLE_VENDORS.filter(v => v.district === district.id || v.willTravel);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Locations", href: "/locations" },
            { label: `${district.nameEn} District` }
          ]}
        />

        <div className="p-6 sm:p-8 rounded-3xl bg-[#762B46] text-white space-y-2">
          <span className="text-xs uppercase font-bold text-[#C5A46D]">Telangana District</span>
          <h1 className="text-2xl sm:text-3xl font-bold">{district.nameEn} District</h1>
          <p className="text-base text-[#C5A46D] font-serif">{district.nameTe}</p>
          <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
            Discover verified wedding vendors and services available across {district.mandals.length} mandals with transparent village travel policies.
          </p>
        </div>

        {/* Mandals List */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[#292524]">Mandals in {district.nameEn}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {district.mandals.map(mandal => (
              <Link
                key={mandal.id}
                href={`/locations/${district.id}/${mandal.id}`}
                className="p-3 bg-white rounded-xl border border-[#E7DECF] hover:border-[#762B46] transition-all block text-center"
              >
                <p className="font-bold text-xs sm:text-sm text-[#292524]">{mandal.nameEn}</p>
                <p className="text-[11px] text-[#762B46] font-medium">{mandal.nameTe}</p>
                <p className="text-[10px] text-gray-400 mt-1">{mandal.villages.length} Villages</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Vendors serving this district */}
        <div className="space-y-4 pt-4 border-t border-[#E7DECF]">
          <h2 className="text-lg font-bold text-[#292524]">
            Wedding Providers Serving {district.nameEn}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

