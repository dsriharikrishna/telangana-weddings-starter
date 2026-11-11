"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TELANGANA_LOCATIONS } from "@/data";
import { AuspiciousToran, ZariBorderFrame } from "../shared/AuspiciousDecorations";

import { Sparkles, MapPin, Calendar, CheckCircle2, Send, ShieldCheck, Clock } from "lucide-react";

const POPULAR_SERVICES_OPTIONS = [
  { id: "hall", labelEn: "Function Hall / Mandapam", labelTe: "ఫంక్షన్ హాల్ / మండపం" },
  { id: "catering", labelEn: "Telangana Vantalu & Feast", labelTe: "తెలంగాణ వంటల బృందం" },
  { id: "melam", labelEn: "Sannai Melam & Baaja", labelTe: "సన్నాయి & బాజా మేళం" },
  { id: "photo", labelEn: "Candid Photo & 4K Drone", labelTe: "ఫోటోగ్రఫీ & డ్రోన్ వీడియో" },
  { id: "decor", labelEn: "Floral Stage Decoration", labelTe: "స్టేజ్ & పూల డెకరేషన్" },
  { id: "purohit", labelEn: "Vedic Purohitulu", labelTe: "వేద పురోహితులు" },
  { id: "makeup", labelEn: "Bridal Makeup & Mehendi", labelTe: "బ్రైడల్ మేకప్ & మెహందీ" }
];

