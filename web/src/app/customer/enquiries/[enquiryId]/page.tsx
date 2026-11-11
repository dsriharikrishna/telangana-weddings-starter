"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export default function EnquiryDetailsPage({ params }: { params: Promise<{ enquiryId: string }> }) {
  const resolvedParams = use(params);
  const enquiryId = resolvedParams.enquiryId;

  return (
    <div className="space-y-6">
      <Link href="/customer/enquiries" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Enquiries</span>
      </Link>

      <Card className="p-6 bg-white border border-[#E7DECF] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
          <div>
            <h1 className="text-xl font-bold text-[#292524]">Enquiry Details: {enquiryId}</h1>
            <p className="text-xs text-[#57534E]">Rural wedding services coordination record</p>
          </div>
          <Badge variant="success">Coordinator Assigned</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-400 font-bold block">Customer:</span>
            <span className="font-semibold text-[#292524]">Ramesh Reddy (+91 94401 XXXXX)</span>
          </div>
          <div>
            <span className="text-gray-400 font-bold block">Assigned Coordinator:</span>
            <span className="font-semibold text-emerald-800">Venkat (Narayanpet Rural Desk)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DECF] text-xs text-[#57534E] space-y-1">
          <p className="font-bold text-[#762B46]">Platform Guarantee:</p>
          <p>We connect you directly with genuine local providers with transparent travel terms. No broker commission added.</p>
        </div>
      </Card>
    </div>
  );
}

