"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VendorEnquiryDetailPage({ params }: { params: Promise<{ enquiryId: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="space-y-6">
      <Link href="/vendor/enquiries" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Enquiries</span>
      </Link>

      <Card className="p-6 bg-white border border-[#E7DECF] max-w-xl space-y-4">
        <h1 className="text-xl font-bold text-[#292524]">Enquiry Details: {resolvedParams.enquiryId}</h1>
        <p className="text-xs text-[#57534E]">Customer Venkat Rao wants to book Kalyana Mandapam on 24 Dec 2026.</p>
        <Button variant="primary" size="sm" asChild>
          <Link href="/vendor/quotations/create">Send Official Quotation</Link>
        </Button>
      </Card>
    </div>
  );
}

