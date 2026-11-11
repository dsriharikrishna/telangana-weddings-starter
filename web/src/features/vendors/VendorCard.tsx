"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  PhoneCall, 
  Heart, 
  Share2, 
  Check,
  Award,
  Sparkles
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Vendor, VendorCoverageType } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VendorCardProps {
  vendor: Vendor;
  coverageLabel?: {
    type: VendorCoverageType;
    labelEn: string;
    labelTe: string;
  };
  onEnquire?: (vendor: Vendor) => void;
}

export function VendorCard({ vendor, coverageLabel, onEnquire }: VendorCardProps) {
  const { language, formatCurrency, openAssistedModal } = useApp();
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/vendors/${vendor.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const text = language === "te"
      ? `నమస్తే ${vendor.businessName}, నేను తెలంగాణ వెడ్డింగ్స్ ద్వారా మీ సేవల గురించి సంప్రదిస్తున్నాను.`
      : `Hello ${vendor.businessName}, I saw your profile on TelanganaWeddings and would like to enquire about your wedding services.`;
    const num = vendor.whatsapp || vendor.phone || "+919440100000";
    const cleanNum = num.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanNum.startsWith("91") ? cleanNum : "91" + cleanNum}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-[#E7DECF] hover:border-[#C5A46D] hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative">
      {/* Top Media & Tags */}
      <div>
        <div className="relative h-44 overflow-hidden bg-stone-100">
          <img
            src={vendor.image}
            alt={vendor.businessName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Verification Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {vendor.isVerified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#762B46] text-white shadow-sm">
                <ShieldCheck className="w-3 h-3 text-[#C5A46D]" />
                {language === "te" ? "ధృవీకరించబడింది" : "Field Verified"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur-xs">
                {language === "te" ? "స్థానిక విక్రేత" : "Local Vendor"}
              </span>
            )}

            {vendor.verificationBadgeType === "master_artisan" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#C5A46D] text-stone-900 shadow-xs">
                <Award className="w-3 h-3 text-stone-900" />
                {language === "te" ? "ప్రముఖ కళాకారుడు" : "Master Artisan"}
              </span>
            )}
          </div>

          {/* Quick Actions (Save & Share) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={() => setSaved(!saved)}
              title={saved ? "Saved" : "Save Vendor"}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                saved ? "bg-rose-50 text-rose-600" : "bg-white/90 text-stone-600 hover:text-rose-600 backdrop-blur-xs"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-rose-600" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              title={copied ? "Link Copied!" : "Share Link"}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors shadow-xs backdrop-blur-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Experience Pill */}
          <div className="absolute bottom-2.5 left-3">
            <span className="text-[10px] font-semibold bg-stone-900/85 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
              {vendor.yearsOfExperience}+ {language === "te" ? "సంవత్సరాల అనుభవం" : "Years Experience"}
            </span>
          </div>

          {/* Rating */}
          {vendor.rating && (
            <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-md text-xs font-bold text-stone-800 shadow-xs backdrop-blur-xs">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{vendor.rating}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          <div>
            <Link href={`/vendors/${vendor.id}`}>
              <h3 className="text-base font-bold text-[#292524] group-hover:text-[#762B46] transition-colors line-clamp-1 font-heading">
                {vendor.businessName}
              </h3>
            </Link>
            <p className="text-[11px] text-[#762B46] font-medium font-body line-clamp-1 mt-0.5">
              {vendor.ownerName}
            </p>
          </div>

          {/* Location & Coverage */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
            <span className="truncate">
              {vendor.townOrVillage || vendor.mandal}, {vendor.district}
            </span>
          </div>

          {/* Short About Snippet */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {language === "te" ? vendor.aboutTe : vendor.aboutEn}
          </p>

          {/* Pricing Preview */}
          <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
            <span className="text-[11px] text-stone-500 font-medium">
              {language === "te" ? "ప్రారంభ ధర:" : "Starting from:"}
            </span>
            <span className="text-sm font-bold text-[#762B46] font-heading">
              {vendor.startingPricePaise ? formatCurrency(vendor.startingPricePaise) : (language === "te" ? "సంప్రదించండి" : "On Request")}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons Footer */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => (onEnquire ? onEnquire(vendor) : openAssistedModal({ id: vendor.id, name: vendor.businessName, categorySlug: vendor.categorySlug }))}
          className="border-[#762B46] text-[#762B46] hover:bg-[#762B46] hover:text-white text-xs h-9"
        >
          {language === "te" ? "విచారించండి" : "Enquire"}
        </Button>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={handleWhatsApp}
          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs h-9 flex items-center justify-center gap-1.5"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </Button>
      </div>
    </div>
  );
}
