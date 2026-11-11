"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Music, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

export function BandMelamSpecialSection() {
  const { language } = useApp();

  return (
    <section id="band-melam-section" className="py-14 sm:py-16 bg-[#292524] text-white border-y-4 border-[#C5A46D] w-full">
      <div className="layout-fullwidth">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
              <Music className="w-3.5 h-3.5" />
              <span>Category #18 Spotlight • విభాగం 18 ప్రత్యేకత</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              {language === "te" 
                ? "బ్యాండ్ మేళం & సన్నాయి మేళం (రెండు వేర్వేరు సేవలు)" 
                : "Band Melam & Sannai Melam (Independent Specializations)"}
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              {language === "te"
                ? "పెళ్లి బారాత్ ఊరేగింపు కోసం బ్రాస్ బ్యాండ్ మరియు పవిత్ర ముహూర్త ఘట్టాల కోసం వేదనాద సన్నాయి మేళాన్ని వేర్వేరుగా ఎంచుకోండి."
                : "Select either high-energy Baraat brass band procession teams or sacred classical Nadaswaram artists independently."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="gold" size="sm" asChild>
              <Link href="/services/band-melam-sannai/band-melam">
                <span>Band Melam (18.1)</span>
              </Link>
            </Button>
            <Button variant="gold" size="sm" asChild>
              <Link href="/services/band-melam-sannai/sannai-melam">
                <span>Sannai Melam (18.2)</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Subcategories Grid: 18.1 and 18.2 side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Subcategory 18.1: Band Melam */}
          <div className="rounded-2xl p-5 sm:p-6 bg-white/5 border border-white/10 hover:border-[#C5A46D] transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#C5A46D] text-[#292524]">
                  Subcategory 18.1
                </span>
                <span className="text-xs text-gray-400">Procession & Baraat</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center font-bold text-xl shrink-0">
                  🎺
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === "te" ? "బ్యాండ్ మేళం (Band Melam)" : "Band Melam"}
                  </h3>
                  <p className="text-xs text-[#C5A46D]">
                    {language === "te" ? "బ్రాస్ బ్యాండ్ & ఊరేగింపు బృందాలు" : "Brass Bands & Procession Teams"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {language === "te"
                  ? "వివాహ ప్రవేశం, వరుని బారాత్ మరియు ఘనమైన ఊరేగింపు కోసం ట్రంపెట్లు, రోలింగ్ లైట్లు, బేస్ డ్రమ్ములు మరియు సాంప్రదాయ బ్రాస్ బ్యాండ్ విద్వాంసులు."
                  : "Traditional wedding brass bands, energetic Baraat processions, trumpet artists, marching percussions, and illuminated rolling lights."}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Baraat & Wedding Entrance Processions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Uniformed Brass Performers (11 to 25 artists)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Mobile power trolley and illuminated lighting setup</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10">
              <Button variant="gold" size="sm" className="w-full" asChild>
                <Link href="/services/band-melam-sannai/band-melam">
                  <span>Explore Band Melam Teams</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Subcategory 18.2: Sannai Melam */}
          <div className="rounded-2xl p-5 sm:p-6 bg-white/5 border border-white/10 hover:border-[#C5A46D] transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#C5A46D] text-[#292524]">
                  Subcategory 18.2
                </span>
                <span className="text-xs text-gray-400">Sacred Muhurtham & Rituals</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center font-bold text-xl shrink-0">
                  🪈
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === "te" ? "సన్నాయి మేళం (Sannai Melam)" : "Sannai Melam"}
                  </h3>
                  <p className="text-xs text-[#C5A46D]">
                    {language === "te" ? "నాదస్వరం & మంగళ వాయిద్యాలు" : "Classical Nadaswaram & Thavil Vidwans"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {language === "te"
                  ? "తరతరాల సాంప్రదాయ నాదస్వరం మరియు డోలు విద్వాంసులచే పవిత్ర మంగళ వాయిద్యాలు. పెళ్లి స్నానం, కన్యాదానం, జీలకర్ర బెల్లం మరియు మాంగల్యధారణకు పవిత్ర నాదం."
                  : "Generational classical Nadaswaram and Thavil vidwans creating auspicious divine music for Vedic Telugu rituals and sacred Muhurtham."}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Auspicious Vedic Muhurtham & Mangala Vadyalu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Master Sannai Vidwans & Traditional Thavil Artists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Heritage Telugu Wedding Krithis & Ragas</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10">
              <Button variant="gold" size="sm" className="w-full" asChild>
                <Link href="/services/band-melam-sannai/sannai-melam">
                  <span>Explore Sannai Melam Artists</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
