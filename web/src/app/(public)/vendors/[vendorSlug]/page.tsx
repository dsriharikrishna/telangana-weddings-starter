"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  MapPin,
  PhoneCall,
  ShieldCheck,
  Star,
  Share2,
  Heart,
  Car,
  Calendar,
  MessageSquare,
  CheckCircle2,
  ArrowLeft,
  Send,
  Building
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SAMPLE_VENDORS } from "@/data";
import { Header } from "@/components/layout/Header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AssistedBookingModal } from "@/features/booking";
import { Footer } from "@/components/layout/Footer";

export default function VendorProfilePage({ params }: { params: Promise<{ vendorSlug: string }> }) {
  const resolvedParams = use(params);
  const vendorId = resolvedParams.vendorSlug;
  const { language, formatCurrency, openAssistedModal, isAssistedModalOpen, setIsAssistedModalOpen } = useApp();

  const vendor = SAMPLE_VENDORS.find(v => v.id === vendorId) || SAMPLE_VENDORS[0];

  const handleWhatsApp = () => {
    const text = `Hello ${vendor.businessName}, I am viewing your profile on TelanganaWeddings and would like to check availability.`;
    window.open(`https://wa.me/919440100000?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Vendors", href: "/vendors" },
            { label: vendor.businessName }
          ]}
        />

        {/* Back Link */}
        <Link href="/vendors" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#762B46] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Vendors Directory</span>
        </Link>

        {/* Vendor Header Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#E7DECF] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Gallery Left */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={vendor.image}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  SAMPLE LISTING
                </div>
              </div>

              {vendor.portfolioImages && vendor.portfolioImages.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {vendor.portfolioImages.map((img, i) => (
                    <div key={i} className="h-20 rounded-xl overflow-hidden bg-gray-100 border border-[#E7DECF]">
                      <img src={img} alt="Portfolio" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Info Right */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="gold">
                  {vendor.categorySlug.replace(/-/g, " ").toUpperCase()}
                </Badge>
                {vendor.isVerified && (
                  <Badge variant="success" className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Field Verified Provider</span>
                  </Badge>
                )}
                {vendor.badge && (
                  <Badge variant="secondary">{vendor.badge}</Badge>
                )}
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#292524] tracking-tight">
                  {vendor.businessName}
                </h1>
                <p className="text-xs sm:text-sm text-[#57534E] mt-0.5">
                  Proprietor: <span className="font-semibold text-[#292524]">{vendor.ownerName}</span>
                </p>
              </div>

              {/* Location & Experience */}
              <div className="flex items-center gap-4 text-xs text-[#57534E] py-2 border-y border-[#E7DECF]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#762B46]" />
                  <span>{vendor.townOrVillage.replace("-", " ")}, {vendor.district}</span>
                </span>
                <span>•</span>
                <span>{vendor.yearsOfExperience}+ Years Experience</span>
                {vendor.rating && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-bold text-[#762B46]">
                      <Star className="w-3.5 h-3.5 fill-[#C5A46D] text-[#C5A46D]" />
                      <span>{vendor.rating}</span>
                      <span className="text-gray-400 font-normal">({vendor.reviewCount} reviews)</span>
                    </span>
                  </>
                )}
              </div>

              {/* Travel Availability Notice */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DECF] text-xs text-[#57534E] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#762B46]">
                  <Car className="w-4 h-4" />
                  <span>Rural Travel & Service Coverage</span>
                </div>
                <p>{vendor.travelChargesPolicyEn || "Available to travel across rural mandals in the district with vehicle setup."}</p>
                {vendor.servesMandals && (
                  <p className="text-[11px] text-gray-500">
                    Mandals Served: {vendor.servesMandals.join(", ")}
                  </p>
                )}
              </div>

              {/* Pricing */}
              {typeof vendor.startingPricePaise === "number" && (
                <div className="p-3 rounded-xl bg-[#F4EDE3] border border-[#C5A46D]/40 flex items-baseline justify-between">
                  <span className="text-xs font-bold text-[#57534E] uppercase">Starting Price:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-bold text-xl text-[#762B46]">
                      {formatCurrency(vendor.startingPricePaise)}
                    </span>
                    <span className="text-xs text-[#57534E]">/ {vendor.pricingUnitEn}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => openAssistedModal({ id: vendor.id, name: vendor.businessName, categorySlug: vendor.categorySlug })}
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>Request Quotation</span>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleWhatsApp}
                  className="text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-300"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </Button>
              </div>

            </div>

          </div>
        </div>

        {/* About & Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border border-[#E7DECF] p-6 space-y-3 bg-white">
            <h2 className="text-base font-bold text-[#292524]">About the Service Provider</h2>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              {vendor.aboutEn}
            </p>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DECF] text-xs text-[#762B46]">
              <strong>తెలుగు వివరణ:</strong> {vendor.aboutTe}
            </div>
          </Card>

          <Card className="border border-[#E7DECF] p-6 space-y-3 bg-white">
            <h2 className="text-base font-bold text-[#292524]">Booking Terms</h2>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Notice: {vendor.minimumBookingNoticeDays || 3} days advance notice required</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero commission to brokers; pay service provider directly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Free cancellation up to 48 hours before wedding date</span>
              </li>
            </ul>
          </Card>
        </div>

      </main>

      <Footer />

      <AssistedBookingModal
        isOpen={isAssistedModalOpen}
        onClose={() => setIsAssistedModalOpen(false)}
        defaultVendorInfo={{ id: vendor.id, name: vendor.businessName, categorySlug: vendor.categorySlug }}
      />
    </div>
  );
}

