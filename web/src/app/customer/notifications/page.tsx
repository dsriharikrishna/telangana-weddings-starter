"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Bell, CheckCircle2 } from "lucide-react";
import { CustomerPageHeader } from "@/components/ui/customer-page-header";

export default function CustomerNotificationsPage() {
  return (
    <div className="space-y-6">
      <CustomerPageHeader
        title="Notifications"
        subtitle="Real-time updates regarding your enquiries and wedding bookings"
      />

      <div className="space-y-3">
        <Card className="p-4 bg-white border border-[#E7DECF] flex items-start gap-3 text-xs">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[#292524]">Quotation QT-2026-8812 Received</p>
            <p className="text-[#57534E]">Telangana Ruchulu & Royal Catering has submitted their itemized feast quotation for 500 guests.</p>
            <span className="text-[10px] text-gray-400">2 hours ago</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

