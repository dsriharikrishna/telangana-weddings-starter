"use client";

import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Plus, 
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VendorMetricCard } from "@/components/ui/vendor-metric-card";

export default function CustomerDashboardPage() {
  const { enquiries, openAssistedModal } = useApp();
  const currentUser = useAppStore((s) => s.currentUser);

  const customerName = currentUser?.name || "Ramesh Reddy";
  const customerLocation = currentUser?.location || "Narayanpet District";

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-[#762B46] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-[#C5A46D]">Customer Portal</span>
          <h1 className="text-xl sm:text-2xl font-bold">Welcome, {customerName}</h1>
          <p className="text-xs text-gray-200 mt-0.5">
            Managing wedding preparations in {customerLocation} • 24 Dec 2026
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button variant="gold" size="sm" asChild>
            <Link href="/vendors">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span>Browse Vendors</span>
            </Link>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => openAssistedModal()}>
            <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
            <span>Assisted Help</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards using Reusable VendorMetricCard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <VendorMetricCard
          label="Active Events"
          value="1"
          sublabel="Wedding in Singaram"
          icon={Calendar}
          variant="crimson"
        />
        <VendorMetricCard
          label="Quotations Received"
          value="4"
          trend="2 Pending Approval"
          icon={FileText}
          variant="gold"
        />
        <VendorMetricCard
          label="Confirmed Bookings"
          value="2"
          sublabel="Mandap & Sannai Melam"
          icon={CheckCircle2}
          variant="emerald"
        />
        <VendorMetricCard
          label="Platform Fees"
          value="₹0"
          trend="Zero Commission"
          icon={Clock}
          variant="default"
        />
      </div>

      {/* Recent Enquiries & Bookings List */}
      <Card className="p-5 bg-white border border-[#E7DECF] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
          <h2 className="text-base font-bold text-[#292524]">Recent Assisted Enquiries & Quotations</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/customer/enquiries">View All →</Link>
          </Button>
        </div>

        {enquiries.length > 0 ? (
          <div className="space-y-2.5">
            {enquiries.slice(0, 4).map(enq => (
              <div key={enq.id} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DECF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#762B46]">{enq.referenceNumber}</span>
                    <Badge variant="success">{enq.status.replace("_", " ")}</Badge>
                  </div>
                  <p className="font-semibold text-[#292524] mt-1">{enq.categorySlug}</p>
                  <p className="text-[11px] text-[#57534E]">
                    {enq.villageOrTown}, {enq.mandal} • Created {new Date(enq.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/customer/enquiries/${enq.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 space-y-2">
            <Clock className="w-8 h-8 text-[#C5A46D] mx-auto" />
            <p className="font-semibold text-xs text-[#292524]">No enquiries submitted yet</p>
            <p className="text-[11px] text-[#57534E]">Browse vendor categories and request your first wedding quotation.</p>
            <Button variant="primary" size="sm" asChild className="mt-2">
              <Link href="/vendors">Browse Wedding Services</Link>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

