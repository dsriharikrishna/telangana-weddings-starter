"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AuspiciousToran } from "../shared/AuspiciousDecorations";
import { Sparkles } from "lucide-react";
import { 
  Day01Gathering, 
  Day02Traditions, 
  Day03Feast, 
  Day04Muhurtham, 
  Day05Farewell 
} from "./days";

export function FiveDayWeddingTimeline() {
  const { language } = useLanguage();
  const isTe = language === "te";

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#542034] via-[#762B46] to-[#FAF7F2] text-[#FAF7F2] overflow-hidden">
      {/* Decorative Auspicious Toran Top */}
      <AuspiciousToran className="mb-6 opacity-80" />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#D9894C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#C5A46D]/40 text-[#DFCA9B] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>{isTe ? "ఐదు రోజుల పండుగ" : "Five Days. Countless Stories."}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#FAF7F2] mb-3">
            {isTe ? "ఒక పెళ్లి కాదు... ఐదు రోజుల పండుగ" : "Five Days. A Thousand Memories."}
          </h2>

          <p className="text-sm sm:text-base text-[#E7DECF]/90 font-sans leading-relaxed">
            {isTe
              ? "తెలంగాణ పెళ్లిలోని ప్రతి రోజు కథను వరుసగా క్రిందికి చూస్తూ అనుభవించండి. ఆ రోజుకు అవసరమైన సాంప్రదాయ సేవలను నేరుగా కనుగొనండి."
              : "Experience all five days of the celebration, laid out day by day. Explore ceremony memories, authentic rituals, and verified local specialists."}
          </p>
        </div>

        {/* 5 Distinct Day Components (Pure Flex Flex-Col Layout) */}
        <div className="flex flex-col w-full">
          <Day01Gathering />
          <Day02Traditions />
          <Day03Feast />
          <Day04Muhurtham />
          <Day05Farewell />
        </div>

      </div>
    </section>
  );
}
