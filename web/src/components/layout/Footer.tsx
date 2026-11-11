"use client";

import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  PhoneCall,
  Clock
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { language, openAssistedModal } = useApp();

  return (
    <footer className="bg-[#292524] text-[#FAF7F2] pt-14 pb-10 border-t-4 border-[#C5A46D] w-full">
      <div className="layout-fullwidth">
        
        {/* Top Assurance Bar: Rural Trust & Fair Terms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-white/5 border border-white/10 mb-10">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {language === "te" ? "మాన్యువల్ విక్రేతల నిర్ధారణ" : "Manual Field Verification"}
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                {language === "te"
                  ? "నారాయణపేట & మహబూబ్‌నగర్ పరిధిలోని ప్రతి విక్రేతను నేరుగా పరిశీలించి నిర్ధారిస్తాము."
                  : "We manually verify vendor contacts and authentic photos. Zero fake accounts."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {language === "te" ? "గ్రామీణ ఉచిత బుకింగ్ సహాయం" : "Assisted Booking Helpline"}
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                {language === "te"
                  ? "ఫోన్ కాల్ లేదా వాట్సాప్ ద్వారా పెద్దలు సులభంగా సేవలను బుక్ చేసుకోవచ్చు."
                  : "Direct telephone and WhatsApp coordination in Telugu for rural families."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {language === "te" ? "స్పష్టమైన కొటేషన్ & రద్దు నియమాలు" : "Clear Quotes & Policies"}
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                {language === "te"
                  ? "ప్రయాణ ఖర్చులు, బుకింగ్ నిబంధనలు ముందుగానే స్పష్టంగా అందించబడతాయి."
                  : "Transparent travel charges and minimum notice periods without hidden broker fees."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#762B46] to-[#542034] flex items-center justify-center border border-[#C5A46D]/60 shrink-0">
                <span className="text-[#C5A46D] font-serif font-black text-xl">శ్రీ</span>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-[#C5A46D]">
                {language === "te" ? "తెలంగాణ వెడ్డింగ్స్" : "TelanganaWeddings"}
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              {language === "te"
                ? "నారాయణపేట మరియు మహబూబ్‌నగర్ జిల్లాలలోని స్థానిక గ్రామ, మండల మరియు పట్టణ సేవా ప్రదాతలను గ్రామీణ కుటుంబాలతో అనుసంధానించే విశ్వసనీయ వేదిక."
                : "A rural-first wedding services marketplace connecting village families with wedding service providers in their own villages, nearby mandals, and towns."}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C5A46D] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>One Wedding. One Platform. Every Village Connected.</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider mb-3">
              {language === "te" ? "ప్రధాన సేవలు" : "Key Services"}
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>
                <Link href="/services/function-hall-tent-house" className="hover:text-[#C5A46D] transition-colors">
                  Function Halls & Tent House
                </Link>
              </li>
              <li>
                <Link href="/services/catering-cooking-team" className="hover:text-[#C5A46D] transition-colors">
                  Telangana Catering
                </Link>
              </li>
              <li>
                <Link href="/services/band-melam-sannai/band-melam" className="text-[#C5A46D] font-semibold hover:underline">
                  18.1 Band Melam
                </Link>
              </li>
              <li>
                <Link href="/services/band-melam-sannai/sannai-melam" className="text-[#C5A46D] font-semibold hover:underline">
                  18.2 Sannai Melam
                </Link>
              </li>
              <li>
                <Link href="/services/stage-mandap-decoration" className="hover:text-[#C5A46D] transition-colors">
                  Stage & Floral Mandap
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Locations */}
          <div>
            <h4 className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider mb-3">
              {language === "te" ? "ప్రాంతాలు" : "Locations"}
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>
                <Link href="/locations/narayanpet" className="hover:text-[#C5A46D] transition-colors font-medium">
                  Narayanpet District (నారాయణపేట)
                </Link>
              </li>
              <li>
                <Link href="/locations/mahabubnagar" className="hover:text-[#C5A46D] transition-colors font-medium">
                  Mahabubnagar District (మహబూబ్‌నగర్)
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-[#C5A46D] hover:underline">
                  All Mandals & Villages →
                </Link>
              </li>
            </ul>
          </div>

          {/* Information & Policies */}
          <div>
            <h4 className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider mb-3">
              {language === "te" ? "సమాచారం & విధానాలు" : "Company & Legal"}
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>
                <Link href="/about" className="hover:text-[#C5A46D] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A46D] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#C5A46D] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-[#C5A46D] transition-colors">
                  Help Centre
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C5A46D] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C5A46D] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#C5A46D] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-[#C5A46D] transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© 2026 TelanganaWeddings. {language === "te" ? "అన్ని హక్కులూ ప్రత్యేకించబడినవి." : "All rights reserved."}</p>
          <div className="flex items-center gap-3">
            <span>Narayanpet & Mahabubnagar Pilot</span>
            <span>•</span>
            <span className="text-[#C5A46D] font-medium">ప్రతి గ్రామానికి పెళ్లి సేవలు</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
