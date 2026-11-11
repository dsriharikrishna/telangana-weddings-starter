"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Search, 
  PhoneCall, 
  Compass,
  ArrowRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS, WEDDING_CATEGORIES, SAMPLE_VENDORS } from "@/data";
import { VendorCard } from "@/features/vendors/VendorCard";
import { RequestVendorModal } from "@/features/vendors/RequestVendorModal";
import { Vendor, VendorCoverageType } from "@/types";
import { Button } from "@/components/ui/button";

export function DiscoverySection() {
  const { 
    language, 
    location, 
    selectedCategory, 
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    openAssistedModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const activeCategory = WEDDING_CATEGORIES.find(c => c.slug === selectedCategory);
  const activeDistrictObj = TELANGANA_LOCATIONS.districts.find(d => d.id === location.district);
  const activeMandalObj = activeDistrictObj?.mandals.find(m => m.id === location.mandal);

  const getVendorCoverageLabel = (vendor: Vendor): { type: VendorCoverageType; labelEn: string; labelTe: string } => {
    if (location.village !== "all" && vendor.townOrVillage === location.village) {
      return {
        type: "village",
        labelEn: "In Your Village",
        labelTe: "మీ గ్రామంలోని విక్రేత"
      };
    }

    if (location.mandal !== "all" && vendor.mandal === location.mandal) {
      if (vendor.townOrVillage.includes("town") || vendor.businessType === "town") {
        return {
          type: "town",
          labelEn: "Mandal Headquarters Vendor",
          labelTe: "మండల కేంద్ర విక్రేత"
        };
      }
      return {
        type: "nearby-village",
        labelEn: "Nearby Village",
        labelTe: "సమీప గ్రామం"
      };
    }

    const servesCustomerMandal = location.mandal === "all" || vendor.servesMandals?.includes(location.mandal);
    const servesCustomerVillage = location.village === "all" || vendor.servesVillages?.includes(location.village);

    if (servesCustomerMandal || servesCustomerVillage) {
      if (vendor.businessType === "town" || vendor.townOrVillage.includes("town") || vendor.townOrVillage.includes("city")) {
        return {
          type: "town",
          labelEn: "Town-Level Vendor",
          labelTe: "పట్టణ స్థాయి విక్రేత"
        };
      }
      return {
        type: "serves-area",
        labelEn: "Serves Your Area",
        labelTe: "మీ గ్రామానికి సేవలు అందిస్తారు"
      };
    }

    if (vendor.district === location.district) {
      return {
        type: "mandal",
        labelEn: "District-Level Provider",
        labelTe: "జిల్లా స్థాయి విక్రేత"
      };
    }

    return {
      type: "serves-area",
      labelEn: "Serves Your Area",
      labelTe: "సేవలు అందించగలరు"
    };
  };

  const filteredVendors = SAMPLE_VENDORS.filter(v => {
    if (selectedCategory !== "all" && v.categorySlug !== selectedCategory) {
      return false;
    }

    if (selectedCategory === "band-melam-sannai" && selectedSubcategory !== "all") {
      if (v.subcategorySlug !== selectedSubcategory) {
        return false;
      }
    }

    if (location.district !== "all") {
      const isSameDistrict = v.district === location.district;
      const travelsToDistrict = v.willTravel;
      if (!isSameDistrict && !travelsToDistrict) {
        return false;
      }
    }

    if (location.mandal !== "all") {
      const isSameMandal = v.mandal === location.mandal;
      const servesThisMandal = v.servesMandals?.includes(location.mandal);
      const isWillingTravel = v.willTravel;
      if (!isSameMandal && !servesThisMandal && !isWillingTravel) {
        return false;
      }
    }

    if (filterVerifiedOnly && !v.isVerified) {
      return false;
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = v.businessName.toLowerCase().includes(q);
      const matchOwner = v.ownerName.toLowerCase().includes(q);
      const matchLoc = v.townOrVillage.toLowerCase().includes(q);
      const matchCat = v.categorySlug.toLowerCase().includes(q);
      if (!matchName && !matchOwner && !matchLoc && !matchCat) return false;
    }

    return true;
  });

  return (
    <section id="discovery-section" className="py-14 sm:py-16 bg-[#F4EDE3]/40 border-b border-[#E7DECF] w-full">
      <div className="layout-fullwidth">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#762B46]/10 text-[#762B46] text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>
                {language === "te" ? "సమీప విక్రేతల అన్వేషణ" : "Explore Vendors Near You"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#292524] tracking-tight">
              {activeCategory 
                ? (language === "te" ? activeCategory.nameTe : activeCategory.nameEn)
                : (language === "te" ? "గ్రామీణ వివాహ సేవలు & విక్రేతలు" : "Local Wedding Services & Vendors")}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              {language === "te"
                ? `మీ ప్రాంతం (${activeDistrictObj?.nameTe || "తెలంగాణ"}${location.mandal !== "all" ? ` • ${activeMandalObj?.nameTe}` : ""}) పరిధిలో సేవలు అందించే గ్రామ, మండల మరియు పట్టణ స్థాయి ప్రదాతలు.`
                : `Verified wedding professionals serving your selected location with transparent travel availability and direct WhatsApp/Phone booking.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openAssistedModal({ categorySlug: selectedCategory !== "all" ? selectedCategory : undefined })}
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              <span>{language === "te" ? "బుకింగ్ కాల్ బ్యాక్" : "Assisted Call-Back"}</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsRequestModalOpen(true)}
            >
              <Search className="w-3.5 h-3.5 mr-1.5" />
              <span>{language === "te" ? "విక్రేతను అభ్యర్థించండి" : "Request a Vendor"}</span>
            </Button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#E7DECF] shadow-sm mb-8 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === "te" ? "విక్రేత లేదా సేవ పేరుతో వెతకండి..." : "Search by vendor, name or village..."}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#762B46] bg-[#FAF7F2]"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={e => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("all");
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F2] text-[#292524] font-semibold focus:outline-none"
              >
                <option value="all">
                  {language === "te" ? "అన్ని 18 సేవలు (All Categories)" : "All 18 Wedding Categories"}
                </option>
                {WEDDING_CATEGORIES.map(c => (
                  <option key={c.id} value={c.slug}>
                    {c.number}. {language === "te" ? c.nameTe : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter (If Band Melam & Sannai selected) */}
            {selectedCategory === "band-melam-sannai" && (
              <div className="md:col-span-2">
                <select
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#C5A46D] bg-amber-50 text-[#762B46] font-bold focus:outline-none"
                >
                  <option value="all">Both Band & Sannai</option>
                  <option value="band-melam">18.1 Band Melam</option>
                  <option value="sannai-melam">18.2 Sannai Melam</option>
                </select>
              </div>
            )}

            {/* Verified Only Toggle */}
            <div className="md:col-span-2 flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#292524]">
                <input
                  type="checkbox"
                  checked={filterVerifiedOnly}
                  onChange={e => setFilterVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#762B46] focus:ring-[#762B46]"
                />
                <span>{language === "te" ? "ధృవీకరించినవి మాత్రమే" : "Verified Only"}</span>
              </label>
            </div>

          </div>

          {/* Active Filter Indicators */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100 text-xs text-[#57534E]">
            <span className="font-semibold text-[#292524]">
              {language === "te" ? "కనుగొన్న విక్రేతలు:" : "Matching Vendors:"} {filteredVendors.length}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 text-[#762B46]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === "te" ? activeDistrictObj?.nameTe : activeDistrictObj?.nameEn}</span>
              {location.mandal !== "all" && <span>• {location.mandal}</span>}
              {location.village !== "all" && <span>• {location.village}</span>}
            </span>
          </div>
        </div>

        {/* Vendors Grid */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map(vendor => (
              <VendorCard 
                key={vendor.id} 
                vendor={vendor}
                coverageLabel={getVendorCoverageLabel(vendor)}
                onEnquire={(v: any) => openAssistedModal({ id: v.id, name: v.businessName, categorySlug: v.categorySlug })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 rounded-3xl bg-white border border-[#E7DECF] max-w-xl mx-auto space-y-4">
            <h3 className="font-heading font-semibold text-base text-[#292524]">
              {language === "te" ? "మీ ఎంపికకు సరిపోయే విక్రేతలు ఇంకా జాబితా కాలేదా?" : "No direct listings found for this exact filter"}
            </h3>
            <p className="text-xs text-[#57534E]">
              {language === "te" ? "మా స్థానిక బృందం మీ కోసం ధృవీకరించిన విక్రేతను నేరుగా ఏర్పాటు చేస్తుంది." : "We never fabricate listings. Click below and our local field coordinator will connect a provider for your date."}
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="primary" size="sm" onClick={() => setIsRequestModalOpen(true)}>
                Request a Vendor
              </Button>
              <Button variant="secondary" size="sm" onClick={() => openAssistedModal()}>
                Assisted Call-Back
              </Button>
            </div>
          </div>
        )}

      </div>

      <RequestVendorModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        preselectedCategorySlug={selectedCategory !== "all" ? selectedCategory : undefined}
      />
    </section>
  );
}
