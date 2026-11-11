"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function QuotationDetailsPage({ params }: { params: Promise<{ quotationId: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="space-y-6">
      <Link href="/customer/quotations" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Quotations</span>
      </Link>

      <Card className="p-6 bg-white border border-[#E7DECF] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
          <div>
            <h1 className="text-xl font-bold text-[#292524]">Quotation QT-2026-8812</h1>
            <p className="text-xs text-[#57534E]">Telangana Ruchulu & Royal Catering</p>
          </div>
          <Badge variant="gold">Awaiting Decision</Badge>
        </div>

        <div className="space-y-2 text-xs text-[#57534E]">
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span>500 Meals (Veg & Non-Veg Telangana Specials)</span>
            <span className="font-semibold text-[#292524]">₹1,75,000</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span>Travel & Transport to Singaram Village (25 km free allowance)</span>
            <span className="font-semibold text-emerald-700">₹0 (Free Travel)</span>
          </div>
          <div className="flex justify-between py-1.5 font-bold text-sm text-[#762B46]">
            <span>Total Payable to Vendor</span>
            <span>₹1,75,000</span>
          </div>
        </div>

        <div className="pt-3 flex gap-2">
          <Button variant="primary" size="sm" onClick={() => alert("Quotation accepted! Coordinator will call to lock dates.")}>
            Accept Quotation & Lock Date
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/customer/quotations">Decline</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

