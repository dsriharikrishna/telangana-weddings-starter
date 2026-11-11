"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Building } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TELANGANA_LOCATIONS } from "@/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ExploreLocationsSection() {
  const { language } = useApp();

  return (
    <section className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#E7DECF] w-full">
      <div className="layout-fullwidth">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#762B46]/10 text-[#762B46] text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{language === "te" ? "ప్రాంతాల వారీగా సేవలు" : "Explore by Location"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#292524] tracking-tight">
              {language === "te" ? "నారాయణపేట & మహబూబ్‌నగర్ గ్రామీణ నెట్‌వర్క్" : "Supported Districts, Mandals & Villages"}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              {language === "te"
                ? "మీ జిల్లా మరియు మండలాన్ని ఎంచుకోండి - సమీపంలోని ధృవీకరించిన విక్రేతలను కనుగొనండి."
                : "Genuine field coverage across Narayanpet and Mahabubnagar districts in southern Telangana."}
            </p>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/locations">
              <span>{language === "te" ? "అన్ని ప్రాంతాలు చూడండి" : "View All Locations"}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TELANGANA_LOCATIONS.districts.map(district => (
            <Card key={district.id} className="border border-[#E7DECF] bg-white p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center font-bold text-lg shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#292524]">
                      {district.nameEn} District ({district.nameTe})
                    </h3>
                    <p className="text-xs text-[#57534E]">
                      {district.mandals.length} Supported Mandals • Pilot Region
                    </p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                >
                  <Link href={`/locations/${district.id}`}>
                    Explore
                  </Link>
                </Button>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#762B46] uppercase tracking-wider block">
                  {language === "te" ? "మండలాలు & గ్రామాలు:" : "Available Mandals & Villages:"}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {district.mandals.map(mandal => (
                    <div key={mandal.id} className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7DECF] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/locations/${district.id}/${mandal.id}`}
                          className="font-bold text-[#292524] hover:text-[#762B46] transition-colors"
                        >
                          {mandal.nameEn}
                        </Link>
                        <span className="text-[10px] text-[#762B46] font-medium">{mandal.nameTe}</span>
                      </div>
                      <p className="text-[10px] text-[#57534E] truncate">
                        {mandal.villages.map(v => v.nameEn).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

