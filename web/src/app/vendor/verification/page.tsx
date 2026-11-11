"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ShieldCheck, CheckCircle2, UserCheck, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";

export default function VendorVerificationPage() {
  return (
    <div className="w-full space-y-6 font-body">
      {/* Reusable Header */}
      <VendorPageHeader
        title="Field Verification & Trust Status"
        subtitle="Manual physical trust verification ensures rural families in Narayanpet & Mahabubnagar book with peace of mind"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* Verification Status Banner & Details (8 columns) */}
        <div className="lg:col-span-8 space-y-5">
          <Card className="p-6 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DECF]">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-heading font-bold text-[#292524]">
                    Field Verified Partner
                  </h2>
                  <p className="text-xs text-[#57534E]">
                    Sri Srinivasa Kalyana Mandapam (Narayanpet)
                  </p>
                </div>
              </div>
              <Badge variant="success" className="self-start sm:self-auto py-1 px-3 text-xs">
                Active on Marketplace
              </Badge>
            </div>

            <div className="space-y-3.5 text-xs text-[#57534E]">
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#292524] block">Physical Location & Facility Inspection</span>
                  <span className="text-[11px] text-[#57534E]">
                    Verified in person at Station Road, Narayanpet Town by District Coordinator.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#292524] block">Government Identity & Direct Bank Payout Verification</span>
                  <span className="text-[11px] text-[#57534E]">
                    Aadhaar / Trade registration verified for direct UPI advance settlements.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#292524] block">Past Wedding Performance & Family References</span>
                  <span className="text-[11px] text-[#57534E]">
                    3 village wedding references confirmed in Damaragidda and Singaram.
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Verification Coordinator Info (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#762B46] uppercase tracking-wider pb-2 border-b border-[#E7DECF]">
              <UserCheck className="w-4 h-4" />
              <span>Assigned District Coordinator</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <p className="font-bold text-[#292524]">K. Venkat Reddy</p>
              <p className="text-[11px] text-[#57534E]">Narayanpet Rural Operations Lead</p>
              <div className="flex items-center gap-1.5 text-[#762B46] font-semibold pt-1">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 94401 23456</span>
              </div>
            </div>
            <p className="text-[11px] text-[#78716C] border-t border-[#E7DECF] pt-2">
              For updating your service capacity, address, or adding new equipment, contact your coordinator directly.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
