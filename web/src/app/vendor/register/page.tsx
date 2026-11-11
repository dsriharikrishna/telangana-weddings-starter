"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Sparkles,
  Phone,
  User,
  Building,
  ArrowRight,
  Clock,
  Coins
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TELANGANA_LOCATIONS, WEDDING_CATEGORIES } from "@/data";

export default function VendorRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    district: "narayanpet",
    mandal: "narayanpet",
    primaryCategory: "band-melam-sannai",
    yearsOfExperience: "5-10",
    agreedToTerms: false
  });

  const selectedDistrictObj = TELANGANA_LOCATIONS.districts.find(d => d.id === formData.district) || TELANGANA_LOCATIONS.districts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
      {submitted ? (
        <Card className="max-w-xl mx-auto border border-[#E7DECF] bg-white p-6 sm:p-10 shadow-lg rounded-3xl text-center space-y-5 animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Registration Successful
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#292524] mt-3">
              Welcome, {formData.businessName || "Partner"}!
            </h1>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2 max-w-md mx-auto leading-relaxed">
              Your vendor application for <strong className="text-[#762B46]">{selectedDistrictObj.nameEn}</strong> has been logged. Our district coordinator will reach out to conduct your standard rural field verification.
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#E7DECF] p-4 rounded-2xl text-left space-y-2 text-xs">
            <div className="flex items-center justify-between font-semibold text-[#292524] pb-2 border-b border-[#E7DECF]">
              <span>Application Details</span>
              <span className="text-emerald-700 font-bold">Status: Pending Verification</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#57534E]">
              <div>Owner: <strong className="text-[#292524]">{formData.ownerName || "—"}</strong></div>
              <div>Phone: <strong className="text-[#292524]">{formData.phone || "—"}</strong></div>
              <div>District: <strong className="text-[#292524]">{selectedDistrictObj.nameEn}</strong></div>
              <div>Category: <strong className="text-[#292524]">{formData.primaryCategory}</strong></div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" asChild className="rounded-xl shadow-md">
              <Link href="/vendor/dashboard" className="flex items-center gap-2">
                <span>Go to Vendor Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Benefits & Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#762B46]/10 text-[#762B46] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Partner Onboarding</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#292524] leading-tight">
                Grow Your Wedding Business Across Telangana
              </h1>
              <p className="text-xs sm:text-sm text-[#57534E] mt-2 leading-relaxed">
                Connect directly with families planning weddings in Narayanpet, Mahabubnagar, and surrounding villages with zero middleman commissions.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E7DECF] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#762B46]/10 text-[#762B46] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#292524]">Field-Verified Trust Badge</h3>
                  <p className="text-[11px] text-[#57534E] mt-0.5">
                    District team verifies your work locally so rural families book with 100% confidence.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E7DECF] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#292524]">Direct Payment Settlements</h3>
                  <p className="text-[11px] text-[#57534E] mt-0.5">
                    Guaranteed advance token payments directly into your bank or UPI account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E7DECF] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#292524]">Muhurtham Season Calendar</h3>
                  <p className="text-[11px] text-[#57534E] mt-0.5">
                    Manage busy dates, quotations, and village coverage from your smartphone.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#542034] text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C5A46D]">
                <Store className="w-4 h-4" />
                <span>Specialized Categories Supported</span>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed">
                Including traditional <strong>Band Melam & Sannai Melam</strong>, Function Halls, Caterers, Decorators, Priests, and Sound Systems.
              </p>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7">
            <Card className="border border-[#E7DECF] bg-white p-6 sm:p-8 shadow-md rounded-3xl">
              <div className="pb-4 border-b border-[#E7DECF] mb-5">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-[#762B46]">
                  Register Your Wedding Service
                </h2>
                <p className="text-xs text-[#57534E] mt-0.5">
                  Complete this quick form to create your vendor workspace (approx. 2 minutes)
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
                {/* Business Name */}
                <div>
                  <label className="font-semibold text-[#292524] block mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#762B46]" />
                    <span>Business / Troupe Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Srinivasa Band & Sannai Melam"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] text-xs transition-all"
                  />
                </div>

                {/* Owner Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-semibold text-[#292524] block mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#762B46]" />
                      <span>Owner / Primary Artist *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] text-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#292524] block mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#762B46]" />
                      <span>Mobile Number (WhatsApp/OTP) *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94401 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] text-xs font-mono transition-all"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="font-semibold text-[#292524] block mb-1.5 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-[#762B46]" />
                    <span>Primary Service Category *</span>
                  </label>
                  <select
                    value={formData.primaryCategory}
                    onChange={(e) => setFormData({ ...formData, primaryCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] text-xs transition-all cursor-pointer"
                  >
                    {WEDDING_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.nameEn} ({cat.nameTe})
                      </option>
                    ))}
                  </select>
                </div>

                {/* District and Mandal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-semibold text-[#292524] block mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#762B46]" />
                      <span>District Headquarters *</span>
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => {
                        const newDist = e.target.value;
                        const distObj = TELANGANA_LOCATIONS.districts.find(d => d.id === newDist);
                        setFormData({
                          ...formData,
                          district: newDist,
                          mandal: distObj?.mandals[0]?.id || ""
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] text-xs transition-all cursor-pointer"
                    >
                      {TELANGANA_LOCATIONS.districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.nameEn} ({d.nameTe})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#292524] block mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#762B46]" />
                      <span>Base Mandal *</span>
                    </label>
                    <select
                      value={formData.mandal}
                      onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] text-xs transition-all cursor-pointer"
                    >
                      {selectedDistrictObj.mandals.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.nameEn} ({m.nameTe})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Years in Business */}
                <div>
                  <label className="font-semibold text-[#292524] block mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#762B46]" />
                    <span>Experience in Wedding Services</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"].map((exp) => (
                      <button
                        type="button"
                        key={exp}
                        onClick={() => setFormData({ ...formData, yearsOfExperience: exp })}
                        className={`py-2 px-2 text-center rounded-xl border text-[11px] font-semibold transition-all ${
                          formData.yearsOfExperience === exp
                            ? "bg-[#762B46] text-white border-[#762B46]"
                            : "bg-[#FAF7F2] text-[#57534E] border-[#E7DECF] hover:border-[#762B46]"
                        }`}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-[#57534E] leading-normal">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                      className="mt-0.5 rounded text-[#762B46] focus:ring-[#762B46] border-[#E7DECF]"
                    />
                    <span>
                      I agree to the rural vendor terms and consent to physical field verification in my village/mandal by the platform coordinator.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <Button type="submit" variant="primary" size="lg" className="w-full rounded-xl shadow-md py-3 text-xs font-bold">
                    Register Business & Launch Dashboard
                  </Button>
                </div>

                <p className="text-center text-[10px] text-[#78716C] pt-1">
                  Already registered?{" "}
                  <Link href="/vendor/dashboard" className="text-[#762B46] font-bold hover:underline">
                    Go directly to your vendor dashboard
                  </Link>
                </p>
              </form>
            </Card>
          </div>

        </div>
      )}
    </div>
  );
}
