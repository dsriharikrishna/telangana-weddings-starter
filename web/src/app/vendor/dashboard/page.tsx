"use client";

import React from "react";
import Link from "next/link";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-[#762B46] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-[#C5A46D]">Vendor Partner Portal</span>
          <h1 className="text-xl sm:text-2xl font-bold">Sri Srinivasa Kalyana Mandapam</h1>
          <p className="text-xs text-gray-200 mt-0.5">
            Base: Narayanpet Town • Serving 5 Mandals in Narayanpet & Mahabubnagar
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="gold" size="sm" asChild>
            <Link href="/vendor/quotations/create">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span>Create Quotation</span>
            </Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/vendor/service-areas">
              Edit Service Areas
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#E7DECF]">
          <span className="text-[10px] font-bold text-[#57534E] uppercase">Total Enquiries</span>
          <p className="font-heading font-bold text-xl text-[#762B46] mt-1">18</p>
          <span className="text-[10px] text-emerald-700 font-semibold">+4 this week</span>
        </Card>

        <Card className="p-4 bg-white border border-[#E7DECF]">
          <span className="text-[10px] font-bold text-[#57534E] uppercase">Confirmed Weddings</span>
          <p className="font-heading font-bold text-xl text-[#762B46] mt-1">12</p>
          <span className="text-[10px] text-gray-400">Peak Muhurtham Season</span>
        </Card>

        <Card className="p-4 bg-white border border-[#E7DECF]">
          <span className="text-[10px] font-bold text-[#57534E] uppercase">Gross Booking Value</span>
          <p className="font-heading font-bold text-xl text-[#762B46] mt-1">₹6,00,000</p>
          <span className="text-[10px] text-emerald-700">100% Direct to Vendor</span>
        </Card>

        <Card className="p-4 bg-white border border-[#E7DECF]">
          <span className="text-[10px] font-bold text-[#57534E] uppercase">Platform Commission</span>
          <p className="font-heading font-bold text-xl text-[#762B46] mt-1">₹0</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Zero Commission Pilot</span>
        </Card>
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
              <Link href="/vendor/quotations/create?enquiryId=ENQ-NAR-7721">
                Send Quotation
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

