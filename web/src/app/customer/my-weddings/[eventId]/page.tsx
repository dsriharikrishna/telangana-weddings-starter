"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Calendar, MapPin, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WeddingEventDetailsPage({ params }: { params: Promise<{ eventId: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="space-y-6">
      <Link href="/customer/my-weddings" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to My Weddings</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7DECF]">
        <div>
          <h1 className="text-xl font-bold text-[#292524]">Ramesh & Sunitha Wedding Plan</h1>
          <p className="text-xs text-[#57534E]">Singaram Village, Narayanpet • 24 Dec 2026</p>
        </div>
        <Button variant="primary" size="sm" asChild>
          <Link href="/vendors">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>Book Additional Services</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 bg-white border border-[#E7DECF] space-y-2">
          <span className="text-[10px] uppercase font-bold text-gray-400">Function Hall</span>
          <p className="font-bold text-xs text-[#292524]">Sri Srinivasa Kalyana Mandapam</p>
          <Badge variant="success">Confirmed & Advanced</Badge>
        </Card>

        <Card className="p-4 bg-white border border-[#E7DECF] space-y-2">
          <span className="text-[10px] uppercase font-bold text-gray-400">Sannai Melam (18.2)</span>
          <p className="font-bold text-xs text-[#292524]">Sri Venkateshwara Nadaswara Brundam</p>
          <Badge variant="success">Confirmed for Muhurtham</Badge>
        </Card>

        <Card className="p-4 bg-white border border-[#E7DECF] space-y-2">
          <span className="text-[10px] uppercase font-bold text-gray-400">Telangana Catering</span>
          <p className="font-bold text-xs text-[#292524]">Telangana Ruchulu & Royal Catering</p>
          <Badge variant="gold">Quote Under Review</Badge>
        </Card>
      </div>
    </div>
  );
}

