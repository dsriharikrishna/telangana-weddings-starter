"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Sparkles, ShieldCheck, Users, PhoneCall, Store, Compass } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS, WEDDING_CATEGORIES } from "@/data";
import { LocationSelectorModal } from "@/features/locations/LocationSelectorModal";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { language, location, setSelectedCategory, openAssistedModal } = useApp();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("all");

  const activeDistrict = TELANGANA_LOCATIONS.districts.find(d => d.id === location.district);
  const activeMandal = activeDistrict?.mandals.find(m => m.id === location.mandal);
  const activeVillage = activeMandal?.villages.find(v => v.id === location.village);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService !== "all") {
      window.location.href = `/services/${selectedService}`;
    } else {
      window.location.href = `/vendors`;
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-16 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE3] to-[#FAF7F2] border-b border-[#E7DECF] w-full">
      {/* Background Subtle Traditional Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A46D]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#762B46]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="layout-fullwidth relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Highlights, Search Engine */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#762B46]/10 border border-[#762B46]/20 text-[#762B46] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>
                {language === "te"
                  ? "నారాయణపేట & మహబూబ్‌నగర్ జిల్లాల గ్రామీణ పెళ్లి సేవల వేదిక"
                  : "Rural-First Wedding Marketplace • Narayanpet & Mahabubnagar"}
              </span>
            </div>

            {/* Main Headline - Strict max text-3xl font size per requirements */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#292524] tracking-tight leading-snug">
              {language === "te" ? (
                <>
                  మీ పెళ్లికి కావాల్సిన అన్ని సేవలు ఒకే చోట. <br />
                  <span className="text-[#762B46]">
                    ప్రతి గ్రామానికి పెళ్లి సేవలు ఒకే వేదికపై.
                  </span>
                </>
              ) : (
                <>
                  Plan Your Perfect Wedding, All in One Place. <br />
                  <span className="text-[#762B46]">
                    One Wedding. One Platform. Every Village Connected.
                  </span>
                </>
              )}
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-2xl">
              {language === "te"
                ? "మీ గ్రామంలోని శుభకార్యానికి మీ స్వంత గ్రామం, సమీప గ్రామాలు, మండల కేంద్రం & పట్టణాలలోని విశ్వసనీయ కళ్యాణ మండపాలు, వంటల మాస్టర్లు, బ్రాస్ బ్యాండ్, సన్నాయి విద్వాంసులు మరియు డెకరేటర్లను సులభంగా కనుగొనండి."
                : "Discover trusted wedding professionals from your village, nearby mandals, and towns. Connecting village families with verified local caterers, function halls, Band Melam, and Sannai artists."}
            </p>

            {/* Smart Search Bar with Hierarchical Location + Service Selection */}
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#E7DECF] space-y-3">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                
                {/* Location Selection Button - Triggers 4-Step Hierarchy Modal */}
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#FAF7F2] hover:bg-[#F4EDE3] rounded-xl border border-[#E7DECF] transition-colors text-left cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#762B46] shrink-0" />
                  <div className="flex flex-col w-full overflow-hidden">
                    <span className="text-[10px] text-[#57534E] font-bold uppercase">
                      {language === "te" ? "పెళ్లి జరిగే ప్రదేశం" : "Wedding Location"}
                    </span>
                    <span className="text-xs font-semibold text-[#292524] truncate">
                      {language === "te" ? (activeDistrict?.nameTe || "జిల్లా") : (activeDistrict?.nameEn || "District")}
                      {" • "}
                      {location.mandal === "all" 
                        ? (language === "te" ? "అన్ని మండలాలు" : "All Mandals") 
                        : (language === "te" ? activeMandal?.nameTe : activeMandal?.nameEn)}
                      {location.village !== "all" && activeVillage && (
                        ` • ${language === "te" ? activeVillage.nameTe : activeVillage.nameEn}`
                      )}
                    </span>
                  </div>
                </button>

                {/* Service Category Quick Selection */}
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#E7DECF]">
                  <Search className="w-4 h-4 text-[#762B46] shrink-0" />
                  <div className="flex flex-col w-full text-left">
                    <span className="text-[10px] text-[#57534E] font-bold uppercase">
                      {language === "te" ? "వివాహ సేవ" : "Wedding Service"}
                    </span>
                    <select
                      value={selectedService}
                      onChange={(e) => {
                        setSelectedService(e.target.value);
                        setSelectedCategory(e.target.value);
                      }}
                      aria-label="Select Wedding Service"
                      className="bg-transparent text-xs font-semibold text-[#292524] focus:outline-none cursor-pointer"
                    >
                      <option value="all">
                        {language === "te" ? "అన్ని 18 సేవలు (All Services)" : "All 18 Wedding Categories"}
                      </option>
                      {WEDDING_CATEGORIES.map(c => (
                        <option key={c.id} value={c.slug}>
                          {c.number}. {language === "te" ? c.nameTe : c.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action Search Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="font-semibold text-xs uppercase tracking-wider shrink-0"
                >
                  <Search className="w-3.5 h-3.5 mr-1.5" />
                  <span>{language === "te" ? "శోధించండి" : "Find Services"}</span>
                </Button>
              </form>

              {/* Quick Picks for Band Melam & Sannai */}
              <div className="flex items-center gap-2 flex-wrap pt-1 text-xs text-[#57534E]">
                <span className="font-semibold text-[11px]">
                  {language === "te" ? "ప్రత్యేక సేవలు:" : "Quick Picks:"}
                </span>
                <Link 
                  href="/services/band-melam-sannai/band-melam"
                  className="px-2.5 py-1 rounded-full bg-[#F4EDE3] text-[#762B46] font-semibold border border-[#C5A46D]/40 hover:bg-[#C5A46D]/20 transition-all hover:scale-105"
                >
                  🎺 18.1 Band Melam (బ్యాండ్ మేళం)
                </Link>
                <Link 
                  href="/services/band-melam-sannai/sannai-melam"
                  className="px-2.5 py-1 rounded-full bg-[#F4EDE3] text-[#762B46] font-semibold border border-[#C5A46D]/40 hover:bg-[#C5A46D]/20 transition-all hover:scale-105"
                >
                  🪈 18.2 Sannai Melam (సన్నాయి మేళం)
                </Link>
                <Link 
                  href="/services/function-hall-tent-house"
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-gray-100 text-[#292524] border border-[#E7DECF] transition-colors"
                >
                  🏛️ Function Halls
                </Link>
              </div>
            </div>

            {/* CTAs: Find Services & Become a Vendor */}
            <div className="flex items-center gap-3 pt-2">
              <Button variant="primary" asChild size="lg">
                <Link href="/vendors">
                  <Compass className="w-4 h-4 mr-2" />
                  <span>{language === "te" ? "విక్రేతలను చూడండి" : "Explore All Vendors"}</span>
                </Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="/become-a-vendor">
                  <Store className="w-4 h-4 mr-2" />
                  <span>{language === "te" ? "విక్రేతగా నమోదు చేసుకోండి" : "Become a Vendor"}</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => openAssistedModal()}
                className="hidden sm:inline-flex text-emerald-800 hover:bg-emerald-50"
              >
                <PhoneCall className="w-4 h-4 mr-1.5 text-emerald-600" />
                <span>{language === "te" ? "కాల్ బ్యాక్ సాయం" : "Assisted Help"}</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E7DECF]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#292524]">
                    {language === "te" ? "ధృవీకరించిన విక్రేతలు" : "Verified Vendors"}
                  </p>
                  <p className="text-[10px] text-[#57534E]">
                    {language === "te" ? "నారాయణపేట & మహబూబ్‌నగర్" : "Authentic Profiles"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#292524]">
                    {language === "te" ? "గ్రామాలకు రవాణా" : "Village Coverage"}
                  </p>
                  <p className="text-[10px] text-[#57534E]">
                    {language === "te" ? "పారదర్శక ఛార్జీలు" : "Transparent Travel"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-[#762B46] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#292524]">
                    {language === "te" ? "తెలుగులోనే సాయం" : "Assisted Booking"}
                  </p>
                  <p className="text-[10px] text-[#57534E]">
                    {language === "te" ? "ఉచిత ఫోన్ సేవ" : "Phone & WhatsApp"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card with Authentic Telugu Wedding Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80"
                alt="Traditional South Indian Wedding Ceremony"
                className="w-full h-[400px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

              {/* In-Image Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-[#C5A46D]/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center font-bold font-serif text-base">
                      శ్రీ
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#762B46]">
                        {language === "te" ? "నారాయణపేట & మహబూబ్‌నగర్ నెట్‌వర్క్" : "Telangana Rural Wedding Network"}
                      </p>
                      <p className="text-[11px] text-[#57534E]">
                        {language === "te" 
                          ? "ప్రతి గ్రామానికి పెళ్లి సేవలు ఒకే వేదికపై." 
                          : "Every village connected to trusted wedding services"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Top Pill Badge */}
            <div className="absolute -top-3 -left-3 bg-[#C5A46D] text-[#292524] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md border-2 border-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>18 Categories • 19 Service Types</span>
            </div>
          </div>

        </div>
      </div>

      <LocationSelectorModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />
    </section>
  );
}
