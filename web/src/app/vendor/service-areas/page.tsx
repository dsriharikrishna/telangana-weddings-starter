"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Save, CheckCircle2, Truck } from "lucide-react";
import { TELANGANA_LOCATIONS } from "@/data";

export default function VendorServiceAreasPage() {
  const [selectedMandals, setSelectedMandals] = useState<string[]>([
    "narayanpet-mandal", "damaragidda", "makthal", "marikal", "bhoothpur"
  ]);
  const [willTravel, setWillTravel] = useState(true);
  const [policy, setPolicy] = useState("Free travel within 20 km from base; nominal transport fuel charges for distant villages.");
  const [saved, setSaved] = useState(false);

  const toggleMandal = (id: string) => {
    setSelectedMandals(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="w-full space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7DECF]">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-[#292524]">
            Manage Service Areas & Rural Coverage
          </h1>
          <p className="text-xs text-[#57534E] mt-0.5">
            Define which mandals and villages in Narayanpet & Mahabubnagar your team travels to for wedding assignments
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Coverage Areas Updated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 w-full">
        {/* District & Mandal Selection Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {TELANGANA_LOCATIONS.districts.map((district) => (
            <Card key={district.id} className="p-5 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#762B46]" />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#292524]">
                      {district.nameEn} ({district.nameTe})
                    </h3>
                    <p className="text-[11px] text-[#78716C]">{district.mandals.length} Mandals in District</p>
                  </div>
                </div>
                <span className="text-xs text-[#762B46] font-semibold">
                  {district.mandals.filter(m => selectedMandals.includes(m.id)).length} Active
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {district.mandals.map((m) => {
                  const isSelected = selectedMandals.includes(m.id);
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => toggleMandal(m.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isSelected
                          ? "bg-[#762B46] text-white border-[#762B46] shadow-xs"
                          : "bg-[#FAF7F2] text-[#292524] border-[#E7DECF] hover:border-[#762B46]"
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight">{m.nameEn}</span>
                      <span className={`text-[10px] mt-1 ${isSelected ? "text-gray-200" : "text-[#762B46]"}`}>
                        {m.nameTe}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Travel Policy Card */}
        <Card className="p-5 bg-white border border-[#E7DECF] rounded-2xl shadow-xs space-y-4 w-full">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E7DECF]">
            <Truck className="w-4 h-4 text-[#762B46]" />
            <h3 className="font-heading font-bold text-sm text-[#292524]">
              Rural Travel & Logistics Policy
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#292524] cursor-pointer">
              <input
                type="checkbox"
                checked={willTravel}
                onChange={(e) => setWillTravel(e.target.checked)}
                className="rounded text-[#762B46] focus:ring-[#762B46] border-[#E7DECF]"
              />
              <span>Our team is equipped to travel to remote villages and hamlet venues</span>
            </label>

            <div>
              <label className="block text-xs font-semibold text-[#57534E] mb-1">
                Travel Charge Policy (Shown transparently to customers)
              </label>
              <textarea
                rows={2}
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#762B46]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="sm" className="gap-1.5 shadow-sm">
              <Save className="w-3.5 h-3.5" />
              <span>Save Service Areas</span>
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
