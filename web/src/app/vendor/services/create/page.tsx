"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, IndianRupee, Layers, Check } from "lucide-react";

export default function CreateServicePackagePage() {
  const router = useRouter();
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("25000");
  const [description, setDescription] = useState("");
  const [inclusions, setInclusions] = useState("Full Muhurtham Coverage, Traditional Uniforms, 8 Artists Troupe");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/vendor/services");
  };

  return (
    <div className="w-full space-y-6 font-body">
      <Link href="/vendor/services" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Services & Packages</span>
      </Link>

      <div className="pb-4 border-b border-[#E7DECF]">
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-[#292524]">
          Create Service Package
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Define package offerings, crew size, and transparent fixed pricing for rural weddings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
          
          <div className="lg:col-span-8 space-y-5">
            <Card className="p-6 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#762B46] border-b border-[#E7DECF] pb-2">
                Package Specification
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#292524] block mb-1">
                    Package Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Standard 8-Artist Sannai Melam"
                    value={packageName}
                    onChange={e => setPackageName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#292524] block mb-1">
                    Package Price (₹) *
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46] font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#292524] block mb-1">
                  Key Inclusions & Deliverables
                </label>
                <textarea
                  rows={2}
                  value={inclusions}
                  onChange={e => setInclusions(e.target.value)}
                  placeholder="Items or equipment included..."
                  className="w-full p-3 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#292524] block mb-1">
                  Detailed Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Explain your performance, traditional instruments, or setup details..."
                  className="w-full p-3 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" asChild>
                  <Link href="/vendor/services">Cancel</Link>
                </Button>
                <Button type="submit" variant="primary" size="sm" className="shadow-sm">
                  Save Package
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#762B46] uppercase tracking-wider pb-2 border-b border-[#E7DECF]">
                <Layers className="w-4 h-4" />
                <span>Pricing Best Practice</span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Rural families in Narayanpet and Mahabubnagar prefer transparent all-inclusive quotes without hidden fuel or food surcharges.
              </p>
              <div className="p-3 bg-[#FAF7F2] rounded-xl text-[11px] text-[#292524] space-y-1.5 border border-[#E7DECF]">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Listings get 3x more bookings</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Clear cancellation terms build trust</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </form>
    </div>
  );
}
