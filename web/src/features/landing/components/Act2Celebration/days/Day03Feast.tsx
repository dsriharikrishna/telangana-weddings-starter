"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FIVE_DAY_WEDDING_STORIES } from "../../../data/timeline-data";
import { UtensilsCrossed, Video, Headphones, ChevronRight, CheckCircle2 } from "lucide-react";

export function Day03Feast() {
  const { language } = useLanguage();
  const isTe = language === "te";
  const story = FIVE_DAY_WEDDING_STORIES[2];

  return (
    <div id="timeline-day-3" className="day-card-container relative w-full max-w-4xl lg:mr-auto lg:ml-0 my-6 sm:my-10">
      {/* Top Center Connection Node & Day Pill */}
      <div className="flex justify-center -mb-4 relative z-20">
        <div className="relative flex flex-col items-center">
          <span className="px-5 py-2 rounded-full bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider shadow-lg border-2 border-orange-200 flex items-center gap-2">
            <span>🥁</span>
            <span>{isTe ? "3వ రోజు • విందు & సంగీత్" : "Day 03 • Feast & Beats"}</span>
          </span>
        </div>
      </div>

      {/* Atmospheric Day Card: Vibrant Saffron, Copper Handi & Festive Feast */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5]/40 to-[#FED7AA]/30 border-2 border-[#F97316]/30 shadow-xl text-[#292524] overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute -right-6 -bottom-6 text-9xl opacity-5 pointer-events-none select-none">
          🥁
        </div>

        {/* Top Story Section: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center mb-8 pb-6 border-b border-[#F97316]/20">
          {/* Photo Left on Day 3 */}
          <div className="md:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-orange-500/20">
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C] bg-[#FFEDD5] px-2.5 py-0.5 rounded-md border border-[#FDBA74]">
                {isTe ? "బగారా దాల్చా & డప్పు నాట్యాలు" : "Bagara Dalcha & Dappu Beats"}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#9A3412]">
              {isTe ? story.themeTitleTe : story.themeTitleEn}
            </h3>

            {/* Emotional Quote */}
            <p className="text-xs sm:text-sm italic font-serif leading-relaxed text-[#7C2D12] bg-white/70 p-3 rounded-xl border border-[#FED7AA]">
              &quot;{isTe ? story.emotionalHookTe : story.emotionalHookEn}&quot;
            </p>

            {/* Checklist */}
            <div className="space-y-1.5 pt-1">
              {(isTe ? story.ceremonyDetailsTe : story.ceremonyDetailsEn).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#9A3412]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Humor pill */}
            <div className="text-xs text-[#7C2D12] bg-white/50 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span>😄</span>
              <span className="truncate"><strong>{isTe ? "సందడి: " : "Banter: "}</strong>{isTe ? story.relatableMemoryTe : story.relatableMemoryEn}</span>
            </div>
          </div>
        </div>

        {/* Bottom Connected Services Tray */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#F97316]/25 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-orange-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2410C]">
                {isTe ? "3వ రోజుకు కావలసిన సేవలు" : "Day 03 Connected Services"}
              </span>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#9A3412]">
                {isTe ? "తెలంగాణ వంటల మేస్త్రి, 4K డ్రోన్ & డీజే సౌండ్" : "Master Vantalu Cooks, 4K Drone & DJ Sound Setup"}
              </h4>
            </div>
            <Link
              href="/vendors?day=3"
              className="text-xs font-bold text-[#C2410C] hover:underline flex items-center gap-1 shrink-0"
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
                className="group p-3 rounded-xl bg-white hover:bg-[#FFF7ED] border border-orange-200/80 hover:border-[#EA580C] transition-all flex items-center justify-between gap-2 shadow-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center shrink-0">
                    {svc.iconName === "UtensilsCrossed" ? <UtensilsCrossed className="w-4 h-4" /> : svc.iconName === "Video" ? <Video className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-semibold text-xs text-stone-800 truncate group-hover:text-[#C2410C]">
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
