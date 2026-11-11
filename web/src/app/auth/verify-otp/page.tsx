"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/customer/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-12 flex items-center justify-center">
        <Card className="w-full max-w-md border border-[#E7DECF] bg-white p-6 sm:p-8 space-y-5 text-center shadow-md">
          <h1 className="text-xl sm:text-2xl font-bold text-[#292524]">
            Verify OTP Code
          </h1>
          <p className="text-xs text-[#57534E]">
            Please enter the 6-digit verification code sent to your registered mobile phone.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              required
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full px-3 py-2 text-center text-xl font-mono tracking-widest rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
            />
            <Button type="submit" variant="primary" className="w-full">
              Confirm & Enter Dashboard
            </Button>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

