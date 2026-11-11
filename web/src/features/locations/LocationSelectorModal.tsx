"use client";

import React from "react";
import { 
  MapPin, 
  ChevronRight, 
  Check, 
  X, 
  Home, 
  Compass,
  ArrowRight
} from "lucide-react";
import { TELANGANA_LOCATIONS } from "@/data";
import { useLocationSelector } from "@/hooks/useLocationSelector";

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationSelectorModal({ isOpen, onClose }: LocationSelectorModalProps) {
  const {
    language,
    draftDistrictId,
    draftMandalId,
    draftVillageId,
    activeDistrictObj,
    activeMandalObj,
    setDraftDistrictId,
    setDraftMandalId,
    setDraftVillageId,
    handleApply,
    handleResetToAllDistrict,
  } = useLocationSelector(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fcf9f2] w-full max-w-2xl rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-[#ebdcc9] relative max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ebdcc9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#721226]/10 text-[#721226] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#c9933b]" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-[#211c1d]">
                {language === "te" ? "మీ వివాహ వేదిక ప్రాంతాన్ని ఎంచుకోండి" : "Select Your Wedding Location"}
              </h3>
              <p className="text-[11px] text-gray-500">
                {language === "te" 
                  ? "రాష్ట్రం → జిల్లా → మండలం → గ్రామం / పట్టణం" 
                  : "State → District → Mandal → Village / Town"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breadcrumb Indicator */}
        <div className="flex items-center gap-1.5 py-2.5 px-3 my-3 bg-[#f6efe2] rounded-xl text-xs text-[#5e5456] flex-wrap border border-[#ebdcc9]">
          <span className="font-bold text-[#721226] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            Telangana (తెలంగాణ)
          </span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-bold text-[#211c1d]">
            {language === "te" ? activeDistrictObj.nameTe : activeDistrictObj.nameEn}
          </span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className={draftMandalId !== "all" ? "font-bold text-[#721226]" : "text-gray-400"}>
            {draftMandalId === "all" 
              ? (language === "te" ? "అన్ని మండలాలు" : "All Mandals") 
              : (language === "te" ? activeMandalObj?.nameTe : activeMandalObj?.nameEn)}
          </span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className={draftVillageId !== "all" ? "font-bold text-[#c9933b]" : "text-gray-400"}>
            {draftVillageId === "all" 
              ? (language === "te" ? "అన్ని గ్రామాలు" : "All Villages") 
              : draftVillageId.replace("-", " ")}
          </span>
        </div>

        {/* Step-by-Step Flow */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-1">
          
          {/* 1. District Selection */}
          <div>
            <label className="text-xs font-bold text-[#721226] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <span>1. {language === "te" ? "జిల్లా" : "District"}</span>
              <span className="text-[10px] text-gray-400 normal-case font-normal">(Initial Pilot Districts)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TELANGANA_LOCATIONS.districts.map(d => (
                <button
                  key={d.id}
                  onClick={() => setDraftDistrictId(d.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    draftDistrictId === d.id
                      ? "bg-[#721226] text-white border-[#721226] shadow-sm"
                      : "bg-white text-gray-800 border-gray-200 hover:border-[#c9933b]"
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs sm:text-sm">
                      {language === "te" ? d.nameTe : d.nameEn}
                    </p>
                    <p className={`text-[10px] ${draftDistrictId === d.id ? "text-gray-200" : "text-gray-500"}`}>
                      {language === "te" ? d.nameEn : d.nameTe}
                    </p>
                  </div>
                  {draftDistrictId === d.id && (
                    <Check className="w-4 h-4 text-[#dfb265]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Mandal Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#721226] uppercase tracking-wider">
                2. {language === "te" ? "మండలం" : "Mandal"}
              </label>
              <button
                onClick={() => setDraftMandalId("all")}
                className={`text-[11px] font-semibold hover:underline cursor-pointer ${draftMandalId === "all" ? "text-[#721226] font-bold" : "text-[#c9933b]"}`}
              >
                {language === "te" ? "మొత్తం జిల్లా (అన్ని మండలాలు)" : "Entire District (All Mandals)"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {activeDistrictObj.mandals.map(m => (
                <button
                  key={m.id}
                  onClick={() => setDraftMandalId(m.id)}
                  className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    draftMandalId === m.id
                      ? "bg-[#c9933b] text-white border-[#c9933b] shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#c9933b]"
                  }`}
                >
                  {language === "te" ? m.nameTe : m.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Village / Town Selection */}
          {activeMandalObj && (
            <div className="p-3 rounded-2xl bg-white border border-[#ebdcc9] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#721226] uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#c9933b]" />
                  <span>3. {language === "te" ? "గ్రామం / పట్టణం" : "Village / Town"}</span>
                </label>
                <button
                  onClick={() => setDraftVillageId("all")}
                  className={`text-[11px] font-semibold hover:underline cursor-pointer ${draftMandalId === "all" ? "text-[#721226] font-bold" : "text-[#c9933b]"}`}
                >
                  {language === "te" ? "మండలం మొత్తం" : "Entire Mandal"}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {activeMandalObj.villages.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setDraftVillageId(v.id)}
                    className={`p-2 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                      draftVillageId === v.id
                        ? "bg-[#721226] text-white border-[#721226] shadow-sm font-bold"
                        : "bg-[#fcf9f2] text-gray-700 border-gray-200 hover:border-[#c9933b]"
                    }`}
                  >
                    <span className="truncate">{language === "te" ? v.nameTe : v.nameEn}</span>
                    {v.isTown && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ml-1 ${
                        draftVillageId === v.id ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
                      }`}>
                        Town
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Policy Explanation Note: Willing to Travel */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
            <strong>{language === "te" ? "ముఖ్య గమనిక:" : "Important Rural Coverage Rule:"}</strong>{" "}
            {language === "te"
              ? "మీ గ్రామానికి పరిమితం కాకుండా, మీ గ్రామానికి ప్రయాణించి సేవలు అందించే సమీప గ్రామాలు, మండల కేంద్రం & పట్టణాల విక్రేతలను కూడా చూపిస్తాము."
              : "Results are not restricted to vendors located inside your village. We include nearby villages, mandal headquarters, and towns whose teams will travel to your wedding."}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#ebdcc9] flex items-center justify-between gap-3">
          <button
            onClick={handleResetToAllDistrict}
            className="text-xs text-gray-500 hover:text-black font-semibold cursor-pointer"
          >
            {language === "te" ? "జిల్లా మొత్తం చూడండి" : "Reset to Full District"}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs cursor-pointer"
            >
              {language === "te" ? "రద్దు" : "Cancel"}
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 rounded-xl bg-[#721226] hover:bg-[#500a19] text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>{language === "te" ? "స్థలాన్ని నిర్ధారించండి" : "Apply Location"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
