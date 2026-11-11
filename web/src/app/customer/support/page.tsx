"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerSupportPage() {
  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-[#E7DECF]">
        <h1 className="text-xl font-bold text-[#292524]">Customer Support (సహాయ కేంద్రం)</h1>
        <p className="text-xs text-[#57534E]">Rural wedding coordination helpline for families and village elders</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-5 bg-white border border-[#E7DECF] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#762B46] text-[#C5A46D] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#292524]">Telugu Phone Helpline</h2>
          <p className="text-xs text-[#57534E]">
            Speak with our field coordinator directly in Telugu for booking assistance.
          </p>
          <p className="font-mono font-bold text-sm text-[#762B46]">+91 94401 XXXXX</p>
          <Button variant="primary" size="sm" onClick={() => window.open("tel:+919440100000")}>
            Call Support Desk
          </Button>
        </Card>

        <Card className="p-5 bg-white border border-[#E7DECF] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#292524]">WhatsApp Support</h2>
          <p className="text-xs text-[#57534E]">
            Send your wedding dates and location requirements via WhatsApp chat.
          </p>
          <p className="font-mono font-bold text-sm text-emerald-700">+91 94401 XXXXX</p>
          <Button variant="secondary" size="sm" onClick={() => window.open("https://wa.me/919440100000")}>
            Chat on WhatsApp
          </Button>
        </Card>
      </div>
    </div>
  );
}

