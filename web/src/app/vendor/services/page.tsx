"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VendorServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF]">
        <div>
          <h1 className="text-xl font-bold text-[#292524]">My Wedding Services & Packages</h1>
          <p className="text-xs text-[#57534E]">Manage pricing, package inclusions and equipment descriptions</p>
        </div>
        <Button variant="primary" size="sm" asChild>
          <Link href="/vendor/services/create">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>Add New Package</span>
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        <Card className="p-4 bg-white border border-[#E7DECF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#762B46]">Grand Kalyana Mandapam Day Package</span>
              <Badge variant="gold">AC Hall</Badge>
            </div>
            <p className="text-[#57534E] mt-1">1000 guest seating capacity, separate 400-guest dining hall, silent generator backup included.</p>
            <p className="font-bold text-sm text-[#292524] mt-1">₹50,000 / day</p>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/vendor/services/pkg-01/edit">Edit Package</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

