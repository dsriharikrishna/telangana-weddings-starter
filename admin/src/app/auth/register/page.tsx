"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("support");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/verify-otp");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] p-4">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#542034] text-[#C5A46D] font-serif text-3xl font-bold flex items-center justify-center mx-auto mb-3 shadow-md">
          శ్రీ
        </div>
        <h1 className="text-2xl font-bold font-heading text-[#292524]">
          Staff Registration
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Request administrative or support staff access
        </p>
      </div>

      <Card className="w-full max-w-md border border-[#E7DECF] bg-white shadow-xl rounded-2xl">
        <CardContent className="p-6 sm:p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ramesh Sharma"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Official Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramesh@telanganaweddings.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Requested Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50"
              >
                <option value="support">Customer & Vendor Support</option>
                <option value="moderator">Content & Verification Moderator</option>
                <option value="finance">Finance & Settlements</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#762B46] hover:bg-[#542034] text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              Submit Staff Request
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="text-center pt-2 text-xs">
            <Link href="/auth/login" className="text-[#762B46] font-semibold hover:underline">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
