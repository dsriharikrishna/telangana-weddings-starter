"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Phone, Lock, ArrowRight, ShieldCheck, Sparkles, User, Store, CheckCircle2 
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/useAppStore";
import { SAMPLE_WEB_ACCOUNTS, MockWebAccount } from "@/data/sample-users";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get("redirect");
  const requestedRole = searchParams?.get("role");

  const loginUser = useAppStore((s) => s.loginUser);

  // Default to requested role if vendor, else first customer
  const initialAccount =
    requestedRole === "vendor"
      ? SAMPLE_WEB_ACCOUNTS.find((a) => a.role === "vendor") || SAMPLE_WEB_ACCOUNTS[2]
      : SAMPLE_WEB_ACCOUNTS[0];

  const [selectedAccount, setSelectedAccount] = useState<MockWebAccount>(initialAccount);
  const [phone, setPhone] = useState(initialAccount.phone);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleSelectSample = (acc: MockWebAccount) => {
    setSelectedAccount(acc);
    setPhone(acc.phone);
    setOtpSent(false);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      loginUser(selectedAccount);

      if (redirectPath) {
        router.push(redirectPath);
      } else if (selectedAccount.role === "vendor") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/customer/dashboard");
      }
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] w-full">
      <Header />

      <main className="flex-1 layout-fullwidth py-10 px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Sample Logins Persona Selector */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A46D]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Sample Personas (One-Click Test)
              </h2>
            </div>
            <p className="text-[11px] text-stone-500">
              Select a customer or master artisan vendor to test authentication and role redirection:
            </p>

            <div className="space-y-2.5">
              {SAMPLE_WEB_ACCOUNTS.map((acc) => {
                const isSelected = selectedAccount.id === acc.id;
                const isVendor = acc.role === "vendor";
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSelectSample(acc)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#762B46] shadow-sm ring-2 ring-[#762B46]/20"
                        : "bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#762B46] text-white"
                          : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {acc.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {acc.name}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-[9px] px-1.5 py-0 ${
                            isVendor
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-blue-50 text-blue-800 border-blue-200"
                          }`}
                        >
                          {acc.badgeLabel}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {acc.description}
                      </p>
                      <div className="text-[10px] font-mono text-[#762B46] mt-1 flex items-center gap-2">
                        <span>+91 {acc.phone}</span>
                        <span>&bull;</span>
                        <span className="text-stone-400">{acc.location}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form Card */}
          <Card className="md:col-span-7 border border-[#E7DECF] bg-white p-6 sm:p-8 space-y-6 shadow-md rounded-2xl">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-[#762B46] text-[#C5A46D] font-serif text-2xl font-bold flex items-center justify-center mx-auto mb-2 shadow-xs">
                శ్రీ
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#292524]">
                {otpSent ? "Enter Verification Code" : "Sign in to TelanganaWeddings"}
              </h1>
              <p className="text-xs text-[#57534E]">
                {otpSent
                  ? `6-digit OTP sent to +91 ${phone}`
                  : "Enter your mobile number to view quotations, bookings, or vendor dashboard"}
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#57534E] block mb-1">
                    Mobile Number (మొబైల్ నంబర్)
                  </label>
                  <div className="flex rounded-xl border border-[#E7DECF] bg-[#FAF7F2] overflow-hidden focus-within:ring-2 focus-within:ring-[#762B46]/30">
                    <span className="px-3 py-2 text-xs text-[#57534E] bg-[#E7DECF]/40 border-r border-[#E7DECF] flex items-center font-semibold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98480 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 px-3 py-2 text-xs bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#762B46] hover:bg-[#542034] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow"
                >
                  Send OTP via SMS (ఓటీపీ పంపండి)
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#57534E] block mb-1 text-center">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2.5 text-center text-lg font-mono tracking-widest rounded-xl border border-[#E7DECF] bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#762B46]/30"
                  />
                  <p className="text-[10px] text-stone-400 text-center mt-1">
                    Demo Mode: Auto-filled with &quot;123456&quot;
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#762B46] hover:bg-[#542034] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow"
                >
                  {loading ? "Verifying..." : `Login as ${selectedAccount.role === "vendor" ? "Vendor" : "Customer"}`}
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-[11px] text-[#762B46] hover:underline"
                >
                  Change phone number
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Next.js Edge Guard Active
              </span>
              <Link href="/vendor/register" className="text-[#762B46] font-semibold hover:underline">
                Become a Vendor &rarr;
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
