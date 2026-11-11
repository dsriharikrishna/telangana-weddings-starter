"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AuspiciousToran } from "../shared/AuspiciousDecorations";
import { WeddingMandalaAnimation } from "../shared/WeddingMandalaAnimation";
import { Sparkles, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { 
  Day01Gathering, 
  Day02Traditions, 
  Day03Feast, 
  Day04Muhurtham, 
  Day05Farewell 
} from "./days";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function FiveDayWeddingTimeline() {
  const { language } = useLanguage();
  const isTe = language === "te";
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Subtle smooth scroll entrance for each distinct day card
      const cards = gsap.utils.toArray<HTMLElement>(".day-card-container");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE3] to-[#FAF7F2] text-[#292524] overflow-hidden"
    >
      {/* Decorative Auspicious Toran Top */}
      <AuspiciousToran className="mb-4 opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Ceremonial Lottie Mandala */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 flex flex-col items-center">
          
          <div className="mb-1">
            <WeddingMandalaAnimation className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#762B46]/10 border border-[#762B46]/20 text-[#762B46] text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#762B46]" />
            <span>{isTe ? "ఐదు రోజుల పండుగ" : "Five Days. Countless Stories."}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#542034] mb-3">
            {isTe ? "ఒక పెళ్లి కాదు... ఐదు రోజుల పండుగ" : "Five Days. A Thousand Memories."}
          </h2>

          <p className="text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
            {isTe
              ? "తెలంగాణ పెళ్లిలోని ప్రతి రోజు ఒక ప్రత్యేక రంగు, ఒక విశిష్ట వేడుక. బంధువుల రాక నుండి అప్పగింతల వరకు ప్రతి ఘట్టాన్ని ప్రత్యేక వాతావరణంతో అనుభవించండి."
              : "Every day has its own distinct energy, color, and rituals. Scroll down to walk through each day's unique celebration and services."}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#762B46] font-semibold">
            <span>{isTe ? "ప్రతి రోజు విశేషాలు చూడండి" : "Explore Each Day's Story & Services"}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>

        {/* 5 Distinct Day Components with Day-to-Day Visual Connectivity & Dynamic Alignment */}
        <div className="relative flex flex-col w-full">
          
          {/* Day 1: Left */}
          <div className="relative w-full">
            <Day01Gathering />
            {/* Visual Connector: Day 1 (Left Card Base) -> Day 2 (Right Card Top) */}
            <div className="relative flex flex-col items-center justify-center -my-3 py-1 w-full z-10">
              <div className="w-full max-w-4xl relative h-24 sm:h-28">
                <svg className="w-full h-full overflow-visible pointer-events-none drop-shadow-sm" viewBox="0 0 800 90" fill="none">
                  <defs>
                    <linearGradient id="wire-gradient-1" x1="220" y1="0" x2="580" y2="90" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#D97706" />
                      <stop offset="50%" stopColor="#EAB308" />
                      <stop offset="100%" stopColor="#CA8A04" />
                    </linearGradient>
                    <filter id="glow-1" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#D97706" floodOpacity="0.45" />
                    </filter>
                  </defs>

                  {/* Outer Wiring Glow */}
                  <path
                    d="M 220 0 C 220 60, 580 30, 580 90"
                    stroke="#FDE68A"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="opacity-40"
                  />
                  {/* Core Illuminated Electric Gold Wire */}
                  <path
                    d="M 220 0 C 220 60, 580 30, 580 90"
                    stroke="url(#wire-gradient-1)"
                    strokeWidth="4"
                    strokeDasharray="9 6"
                    strokeLinecap="round"
                    filter="url(#glow-1)"
                  />

                  {/* Start Node: Direct from Bottom of Day 1 Card */}
                  <circle cx="220" cy="2" r="8" fill="#854D0E" stroke="#FEF3C7" strokeWidth="3" />
                  <circle cx="220" cy="2" r="3" fill="#FEF3C7" />

                  {/* End Node: Direct into Top Badge of Day 2 Card */}
                  <circle cx="580" cy="88" r="8" fill="#CA8A04" stroke="#FEF3C7" strokeWidth="3" />
                  <circle cx="580" cy="88" r="3" fill="#FEF3C7" />
                </svg>

                
              </div>
            </div>
          </div>

          {/* Day 2: Right */}
          <div className="relative w-full">
            <Day02Traditions />
            {/* Visual Connector: Day 2 (Right Card Base) -> Day 3 (Left Card Top) */}
            <div className="relative flex flex-col items-center justify-center -my-3 py-1 w-full z-10">
              <div className="w-full max-w-4xl relative h-24 sm:h-28">
                <svg className="w-full h-full overflow-visible pointer-events-none drop-shadow-sm" viewBox="0 0 800 90" fill="none">
                  <defs>
                    <linearGradient id="wire-gradient-2" x1="580" y1="0" x2="220" y2="90" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#CA8A04" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                    <filter id="glow-2" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#F97316" floodOpacity="0.45" />
                    </filter>
                  </defs>

                  {/* Outer Wiring Glow */}
                  <path
                    d="M 580 0 C 580 60, 220 30, 220 90"
                    stroke="#FED7AA"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="opacity-40"
                  />
                  {/* Core Illuminated Electric Wire */}
                  <path
                    d="M 580 0 C 580 60, 220 30, 220 90"
                    stroke="url(#wire-gradient-2)"
                    strokeWidth="4"
                    strokeDasharray="9 6"
                    strokeLinecap="round"
                    filter="url(#glow-2)"
                  />

                  {/* Start Node: Direct from Bottom of Day 2 Card */}
                  <circle cx="580" cy="2" r="8" fill="#CA8A04" stroke="#FFF7ED" strokeWidth="3" />
                  <circle cx="580" cy="2" r="3" fill="#FFF7ED" />

                  {/* End Node: Direct into Top Badge of Day 3 Card */}
                  <circle cx="220" cy="88" r="8" fill="#EA580C" stroke="#FFF7ED" strokeWidth="3" />
                  <circle cx="220" cy="88" r="3" fill="#FFF7ED" />
                </svg>

             
              </div>
            </div>
          </div>

          {/* Day 3: Left */}
          <div className="relative w-full">
            <Day03Feast />
            {/* Visual Connector: Day 3 (Left Card Base) -> Day 4 (Right Card Top) */}
            <div className="relative flex flex-col items-center justify-center -my-3 py-1 w-full z-10">
              <div className="w-full max-w-4xl relative h-24 sm:h-28">
                <svg className="w-full h-full overflow-visible pointer-events-none drop-shadow-sm" viewBox="0 0 800 90" fill="none">
                  <defs>
                    <linearGradient id="wire-gradient-3" x1="220" y1="0" x2="580" y2="90" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#EA580C" />
                      <stop offset="50%" stopColor="#B45309" />
                      <stop offset="100%" stopColor="#762B46" />
                    </linearGradient>
                    <filter id="glow-3" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#762B46" floodOpacity="0.45" />
                    </filter>
                  </defs>

                  {/* Outer Wiring Glow */}
                  <path
                    d="M 220 0 C 220 60, 580 30, 580 90"
                    stroke="#FCE7EB"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="opacity-40"
                  />
                  {/* Core Illuminated Electric Wire */}
                  <path
                    d="M 220 0 C 220 60, 580 30, 580 90"
                    stroke="url(#wire-gradient-3)"
                    strokeWidth="4"
                    strokeDasharray="9 6"
                    strokeLinecap="round"
                    filter="url(#glow-3)"
                  />

                  {/* Start Node: Direct from Bottom of Day 3 Card */}
                  <circle cx="220" cy="2" r="8" fill="#EA580C" stroke="#FFF7ED" strokeWidth="3" />
                  <circle cx="220" cy="2" r="3" fill="#FFF7ED" />

                  {/* End Node: Direct into Top Badge of Day 4 Card */}
                  <circle cx="580" cy="88" r="8" fill="#762B46" stroke="#FEF3C7" strokeWidth="3" />
                  <circle cx="580" cy="88" r="3" fill="#FEF3C7" />
                </svg>

              
              </div>
            </div>
          </div>

          {/* Day 4: Right */}
          <div className="relative w-full">
            <Day04Muhurtham />
            {/* Visual Connector: Day 4 (Right Card Base) -> Day 5 (Center Card Top) */}
            <div className="relative flex flex-col items-center justify-center -my-3 py-1 w-full z-10">
              <div className="w-full max-w-4xl relative h-24 sm:h-28">
                <svg className="w-full h-full overflow-visible pointer-events-none drop-shadow-sm" viewBox="0 0 800 90" fill="none">
                  <defs>
                    <linearGradient id="wire-gradient-4" x1="580" y1="0" x2="400" y2="90" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#762B46" />
                      <stop offset="50%" stopColor="#57534E" />
                      <stop offset="100%" stopColor="#1C1917" />
                    </linearGradient>
                    <filter id="glow-4" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1C1917" floodOpacity="0.35" />
                    </filter>
                  </defs>

                  {/* Outer Wiring Glow */}
                  <path
                    d="M 580 0 C 580 60, 400 30, 400 90"
                    stroke="#E7E5E4"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="opacity-40"
                  />
                  {/* Core Illuminated Electric Wire */}
                  <path
                    d="M 580 0 C 580 60, 400 30, 400 90"
                    stroke="url(#wire-gradient-4)"
                    strokeWidth="4"
                    strokeDasharray="9 6"
                    strokeLinecap="round"
                    filter="url(#glow-4)"
                  />

                  {/* Start Node: Direct from Bottom of Day 4 Card */}
                  <circle cx="580" cy="2" r="8" fill="#762B46" stroke="#FAF7F2" strokeWidth="3" />
                  <circle cx="580" cy="2" r="3" fill="#FAF7F2" />

                  {/* End Node: Direct into Top Badge of Day 5 Card */}
                  <circle cx="400" cy="88" r="9" fill="#1C1917" stroke="#FAF7F2" strokeWidth="3" />
                  <circle cx="400" cy="88" r="3.5" fill="#C5A46D" />
                </svg>

              </div>
            </div>
          </div>

          {/* Day 5: Center Close */}
          <div className="relative w-full">
            <Day05Farewell />
            {/* Final Grand Closing Seal */}
            <div className="flex flex-col items-center justify-center mt-10 mb-4 text-center">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#C5A46D] to-transparent mb-3" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#762B46]/10 border border-[#762B46]/20 text-[#762B46] text-xs font-serif font-semibold">
                <span>🌸</span>
                <span>{isTe ? "శుభం భూయాత్ • కలకాలం వర్ధిల్లండి" : "Subham Bhuyath • A Lifelong Celebration of Love"}</span>
                <span>🌸</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
