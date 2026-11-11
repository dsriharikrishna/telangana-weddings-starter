"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomerPageHeader } from "@/components/ui/customer-page-header";

export default function CustomerBookingsPage() {
  return (
    <div className="space-y-6">
      <CustomerPageHeader
        title="Confirmed Bookings (ఖరారైన బుకింగ్స్)"
        subtitle="All locked wedding date bookings with local service providers"
      />

      <div className="space-y-3">
        <Card className="p-4 bg-white border border-[#E7DECF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#762B46]">BK-TEL-4410</span>
              <Badge variant="success">Confirmed & Advanced</Badge>
            </div>
            <p className="font-bold text-[#292524] mt-1">Sri Srinivasa Kalyana Mandapam & A/C Hall</p>
            <p className="text-[#57534E]">Event Date: 24 Dec 2026 • Narayanpet Town Hall</p>
          </div>

          <Button variant="secondary" size="sm" asChild>
            <Link href="/customer/bookings/bk-4410">View Booking Details</Link>
          </Button>
        </Card>

        <Card className="p-4 bg-white border border-[#E7DECF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#762B46]">BK-TEL-4411</span>
              <Badge variant="success">Confirmed for Muhurtham</Badge>
            </div>
            <p className="font-bold text-[#292524] mt-1">Sri Venkateshwara Nadaswara Sannai Brundam</p>
            <p className="text-[#57534E]">Category 18.2 Sannai Melam • 24 Dec 2026 • Travel to Singaram Village</p>
          </div>

          <Button variant="secondary" size="sm" asChild>
            <Link href="/customer/bookings/bk-4411">View Booking Details</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}

