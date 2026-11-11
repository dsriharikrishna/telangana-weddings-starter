"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CustomerPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-[#E7DECF]">
        <h1 className="text-xl font-bold text-[#292524]">Payments & Receipts</h1>
        <p className="text-xs text-[#57534E]">All direct vendor advances and zero platform commissions</p>
      </div>

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

