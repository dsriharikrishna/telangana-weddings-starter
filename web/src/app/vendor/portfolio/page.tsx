"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";

export default function VendorPortfolioPage() {
  const photos = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="space-y-6">
      <VendorPageHeader
        title="Portfolio Photo Gallery"
        subtitle="Real photos of past weddings help rural families trust your work"
      >
        <Button variant="primary" size="sm" onClick={() => alert("Upload dialog opens. Select high-res wedding photos.")}>
          <Upload className="w-3.5 h-3.5 mr-1.5" />
          <span>Upload Real Photos</span>
        </Button>
      </VendorPageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {photos.map((src, i) => (
          <Card key={i} className="overflow-hidden border border-[#E7DECF]">
            <img src={src} alt="Portfolio item" className="w-full h-44 object-cover" />
          </Card>
        ))}
      </div>
    </div>
  );
}

