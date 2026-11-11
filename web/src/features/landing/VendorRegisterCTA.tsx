"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Store, 
  CheckCircle2, 
  ShieldCheck, 
  Send,
  ArrowRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS, WEDDING_CATEGORIES } from "@/data";
import { Button } from "@/components/ui/button";

export function VendorRegisterCTA() {
  const { language } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    district: "narayanpet",
    categorySlug: "function-hall-tent-house",
    subcategoryBand: false,
    subcategorySannai: false,
    willTravel: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <section id="vendor-register" className="py-14 sm:py-16 bg-[#762B46] text-white w-full">
      <div className="layout-fullwidth">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Description: Rural Vendor Growth */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#C5A46D] text-xs font-semibold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              <span>{language === "te" ? "విక్రేతల భాగస్వామ్యం" : "Become a Partner Vendor"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              {language === "te" ? (
                <>
                  నారాయణపేట & మహబూబ్‌నగర్ <br />
                  <span className="text-[#C5A46D]">వివాహ సేవా ప్రదాతల నెట్‌వర్క్</span>
                </>
              ) : (
                <>
                  Grow Your Wedding Business <br />
                  <span className="text-[#C5A46D]">In Every Village & Mandal.</span>
                </>
              )}
            </h2>

            <p className="text-sm text-gray-200 leading-relaxed max-w-xl">
              {language === "te"
                ? "గ్రామీణ ఫోటోగ్రాఫర్లు, వంటల మాస్టర్లు, ఫంక్షన్ హాళ్ళు, టెంట్ హౌస్, డెకరేటర్లు, బ్యాండ్ మేళం మరియు సన్నాయి విద్వాంసులు - మీ సేవలను ఉచితంగా నమోదు చేసుకోండి. స్థానిక కుటుంబాల నుండి నేరుగా పెళ్లి బుకింగ్‌లు పొందండి."
                : "Village-level wedding service providers, caterers, tent houses, photographers, Band Melam teams, and Sannai artists: register your services and reach thousands of rural families planning weddings."}
            </p>

            {/* Value Highlights */}
            <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-gray-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>{language === "te" ? "మీ సేవా గ్రామాలు & ప్రయాణ ఛార్జీలను మీరే నిర్ణయించండి" : "Define your own travel availability & charges"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>{language === "te" ? "ధృవీకరించిన విక్రేత బ్యాడ్జ్ (Field Verified Badge)" : "Earn a Field-Verified Trust Badge upon review"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>{language === "te" ? "మధ్యవర్తులు లేకుండా ప్రత్యక్ష కస్టమర్ ఎంక్వైరీలు" : "Zero middlemen • Direct WhatsApp & call enquiries"}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="gold" size="lg" asChild>
                <Link href="/become-a-vendor">
                  <span>{language === "te" ? "పూర్తి వివరాలు & రిజిస్ట్రేషన్" : "Full Vendor Onboarding Guide"}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Lead Capture Card */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white text-[#292524] shadow-xl border border-[#E7DECF]">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-[#292524]">
                    {language === "te" ? "విక్రేత రిజిస్ట్రేషన్ విజయవంతంగా చేరింది!" : "Vendor Registration Submitted!"}
                  </h3>
                  <p className="text-xs text-[#57534E] max-w-sm mx-auto">
                    {language === "te"
                      ? "మా విక్రేతల సమన్వయ బృందం మీ వివరాలను సమీక్షించి, ప్రొఫైల్ యాక్టివేషన్ కొరకు మిమ్మల్ని సంప్రదిస్తారు."
                      : "Our vendor verification team will contact you to review your business location and activate your profile."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="border-b border-[#E7DECF] pb-2">
                    <h3 className="font-heading font-semibold text-base text-[#762B46]">
                      {language === "te" ? "విక్రేత త్వరిత నమోదు" : "Quick Vendor Registration"}
                    </h3>
                    <p className="text-xs text-[#57534E]">
                      {language === "te" ? "నారాయణపేట & మహబూబ్‌నగర్ ప్రదాతలకు ప్రాధాన్యత" : "Priority onboarding for Narayanpet & Mahabubnagar"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                        {language === "te" ? "వ్యాపార / సంస్థ పేరు" : "Business Name"} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sri Balaji Tent House"
                        value={formData.businessName}
                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] focus:outline-none focus:border-[#762B46] bg-[#FAF7F2]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                        {language === "te" ? "యజమాని పేరు" : "Owner / Artist Name"} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anjaneyulu"
                        value={formData.ownerName}
                        onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] focus:outline-none focus:border-[#762B46] bg-[#FAF7F2]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                        {language === "te" ? "మొబైల్ నంబర్" : "Mobile Number"} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 94400 XXXXX"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] focus:outline-none focus:border-[#762B46] bg-[#FAF7F2] font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                        {language === "te" ? "జిల్లా" : "Base District"}
                      </label>
                      <select
                        value={formData.district}
                        onChange={e => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] focus:outline-none focus:border-[#762B46] bg-[#FAF7F2] font-semibold"
                      >
                        {TELANGANA_LOCATIONS.districts.map(d => (
                          <option key={d.id} value={d.id}>
                            {d.nameEn} ({d.nameTe})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                      {language === "te" ? "ప్రధాన వివాహ సేవ" : "Primary Wedding Category"}
                    </label>
                    <select
                      value={formData.categorySlug}
                      onChange={e => setFormData({ ...formData, categorySlug: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] focus:outline-none focus:border-[#762B46] bg-[#FAF7F2]"
                    >
                      {WEDDING_CATEGORIES.map(c => (
                        <option key={c.id} value={c.slug}>
                          {c.number}. {c.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.categorySlug === "band-melam-sannai" && (
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#C5A46D]/40 space-y-1.5 text-xs">
                      <span className="font-semibold text-[#762B46] block text-[11px]">Select Specialty:</span>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.subcategoryBand}
                            onChange={e => setFormData({ ...formData, subcategoryBand: e.target.checked })}
                            className="rounded text-[#762B46]"
                          />
                          <span>18.1 Band Melam</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.subcategorySannai}
                            onChange={e => setFormData({ ...formData, subcategorySannai: e.target.checked })}
                            className="rounded text-[#762B46]"
                          />
                          <span>18.2 Sannai Melam</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full font-bold text-xs uppercase tracking-wider"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    <span>{language === "te" ? "నమోదు పూర్తి చేయండి" : "Submit Registration"}</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
