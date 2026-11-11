"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, FileText, MapPin, Calendar, Users, IndianRupee, Truck, ShieldCheck } from "lucide-react";

export default function CreateQuotationPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("50000");
  const [advanceAmount, setAdvanceAmount] = useState("15000");
  const [validDays, setValidDays] = useState("7");
  const [notes, setNotes] = useState("Includes standard sound setup, 2 green rooms, and dedicated stage coordinator.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/vendor/quotations");
  };

  return (
    <div className="w-full space-y-6 font-body">
      {/* Header */}
      <div className="pb-4 border-b border-[#E7DECF]">
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-[#292524]">
          Create Official Wedding Quotation
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Send an itemized, binding proposal directly to prospective families across Narayanpet & Mahabubnagar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
          
          {/* Main Form (8 columns) */}
          <div className="lg:col-span-8 space-y-5">
            <Card className="p-6 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#762B46] border-b border-[#E7DECF] pb-2">
                Proposal Details & Pricing Breakdown
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#292524] block mb-1">
                    Total Quoted Amount (₹) *
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] font-mono font-bold text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#292524] block mb-1">
                    Required Booking Advance (₹) *
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                    <input
                      type="number"
                      required
                      value={advanceAmount}
                      onChange={e => setAdvanceAmount(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] font-mono font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#292524] block mb-1">
                    Quotation Validity
                  </label>
                  <select
                    value={validDays}
                    onChange={e => setValidDays(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]"
                  >
                    <option value="5">Valid for 5 Days</option>
                    <option value="7">Valid for 7 Days</option>
                    <option value="14">Valid for 14 Days</option>
                    <option value="30">Valid for 30 Days</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#292524] block mb-1">
                    Travel / Transport Terms
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Free within 20 km; Included in estimate"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7DECF] bg-gray-50 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#292524] block mb-1">
                  Scope of Work & Inclusions
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/vendor/quotations">Cancel</Link>
                </Button>
                <Button type="submit" variant="primary" size="sm" className="gap-1.5 shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Quotation to Customer</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Customer & Enquiry Summary (4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#762B46] uppercase tracking-wider pb-2 border-b border-[#E7DECF]">
                <FileText className="w-4 h-4" />
                <span>Linked Enquiry Details</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase block">Customer</span>
                  <p className="font-bold text-[#292524]">Venkat Rao</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase block">Location</span>
                  <p className="font-medium text-[#292524] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#762B46]" />
                    <span>Singaram Village, Narayanpet</span>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase block">Event Date</span>
                  <p className="font-medium text-[#292524] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>24 Dec 2026 (600 Guests)</span>
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>0% Commission: Whatever total you agree on with the customer is 100% yours.</span>
              </div>
            </Card>
          </div>

        </div>
      </form>
    </div>
  );
}
