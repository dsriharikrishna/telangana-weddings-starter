"use client";

import React, { use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Phone, 
  Store, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  ShieldCheck,
  FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EnquiryDetailsPage({ params }: { params: Promise<{ enquiryId: string }> }) {
  const resolvedParams = use(params);
  const enquiryId = resolvedParams.enquiryId;

  // Mock enquiry details for customer
  const enquiry = {
    referenceNumber: enquiryId,
    categoryName: "Kalyana Mandapams",
    serviceRequested: "Grand Kalyana Mandapam with AC Rooms & Dining Hall",
    vendorName: "Sri Srinivasa Kalyana Mandapam",
    vendorPhone: "+91 94401 54321",
    vendorLocation: "Station Road, Narayanpet Town",
    district: "Narayanpet",
    mandal: "Narayanpet",
    village: "Singaram Village",
    eventDate: "24 Dec 2026",
    estimatedGuests: 600,
    quoteStatus: "RECEIVED",
    quoteAmount: "₹1,35,000",
    quoteInclusions: "Includes full AC hall from 23rd evening 6 PM to 24th evening 4 PM, 4 AC guest rooms, and silent generator backup.",
    coordinatorName: "Venkat (Narayanpet Rural Desk)",
    coordinatorPhone: "+91 94401 00000"
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-body">
      <Link 
        href="/customer/enquiries" 
        className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to My Enquiries</span>
      </Link>

      {/* Main Status Header Card */}
      <Card className="p-6 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7DECF] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#762B46]">{enquiry.referenceNumber}</span>
              <Badge variant="outline" className="border-[#C5A46D] text-[#762B46] bg-amber-50/60">
                {enquiry.categoryName}
              </Badge>
            </div>
            <h1 className="text-xl font-bold font-heading text-[#292524] mt-1">
              Enquiry for {enquiry.vendorName}
            </h1>
            <p className="text-xs text-[#57534E] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#762B46]" />
              <span>Event Location: {enquiry.village}, {enquiry.mandal} Mandal</span>
            </p>
          </div>

          <Badge variant="success" className="py-1 px-3 text-xs self-start sm:self-auto">
            ✓ Quotation Received
          </Badge>
        </div>

        {/* Received Estimate Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 to-emerald-50/50 border border-amber-200/70 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                Vendor Official Estimate
              </span>
              <div className="text-2xl font-extrabold text-emerald-800 font-heading">
                {enquiry.quoteAmount}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                <a href={`tel:${enquiry.vendorPhone.replace(/\s+/g, '')}`}>
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  <span>Call Vendor</span>
                </a>
              </Button>
              <Button variant="gold" size="sm" asChild>
                <a 
                  href={`https://wa.me/${enquiry.vendorPhone.replace(/[^0-9]/g, '')}?text=Namaskaram%20${encodeURIComponent(enquiry.vendorName)},%20I%20am%20calling%20regarding%20the%20wedding%20quotation%20${enquiry.referenceNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                  <span>WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>
          <p className="text-xs text-stone-700 bg-white/80 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
            "{enquiry.quoteInclusions}"
          </p>
        </div>

        {/* Wedding Specifics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DECF]/80">
            <span className="text-stone-400 font-bold text-[10px] uppercase block">Muhurtham Date</span>
            <span className="font-bold text-stone-900 mt-1 flex items-center gap-1.5 text-sm">
              <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{enquiry.eventDate}</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DECF]/80">
            <span className="text-stone-400 font-bold text-[10px] uppercase block">Expected Guests</span>
            <span className="font-bold text-stone-900 mt-1 text-sm block">
              {enquiry.estimatedGuests} Guests
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DECF]/80">
            <span className="text-stone-400 font-bold text-[10px] uppercase block">Assigned Coordinator</span>
            <span className="font-semibold text-emerald-800 mt-1 text-xs block">
              {enquiry.coordinatorName}
            </span>
          </div>
        </div>

        {/* Trust Note */}
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DECF] text-xs text-[#57534E] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#762B46]">TelanganaWeddings Zero Commission Assurance</p>
            <p className="text-[11px] text-stone-600 mt-0.5">
              You pay 100% directly to the vendor with zero middleman commissions or hidden booking fees.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

