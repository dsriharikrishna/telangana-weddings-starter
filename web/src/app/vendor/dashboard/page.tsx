"use client";

import React from "react";
import Link from "next/link";
import { DollarSign, Users, Calendar, CheckCircle2, Plus, Coins, Sparkles, Phone, MessageCircle } from "lucide-react";
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
          <h1 className="text-xl sm:text-2xl font-bold font-heading">{vendorName}</h1>
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

      {/* Wallet Credits Banner */}
      <div className="p-4 rounded-2xl bg-white border border-[#E7DECF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold shrink-0">
            <Coins className="w-5 h-5 text-[#C5A46D]" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Matchmaking Credits
            </div>
            <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <span>5 Lead Credits Balance</span>
              <span className="text-xs font-normal text-stone-500">(1 Credit = 1 Direct Customer Unlock)</span>
            </div>
          </div>
        </div>
        <Button variant="gold" size="sm" asChild className="h-8 text-xs font-bold shrink-0">
          <Link href="/vendor/payments">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            <span>Top-up Wallet</span>
          </Link>
        </Button>
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
          label="Active Leads"
          value="6 Leads"
          sublabel="Available to Unlock"
          icon={Coins}
          variant="emerald"
        />
        <VendorMetricCard
          label="Platform Commission"
          value="₹0"
          trend="100% Direct Matchmaking"
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

