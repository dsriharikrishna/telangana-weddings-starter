"use client";

import React from "react";
import Link from "next/link";
import { SAMPLE_VENDORS } from "@/data";
import { VendorCard } from "@/features/vendors";
import { Button } from "@/components/ui/button";
import { CustomerPageHeader } from "@/components/ui/customer-page-header";

export default function SavedVendorsPage() {
  const savedVendors = SAMPLE_VENDORS.slice(0, 3);

  return (
    <div className="space-y-6">
      <CustomerPageHeader
        title="Saved Vendors (షార్ట్‌లిస్ట్ చేసినవి)"
        subtitle="Vendors you bookmarked for your wedding ceremonies"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedVendors.map(v => (
          <VendorCard key={v.id} vendor={v} />
        ))}
      </div>
    </div>
  );
}

