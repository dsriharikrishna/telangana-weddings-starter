"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FIVE_DAY_WEDDING_STORIES } from "../../../data/timeline-data";
import { Tent, Camera, Coffee, ChevronRight, CheckCircle2 } from "lucide-react";

export function Day01Gathering() {
  const { language } = useLanguage();
  const isTe = language === "te";
  const story = FIVE_DAY_WEDDING_STORIES[0];

  return (
    <div id="timeline-day-1" className="day-card-container relative w-full max-w-4xl lg:mr-auto lg:ml-0 my-6 sm:my-10">
      {/* Top Center Connection Node & Day Pill */}
      <div className="flex justify-center -mb-4 relative z-20">
        <div className="relative flex flex-col items-center">
          <span className="px-5 py-2 rounded-full bg-[#854D0E] text-[#FEF3C7] text-xs font-black uppercase tracking-wider shadow-lg border-2 border-[#FDE68A] flex items-center gap-2">
            <span>🏡</span>
            <span>{isTe ? "1వ రోజు • బంధువుల రాక" : "Day 01 • The Gathering"}</span>
          </span>
        </div>
      </div>

      {/* Atmospheric Day Card: Warm Sandalwood & Earthy Welcome */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/40 to-[#FDF4E3] border-2 border-[#D97706]/25 shadow-xl text-[#292524] overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute -right-6 -bottom-6 text-9xl opacity-5 pointer-events-none select-none">
          🏡
        </div>

        {/* Top Story Section: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center mb-8 pb-6 border-b border-[#D97706]/15">
          {/* Photo Left */}
          <div className="md:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-amber-900/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.ceremonyImage}
                alt={isTe ? story.themeTitleTe : story.themeTitleEn}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs sm:text-sm font-serif font-bold drop-shadow">
                  {isTe ? story.taglineTe : story.taglineEn}
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Right */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] bg-[#FEF3C7] px-2.5 py-0.5 rounded-md border border-[#FDE68A]">
                {isTe ? "స్వాగత సంబరం" : "Welcome Festivities"}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#78350F]">
              {isTe ? story.themeTitleTe : story.themeTitleEn}
            </h3>

            {/* Emotional Quote */}
            <p className="text-xs sm:text-sm italic font-serif leading-relaxed text-[#92400E] bg-white/70 p-3 rounded-xl border border-[#FDE68A]">
              &quot;{isTe ? story.emotionalHookTe : story.emotionalHookEn}&quot;
            </p>

            {/* Checklist */}
            <div className="space-y-1.5 pt-1">
              {(isTe ? story.ceremonyDetailsTe : story.ceremonyDetailsEn).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#78350F]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Humor pill */}
            <div className="text-xs text-[#92400E] bg-white/50 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span>😄</span>
              <span className="truncate"><strong>{isTe ? "సరదా: " : "Banter: "}</strong>{isTe ? story.relatableMemoryTe : story.relatableMemoryEn}</span>
            </div>
          </div>
        </div>

        {/* Bottom Connected Services Tray */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#D97706]/20 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
                {isTe ? "1వ రోజుకు కావలసిన సేవలు" : "Day 01 Connected Services"}
              </span>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#78350F]">
                {isTe ? "టెంట్ హౌస్, కాండిడ్ ఫోటోగ్రఫీ & సాంప్రదాయ ఫలహారాలు" : "Tent House, Welcome Refreshments & Photography"}
              </h4>
            </div>
            <Link
              href="/vendors?day=1"
              className="text-xs font-bold text-[#B45309] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>{isTe ? "అన్నీ చూడండి" : "View All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {story.services.map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.categorySlug}`}
                className="group p-3 rounded-xl bg-white hover:bg-[#FEF3C7]/40 border border-amber-200/60 hover:border-[#D97706] transition-all flex items-center justify-between gap-2 shadow-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
                    {svc.iconName === "Tent" ? <Tent className="w-4 h-4" /> : svc.iconName === "Camera" ? <Camera className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-semibold text-xs text-stone-800 truncate group-hover:text-[#B45309]">
                      {isTe ? svc.titleTe : svc.titleEn}
                    </h5>
                    <p className="text-[10px] text-stone-500 truncate">{isTe ? svc.roleTe : svc.roleEn}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#047857] shrink-0">{svc.startingPrice}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
