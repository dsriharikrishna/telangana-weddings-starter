"use client";

import React from "react";
import { 
  MapPin, 
  Search, 
  FileText, 
  CalendarCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HowItWorks() {
  const { language } = useApp();

  const steps = [
    {
      num: "01",
      icon: MapPin,
      titleEn: "Select Your Village",
      titleTe: "మీ గ్రామాన్ని ఎంచుకోండి",
      descEn: "Choose your district, mandal, and village to discover verified local providers serving your area.",
      descTe: "నారాయణపేట లేదా మహబూబ్‌నగర్ పరిధిలోని మీ స్వంత గ్రామం మరియు మండలాన్ని ఎంచుకోండి."
    },
    {
      num: "02",
      icon: Search,
      titleEn: "Choose Wedding Services",
      titleTe: "వివాహ సేవలను ఎంచుకోండి",
      descEn: "Explore all 18 categories including Band Melam, Sannai Melam, Catering, Function Halls & Decor.",
      descTe: "18 కేటగిరీల నుండి మీకు కావాల్సిన పెళ్లి సేవలను సులభంగా సరిపోల్చండి."
    },
    {
      num: "03",
      icon: FileText,
      titleEn: "Receive Vendor Quotations",
      titleTe: "కొటేషన్లు అందుకోండి",
      descEn: "Get clear itemized quotes, travel charges, and booking policies directly from verified vendors.",
      descTe: "విక్రేతల నుండి స్పష్టమైన కొటేషన్లు మరియు ప్రయాణ వివరాలను నేరుగా పొందండి."
    },
    {
      num: "04",
      icon: CalendarCheck,
      titleEn: "Confirm Your Bookings",
      titleTe: "బుకింగ్ నిర్ధారించుకోండి",
      descEn: "Lock in your wedding date with zero hidden broker fees and assisted phone coordination.",
      descTe: "ఎలాంటి బ్రోకర్ కమీషన్లు లేకుండా నిశ్చింతగా మీ శుభకార్యానికి సేవలను ఖరారు చేసుకోండి."
    }
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#E7DECF] w-full">
      <div className="layout-fullwidth">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#762B46] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{language === "te" ? "సులభమైన ప్రక్రియ" : "Simple 4-Step Process"}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-[#292524] tracking-tight">
              {language === "te" ? "తెలంగాణ వెడ్డింగ్స్ ఎలా పనిచేస్తుంది?" : "How TelanganaWeddings Works"}
            </h2>

            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              {language === "te"
                ? "గ్రామీణ కుటుంబాలకు సులభమైన మరియు నమ్మకమైన 4-దశల వివాహ సేవల బుకింగ్ విధానం."
                : "Designed specifically for rural families and village elders with assisted phone support."}
            </p>
          </div>

          <Button variant="primary" size="sm" asChild>
            <Link href="/vendors">
              <span>{language === "te" ? "ఇప్పుడే ప్రారంభించండి" : "Get Started"}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <Card 
                key={step.num}
                className="border border-[#E7DECF] bg-white p-5 hover:border-[#762B46] transition-all hover:scale-[1.02] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[#C5A46D]/60">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F4EDE3] text-[#762B46] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#762B46]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-sm sm:text-base text-[#292524]">
                      {language === "te" ? step.titleTe : step.titleEn}
                    </h3>
                    <p className="text-xs text-[#57534E] mt-1.5 leading-relaxed">
                      {language === "te" ? step.descTe : step.descEn}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
