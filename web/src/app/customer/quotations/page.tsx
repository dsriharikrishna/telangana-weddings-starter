"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomerPageHeader } from "@/components/ui/customer-page-header";

export default function CustomerQuotationsPage() {
  return (
    <div className="space-y-6">
      <CustomerPageHeader
        title="Quotations (కొటేషన్లు)"
        subtitle="Official itemized quotations received from service providers"
      />

      <div className="space-y-3">
        <Card className="p-4 bg-white border border-[#E7DECF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#762B46]">QT-2026-8812</span>
              <Badge variant="gold">Under Review</Badge>
            </div>
            <p className="font-bold text-[#292524] mt-1">Telangana Ruchulu & Royal Catering</p>
            <p className="text-[#57534E]">500 Guests Feast • Bagara Rice & Dalcha • ₹350/plate • Travel to Singaram Village</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#762B46]">₹1,75,000</span>
            <Button variant="primary" size="sm" asChild>
              <Link href="/customer/quotations/qt-8812">Review & Accept</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

