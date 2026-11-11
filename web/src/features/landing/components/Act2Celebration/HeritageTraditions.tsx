"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TELANGANA_HERITAGE_TRADITIONS } from "../../data/traditions-data";
import { AuspiciousToran } from "../shared/AuspiciousDecorations";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";

export function HeritageTraditionsSection() {
  const { language } = useLanguage();
  const isTe = language === "te";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE3] to-[#FAF7F2] text-[#292524] overflow-hidden">
      {/* Auspicious Toran Top */}
      <AuspiciousToran className="mb-4 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#762B46]/10 border border-[#762B46]/20 text-[#762B46] text-xs font-semibold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#762B46]" />
              <span>{isTe ? "తెలంగాణ సంప్రదాయాలు" : "Sacred Wedding Heritage"}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-[#542034] mb-2">
              {isTe ? "మన సంప్రదాయాలు... మన వివాహ గర్వం" : "Traditions That Make Every Wedding Sacred"}
            </h3>

            <p className="text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
              {isTe
                ? "తరతరాలుగా వస్తున్న పవిత్ర ఆచారాలు... జీలకర్ర బెల్లం నుండి సన్నాయి మేళం వరకు ప్రతి క్రతువు వెనుక ఉన్న దివ్య అర్థం."
                : "Explore the authentic Telugu rituals passed down through generations, and the certified specialists who preserve them."}
            </p>
          </div>

          {/* Horizontal Scroll Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#F4EDE3] border border-[#E7DECF] text-[#762B46] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-[#762B46] hover:bg-[#542034] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Deck */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TELANGANA_HERITAGE_TRADITIONS.map((trad) => (
            <div
              key={trad.id}
              className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 snap-start rounded-2xl bg-white p-5 border border-[#E7DECF] hover:border-[#C5A46D] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Number Indicator */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4">
                  { }
                  <img
                    src={trad.photoUrl}
                    alt={isTe ? trad.nameTe : trad.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-xs font-bold text-[#FAF7F2]">
                    <span>{trad.ritualSymbol}</span>
                    <span>{trad.number}</span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <h4 className="font-serif font-bold text-base drop-shadow">
                      {isTe ? trad.nameTe : trad.nameEn}
                    </h4>
                  </div>
                </div>

                {/* Cultural Significance */}
                <p className="text-xs sm:text-sm text-[#57534E] font-serif leading-relaxed mb-4">
                  {isTe ? trad.significanceTe : trad.significanceEn}
                </p>

                {/* Essential Items */}
                <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E7DECF] mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#762B46] block mb-1.5">
                    {isTe ? "ముఖ్యమైన ఏర్పాట్లు:" : "Essential Components:"}
                  </span>
                  <div className="space-y-1">
                    {(isTe ? trad.essentialItemsTe : trad.essentialItemsEn).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-[#292524]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connected Category Link */}
              <div className="pt-3 border-t border-[#E7DECF] mt-auto">
                <Link
                  href={`/services/${trad.connectedCategorySlug}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#F4EDE3] hover:bg-[#762B46] text-[#762B46] hover:text-[#FAF7F2] font-semibold text-xs transition-colors flex items-center justify-between group/link"
                >
                  <span>{isTe ? trad.connectedCategoryTitleTe : trad.connectedCategoryTitleEn}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

