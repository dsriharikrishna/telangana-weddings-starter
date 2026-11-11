"use client";

import { use } from "react";
import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { WEDDING_CATEGORIES, SAMPLE_VENDORS, TELANGANA_LOCATIONS } from "@/data";
import { VendorCard } from "@/features/vendors";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Header } from "@/components/layout/Header";
import { AssistedBookingModal } from "@/features/booking";
import { Footer } from "@/components/layout/Footer";

// Mapping slugs for service pages
const SLUG_ALIASES: Record<string, string> = {
  "function-halls": "function-hall-tent-house",
  "catering": "catering-cooking-team",
  "photography": "wedding-photography",
  "videography": "wedding-videography",
  "stage-decoration": "stage-mandap-decoration",
  "lighting": "lighting-electrical-setup",
  "dj-sound": "dj-sound-system",
  "bridal-makeup": "bridal-makeup-hairstyling",
  "wedding-priests": "wedding-priest-purohit",
  "wedding-clothes": "wedding-clothes",
  "jewellery": "jewellery",
  "flowers-garlands": "flower-decoration-garlands",
  "chairs-tables-utensils": "chairs-tables-utensils",
  "drinking-water": "drinking-water-supply",
  "transportation": "transportation",
  "invitation-printing": "invitation-printing",
  "cleaning-maintenance": "cleaning-maintenance",
  "band-melam-sannai": "band-melam-sannai"
};

export default function ServiceCategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams.categorySlug;
  const canonicalSlug = SLUG_ALIASES[rawSlug] || rawSlug;

  const { language, location, openAssistedModal, isAssistedModalOpen, setIsAssistedModalOpen } = useApp();

  const category = WEDDING_CATEGORIES.find(c => c.slug === canonicalSlug) || WEDDING_CATEGORIES[0];
  const activeDistrictObj = TELANGANA_LOCATIONS.districts.find(d => d.id === location.district);

  // Filter vendors matching category
  const matchingVendors = SAMPLE_VENDORS.filter(v => {
    return v.categorySlug === category.slug;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/#categories" },
            { label: category.nameEn }
          ]}
        />

        {/* Hero Section of Specific Service */}
        <div className="relative rounded-3xl overflow-hidden bg-[#762B46] text-white p-6 sm:p-10 border border-[#E7DECF]">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C5A46D] text-xs font-bold uppercase tracking-wider">
              <span>Category #{category.number}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {category.nameEn}
            </h1>
            <p className="text-base text-[#C5A46D] font-medium font-serif">
              {category.nameTe}
            </p>

            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {language === "te" ? category.descriptionTe : category.descriptionEn}
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <Button
                variant="gold"
                size="sm"
                onClick={() => openAssistedModal({ categorySlug: category.slug })}
              >
                <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                <span>{language === "te" ? "కాల్ బ్యాక్ కొటేషన్ పొందండి" : "Get Free Phone Quotation"}</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                asChild
              >
                <Link href="#listings">
                  <span>View Verified Listings</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
            <img src={category.image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Band Melam / Sannai Subcategory split banner if category 18 */}
        {category.slug === "band-melam-sannai" && (
          <div className="p-4 rounded-2xl bg-[#F4EDE3] border border-[#C5A46D]/50 space-y-3">
            <h3 className="font-heading font-bold text-sm text-[#762B46]">
              Choose Independent Subcategory:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/services/band-melam-sannai/band-melam"
                className="p-3 bg-white rounded-xl border border-[#E7DECF] hover:border-[#762B46] transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#292524]">18.1 Band Melam (Baraat Brass Band)</h4>
                  <p className="text-[11px] text-[#57534E]">High energy procession trumpets and drums</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
              </Link>
              <Link
                href="/services/band-melam-sannai/sannai-melam"
                className="p-3 bg-white rounded-xl border border-[#E7DECF] hover:border-[#762B46] transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#292524]">18.2 Sannai Melam (Classical Nadaswaram)</h4>
                  <p className="text-[11px] text-[#57534E]">Sacred Vedic Muhurtham and divine vidwans</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
              </Link>
            </div>
          </div>
        )}

        {/* Listings Section */}
        <div id="listings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#292524]">
              Available {category.nameEn} in {activeDistrictObj?.nameEn || "Telangana"}
            </h2>
            <span className="text-xs text-[#57534E]">
              {matchingVendors.length} Verified Providers
            </span>
          </div>

          {matchingVendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingVendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 rounded-3xl bg-white border border-[#E7DECF] max-w-xl mx-auto space-y-3">
              <h3 className="font-bold text-sm text-[#292524]">
                No registered vendors in this exact category yet
              </h3>
              <p className="text-xs text-[#57534E]">
                We never show fake listings. Request our field team to onboard a provider for your wedding date.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => openAssistedModal({ categorySlug: category.slug })}
              >
                Request a Verified Vendor
              </Button>
            </div>
          )}
        </div>

        {/* Related Services */}
        <div className="pt-6 border-t border-[#E7DECF] space-y-3">
          <h3 className="font-heading font-semibold text-sm text-[#292524]">Related Wedding Services</h3>
          <div className="flex flex-wrap gap-2">
            {WEDDING_CATEGORIES.filter(c => c.slug !== category.slug).slice(0, 6).map(rc => (
              <Link
                key={rc.id}
                href={`/services/${rc.slug}`}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E7DECF] hover:border-[#762B46] text-xs font-medium text-[#292524] transition-colors"
              >
                {rc.nameEn}
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />

      <AssistedBookingModal
        isOpen={isAssistedModalOpen}
        onClose={() => setIsAssistedModalOpen(false)}
        defaultVendorInfo={{ categorySlug: category.slug }}
      />
    </div>
  );
}
