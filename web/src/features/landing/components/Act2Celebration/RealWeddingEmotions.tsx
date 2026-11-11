"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { WEDDING_EMOTIONS_DATA } from "../../data/emotions-data";
import { AuspiciousToran } from "../shared/AuspiciousDecorations";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function RealWeddingEmotions() {
  const { language } = useLanguage();
  const isTe = language === "te";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-gradient-to-b from-[#542034] via-[#381120] to-[#FAF7F2] text-[#FAF7F2] overflow-hidden">
      {/* Decorative Auspicious Toran */}
      <AuspiciousToran className="mb-4 opacity-60" />

      {/* Ambient Bokeh */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#D9894C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#C5A46D]/40 text-[#DFCA9B] text-xs font-semibold tracking-wide uppercase mb-3 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{isTe ? "అసలైన భావోద్వేగాలు" : "Real Wedding Emotions"}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-[#FAF7F2] mb-2">
              {isTe ? "నవ్వులు ఉంటాయి... ఆకలి ఉంటుంది... కన్నీళ్లు ఉంటాయి!" : "Laughter, Feasts, Banter & Tears: Every True Emotion"}
            </h3>

            <p className="text-sm sm:text-base text-[#E7DECF]/85 font-sans leading-relaxed">
              {isTe
                ? "పెళ్లి కేవలం పూల అలంకరణ మాత్రమే కాదు... అది ఒక కుటుంబం అనుభవించే నవరసాల ఆత్మీయ సంగమం."
                : "A Telugu wedding is unforgettable because every generation lives through heartfelt laughter, playful feuds, legendary feasts, and tearful hugs."}
            </p>
          </div>

          {/* Scroll Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/25 border border-[#C5A46D]/40 text-[#DFCA9B] hover:text-[#FAF7F2] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/25 border border-[#C5A46D]/40 text-[#DFCA9B] hover:text-[#FAF7F2] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Emotion Cards Scroll Track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {WEDDING_EMOTIONS_DATA.map((emo) => (
            <div
              key={emo.id}
              className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start rounded-2xl p-1 bg-gradient-to-br from-[#DFCA9B]/50 via-[#C5A46D]/30 to-[#9E7D46]/40 shadow-xl flex flex-col group"
            >
              <div className="rounded-[14px] bg-[#292524] p-4 text-[#FAF7F2] h-full flex flex-col justify-between border border-[#C5A46D]/30">
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3">
                    { }
                    <img
                      src={emo.photoUrl}
                      alt={isTe ? emo.titleTe : emo.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292524] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-[#C5A46D]/40 text-xs font-bold text-[#DFCA9B]">
                      <span>{emo.emoji}</span>
                      <span>{isTe ? emo.titleTe : emo.titleEn}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#DFCA9B] font-semibold mb-1">
                    {isTe ? emo.subtitleTe : emo.subtitleEn}
                  </p>

                  <p className="text-xs sm:text-sm text-[#FAF7F2] font-serif italic mb-4 leading-relaxed">
                    &quot;{isTe ? emo.quoteTe : emo.quoteEn}&quot;
                  </p>
                </div>

                {/* Connected Service */}
                <div className="pt-3 border-t border-[#C5A46D]/20">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                    {isTe ? "సంబంధిత సేవలు" : "Capturing This Moment"}
                  </span>
                  <Link
                    href={`/services/${emo.connectedCategorySlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DFCA9B] hover:text-[#FAF7F2] group-hover:translate-x-0.5 transition-all"
                  >
                    <span>{isTe ? emo.connectedCategoryTitleTe : emo.connectedCategoryTitleEn}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

