"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { AuspiciousToran, BrassDeepamGlow } from "../shared/AuspiciousDecorations";
import { 
  Sparkles, 
  ChevronDown, 
  ArrowRight, 
  Compass, 
  Volume2, 
  VolumeX, 
  Calendar, 
  MapPin, 
  Store 
} from "lucide-react";

interface InvitationEntranceProps {
  onOpenInvitation?: () => void;
  onSkipToMarketplace?: () => void;
}

export function InvitationEntrance({ onOpenInvitation, onSkipToMarketplace }: InvitationEntranceProps) {
  const { language } = useLanguage();
  const isTe = language === "te";

  // State: 'sealed' -> 'opening' -> 'opened'
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpenInvitation) onOpenInvitation();
  };

  const scrollToNextScene = () => {
    const el = document.getElementById("scene-02-blessings");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMarketplace = () => {
    const el = document.getElementById("marketplace-directory");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (onSkipToMarketplace) {
      onSkipToMarketplace();
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#542034] via-[#762B46] to-[#542034] text-[#FAF7F2] px-4 py-8 sm:py-12 overflow-hidden select-none">
      {/* Decorative Auspicious Toran Top */}
      <AuspiciousToran className="absolute top-0 left-0 right-0 opacity-80" />

      {/* Floating Floral Petals & Ambient Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-[10%] w-72 h-72 bg-[#C5A46D]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-[10%] w-80 h-80 bg-[#D9894C]/15 rounded-full blur-3xl" />
      </div>

      {/* Top Floating Utility Controls: Skip to Marketplace & Ambient Audio Toggle */}
      <div className="absolute top-6 left-4 right-4 max-w-6xl mx-auto flex items-center justify-between z-30 pointer-events-auto">
        <button
          onClick={scrollToMarketplace}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 border border-[#C5A46D]/40 text-[#DFCA9B] hover:text-[#FAF7F2] text-xs font-semibold backdrop-blur-md transition-all cursor-pointer shadow-sm group"
        >
          <Compass className="w-3.5 h-3.5 text-[#C5A46D] group-hover:rotate-45 transition-transform" />
          <span>{isTe ? "నేరుగా విక్రేతలను చూడండి" : "Skip to Marketplace"}</span>
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 border border-[#C5A46D]/30 text-[#DFCA9B] text-xs backdrop-blur-md transition-all cursor-pointer"
          title={isMuted ? "Unmute Shehnai Melam" : "Mute audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span className="hidden sm:inline text-[11px]">{isTe ? "సన్నాయి ధ్వని" : "Auspicious Shehnai"}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline text-[11px] text-emerald-300">{isTe ? "సన్నాయి మోగుతోంది" : "Playing Melam"}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Wedding Invitation Container */}
      <div className="relative w-full max-w-2xl mx-auto z-20 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ======================================================== */
            /* STATE 1: SEALED ROYAL LAGNA PATRIKA (వివాహ శుభ పత్రిక)   */
            /* ======================================================== */
            <motion.div
              key="sealed-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative cursor-pointer group"
              onClick={handleOpen}
            >
              {/* Outer Zari Gold Glowing Border */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-br from-[#DFCA9B] via-[#C5A46D] to-[#9E7D46] shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
                <div className="relative rounded-[14px] bg-gradient-to-b from-[#542034] via-[#451829] to-[#381120] p-6 sm:p-10 border border-[#C5A46D]/50 text-center flex flex-col items-center">
                  
                  {/* Four Corner Ornaments */}
                  <div className="absolute top-3 left-3 w-8 h-8 text-[#C5A46D] opacity-80 pointer-events-none">
                    <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-current" strokeWidth="2">
                      <path d="M4 24 V4 H24" />
                      <circle cx="10" cy="10" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 text-[#C5A46D] opacity-80 pointer-events-none rotate-90">
                    <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-current" strokeWidth="2">
                      <path d="M4 24 V4 H24" />
                      <circle cx="10" cy="10" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 left-3 w-8 h-8 text-[#C5A46D] opacity-80 pointer-events-none -rotate-90">
                    <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-current" strokeWidth="2">
                      <path d="M4 24 V4 H24" />
                      <circle cx="10" cy="10" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 text-[#C5A46D] opacity-80 pointer-events-none rotate-180">
                    <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-current" strokeWidth="2">
                      <path d="M4 24 V4 H24" />
                      <circle cx="10" cy="10" r="3" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Auspicious Invocation: Sri Subhamastu */}
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#C5A46D]/20 border border-[#C5A46D]/40 text-[#DFCA9B] text-xs font-bold tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>శ్రీ శుభమస్తు • శుభారంభం</span>
                  </div>

                  {/* Brass Deepam with Live Flame Animation */}
                  <div className="my-2">
                    <BrassDeepamGlow className="scale-110" />
                  </div>

                  {/* Brand Typography */}
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF7F2] tracking-tight mt-3 mb-2 drop-shadow-md">
                    TELANGANA WEDDINGS
                  </h1>

                  {/* Main Cultural Tagline */}
                  <p className="text-xl sm:text-2xl font-serif font-medium text-[#DFCA9B] mb-2 tracking-wide">
                    ఒక పెళ్లి కాదు... ఐదు రోజుల పండుగ.
                  </p>
                  <p className="text-xs sm:text-sm text-[#E7DECF]/80 uppercase tracking-widest font-sans mb-6">
                    Five Days. A Thousand Memories.
                  </p>

                  {/* Wax Seal Opening Button */}
                  <div className="relative group/seal my-2">
                    <div className="absolute -inset-2 bg-[#C5A46D]/30 rounded-full blur-md group-hover/seal:bg-[#C5A46D]/50 transition-all animate-pulse" />
                    <button
                      type="button"
                      className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#A16207] via-[#C5A46D] to-[#854D0E] p-1 shadow-2xl flex flex-col items-center justify-center text-center text-[#292524] font-bold border-2 border-[#FAF7F2]/60 hover:scale-105 active:scale-95 transition-transform"
                    >
                      <span className="text-2xl select-none mb-0.5">📜</span>
                      <span className="text-xs font-serif uppercase tracking-wider text-[#1C1917]">
                        {isTe ? "ఆహ్వానం" : "Open"}
                      </span>
                      <span className="text-[10px] text-[#381120] font-sans font-semibold">
                        {isTe ? "తెరవండి" : "Invitation"}
                      </span>
                    </button>
                  </div>

                  {/* Subtle Interactive Instruction */}
                  <p className="text-xs text-[#E7DECF]/70 mt-5 flex items-center gap-1.5">
                    <span>{isTe ? "వివాహ పత్రికను చూడటానికి క్లిక్ చేయండి" : "Click to unfold the sacred wedding invitation"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5A46D]" />
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ======================================================== */
            /* STATE 2: UNFOLDED SACRED LAGNA PATRIKA (వివాహ పత్రిక)      */
            /* ======================================================== */
            <motion.div
              key="opened-invitation"
              initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative"
            >
              <div className="relative rounded-2xl p-1 bg-gradient-to-br from-[#DFCA9B] via-[#C5A46D] to-[#9E7D46] shadow-2xl">
                {/* Parchment Textured Inner Sheet */}
                <div className="relative rounded-[14px] bg-[#FAF7F2] text-[#292524] p-6 sm:p-10 border border-[#C5A46D]/60 shadow-inner">
                  
                  {/* Auspicious Watermark */}
                  <div className="absolute inset-0 bg-[radial-gradient(#C5A46D_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none rounded-[14px]" />

                  {/* Header of the Patrika */}
                  <div className="relative z-10 text-center pb-5 border-b border-[#C5A46D]/40 mb-6">
                    <div className="flex items-center justify-center gap-3 text-amber-700 mb-2">
                      <span className="text-xl">🪔</span>
                      <span className="font-serif font-bold text-sm tracking-widest text-[#762B46] uppercase">
                        || శ్రీరస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
                      </span>
                      <span className="text-xl">🪔</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#542034] mb-1">
                      {isTe ? "వివాహ ఆహ్వాన శుభ పత్రిక" : "The Sacred Wedding Invitation"}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#762B46] font-serif">
                      {isTe
                        ? "తెలంగాణ సంప్రదాయాలతో మీ ఇంటి వేడుకను పరిపూర్ణం చేసే వేదిక"
                        : "Bringing Telangana's richest wedding traditions to life for your family"}
                    </p>
                  </div>

                  {/* Core Invitation Message */}
                  <div className="relative z-10 space-y-4 text-center max-w-xl mx-auto font-serif">
                    <p className="text-sm sm:text-base text-[#292524] leading-relaxed">
                      {isTe ? (
                        <>
                          బంధుమిత్రులందరికీ నమస్కారములు. మన ఊరి ఆచారాలు, మన ఇంటి వంటలు, సన్నాయి మేళం మరియు పవిత్ర తలంబ్రాల సాక్షిగా జరగబోయే 
                          <strong className="text-[#762B46] font-bold"> &quot;ఐదు రోజుల పెళ్లి సంబరానికి&quot; </strong> 
                          మీ అందరికీ ఇదే మా సాదర ఆహ్వానం.
                        </>
                      ) : (
                        <>
                          We warmly welcome you and your family to celebrate the sacred union, enriched by village customs, authentic culinary feasts, joyous Sannai Melam, and eternal blessings across 
                          <strong className="text-[#762B46] font-bold"> Five Memorable Days.</strong>
                        </>
                      )}
                    </p>

                    {/* Regional Cultural Pillars */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#E7DECF] text-xs font-sans">
                      <div className="p-2 rounded-lg bg-[#F4EDE3] flex flex-col items-center text-center">
                        <MapPin className="w-4 h-4 text-[#762B46] mb-1" />
                        <span className="font-bold text-[#542034]">{isTe ? "మీ ఊరు" : "Your Village"}</span>
                        <span className="text-[10px] text-[#57534E]">{isTe ? "స్థానిక సేవలు" : "Local Verified"}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#F4EDE3] flex flex-col items-center text-center">
                        <Calendar className="w-4 h-4 text-[#762B46] mb-1" />
                        <span className="font-bold text-[#542034]">{isTe ? "5 రోజుల పండుగ" : "5 Full Days"}</span>
                        <span className="text-[10px] text-[#57534E]">{isTe ? "నలుగు నుండి వీడ్కోలు" : "Nalugu to Send-off"}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#F4EDE3] flex flex-col items-center text-center">
                        <Store className="w-4 h-4 text-[#762B46] mb-1" />
                        <span className="font-bold text-[#542034]">{isTe ? "మీ మనుషులు" : "Your People"}</span>
                        <span className="text-[10px] text-[#57534E]">{isTe ? "నమ్మకమైన వర్తకులు" : "Trusted Vendors"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA Buttons within Unfolded Invitation */}
                  <div className="relative z-10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={scrollToNextScene}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#762B46] hover:bg-[#542034] text-[#FAF7F2] font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>{isTe ? "వేడుకలోకి ప్రవేశించండి" : "Enter the Celebration"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <Link
                      href="/vendors"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F4EDE3] hover:bg-[#E7DECF] text-[#762B46] font-semibold text-xs sm:text-sm border border-[#C5A46D]/40 transition-colors flex items-center justify-center gap-2"
                    >
                      <Store className="w-4 h-4 text-[#762B46]" />
                      <span>{isTe ? "విక్రేతలను చూడండి" : "Explore Vendors Directory"}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Scroll Prompt */}
        <div className="mt-6 flex flex-col items-center text-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity" onClick={scrollToNextScene}>
          <span className="text-xs text-[#E7DECF]/80 uppercase tracking-widest font-sans mb-1">
            {isTe ? "కిందికి స్క్రోల్ చేయండి" : "Scroll to Experience the Journey"}
          </span>
          <ChevronDown className="w-4 h-4 text-[#C5A46D] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

