"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";

export default function VendorAvailabilityPage() {
  const [selectedMonth, setSelectedMonth] = useState("December 2026");

  const DATES_STATUS = [
    { date: "24 Dec 2026", event: "Grand Wedding - Singaram Customer", type: "Full Day Muhurtham", status: "booked" },
    { date: "25 Dec 2026", event: "Wedding Reception - Makthal", type: "Evening Slot", status: "booked" },
    { date: "28 Dec 2026", event: "Tentative Inquiry - Utkoor", type: "Full Day", status: "tentative" },
    { date: "02 Jan 2027", event: "Open for Bookings", type: "Full Day", status: "available" },
    { date: "05 Jan 2027", event: "Open for Bookings", type: "Full Day", status: "available" },
    { date: "14 Jan 2027", event: "Sankranti Auspicious Date", type: "Full Day", status: "available" },
  ];

  return (
    <div className="w-full space-y-6 font-body">
      {/* Reusable Header */}
      <VendorPageHeader
        title="Calendar & Muhurtham Dates Availability"
        subtitle="Manage your service troupe, function hall, or catering calendar across auspicious Telugu wedding dates"
      >
        <Button variant="primary" size="sm" className="gap-1.5 shadow-sm">
          <Plus className="w-3.5 h-3.5" />
          <span>Block / Reserve Date</span>
        </Button>
      </VendorPageHeader>

      {/* Grid Canvas across 100% full width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* Left Side: Interactive Dates List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-[#E7DECF] rounded-2xl shadow-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#762B46]" />
              <span className="font-heading font-bold text-sm text-[#292524]">{selectedMonth}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">
                2 Dates Booked
              </span>
              <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                1 Tentative
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {DATES_STATUS.map((item, idx) => (
              <Card
                key={idx}
                className={`p-4 border transition-all rounded-2xl ${
                  item.status === "booked"
                    ? "bg-rose-50/50 border-rose-200"
                    : item.status === "tentative"
                    ? "bg-amber-50/50 border-amber-200"
                    : "bg-white border-[#E7DECF] hover:border-[#762B46]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#292524]">{item.date}</span>
                    <div className="text-[11px] text-[#57534E] mt-0.5">{item.type}</div>
                  </div>
                  <Badge
                    variant={
                      item.status === "booked"
                        ? "outline"
                        : item.status === "tentative"
                        ? "gold"
                        : "success"
                    }
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#E7DECF]/80 text-xs flex items-center justify-between">
                  <span className="text-[#57534E] truncate max-w-[200px]">{item.event}</span>
                  <button className="text-[11px] font-semibold text-[#762B46] hover:underline">
                    Edit
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side: Auspicious Telugu Muhurtham Guidance */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#762B46] uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Upcoming High-Demand Muhurthams</span>
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Telugu wedding seasons experience peak demand in Narayanpet and Mahabubnagar. Mark your dates in advance to avoid double-booking.
            </p>
            <div className="space-y-2 pt-2 border-t border-[#E7DECF] text-xs">
              <div className="flex justify-between py-1 text-[#292524]">
                <span>24 Dec 2026 (Shukla Paksha)</span>
                <span className="text-rose-700 font-bold">Peak</span>
              </div>
              <div className="flex justify-between py-1 text-[#292524]">
                <span>18 Jan 2027 (Makara Sankranti)</span>
                <span className="text-amber-700 font-bold">High</span>
              </div>
              <div className="flex justify-between py-1 text-[#292524]">
                <span>05 Feb 2027 (Magha Masam)</span>
                <span className="text-emerald-700 font-bold">Fast Filling</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
