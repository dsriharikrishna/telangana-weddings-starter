"use client";

import React, { useState } from "react";
import { PhoneCall, MessageSquare, HelpCircle, Users, CheckCircle2, X, ShieldCheck, Send } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS, WEDDING_CATEGORIES } from "@/data";
import { AssistedEnquirySource } from "@/types";

interface AssistedBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVendorInfo?: {
    id?: string;
    name?: string;
    categorySlug?: string;
  } | null;
}

export function AssistedBookingModal({ isOpen, onClose, defaultVendorInfo }: AssistedBookingModalProps) {
  const { language, location, submitAssistedEnquiry } = useApp();
  
  const [activeTab, setActiveTab] = useState<AssistedEnquirySource>("callback_request");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [familyMemberName, setFamilyMemberName] = useState("");
  const [familyMemberPhone, setFamilyMemberPhone] = useState("");
  const [district, setDistrict] = useState(location.district);
  const [mandal, setMandal] = useState(location.mandal === "all" ? "narayanpet-mandal" : location.mandal);
  const [villageOrTown, setVillageOrTown] = useState("");
  const [categorySlug, setCategorySlug] = useState(defaultVendorInfo?.categorySlug || "function-hall-tent-house");
  const [weddingDate, setWeddingDate] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const currentDistrictObj = TELANGANA_LOCATIONS.districts.find(d => d.id === district);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = submitAssistedEnquiry({
      source: activeTab,
      customerName,
      customerPhone,
      familyMemberName: activeTab === "family_contact" ? familyMemberName : undefined,
      familyMemberPhone: activeTab === "family_contact" ? familyMemberPhone : undefined,
      villageOrTown: villageOrTown.trim() || (location.village !== "all" ? location.village : "Not Specified"),
      mandal,
      district,
      categorySlug,
      weddingDate: weddingDate || undefined,
      vendorId: defaultVendorInfo?.id,
      vendorBusinessName: defaultVendorInfo?.name,
      preferredLanguage: language,
      notes: notes || undefined
    });

    setSubmittedRef(created.referenceNumber);
  };

  const handleWhatsAppDirect = () => {
    const text = language === "te"
      ? `నమస్తే తెలంగాణ వెడ్డింగ్స్ సపోర్ట్. నా వివాహ సేవల సహాయం కోసం సంప్రదిస్తున్నాను:
పేరు: ${customerName || "వివాహ కుటుంబం"}
ప్రాంతం: ${district}, ${mandal}
అవసరమైన సేవ: ${categorySlug}
వివాహ తేదీ: ${weddingDate || "ఇంకా నిర్ణయించలేదు"}`
      : `Hello TelanganaWeddings Support, I need assisted wedding booking:
Name: ${customerName || "Customer"}
Location: ${district}, ${mandal}
Service Needed: ${categorySlug}
Wedding Date: ${weddingDate || "To be decided"}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919440100000?text=${encoded}`, "_blank");
  };

  const handleReset = () => {
    setSubmittedRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fcf9f2] w-full max-w-xl rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-[#ebdcc9] relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRef ? (
          /* Confirmation View with Reference Number and Rural Trust Guarantee */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#c9933b] uppercase tracking-wider">
                {language === "te" ? "మీ సహాయక అభ్యర్థన నమోదైంది" : "Assisted Request Registered"}
              </span>
              <h3 className="text-2xl font-black text-[#211c1d]">
                {language === "te" ? "ధన్యవాదాలు! మా కోఆర్డినేటర్ మిమ్మల్ని సంప్రదిస్తారు." : "Thank You! We are here to help."}
              </h3>
            </div>

            {/* Reference Number Box */}
            <div className="p-4 rounded-2xl bg-[#f6efe2] border border-[#c9933b]/40 max-w-sm mx-auto text-center space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                {language === "te" ? "బుకింగ్ రిఫరెన్స్ నంబర్ (Reference ID)" : "Booking Reference Number"}
              </span>
              <div className="text-xl font-mono font-black text-[#721226] tracking-wide">
                {submittedRef}
              </div>
              <p className="text-[11px] text-gray-600">
                {language === "te" ? "ఈ నంబర్‌తో మీ అభ్యర్థన స్థితిని తనిఖీ చేయవచ్చు" : "Keep this number for call-back or WhatsApp tracking"}
              </p>
            </div>

            {/* Rural Trust Checklist */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 text-left space-y-2 text-xs text-[#5e5456] max-w-md mx-auto">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === "te"
                    ? "నారాయణపేట & మహబూబ్‌నగర్ గ్రామీణ సమన్వయకర్త 2 గంటల్లో మీకు కాల్ చేస్తారు."
                    : "Our field coordinator for your mandal will call you within 2 hours."}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c9933b] shrink-0 mt-0.5" />
                <span>
                  {language === "te"
                    ? "మీ గ్రామానికి సరిపోయే నిజమైన విక్రేతల కొటేషన్లను తెలుగులో వివరిస్తాము."
                    : "We explain quotations in simple Telugu with no hidden agent fees."}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-[#721226] text-white text-xs font-bold hover:bg-[#500a19] transition-colors"
            >
              {language === "te" ? "పూర్తయింది (Close)" : "Done"}
            </button>
          </div>
        ) : (
          /* Assisted Options Form */
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#721226]/10 text-[#721226] text-[11px] font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#c9933b]" />
              <span>
                {language === "te" ? "గ్రామీణ సహాయక సేవ (Rural Assisted Booking)" : "Rural Assisted Wedding Booking"}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#211c1d] tracking-tight">
              {language === "te" 
                ? "మీకు ఆన్‌లైన్ ఫారమ్‌లు కష్టంగా ఉన్నాయా? మేము సాయం చేస్తాం." 
                : "Need Help With Booking? We are Here For You."}
            </h3>

            <p className="text-xs text-[#5e5456] mt-1">
              {language === "te"
                ? "ఫోన్ కాల్ లేదా వాట్సాప్ ద్వారా సులభంగా మాట్లాడండి. మా స్థానిక బృందం మీకు తగిన విక్రేతలను కలుపుతుంది."
                : "Talk to us directly via phone or WhatsApp. We help parents and elders organize everything smoothly in Telugu."}
            </p>

            {/* Tabs for Assisted Methods */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#ebdcc9]/50 rounded-2xl my-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("callback_request")}
                className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center ${
                  activeTab === "callback_request" 
                    ? "bg-[#721226] text-white shadow-sm" 
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{language === "te" ? "కాల్ బ్యాక్" : "Request Call"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("whatsapp_assisted")}
                className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center ${
                  activeTab === "whatsapp_assisted" 
                    ? "bg-emerald-700 text-white shadow-sm" 
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{language === "te" ? "వాట్సాప్" : "WhatsApp"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("family_contact")}
                className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center ${
                  activeTab === "family_contact" 
                    ? "bg-[#721226] text-white shadow-sm" 
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{language === "te" ? "కుటుంబ సభ్యుడు" : "Family Member"}</span>
              </button>
            </div>

            {/* Quick Vendor Target Notice if opened from a specific vendor card */}
            {defaultVendorInfo?.name && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-3 flex items-center justify-between">
                <span>
                  <strong>{language === "te" ? "ఎంచుకున్న విక్రేత:" : "Selected Vendor:"}</strong> {defaultVendorInfo.name}
                </span>
                <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded font-bold">
                  {defaultVendorInfo.categorySlug}
                </span>
              </div>
            )}

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    {language === "te" ? "మీ పేరు (పెళ్లి పెద్ద / కుటుంబ సభ్యుడు)" : "Your Full Name"} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === "te" ? "ఉదా: వెంకట్ రావు" : "e.g. Venkat Rao"}
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#721226] bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    {language === "te" ? "మీ ఫోన్ నంబర్" : "Your Mobile Number"} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94401 XXXXX"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#721226] bg-white font-mono"
                  />
                </div>
              </div>

              {/* Additional Family Member Contact (when family_contact tab active) */}
              {activeTab === "family_contact" && (
                <div className="p-3 rounded-2xl bg-[#f6efe2] border border-[#c9933b]/40 space-y-2 animate-in fade-in">
                  <div className="text-[11px] font-bold text-[#721226] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {language === "te" 
                        ? "సాయం చేయగల బంధువు లేదా కుటుంబ సభ్యుల వివరాలు" 
                        : "Secondary Family Member / Relative Details"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        placeholder={language === "te" ? "బంధువు పేరు (కుమారుడు/సోదరుడు)" : "Relative Name (Son/Brother)"}
                        value={familyMemberName}
                        onChange={e => setFamilyMemberName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder={language === "te" ? "బంధువు మొబైల్ నంబర్" : "Relative Mobile Number"}
                        value={familyMemberPhone}
                        onChange={e => setFamilyMemberPhone(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Location Selector: District -> Mandal -> Village/Town */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-600 block mb-1 uppercase">
                    {language === "te" ? "జిల్లా" : "District"} *
                  </label>
                  <select
                    value={district}
                    onChange={e => {
                      setDistrict(e.target.value);
                      const d = TELANGANA_LOCATIONS.districts.find(item => item.id === e.target.value);
                      if (d && d.mandals.length > 0) {
                        setMandal(d.mandals[0].id);
                      }
                    }}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-300 bg-white font-semibold text-gray-800"
                  >
                    {TELANGANA_LOCATIONS.districts.map(d => (
                      <option key={d.id} value={d.id}>
                        {language === "te" ? d.nameTe : d.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-600 block mb-1 uppercase">
                    {language === "te" ? "మండలం" : "Mandal"} *
                  </label>
                  <select
                    value={mandal}
                    onChange={e => setMandal(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-300 bg-white font-semibold text-gray-800"
                  >
                    { currentDistrictObj?.mandals.map(m => (
                      <option key={m.id} value={m.id}>
                        {language === "te" ? m.nameTe : m.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-600 block mb-1 uppercase">
                    {language === "te" ? "గ్రామం / పట్టణం" : "Village / Town"} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === "te" ? "ఉదా: సింగారం" : "e.g. Singaram"}
                    value={villageOrTown}
                    onChange={e => setVillageOrTown(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                  />
                </div>
              </div>

              {/* Service & Wedding Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    {language === "te" ? "అవసరమైన వివాహ సేవ" : "Wedding Service Needed"}
                  </label>
                  <select
                    value={categorySlug}
                    onChange={e => setCategorySlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white"
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
                    {language === "te" ? "వివాహ తేదీ (అంచనా)" : "Wedding Date (Approximate)"}
                  </label>
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={e => setWeddingDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  {language === "te" ? "ప్రత్యేక అవసరాలు / కోరికలు (ఐచ్ఛికం)" : "Additional Notes / Specific Requests"}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === "te" ? "ఉదా: 500 మందికి తెలంగాణ భోజనం, గ్రామానికి రవాణా ఉండాలి" : "e.g. Need authentic Telangana catering for 500 guests with travel to village"}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                {activeTab === "whatsapp_assisted" ? (
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{language === "te" ? "వాట్సాప్‌లో నేరుగా మాట్లాడండి" : "Chat on WhatsApp Support"}</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#721226] hover:bg-[#500a19] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === "te" ? "కాల్ బ్యాక్ అభ్యర్థించండి" : "Request Free Call-Back"}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs transition-colors"
                >
                  {language === "te" ? "రద్దు చేయి" : "Cancel"}
                </button>
              </div>

              {/* Trust Footer Note */}
              <div className="pt-2 text-center text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {language === "te"
                    ? "ఎలాంటి దాగివున్న ఛార్జీలు లేవు • 100% ఉచిత సంప్రదింపు సేవ"
                    : "No hidden fees • 100% Free Rural Customer Support"}
                </span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

