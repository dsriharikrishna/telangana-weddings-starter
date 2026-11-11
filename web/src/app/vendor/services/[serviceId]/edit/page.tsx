"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EditServicePackagePage() {
  return (
    <div className="space-y-6">
      <Link href="/vendor/services" className="inline-flex items-center gap-1.5 text-xs text-[#762B46] font-semibold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Services</span>
      </Link>

      <Card className="p-6 bg-white border border-[#E7DECF] max-w-xl space-y-4">
        <h1 className="text-xl font-bold text-[#292524]">Edit Service Package</h1>
        <p className="text-xs text-[#57534E]">Update pricing and details for Grand Kalyana Mandapam Day Package.</p>
        <Button variant="primary" size="sm" asChild>
          <Link href="/vendor/services">Save Changes</Link>
        </Button>
      </Card>
    </div>
  );
}

