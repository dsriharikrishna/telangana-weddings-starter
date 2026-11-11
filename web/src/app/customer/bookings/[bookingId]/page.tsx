"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CustomerBookingDetailsPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const resolvedParams = use(params);
  const bookingId = resolvedParams.bookingId;

  return (
    <div className="space-y-6">
      <Link href="/customer/bookings" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Bookings</span>
      </Link>

      <Card className="p-6 bg-white border border-[#E7DECF] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
          <div>
            <h1 className="text-xl font-bold text-[#292524]">Booking Confirmation: {bookingId}</h1>
            <p className="text-xs text-[#57534E]">Locked date agreement with vendor</p>
          </div>
          <Badge variant="success">Confirmed</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-400 font-bold block">Event Date:</span>
            <span className="font-semibold text-[#292524]">24 December 2026</span>
          </div>
          <div>
            <span className="text-gray-400 font-bold block">Venue:</span>
            <span className="font-semibold text-[#292524]">Singaram Village Wedding Mandapam</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
          ✓ Advance token received directly by vendor. Remaining balance payable on wedding day.
        </div>
      </Card>
    </div>
  );
}

