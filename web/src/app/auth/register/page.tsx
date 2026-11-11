"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/verify-otp");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-12 flex items-center justify-center">
        <Card className="w-full max-w-md border border-[#E7DECF] bg-white p-6 sm:p-8 space-y-5 shadow-md">
          <div className="text-center space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-[#292524]">
              Create Customer Account
            </h1>
            <p className="text-xs text-[#57534E]">
              Track your wedding quotations and bookings in one place
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-[#57534E] block mb-1">
                Full Name (మీ పేరు) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Reddy"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#57534E] block mb-1">
                Mobile Number (మొబైల్ నంబర్) *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 94401 XXXXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DECF] bg-[#FAF7F2] font-mono"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Continue with OTP
            </Button>
          </form>

          <p className="text-xs text-center text-[#57534E]">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-[#762B46] hover:underline">
              Sign In
            </Link>
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

