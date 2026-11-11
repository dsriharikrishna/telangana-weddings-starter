"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  UtensilsCrossed, 
  Camera, 
  Video, 
  Sparkles, 
  Zap, 
  Volume2, 
  HeartHandshake, 
  Flame, 
  Shirt, 
  Gem, 
  Flower2, 
  Armchair, 
  Droplets, 
  Car, 
  MailOpen, 
  ShieldCheck, 
  Music, 
  ArrowRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { WEDDING_CATEGORIES } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  UtensilsCrossed,
  Camera,
  Video,
  Sparkles,
  Zap,
  Volume2,
  HeartHandshake,
  Flame,
  Shirt,
  Gem,
  Flower2,
  Armchair,
  Droplets,
  Car,
  MailOpen,
  ShieldCheck,
  Music
};

export function CategoriesSection() {
  const { language } = useApp();

  return (
    <section id="categories" className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#E7DECF] w-full">
      <div className="layout-fullwidth">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#762B46] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{language === "te" ? "పూర్తి వివాహ సేవలు" : "All 18 Wedding Categories"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#292524] tracking-tight">
              {language === "te" ? "వివాహ సేవా విభాగాలు (18 Categories)" : "Explore Services by Category"}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              {language === "te"
                ? "కళ్యాణ మండపం, వంటల బృందం, బ్రాస్ బ్యాండ్, సన్నాయి కళాకారులు నుండి డెకరేషన్ వరకు ప్రతి సేవను వేర్వేరుగా అన్వేషించండి."
                : "Browse dedicated service pages with local vendor listings, genuine pricing, and village-level travel availability."}
            </p>
          </div>

          <Button variant="outline" asChild size="sm">
            <Link href="/vendors" className="flex items-center gap-1.5">
              <span>{language === "te" ? "అన్ని విక్రేతలను చూడండి" : "View All Vendors"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Special Spotlight for Band Melam & Sannai Melam */}
        <div className="mb-8 p-4 rounded-2xl bg-[#F4EDE3] border border-[#C5A46D]/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#C5A46D]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center font-bold text-lg shrink-0">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#762B46]">
                  {language === "te" ? "విభాగం 18: బ్యాండ్ మేళం & సన్నాయి మేళం" : "Category 18: Band Melam & Sannai Melam"}
                </h3>
                <p className="text-xs text-[#57534E]">
                  {language === "te" ? "రెండు స్వతంత్ర విభాగాలు - మీ అవసరాన్ని బట్టి వేర్వేరుగా ఎంచుకోండి" : "Two independent traditional musical services available for booking"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <Link
              href="/services/band-melam-sannai/band-melam"
              className="p-3 rounded-xl bg-white hover:border-[#762B46] border border-[#E7DECF] transition-all hover:scale-[1.01] flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎺</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#292524] group-hover:text-[#762B46]">
                    18.1 Band Melam (బ్యాండ్ మేళం)
                  </h4>
                  <p className="text-[11px] text-[#57534E]">
                    {language === "te" ? "బారాత్ & ఊరేగింపు బ్రాస్ బ్యాండ్ బృందాలు" : "Procession brass bands with trumpets & drums"}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/services/band-melam-sannai/sannai-melam"
              className="p-3 rounded-xl bg-white hover:border-[#762B46] border border-[#E7DECF] transition-all hover:scale-[1.01] flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🪈</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#292524] group-hover:text-[#762B46]">
                    18.2 Sannai Melam (సన్నాయి మేళం)
                  </h4>
                  <p className="text-[11px] text-[#57534E]">
                    {language === "te" ? "పవిత్ర ముహూర్త నాదస్వరం & డోలు విద్వాంసులు" : "Traditional Nadaswaram & Thavil master artists"}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* All 18 Categories Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {WEDDING_CATEGORIES.map(category => {
            const Icon = ICON_MAP[category.iconName] || Sparkles;
            return (
              <Link
                key={category.id}
                href={`/services/${category.slug}`}
                className="group block transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full border border-[#E7DECF] hover:border-[#762B46] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden bg-white">
                  <div className="relative h-28 overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#762B46] text-white px-1.5 py-0.5 rounded">
                      #{category.number}
                    </span>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                      <Icon className="w-4 h-4 text-[#C5A46D]" />
                    </div>
                  </div>

                  <CardContent className="p-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-heading font-semibold text-xs text-[#292524] group-hover:text-[#762B46] transition-colors line-clamp-1">
                        {category.nameEn}
                      </h3>
                      <p className="text-[11px] text-[#762B46] font-medium line-clamp-1 mt-0.5">
                        {category.nameTe}
                      </p>
                      <p className="text-[10px] text-[#57534E] line-clamp-2 mt-1 leading-snug">
                        {language === "te" ? category.descriptionTe : category.descriptionEn}
                      </p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-[#E7DECF] flex items-center justify-between text-[11px] text-[#C5A46D] font-semibold group-hover:text-[#762B46]">
                      <span>{language === "te" ? "సేవను చూడండి" : "Explore"}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
