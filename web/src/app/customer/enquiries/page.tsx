"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CustomerEnquiriesPage() {
  const { enquiries, openAssistedModal } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
        <div>
          <h1 className="text-xl font-bold text-[#292524]">Enquiries & Quotations</h1>
          <p className="text-xs text-[#57534E]">All assisted phone requests and quotation submissions</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => openAssistedModal()}>
          Submit New Enquiry
        </Button>
      </div>

      <div className="space-y-3">
        {enquiries.length > 0 ? (
          enquiries.map(enq => (
            <Card key={enq.id} className="p-4 bg-white border border-[#E7DECF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#762B46]">{enq.referenceNumber}</span>
                  <Badge variant="gold">{enq.source.replace("_", " ")}</Badge>
                  <Badge variant="success">{enq.status.replace("_", " ")}</Badge>
                </div>
                <p className="font-bold text-[#292524] mt-1">{enq.categorySlug}</p>
                <p className="text-[11px] text-[#57534E]">
                  Location: {enq.villageOrTown}, {enq.mandal} • Date: {enq.weddingDate || "TBD"}
                </p>
              </div>

              <Button variant="secondary" size="sm" asChild>
                <Link href={`/customer/enquiries/${enq.id}`}>
                  View Details
                </Link>
              </Button>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-[#E7DECF] text-xs text-[#57534E]">
            No enquiries recorded yet. Use the Assisted Booking button or vendor cards to request quotations.
          </div>
        )}
      </div>
    </div>
  );
}

