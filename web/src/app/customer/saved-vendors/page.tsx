"use client";

import React from "react";
import Link from "next/link";
import { SAMPLE_VENDORS } from "@/data";
import { VendorCard } from "@/features/vendors";
import { Button } from "@/components/ui/button";

export default function SavedVendorsPage() {
  const savedVendors = SAMPLE_VENDORS.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-[#E7DECF]">
        <h1 className="text-xl font-bold text-[#292524]">Saved Vendors (షార్ట్‌లిస్ట్ చేసినవి)</h1>
        <p className="text-xs text-[#57534E]">Vendors you bookmarked for your wedding ceremonies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedVendors.map(v => (
          <VendorCard key={v.id} vendor={v} />
        ))}
      </div>
    </div>
  );
}

