"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { AuspiciousToran, BrassDeepamGlow } from "../shared/AuspiciousDecorations";
import { Sparkles, ArrowRight, ShieldCheck, Flower2, Heart } from "lucide-react";

export function DivineBlessingsAndVenueTransition() {
  const { language } = useLanguage();
  const isTe = language === "te";

  return (
    <section id="scene-02-blessings" className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#542034] via-[#381120] to-[#542034] text-[#FAF7F2] overflow-hidden">
      {/* Decorative Auspicious Toran Divider */}
      <AuspiciousToran className="mb-6 opacity-70" />

      {/* Floating Lights & Ambient Bokeh */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#762B46]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#C5A46D]/40 text-[#DFCA9B] text-xs font-semibold tracking-wide uppercase mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>{isTe ? "దివ్య ఆశీర్వాదాలు" : "Divine Blessings"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#FAF7F2] mb-3">
            {isTe ? "శుభం కలగాలి... ఆనందం వెల్లివిరియాలి" : "Every Beautiful Beginning Starts With Sacred Blessings"}
          </h2>

          <p className="text-base sm:text-lg text-[#E7DECF]/80 font-sans leading-relaxed">
            {isTe
              ? "మంగళ వాయిద్యాలు, వేద మంత్రోచ్ఛారణలు మరియు పెద్దల ఆశీస్సులతో నూతన వధూవరుల జీవితం సుఖసంతోషాలతో విలసిల్లాలని కోరుకుంటూ..."
              : "With resonant Nadaswaram, auspicious Vedic blessings, and the loving prayers of elders, two families step into a lifetime of harmony."}
          </p>

          {/* Three Sacred Cultural Emblems */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-[#FAF7F2]/5 border border-[#C5A46D]/30 flex flex-col items-center text-center">
              <BrassDeepamGlow className="mb-2 scale-90" />
              <h4 className="font-serif font-bold text-sm text-[#DFCA9B] mb-1">
                {isTe ? "మంగళ దీపం" : "Sacred Deepam"}
              </h4>
              <p className="text-xs text-[#E7DECF]/80">
                {isTe ? "చీకటిని పారద్రోలి వెలుగును నింపే జ్ఞాన జ్యోతి" : "Dispelling darkness and illuminating new journeys"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2]/5 border border-[#C5A46D]/30 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#C5A46D]/20 text-[#DFCA9B] flex items-center justify-center text-2xl mb-2">
                🥥
              </div>
              <h4 className="font-serif font-bold text-sm text-[#DFCA9B] mb-1">
                {isTe ? "కలశ స్థాపన" : "Sacred Kalash"}
              </h4>
              <p className="text-xs text-[#E7DECF]/80">
                {isTe ? "మామిడాకులు, కొబ్బరికాయతో సంపూర్ణ ఐశ్వర్యం" : "Abundance, purity, and universal auspicious harmony"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2]/5 border border-[#C5A46D]/30 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#C5A46D]/20 text-[#DFCA9B] flex items-center justify-center text-2xl mb-2">
                🌾
              </div>
              <h4 className="font-serif font-bold text-sm text-[#DFCA9B] mb-1">
                {isTe ? "పవిత్ర అక్షింతలు" : "Sacred Akshantalu"}
              </h4>
              <p className="text-xs text-[#E7DECF]/80">
                {isTe ? "పెద్దల చేతుల మీదుగా కురిసే అమూల్య ఆశీస్సులు" : "Golden rice showered with heartfelt ancestral blessings"}
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-[#C5A46D] via-[#DFCA9B] to-[#9E7D46] shadow-2xl overflow-hidden">
          <div className="relative rounded-[22px] bg-[#1C1917] p-6 sm:p-10 md:p-12 overflow-hidden">

            {/* Background Panorama of Grand Telugu Kalyana Mandapam */}
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
                alt="Telugu Wedding Kalyana Mandapam"
                className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105 transition-transform duration-1000 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/70 to-[#1C1917]/90" />
            </div>

            {/* Content Foreground */}
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9B] border border-[#C5A46D]/40 text-xs font-bold uppercase tracking-wider mb-4">
                <Flower2 className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>{isTe ? "రంగస్థలం సిద్ధం" : "Venue Transformation"}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF7F2] mb-4 leading-tight">
                {isTe
                  ? "పందిరి సిద్ధం... బంధువుల రాక కోసం ఎదురుచూపులు!"
                  : "The Mandapam is Set. The Celebrations Are About to Begin!"}
              </h3>

              <p className="text-sm sm:text-base text-[#E7DECF]/90 mb-6 font-sans leading-relaxed">
                {isTe
                  ? "పచ్చని మామిడాకుల తోరణాలు, గుబాళించే మల్లెపూల మాలలు, రాజసమైన కళ్యాణ వేదిక మరియు సన్నాయి రాగాలు... మీ కుటుంబ వేడుకకు స్వాగతం పలుకుతున్నాయి."
                  : "From fragrant mango leaf arches and blooming jasmine garlands to royal mandapams and resonant Sannai notes, the venue stands ready for your family's grand milestone."}
              </p>

              {/* Three Key Venue Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="p-3 rounded-lg bg-[#FAF7F2]/10 border border-[#C5A46D]/30 backdrop-blur-sm">
                  <span className="text-xs font-bold text-[#DFCA9B] block mb-0.5">🏛️ Function Halls</span>
                  <span className="text-[11px] text-[#E7DECF]/80">{isTe ? "ఏసీ & నాన్ ఏసీ వేదికలు" : "AC & Non-AC Convention Centers"}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF7F2]/10 border border-[#C5A46D]/30 backdrop-blur-sm">
                  <span className="text-xs font-bold text-[#DFCA9B] block mb-0.5">🌸 Floral Mandapam</span>
                  <span className="text-[11px] text-[#E7DECF]/80">{isTe ? "సంప్రదాయ వేదికలు" : "Traditional Telugu Decor"}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF7F2]/10 border border-[#C5A46D]/30 backdrop-blur-sm">
                  <span className="text-xs font-bold text-[#DFCA9B] block mb-0.5">🪈 Sannai & Melam</span>
                  <span className="text-[11px] text-[#E7DECF]/80">{isTe ? "మంగళ వాద్యాలు" : "Auspicious Music"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/services/function-hall-tent-house"
                  className="px-6 py-3 rounded-xl bg-[#762B46] hover:bg-[#542034] text-[#FAF7F2] font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <span>{isTe ? "ఫంక్షన్ హాళ్ళు & వేదికలను చూడండి" : "Explore Function Halls & Mandapams"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-2 rounded-lg border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isTe ? "తెలంగాణ వ్యాప్తంగా ధృవీకరించబడిన వేదికలు" : "Verified venues across Telangana"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

