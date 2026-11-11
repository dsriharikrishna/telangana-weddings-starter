"use client";

import React, { useState } from "react";
import { Search, PhoneCall, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS, WEDDING_CATEGORIES, SAMPLE_VENDORS } from "@/data";
import { VendorCard } from "@/features/vendors";
import { RequestVendorModal } from "@/features/vendors";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Header } from "@/components/layout/Header";
import { AssistedBookingModal } from "@/features/booking";
import { Footer } from "@/components/layout/Footer";

export default function VendorsDirectoryPage() {
  const {
    language,
    location,
    selectedCategory,
    setSelectedCategory,
    openAssistedModal,
    isAssistedModalOpen,
    setIsAssistedModalOpen,
    assistedModalVendor
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDistrict, setFilterDistrict] = useState(location.district);
  const [filterMandal, setFilterMandal] = useState(location.mandal);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const activeDistrictObj = TELANGANA_LOCATIONS.districts.find(d => d.id === filterDistrict);

  const filteredVendors = SAMPLE_VENDORS.filter(v => {
    if (selectedCategory !== "all" && v.categorySlug !== selectedCategory) {
      return false;
    }
    if (filterDistrict !== "all" && v.district !== filterDistrict && !v.willTravel) {
      return false;
    }
    if (filterMandal !== "all" && v.mandal !== filterMandal && !v.servesMandals?.includes(filterMandal) && !v.willTravel) {
      return false;
    }
    if (filterVerifiedOnly && !v.isVerified) {
      return false;
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = v.businessName.toLowerCase().includes(q);
      const matchOwner = v.ownerName.toLowerCase().includes(q);
      const matchLoc = v.townOrVillage.toLowerCase().includes(q);
      if (!matchName && !matchOwner && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-6 space-y-6">
        <Breadcrumbs items={[{ label: "Vendors Directory", href: "/vendors" }]} />

        {/* Page Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E7DECF]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#762B46]/10 text-[#762B46] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Telangana Wedding Vendors Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#292524] tracking-tight">
              {language === "te" ? "అన్ని వివాహ సేవా ప్రదాతలు" : "Explore All Wedding Vendors"}
            </h1>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              {language === "te"
                ? "నారాయణపేట & మహబూబ్‌నగర్ జిల్లాలలోని విశ్వసనీయ కళ్యాణ మండపాలు, వంటలు, బ్యాండ్ & సన్నాయి బృందాలు."
                : "Browse verified local wedding professionals with genuine pricing and transparent travel availability."}
            </p>
          </div>

          <Button variant="secondary" size="sm" onClick={() => openAssistedModal()}>
            <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
            <span>{language === "te" ? "కాల్ బ్యాక్ సహాయం" : "Assisted Call-Back"}</span>
          </Button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#E7DECF] shadow-sm space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search vendor or village..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] text-[#292524]"
              />
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] text-[#292524] font-medium"
            >
              <option value="all">All 18 Categories</option>
              {WEDDING_CATEGORIES.map(c => (
                <option key={c.id} value={c.slug}>
                  {c.number}. {c.nameEn}
                </option>
              ))}
            </select>

            {/* District */}
            <select
              value={filterDistrict}
              onChange={e => {
                setFilterDistrict(e.target.value);
                setFilterMandal("all");
              }}
              className="px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] text-[#292524] font-medium"
            >
              <option value="all">All Districts</option>
              {TELANGANA_LOCATIONS.districts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.nameEn} ({d.nameTe})
                </option>
              ))}
            </select>

            {/* Mandal */}
            <select
              value={filterMandal}
              onChange={e => setFilterMandal(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] text-[#292524] font-medium"
            >
              <option value="all">All Mandals</option>
              {activeDistrictObj?.mandals.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nameEn} ({m.nameTe})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-[#57534E]">
            <span className="font-semibold text-[#292524]">
              Showing {filteredVendors.length} Verified Vendors
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-[#762B46]">
              <input
                type="checkbox"
                checked={filterVerifiedOnly}
                onChange={e => setFilterVerifiedOnly(e.target.checked)}
                className="rounded text-[#762B46]"
              />
              <span>Verified Only</span>
            </label>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </main>

      <Footer />

      <RequestVendorModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      <AssistedBookingModal
        isOpen={isAssistedModalOpen}
        onClose={() => setIsAssistedModalOpen(false)}
        defaultVendorInfo={assistedModalVendor}
      />
    </div>
  );
}