export function WeddingPlannerJourneyCTA() {
  const { language } = useLanguage();
  const isTe = language === "te";

  // Form state
  const [district, setDistrict] = useState("narayanpet");
  const [mandal, setMandal] = useState("narayanpet-mandal");
  const [village, setVillage] = useState("narayanpet-town");
  const [weddingDaysCount, setWeddingDaysCount] = useState<number>(5);
  const [selectedServices, setSelectedServices] = useState<string[]>(["hall", "catering", "melam"]);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentDistrictObj = TELANGANA_LOCATIONS.districts.find((d) => d.id === district) || TELANGANA_LOCATIONS.districts[0];
  const currentMandalObj = currentDistrictObj.mandals.find((m) => m.id === mandal) || currentDistrictObj.mandals[0];

  const handleDistrictChange = (distId: string) => {
    setDistrict(distId);
    const dist = TELANGANA_LOCATIONS.districts.find((d) => d.id === distId);
    if (dist && dist.mandals.length > 0) {
      setMandal(dist.mandals[0].id);
      if (dist.mandals[0].villages.length > 0) {
        setVillage(dist.mandals[0].villages[0].id);
      }
    }
  };

  const handleMandalChange = (mandalId: string) => {
    setMandal(mandalId);
    const m = currentDistrictObj.mandals.find((item) => item.id === mandalId);
    if (m && m.villages.length > 0) {
      setVillage(m.villages[0].id);
    }
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setSubmitted(true);
  };

  return (
    <section id="plan-wedding" className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE3] to-[#FAF7F2] text-[#292524] overflow-hidden">
      {/* Decorative Auspicious Toran */}
      <AuspiciousToran className="mb-4 opacity-75" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-[#762B46]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#762B46]/10 border border-[#762B46]/25 text-[#762B46] text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#762B46]" />
            <span>{isTe ? "పెళ్లి ప్లానర్ & ఉచిత సాయం" : "Wedding Planner & Free Assistance"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#542034] mb-3">
            {isTe ? "మీ పెళ్లి ప్రయాణం ఇక్కడ మొదలవుతుంది" : "Your Wedding Story Starts Here"}
          </h2>

          <p className="text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
            {isTe
              ? "మీ గ్రామం, వివాహ రోజుల సంఖ్య మరియు కావలసిన సేవలను ఎంచుకోండి. మా స్థానిక నిపుణులు మీకు పూర్తి వివరాలు మరియు కొటేషన్లు అందిస్తారు."
              : "Select your village, wedding duration, and required services. Receive transparent, verified local quotes with zero middleman fee."}
          </p>
        </div>

        {/* The Auspicious Planning Card */}
        <ZariBorderFrame className="w-full">
          {submitted ? (
            /* Success confirmation view */
            <div className="py-12 px-4 text-center flex flex-col items-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#542034] mb-2">
                {isTe ? "మీ వివరాలు విజయవంతంగా అందాయి!" : "Your Request Has Been Received!"}
              </h3>
              <p className="text-sm text-stone-600 mb-6 font-sans">
                {isTe
                  ? "మా తెలంగాణ వెడ్డింగ్స్ కోఆర్డినేటర్ త్వరలోనే మీ ఫోన్ నంబర్‌కు కాల్ చేసి గ్రామీణ వెండర్ల కొటేషన్లతో సహకరిస్తారు."
                  : "Our local wedding coordinator will reach out shortly with customized verified quotes tailored to your village location."}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-[#762B46] hover:bg-[#542034] text-white text-xs font-semibold shadow transition-all cursor-pointer"
              >
                {isTe ? "మరొక విచారణ చేయండి" : "Submit Another Request"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-[#292524]">
              
              {/* Step 1: Micro-location Selection (District -> Mandal -> Village) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#762B46] flex items-center gap-1.5 mb-2.5">
                  <MapPin className="w-4 h-4 text-[#C5A46D]" />
                  <span>{isTe ? "1. పెళ్లి జరిగే ప్రాంతం (జిల్లా • మండలం • గ్రామం):" : "1. Wedding Location (District • Mandal • Village):"}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* District Dropdown */}
                  <div>
                    <label className="text-[11px] text-stone-500 font-medium block mb-1">
                      {isTe ? "జిల్లా" : "District"}
                    </label>
                    <select
                      value={district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className="w-full text-xs font-medium bg-white border border-[#E7DECF] rounded-xl px-3 py-2.5 text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#762B46]/30 shadow-sm cursor-pointer"
                    >
                      {TELANGANA_LOCATIONS.districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {isTe ? d.nameTe : d.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mandal Dropdown */}
                  <div>
                    <label className="text-[11px] text-stone-500 font-medium block mb-1">
                      {isTe ? "మండలం" : "Mandal"}
                    </label>
                    <select
                      value={mandal}
                      onChange={(e) => handleMandalChange(e.target.value)}
                      className="w-full text-xs font-medium bg-white border border-[#E7DECF] rounded-xl px-3 py-2.5 text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#762B46]/30 shadow-sm cursor-pointer"
                    >
                      {currentDistrictObj.mandals.map((m) => (
                        <option key={m.id} value={m.id}>
                          {isTe ? m.nameTe : m.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Village Dropdown */}
                  <div>
                    <label className="text-[11px] text-stone-500 font-medium block mb-1">
                      {isTe ? "గ్రామం / పట్టణం" : "Village / Town"}
                    </label>
                    <select
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full text-xs font-medium bg-white border border-[#E7DECF] rounded-xl px-3 py-2.5 text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#762B46]/30 shadow-sm cursor-pointer"
                    >
                      {currentMandalObj.villages.map((v) => (
                        <option key={v.id} value={v.id}>
                          {isTe ? v.nameTe : v.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Duration of the Wedding */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#762B46] flex items-center gap-1.5 mb-2.5">
                  <Calendar className="w-4 h-4 text-[#C5A46D]" />
                  <span>{isTe ? "2. వివాహ వేడుక రోజుల సంఖ్య:" : "2. Celebration Duration:"}</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { days: 1, labelEn: "1 Day (Main Muhurtham)", labelTe: "1 రోజు (ముహూర్తం)" },
                    { days: 2, labelEn: "2 Days (Nalugu & Wedding)", labelTe: "2 రోజులు (నలుగు & పెళ్లి)" },
                    { days: 3, labelEn: "3 Days (Festive Weekend)", labelTe: "3 రోజులు (సంగీత్ & పెళ్లి)" },
                    { days: 5, labelEn: "5 Days (Full Festival)", labelTe: "5 రోజుల సంప్రదాయ పండుగ" }
                  ].map((item) => (
                    <button
                      key={item.days}
                      type="button"
                      onClick={() => setWeddingDaysCount(item.days)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        weddingDaysCount === item.days
                          ? "bg-[#762B46] text-white border-[#762B46] shadow-md"
                          : "bg-white text-[#292524] border-[#E7DECF] hover:border-[#C5A46D]"
                      }`}
                    >
                      <span className="font-bold text-xs block mb-0.5">{item.days} {isTe ? "రోజులు" : "Days"}</span>
                      <span className={`text-[10px] block ${weddingDaysCount === item.days ? "text-stone-200" : "text-stone-500"}`}>
                        {isTe ? item.labelTe : item.labelEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Required Wedding Services */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#762B46] flex items-center justify-between mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C5A46D]" />
                    <span>{isTe ? "3. కావలసిన సేవలను ఎంచుకోండి:" : "3. Choose Required Services:"}</span>
                  </span>
                  <span className="text-[10px] text-stone-500 lowercase">
                    ({selectedServices.length} {isTe ? "ఎంపికయ్యాయి" : "selected"})
                  </span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {POPULAR_SERVICES_OPTIONS.map((svc) => {
                    const isChecked = selectedServices.includes(svc.id);
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => toggleService(svc.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                          isChecked
                            ? "bg-[#F4EDE3] text-[#762B46] border-[#C5A46D] font-bold shadow-sm"
                            : "bg-white text-stone-700 border-[#E7DECF] hover:border-stone-400"
                        }`}
                      >
                        <span className="text-xs truncate">{isTe ? svc.labelTe : svc.labelEn}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isChecked ? "bg-[#762B46] border-[#762B46] text-white" : "border-stone-300"
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Number & Instant Submission */}
              <div className="pt-2 border-t border-[#E7DECF] flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder={isTe ? "మీ మొబైల్ / వాట్సాప్ నంబర్" : "Your 10-digit Mobile / WhatsApp"}
                      required
                      maxLength={10}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-[#E7DECF] text-xs font-medium text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#762B46]/30 shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#762B46] hover:bg-[#542034] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{isTe ? "ఉచిత కొటేషన్లు పొందండి" : "Get Free Verified Quotes"}</span>
                </button>
              </div>

              {/* Trust Badges Footer */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {isTe ? "100% ధృవీకరించబడిన స్థానిక వర్తకులు" : "100% Verified Local Vendors"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A46D]" />
                  {isTe ? "2 గంటల్లో ఉచిత కాల్ బ్యాక్" : "Assisted Callback in 2 Hours"}
                </span>
                <span>•</span>
                <span>{isTe ? "ఎటువంటి కమిషన్ రుసుము లేదు" : "Zero Commission to Middlemen"}</span>
              </div>

            </form>
          )}
        </ZariBorderFrame>
      </div>
    </section>
  );
}
