"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FAMILY_ARRIVALS_MEMORIES } from "../../data/family-data";
import { AuspiciousToran } from "../shared/AuspiciousDecorations";
import { Sparkles, ArrowRight } from "lucide-react";

export function FamilyArrivalsSection() {
  const { language } = useLanguage();
  const isTe = language === "te";
  const [activeMemoryId, setActiveMemoryId] = useState<string>("fam-01");

  return (
    <section className="relative w-full py-16 sm:py-20 bg-gradient-to-b from-[#542034] via-[#451829] to-[#542034] text-[#FAF7F2] overflow-hidden">
      {/* Decorative Auspicious Toran */}
      <AuspiciousToran className="mb-4 opacity-60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#C5A46D]/40 text-[#DFCA9B] text-xs font-semibold tracking-wide uppercase mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>{isTe ? "కుటుంబ బంధాలు" : "Family Arrivals & Banter"}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-[#FAF7F2] mb-2">
            {isTe ? "బంధువులు వచ్చారు... సందడి మొదలైంది!" : "The House is No Longer Quiet. The Family is Here!"}
          </h3>

          <p className="text-sm sm:text-base text-[#E7DECF]/85 font-sans leading-relaxed">
            {isTe
              ? "పెద్దల ఆశీర్వాదాలు, బాబాయ్ పర్యవేక్షణ, అత్తమ్మ వంటల తనిఖీ మరియు బావమరుదుల అల్లరి... ఇదీ మన తెలంగాణ పెళ్లి కళ!"
              : "Every Telangana wedding comes alive through its colorful characters. Hover or tap each to discover their role in making the wedding unforgettable."}
          </p>
        </div>

        {/* 4 Family Memory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FAMILY_ARRIVALS_MEMORIES.map((fam) => {
            const isSelected = activeMemoryId === fam.id;
            return (
              <div
                key={fam.id}
                onClick={() => setActiveMemoryId(fam.id)}
                className={`relative rounded-2xl p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? "bg-[#FAF7F2] text-[#292524] border-[#C5A46D] shadow-2xl scale-[1.02]"
                    : "bg-[#542034]/70 hover:bg-[#542034] text-[#FAF7F2] border-[#C5A46D]/20 hover:border-[#C5A46D]/50"
                }`}
              >
                <div>
                  {/* Photo & Role Badge */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 shadow">
                    { }
                    <img
                      src={fam.photoUrl}
                      alt={isTe ? fam.nameTe : fam.nameEn}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[#DFCA9B] font-semibold border border-[#C5A46D]/40">
                        {fam.avatar} {isTe ? fam.roleBadgeTe : fam.roleBadgeEn}
                      </span>
                    </div>
                  </div>

                  {/* Character Title */}
                  <h4 className={`text-base font-serif font-bold mb-1.5 ${isSelected ? "text-[#762B46]" : "text-[#DFCA9B]"}`}>
                    {isTe ? fam.nameTe : fam.nameEn}
                  </h4>

                  {/* Authentic Banter Quote */}
                  <p className={`text-xs italic mb-3 font-serif leading-relaxed ${isSelected ? "text-stone-700" : "text-[#E7DECF]/80"}`}>
                    &quot;{isTe ? fam.quoteTe : fam.quoteEn}&quot;
                  </p>
                </div>

                {/* Relatable Memory & Connected Marketplace Service */}
                <div className="pt-3 border-t border-[#C5A46D]/20 mt-auto">
                  <p className={`text-[11px] mb-2 ${isSelected ? "text-stone-600" : "text-[#E7DECF]/70"}`}>
                    {isTe ? fam.relatableBanterTe : fam.relatableBanterEn}
                  </p>

                  <Link
                    href={`/services/${fam.connectedCategorySlug}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold group/link ${
                      isSelected ? "text-[#762B46] hover:text-[#542034]" : "text-[#C5A46D] hover:text-[#DFCA9B]"
                    }`}
                  >
                    <span>{isTe ? fam.connectedCategoryTitleTe : fam.connectedCategoryTitleEn}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

