"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FIVE_DAY_WEDDING_STORIES } from "../../../data/timeline-data";
import { ZariBorderFrame } from "../../shared/AuspiciousDecorations";
import { Tent, Camera, Coffee, ArrowRight, CheckCircle2 } from "lucide-react";

export function Day01Gathering() {
  const { language } = useLanguage();
  const isTe = language === "te";
  const story = FIVE_DAY_WEDDING_STORIES[0];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col mb-12 sm:mb-16">
      <ZariBorderFrame className="w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C5A46D]/30">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#C5A46D] text-[#292524] text-xs font-bold tracking-widest uppercase shadow">
              {isTe ? story.dayLabelTe : story.dayLabelEn}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF7F2]">
              {isTe ? story.themeTitleTe : story.themeTitleEn}
            </h3>
          </div>
          <span className="text-2xl select-none">🏡</span>
        </div>

        {/* Content: Flex Column Layout */}
        <div className="flex flex-col gap-4">
          {/* Photo & Tagline */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.ceremonyImage}
              alt={isTe ? story.themeTitleTe : story.themeTitleEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292524] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-4 right-4 text-[#FAF7F2]">
              <p className="text-sm sm:text-base font-serif font-semibold drop-shadow">
                {isTe ? story.taglineTe : story.taglineEn}
              </p>
            </div>
          </div>

          {/* Emotional Quote */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2]/10 border border-[#C5A46D]/30 text-xs sm:text-sm italic font-serif leading-relaxed text-[#FAF7F2]">
            &quot;{isTe ? story.emotionalHookTe : story.emotionalHookEn}&quot;
          </div>

          {/* Highlights */}
          <div className="p-3.5 rounded-xl bg-black/20 border border-[#C5A46D]/20">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-2">
              {isTe ? "ఈ రోజు ముఖ్య ఆచారాలు:" : "Ceremony Highlights:"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(isTe ? story.ceremonyDetailsTe : story.ceremonyDetailsEn).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#E7DECF]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Services */}
          <div className="bg-[#FAF7F2] text-[#292524] rounded-xl p-4 shadow border border-[#C5A46D]/40 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7DECF]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#762B46]">
                {isTe ? "ఈ రోజుకి అవసరమైన సేవలు" : "Connected Day Services"}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4EDE3] text-[#762B46] font-semibold border border-[#C5A46D]/30">
                {story.services.length} {isTe ? "సర్వీసులు" : "Services"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {story.services.map((svc) => (
                <Link
                  key={svc.id}
                  href={`/services/${svc.categorySlug}`}
                  className="group p-3 rounded-lg bg-white hover:bg-[#F4EDE3]/80 border border-[#E7DECF] hover:border-[#C5A46D] transition-all flex flex-col justify-between gap-2 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[#762B46]/10 text-[#762B46] group-hover:bg-[#762B46] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                      {svc.iconName === "Tent" ? <Tent className="w-4 h-4" /> : svc.iconName === "Camera" ? <Camera className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
                    </div>
                    <h5 className="font-semibold text-xs text-[#292524] truncate group-hover:text-[#762B46] transition-colors">
                      {isTe ? svc.titleTe : svc.titleEn}
                    </h5>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                    <span>{isTe ? svc.roleTe : svc.roleEn}</span>
                    <span className="font-bold text-[#047857]">{svc.startingPrice}</span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href={`/vendors?day=1`}
              className="py-2.5 px-4 rounded-lg bg-[#762B46] hover:bg-[#542034] text-[#FAF7F2] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow"
            >
              <span>{isTe ? "1వ రోజు విక్రేతలను చూడండి" : "Explore Day 01 Vendors"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ZariBorderFrame>
    </div>
  );
}
