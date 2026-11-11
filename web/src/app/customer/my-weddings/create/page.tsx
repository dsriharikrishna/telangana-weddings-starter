"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { TELANGANA_LOCATIONS } from "@/data";

export default function CreateWeddingEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [district, setDistrict] = useState("narayanpet");
  const [mandal, setMandal] = useState("narayanpet-mandal");
  const [village, setVillage] = useState("");
  const [guests, setGuests] = useState("500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/customer/my-weddings");
  };

  return (
    <div className="space-y-6">
      <Link href="/customer/my-weddings" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to My Weddings</span>
      </Link>

      <div className="pb-3 border-b border-[#E7DECF]">
        <h1 className="text-xl font-bold text-[#292524]">Create Wedding Event</h1>
        <p className="text-xs text-[#57534E]">Organize budget, dates, and vendors for your family ceremony</p>
      </div>

      <Card className="p-6 bg-white border border-[#E7DECF] max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#57534E] block mb-1">
              Event Title (వివాహ వేడుక పేరు) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh & Sunitha Wedding"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#57534E] block mb-1">
                Muhurtham Date (ముహూర్తం తేదీ) *
              </label>
              <input
                type="date"
                required
                value={weddingDate}
                onChange={e => setWeddingDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#57534E] block mb-1">
                Expected Guests (అతిథుల సంఖ్య)
              </label>
              <input
                type="number"
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#57534E] block mb-1">District</label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
              >
                {TELANGANA_LOCATIONS.districts.map(d => (
                  <option key={d.id} value={d.id}>{d.nameEn}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#57534E] block mb-1">Mandal</label>
              <input
                type="text"
                placeholder="e.g. Narayanpet"
                value={mandal}
                onChange={e => setMandal(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#57534E] block mb-1">Village / Town</label>
              <input
                type="text"
                required
                placeholder="e.g. Singaram"
                value={village}
                onChange={e => setVillage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" asChild>
              <Link href="/customer/my-weddings">Cancel</Link>
            </Button>
            <Button type="submit" variant="primary" size="sm">
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>Save & Start Checklist</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

