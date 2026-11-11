"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CustomerPageHeader } from "@/components/ui/customer-page-header";

export default function CustomerPaymentsPage() {
  return (
    <div className="space-y-6">
      <CustomerPageHeader
        title="Payments & Receipts"
        subtitle="All direct vendor advances and zero platform commissions"
      />

      <Card className="p-4 bg-white border border-[#E7DECF] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-mono font-bold text-[#762B46]">RCPT-9921</span>
            <p className="font-semibold text-[#292524]">Sri Srinivasa Kalyana Mandapam - Advance Token</p>
            <p className="text-[#57534E]">Paid directly via UPI to vendor on 02 Nov 2026</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-sm text-[#762B46]">₹10,000</span>
            <Badge variant="success" className="block mt-1">Direct to Vendor</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

