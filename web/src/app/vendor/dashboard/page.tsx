"use client";

import React from "react";
import Link from "next/link";
import { DollarSign, Users, Calendar, CheckCircle2, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VendorMetricCard } from "@/components/ui/vendor-metric-card";
import { useAppStore } from "@/store/useAppStore";

export default function VendorDashboardPage() {
  const currentUser = useAppStore((s) => s.currentUser);
  const vendorName = currentUser?.vendorDetails?.businessName || currentUser?.name || "Sri Srinivasa Kalyana Mandapam";
  const vendorLocation = currentUser?.location || "Narayanpet Town";

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-[#762B46] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-[#C5A46D]">Vendor Partner Portal</span>
          <h1 className="text-xl sm:text-2xl font-bold">{vendorName}</h1>
          <p className="text-xs text-gray-200 mt-0.5">
            Base: {vendorLocation} • Serving Narayanpet & Mahabubnagar Mandals
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button variant="gold" size="sm" asChild>
            <Link href="/vendor/enquiries">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span>View Enquiries</span>
            </Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/vendor/service-areas">
              Edit Service Areas
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Row using Reusable VendorMetricCard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <VendorMetricCard
          label="Total Enquiries"
          value="18"
          trend="+4 this week"
          icon={Users}
          variant="crimson"
        />
        <VendorMetricCard
          label="Confirmed Weddings"
          value="12"
          sublabel="Peak Muhurtham Season"
          icon={Calendar}
          variant="gold"
        />
        <VendorMetricCard
          label="Gross Booking Value"
          value="₹6,00,000"
          sublabel="100% Direct to Vendor"
          icon={DollarSign}
          variant="emerald"
        />
        <VendorMetricCard
          label="Platform Commission"
          value="₹0"
          trend="Zero Commission Pilot"
          icon={CheckCircle2}
          variant="default"
        />
      </div>

      {/* Pending Customer Enquiries */}
      <Card className="p-5 bg-white border border-[#E7DECF] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
          <h2 className="text-base font-bold text-[#292524]">Recent Customer Enquiries for Your Services</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/vendor/enquiries">View All →</Link>
          </Button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DECF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#762B46]">ENQ-NAR-7721</span>
                <Badge variant="gold">Wedding Reception</Badge>
              </div>
              <p className="font-bold text-[#292524] mt-1">Singaram Village Customer (Venkat Rao)</p>
              <p className="text-[#57534E]">Requested AC Function Hall for 600 Guests on 24 Dec 2026</p>
            </div>
            <Button variant="primary" size="sm" asChild>
              <Link href="/vendor/enquiries/ENQ-NAR-7721">
                View Lead & Contact
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

