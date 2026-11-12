"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomerPageHeader } from "@/components/ui/customer-page-header";
import { Calendar, MapPin, Eye, PhoneCall, CheckCircle2, Store, RefreshCw } from "lucide-react";
import { useMyEnquiries } from "@/features/enquiries/hooks/useEnquiries";

export default function CustomerEnquiriesPage() {
  const { openAssistedModal } = useApp();
  const { data: apiEnquiries, isLoading, refetch } = useMyEnquiries();

  // Combine store enquiries with sample verified MVP customer enquiries
  const fallbackCustomerEnquiries = [
    {
      id: "enq-cust-1",
      referenceNumber: "ENQ-NAR-7721",
      categoryName: "Kalyana Mandapams",
      vendorName: "Sri Srinivasa Kalyana Mandapam",
      villageOrTown: "Singaram Village",
      mandal: "Narayanpet",
      weddingDate: "24 Dec 2026",
      status: "QUOTATION_RECEIVED",
      quoteAmount: "₹1,35,000",
      receivedAt: "Today, 11:15 AM",
      source: "ASSISTED_CALL"
    },
    {
      id: "enq-cust-2",
      referenceNumber: "ENQ-DAM-7719",
      categoryName: "Traditional Band Melam & Sannai",
      vendorName: "Sri Venkateshwara Sannai & Brass Band Troupe",
      villageOrTown: "Damaragidda",
      mandal: "Damaragidda",
      weddingDate: "15 Jan 2027",
      status: "VENDOR_ASSIGNED",
      quoteAmount: "Pending Vendor Quote",
      receivedAt: "Yesterday",
      source: "DIRECT_FORM"
    }
  ];

  const displayEnquiries = apiEnquiries && apiEnquiries.length > 0
    ? apiEnquiries.map((e: any) => ({
        id: e.id,
        referenceNumber: e.referenceNumber || `ENQ-${e.id.slice(0, 8).toUpperCase()}`,
        categoryName: e.categorySlug || "Wedding Service",
        vendorName: e.vendor?.businessName || "Assigned District Coordinator",
        villageOrTown: e.villageOrTown || "Narayanpet",
        mandal: e.mandal || "Narayanpet",
        weddingDate: e.eventDate ? new Date(e.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Muhurtham TBD",
        status: e.status || "VENDOR_ASSIGNED",
        quoteAmount: e.budget ? `₹${Number(e.budget).toLocaleString("en-IN")}` : "Flexible Estimate",
        receivedAt: e.createdAt ? new Date(e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently",
        source: e.source || "ASSISTED_CALL"
      }))
    : fallbackCustomerEnquiries;

  return (
    <div className="space-y-6 w-full font-body">
      <CustomerPageHeader
        title="My Wedding Enquiries & Quotations (నా విచారణలు)"
        subtitle="Track assisted coordinator requests, vendor responses, and received price estimates"
      >
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => refetch()} 
            className="h-8 text-xs font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => openAssistedModal()} className="font-semibold text-xs h-8">
            <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
            <span>Request New Callback</span>
          </Button>
        </div>
      </CustomerPageHeader>

      <div className="space-y-4">
        {displayEnquiries.map((enq) => (
          <Card key={enq.id} className="p-5 bg-white border border-[#E7DECF] rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-[#762B46] text-sm">{enq.referenceNumber}</span>
                <Badge variant="outline" className="border-[#C5A46D] text-[#762B46] bg-amber-50/50">
                  {enq.categoryName}
                </Badge>
                <Badge variant={enq.status === "QUOTATION_RECEIVED" ? "gold" : "secondary"}>
                  {enq.status === "QUOTATION_RECEIVED" ? "✓ Estimate Received" : "Connecting Local Vendor"}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Store className="w-4 h-4 text-[#762B46]" />
                <span>{enq.vendorName}</span>
              </div>

              <div className="text-[11px] text-[#57534E] flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#762B46]" />
                  <span>{enq.villageOrTown}, {enq.mandal}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>Wedding Date: {enq.weddingDate}</span>
                </span>
              </div>
            </div>

            <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-bold">Estimate</span>
                <span className="text-sm font-extrabold text-emerald-800">{enq.quoteAmount}</span>
              </div>
              <Button variant="secondary" size="sm" asChild className="h-8 text-xs font-semibold">
                <Link href={`/customer/enquiries/${enq.referenceNumber}`}>
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  <span>View Details</span>
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

