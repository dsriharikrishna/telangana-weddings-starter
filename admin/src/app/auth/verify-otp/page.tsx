"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminVerifyOtpPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] p-4">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#542034] text-[#C5A46D] font-serif text-3xl font-bold flex items-center justify-center mx-auto mb-3 shadow-md">
          శ్రీ
        </div>
        <h1 className="text-2xl font-bold font-heading text-[#292524]">
          Two-Factor Authentication
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Enter the authentication code sent to your registered admin device
        </p>
      </div>

      <Card className="w-full max-w-md border border-[#E7DECF] bg-white shadow-xl rounded-2xl">
        <CardContent className="p-6 sm:p-8 space-y-5">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Security Passcode (OTP)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="w-full pl-9 pr-3 py-2 text-center tracking-widest text-lg font-mono rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#762B46] hover:bg-[#542034] text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              Verify & Enter Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
