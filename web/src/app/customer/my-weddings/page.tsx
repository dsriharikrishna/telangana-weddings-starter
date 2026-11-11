"use client";

import React from "react";
import Link from "next/link";
import { Plus, Calendar, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerPageHeader } from "@/components/ui/customer-page-header";

export default function MyWeddingsPage() {
  return (
    <div className="space-y-6">
      <CustomerPageHeader
        title="My Wedding Events"
        subtitle="Manage and coordinate family wedding ceremonies"
      >
        <Button variant="primary" size="sm" asChild>
          <Link href="/customer/my-weddings/create">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>Create New Wedding</span>
          </Link>
        </Button>
      </CustomerPageHeader>

      <Card className="p-5 bg-white border border-[#E7DECF] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#762B46]">Ramesh & Sunitha Wedding</h2>
              <Badge variant="gold">Main Ceremony</Badge>
            </div>
            <p className="text-xs text-[#57534E] flex items-center gap-2 mt-1">
              <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>24 December 2026 (Muhurtham: 09:15 AM)</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Singaram Village, Narayanpet</span>
            </p>
          </div>

          <Button variant="secondary" size="sm" asChild>
            <Link href="/customer/my-weddings/event-01">
              View Wedding Checklist
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#E7DECF] text-xs text-[#57534E]">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Guest Count</span>
            <p className="font-semibold text-[#292524]">650 Guests</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Budget Estimate</span>
            <p className="font-semibold text-[#292524]">₹4,50,000</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Booked Services</span>
            <p className="font-semibold text-emerald-700">3 of 8 Services Booked</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Status</span>
            <p className="font-semibold text-[#762B46]">Active Planning</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

