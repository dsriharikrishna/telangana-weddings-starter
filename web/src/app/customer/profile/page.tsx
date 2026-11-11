"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomerProfilePage() {
  const [name, setName] = useState("Ramesh Reddy");
  const [phone, setPhone] = useState("+91 94401 XXXXX");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-[#E7DECF]">
        <h1 className="text-xl font-bold text-[#292524]">Profile & Settings</h1>
        <p className="text-xs text-[#57534E]">Manage personal contact details and language preferences</p>
      </div>

      <Card className="p-6 bg-white border border-[#E7DECF] max-w-xl space-y-4">
        <form onSubmit={handleSave} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-[#57534E] block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#57534E] block mb-1">Mobile Phone (OTP Login)</label>
            <input
              type="text"
              disabled
              value={phone}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-gray-100 text-gray-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#57534E] block mb-1">Preferred Language</label>
            <select className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]">
              <option value="te">తెలుగు (Telugu - Recommended)</option>
              <option value="en">English</option>
            </select>
          </div>

          <Button type="submit" variant="primary" size="sm">
            {saved ? "Saved Successfully!" : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

