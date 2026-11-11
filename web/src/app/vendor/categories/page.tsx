"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WEDDING_CATEGORIES } from "@/data";
import { Check, Store, Info, CheckCircle2 } from "lucide-react";

export default function VendorCategoriesPage() {
  const [selectedCats, setSelectedCats] = useState<string[]>([
    "band-melam-sannai",
    "function-halls"
  ]);
  const [saved, setSaved] = useState(false);

  const toggleCategory = (slug: string) => {
    setSelectedCats(prev => 
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
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
            Select Your Wedding Service Categories
          </h1>
          <p className="text-xs text-[#57534E] mt-0.5">
            Vendors in Telangana can provide multiple specialized services across all 18 rural categories
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Categories Saved Successfully!</span>
          </div>
        )}
      </div>

      {/* Main Full-Width Form */}
      <form onSubmit={handleSave} className="space-y-6 w-full">
        <div className="p-4 rounded-2xl bg-white border border-[#E7DECF] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#762B46]/10 text-[#762B46] flex items-center justify-center font-bold shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#292524]">
                {selectedCats.length} Categories Active
              </div>
              <div className="text-[11px] text-[#57534E]">
                Select all services that your business or troupe offers in the district
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" size="sm" className="shadow-sm">
            Save Active Categories
          </Button>
        </div>

        {/* 18 Categories in Responsive Full-Width Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 w-full">
          {WEDDING_CATEGORIES.map(c => {
            const isSelected = selectedCats.includes(c.slug);
            return (
              <div
                key={c.id}
                onClick={() => toggleCategory(c.slug)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between h-28 relative ${
                  isSelected 
                    ? "bg-[#762B46] text-white border-[#762B46] shadow-sm"
                    : "bg-white text-[#292524] border-[#E7DECF] hover:border-[#762B46] hover:bg-[#FAF7F2]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? "bg-white/20 text-[#C5A46D]" : "bg-[#FAF7F2] text-[#762B46]"
                    }`}>
                      #{c.number}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#C5A46D] text-[#542034] flex items-center justify-center font-bold text-xs">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-xs mt-2 truncate">{c.nameEn}</p>
                </div>
                <p className={`text-[11px] truncate ${isSelected ? "text-gray-200" : "text-[#762B46]"}`}>
                  {c.nameTe}
                </p>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
