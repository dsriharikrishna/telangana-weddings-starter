"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorBookingDetailPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="space-y-6">
      <Link href="/vendor/bookings" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Bookings</span>
      </Link>

      <Card className="p-6 bg-white border border-[#E7DECF] max-w-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
          <div>
            <h1 className="text-xl font-bold text-[#292524]">Booking: {resolvedParams.bookingId}</h1>
            <p className="text-xs text-[#57534E]">Customer Ramesh Reddy • 24 Dec 2026</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        <div className="text-xs space-y-2 text-[#57534E]">
          <p><strong>Service Venue:</strong> Singaram Village Wedding Mandapam, Narayanpet</p>
          <p><strong>Total Value:</strong> ₹50,000 (Advance Received: ₹10,000, Remaining ₹40,000 due on event day)</p>
          <p><strong>Customer Phone:</strong> +91 94401 XXXXX</p>
        </div>
      </Card>
    </div>
  );
}

