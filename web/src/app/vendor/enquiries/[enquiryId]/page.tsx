"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Phone, 
  MessageCircle, 
  Coins, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  IndianRupee,
  ShieldCheck,
  Send
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VendorEnquiryDetailPage({ params }: { params: Promise<{ enquiryId: string }> }) {
  const resolvedParams = use(params);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);

  // Mock enquiry detail mapped to API contract fields
  const enquiry = {
    id: resolvedParams.enquiryId,
    code: "ENQ-NAR-7721",
    customerName: "Venkat Rao",
    phone: "+91 94401 54321",
    district: "Narayanpet",
    mandal: "Narayanpet",
    villageOrTown: "Singaram Village",
    eventDate: "24 Dec 2026",
    serviceRequested: "Kalyana Mandapam with AC Rooms & Dining Hall",
    guestCount: 600,
    budgetPaise: 15000000,
    budgetFormatted: "₹1,50,000",
    receivedAt: "Today, 10:30 AM",
    notes: "Muhurtham at 9:15 AM. Need stage decoration and 4 AC bride/groom rooms ready by 23rd evening.",
    urgency: "High — Muhurtham date booked across 3 families"
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteAmount) return;
    setQuoteSent(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <Link 
        href="/vendor/enquiries" 
        className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Enquiries</span>
      </Link>

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#542034] to-[#762B46] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-[#C5A46D]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-bold">
              Enquiry Reference: {enquiry.code}
            </span>
            <Badge variant="outline" className="text-[10px] border-[#C5A46D] text-[#C5A46D] bg-black/20">
              Verified Lead
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading mt-1">
            {isUnlocked ? enquiry.customerName : enquiry.customerName.split(" ")[0] + " ***"}
          </h1>
          <p className="text-xs text-stone-200 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>{enquiry.villageOrTown}, {enquiry.mandal} Mandal, {enquiry.district}</span>
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {!isUnlocked ? (
            <Button variant="gold" size="sm" onClick={handleUnlock} className="font-bold">
              <Unlock className="w-3.5 h-3.5 mr-1.5" />
              <span>Unlock Contact (1 Credit)</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                <a href={`tel:${enquiry.phone.replace(/\s+/g, '')}`}>
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  <span>Call Now</span>
                </a>
              </Button>
              <Button variant="gold" size="sm" asChild>
                <a 
                  href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=Namaskaram%20${encodeURIComponent(enquiry.customerName)},%20I%20am%20reaching%20out%20regarding%20your%20wedding%20enquiry%20${enquiry.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                  <span>WhatsApp</span>
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Requirements and Contact info */}
        <div className="md:col-span-2 space-y-6">
          {/* Wedding Event Specifics */}
          <Card className="p-6 bg-white border border-[#E7DECF] rounded-2xl space-y-4">
            <h2 className="text-base font-bold text-[#292524] flex items-center gap-2 border-b border-stone-100 pb-3">
              <Calendar className="w-4 h-4 text-[#762B46]" />
              <span>Wedding Event Requirements</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DECF]/60">
                <div className="text-stone-500 text-[10px] uppercase font-bold">Muhurtham Date</div>
                <div className="font-bold text-stone-900 mt-1 flex items-center gap-1 text-sm">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>{enquiry.eventDate}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DECF]/60">
                <div className="text-stone-500 text-[10px] uppercase font-bold">Expected Guests</div>
                <div className="font-bold text-stone-900 mt-1 flex items-center gap-1 text-sm">
                  <Users className="w-3.5 h-3.5 text-[#762B46]" />
                  <span>{enquiry.guestCount} Guests</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DECF]/60">
                <div className="text-stone-500 text-[10px] uppercase font-bold">Family Budget</div>
                <div className="font-bold text-emerald-800 mt-1 text-sm">
                  {enquiry.budgetFormatted}
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <div className="text-xs font-semibold text-stone-800">Requested Service:</div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-stone-800 font-medium">
                {enquiry.serviceRequested}
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-xs font-semibold text-stone-800">Special Notes from Family:</div>
              <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed">
                "{enquiry.notes}"
              </p>
            </div>
          </Card>

          {/* Quick Quotation Form */}
          <Card className="p-6 bg-white border border-[#E7DECF] rounded-2xl space-y-4">
            <h2 className="text-base font-bold text-[#292524] flex items-center gap-2 border-b border-stone-100 pb-3">
              <Send className="w-4 h-4 text-[#762B46]" />
              <span>Send Quotation / Estimate to Family</span>
            </h2>

            {quoteSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Quotation of <strong>₹{quoteAmount}</strong> sent successfully! The customer has received an SMS/WhatsApp notification with your quote.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSendQuote} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Your Estimate Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-stone-400 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 135000"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#762B46] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Notes / Inclusions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Includes full mandapam lighting, generator backup for 12 hours, and 4 AC rooms."
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#762B46] text-xs"
                  />
                </div>

                <Button type="submit" variant="primary" size="sm" className="font-semibold">
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  <span>Submit Estimate to Customer</span>
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Right Column: Contact details & Matchmaking Trust */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border border-[#E7DECF] rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
              Family Contact Information
            </h3>

            {isUnlocked ? (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-stone-900 font-semibold">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{enquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <MapPin className="w-4 h-4 text-[#762B46]" />
                  <span>{enquiry.villageOrTown}, {enquiry.mandal}</span>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <Button variant="primary" size="sm" asChild className="w-full text-xs">
                    <a href={`tel:${enquiry.phone.replace(/\s+/g, '')}`}>
                      <Phone className="w-3.5 h-3.5 mr-1" />
                      <span>Call Customer</span>
                    </a>
                  </Button>
                  <Button variant="gold" size="sm" asChild className="w-full text-xs">
                    <a 
                      href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=Namaskaram%20${encodeURIComponent(enquiry.customerName)},%20I%20am%20reaching%20out%20regarding%20your%20wedding%20enquiry%20${enquiry.code}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Direct Contact Masked</div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Unlock to reveal full customer mobile number and WhatsApp link.
                  </p>
                </div>
                <Button variant="gold" size="sm" onClick={handleUnlock} className="w-full text-xs font-bold">
                  <Unlock className="w-3.5 h-3.5 mr-1" />
                  <span>Unlock Lead (1 Credit)</span>
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-5 bg-[#FAF7F2] border border-[#E7DECF] rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-[#762B46] font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span>TelanganaWeddings Trust Guarantee</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Every lead generated on the platform is pre-verified via OTP and location validation. Direct negotiations and contract terms are handled directly between your team and the wedding family.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

