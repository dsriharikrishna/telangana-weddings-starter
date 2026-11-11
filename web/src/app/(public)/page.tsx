"use client";

import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/features/landing";
import { CategoriesSection } from "@/features/landing";
import { BandMelamSpecialSection } from "@/features/landing";
import { DiscoverySection } from "@/features/landing";
import { ExploreLocationsSection } from "@/features/landing";
import { HowItWorks } from "@/features/landing";
import { VendorRegisterCTA } from "@/features/landing";
import { AssistedBookingModal } from "@/features/booking";
import { useApp } from "@/context/AppContext";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const { isAssistedModalOpen, setIsAssistedModalOpen, assistedModalVendor } = useApp();

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] w-full overflow-x-hidden">
      {/* 1. Sticky Desktop & Mobile Navbar with Searchable Locations & Dropdowns */}
      <Header />

      {/* 2. Full-Width Hero Section with Compact Typography & Rural Positioning */}
      <HeroSection />

      {/* 3. Section 2: Quick Service Categories (All 18 Main Categories in Responsive Grid) */}
      <CategoriesSection />

      {/* 4. Category #18 Spotlight (Band Melam & Sannai Melam Independent Subcategories) */}
      <BandMelamSpecialSection />

      {/* 5. Section 3: Explore Vendors Near You with Filter Toolbar & Proximity Labels */}
      <DiscoverySection />

      {/* 6. Section 4: Explore by Location (Narayanpet, Mahabubnagar, Mandals & Villages) */}
      <ExploreLocationsSection />

      {/* 7. Section 5: How It Works (Simple 4-Step Process) */}
      <HowItWorks />

      {/* 8. Section 6: Become a Vendor (Full-Width Registration CTA) */}
      <VendorRegisterCTA />

      {/* 9. Section 7: Full-Width Localized Footer */}
      <Footer />

      {/* 10. Global Assisted Booking Modal (Callback / WhatsApp / Family Contact) */}
      <AssistedBookingModal
        isOpen={isAssistedModalOpen}
        onClose={() => setIsAssistedModalOpen(false)}
        defaultVendorInfo={assistedModalVendor}
      />
    </main>
  );
}
