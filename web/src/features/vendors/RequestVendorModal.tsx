"use client";

import React, { useState } from "react";
import { 
  Building, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  PhoneCall
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS, WEDDING_CATEGORIES } from "@/data";

interface RequestVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategorySlug?: string;
}

export function RequestVendorModal({ isOpen, onClose, preselectedCategorySlug }: RequestVendorModalProps) {
  const { language, location } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    categorySlug: preselectedCategorySlug || "function-hall-tent-house",
    district: location.district,
    mandal: location.mandal === "all" ? "narayanpet-mandal" : location.mandal,
    weddingDate: "",
    notes: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fcf9f2] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#ebdcc9] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold p-1 rounded-full text-sm"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-[#211c1d]">
              {language === "te" ? "మీ అభ్యర్థన విజయవంతంగా చేరింది!" : "Request Received!"}
            </h3>
            <p className="text-xs text-[#5e5456] leading-relaxed max-w-sm mx-auto">
              {language === "te"
                ? "మా స్థానిక తెలంగాణ టీమ్ నారాయణపేట & మహబూబ్‌నగర్ పరిధిలోని ఉత్తమ ధృవీకరించిన విక్రేతలతో 2 గంటల్లో మిమ్మల్ని కనెక్ట్ చేస్తుంది."
                : "Our field network coordinator will identify and connect verified vendors from Narayanpet / Mahabubnagar for your wedding date."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#721226]/10 text-[#721226] text-[11px] font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#c9933b]" />
                <span>{language === "te" ? "విక్రేతను అభ్యర్థించండి" : "Request a Vendor"}</span>
              </div>
              <h3 className="text-xl font-black text-[#211c1d] tracking-tight">
                {language === "te" ? "మీ అవసరాన్ని మాకు తెలియజేయండి" : "Tell Us Your Wedding Need"}
              </h3>
              <p className="text-xs text-[#5e5456] mt-1">
                {language === "te"
                  ? "మీ ప్రాంతంలో సంబంధిత సేవ ఇంకా లిస్ట్ కాకపోతే, మేము స్థానిక విక్రేతలను నేరుగా సమకూరుస్తాము."
                  : "We never display fake listings. If no vendor matches your specific village yet, submit this and we'll onboard one for you."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  {language === "te" ? "మీ పేరు" : "Your Name"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#721226] bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  {language === "te" ? "మొబైల్ నంబర్" : "Mobile Number"} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#721226] bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  {language === "te" ? "వివాహ సేవా విభాగం" : "Service Category"}
                </label>
                <select
                  value={formData.categorySlug}
                  onChange={e => setFormData({ ...formData, categorySlug: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#721226] bg-white"
                >
                  {WEDDING_CATEGORIES.map(c => (
                    <option key={c.id} value={c.slug}>
                      {c.number}. {language === "te" ? c.nameTe : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  {language === "te" ? "శుభ ముహూర్తం తేదీ" : "Wedding Date"}
                </label>
                <input
                  type="date"
                  value={formData.weddingDate}
                  onChange={e => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#721226] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                {language === "te" ? "వివరాలు & అవసరాలు" : "Specific Requirements / Village details"}
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need Sannai Melam for morning Muhurtham near Makthal..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#721226] bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#721226] hover:bg-[#500a19] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{language === "te" ? "అభ్యర్థన పంపండి" : "Submit Vendor Request"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

