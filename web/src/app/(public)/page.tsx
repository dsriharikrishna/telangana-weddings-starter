"use client";

import { Header } from "@/components/layout/Header";
import { 
  InvitationEntrance, 
  DivineBlessingsAndVenueTransition, 
  FamilyArrivalsSection,
  FiveDayWeddingTimeline,
  RealWeddingEmotions,
  HeritageTraditionsSection,
  WeddingPlannerJourneyCTA,
  CategoriesSection,
  DiscoverySection,
  ExploreLocationsSection
} from "@/features/landing";
import { AssistedBookingModal } from "@/features/booking";
import { useApp } from "@/context/AppContext";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const { isAssistedModalOpen, setIsAssistedModalOpen, assistedModalVendor } = useApp();

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] w-full overflow-x-hidden">
      {/* 1. Sticky Navigation Bar */}
      <Header />

      {/* 2. ACT 1 — SCENE 01: The Royal Wedding Invitation Entrance (శ్రీ శుభారంభం) */}
      <InvitationEntrance />

      {/* 3. ACT 1 — SCENE 02 & 03: Divine Blessings & Venue Transformation (పందిరి సిద్ధం) */}
      <DivineBlessingsAndVenueTransition />

      {/* 3.5 ACT 2 — SCENE 04: Family Arrivals & Banter (బంధువులు వచ్చారు... సందడి మొదలైంది!) */}
      <FamilyArrivalsSection />

      {/* 4. ACT 2 — SCENE 05: The Five-Day Wedding Journey Timeline (ఐదు రోజుల పండుగ) */}
      <FiveDayWeddingTimeline />

      {/* 4.5 ACT 2 — SCENE 06: Real Wedding Emotions (నవ్వులు, ఆకలి, కన్నీళ్లు) */}
      <RealWeddingEmotions />

      {/* 4.7 ACT 2 — SCENE 07: Traditional Wedding Heritage (మన సంప్రదాయాలు — జీలకర్ర బెల్లం, తలంబ్రాలు) */}
      <HeritageTraditionsSection />

      {/* 4.9 ACT 3 — SCENE 10: Start Your Wedding Journey (Interactive 4-Step Planner CTA) */}
      <WeddingPlannerJourneyCTA />

      {/* 5. ACT 3 — SCENE 08: Curated Wedding Categories Showcase */}
      <div id="marketplace-directory">
        <CategoriesSection />
      </div>

      {/* 6. ACT 3 — SCENE 09: Hyperlocal Village & Mandal Vendor Discovery */}
      <DiscoverySection />

      {/* 7. Regional District Drilldown (Narayanpet, Mahabubnagar, etc.) */}
      <ExploreLocationsSection />

      {/* 8. Global Localized Footer (includes Links to dedicated /how-it-works & /become-a-vendor pages) */}
      <Footer />

      {/* 9. Global Assisted Booking / Concierge Modal */}
      <AssistedBookingModal
        isOpen={isAssistedModalOpen}
        onClose={() => setIsAssistedModalOpen(false)}
        defaultVendorInfo={assistedModalVendor}
      />
    </main>
  );
}

