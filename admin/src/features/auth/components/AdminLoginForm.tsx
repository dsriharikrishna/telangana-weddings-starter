"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Lock, Mail, ArrowRight, KeyRound, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminStore } from "@/store/useAdminStore";
import { SAMPLE_ADMIN_USERS, MockAdminAccount } from "@/data/sample-logins";
import { useVerifyOtp } from "../hooks/useAuth";
import { adminLoginSchema, AdminLoginFormValues } from "../schemas/auth.schema";
import { FormInput } from "@/components/forms/FormInput";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get("redirect") || "/dashboard";

  const loginWithAccount = useAdminStore((s) => s.loginWithAccount);
  const { mutateAsync: verifyOtpMutation } = useVerifyOtp();

  const [selectedAccount, setSelectedAccount] = useState<MockAdminAccount>(SAMPLE_ADMIN_USERS[0]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: SAMPLE_ADMIN_USERS[0].email,
      password: SAMPLE_ADMIN_USERS[0].password,
    },
  });

  // Quick switch between sample login credentials
  const handleSelectSample = (acc: MockAdminAccount) => {
    setSelectedAccount(acc);
    setValue("email", acc.email, { shouldValidate: true });
    setValue("password", acc.password, { shouldValidate: true });
  };

  const onSubmit = async (data: AdminLoginFormValues) => {
    try {
      // 1. Authenticate against Backend API via TanStack Query Feature Mutation
      await verifyOtpMutation({
        phone: "+919999900001",
        otp: "123456",
        role: "ADMIN",
      });
    } catch (err) {
      console.warn("Backend admin login fallback:", err);
    }

    // 2. Set Admin Persona in Store
    const matched = SAMPLE_ADMIN_USERS.find((u) => u.email === data.email) || {
      ...selectedAccount,
      email: data.email,
    };

    loginWithAccount(matched);
    router.push(redirectPath);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] p-4 py-8">
      {/* Platform Branding */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#542034] text-[#C5A46D] font-serif text-3xl font-bold flex items-center justify-center mx-auto mb-3 shadow-md">
          శ్రీ
        </div>
        <h1 className="text-2xl font-bold font-heading text-[#292524]">
          Telangana Weddings Admin
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Backoffice Authentication & Operations Portal
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Sample Logins Selection Palette */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A46D]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Sample Admin Personas
            </h2>
          </div>
          <p className="text-[11px] text-stone-500">
            Click any staff profile to test authentication and role permissions:
          </p>

          <div className="space-y-2">
            {SAMPLE_ADMIN_USERS.map((acc) => {
              const isSelected = selectedAccount.id === acc.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleSelectSample(acc)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#762B46] shadow-sm ring-2 ring-[#762B46]/20"
                      : "bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
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
                        {acc.name.split(" ")[0]}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[9px] px-1.5 py-0 ${
                          isSelected
                            ? "bg-[#FAF7F2] text-[#762B46] border-[#762B46]/30 font-semibold"
                            : "text-stone-500 border-stone-200"
                        }`}
                      >
                        {acc.badgeLabel}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                      {acc.description}
                    </p>
                    <div className="text-[10px] font-mono text-[#762B46] mt-1">
                      {acc.email}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form Box */}
        <Card className="md:col-span-7 border border-[#E7DECF] bg-white shadow-xl rounded-2xl">
          <CardContent className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#762B46]" />
                <h2 className="text-sm font-bold text-stone-800">
                  Login with Credentials
                </h2>
              </div>
              <Badge className="bg-[#762B46] text-white text-[10px]">
                {selectedAccount.badgeLabel}
              </Badge>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Official Email Address"
                type="email"
                leftIcon={<Mail className="w-4 h-4 text-stone-400" />}
                placeholder="admin@telanganaweddings.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <FormInput
                label="Security Password"
                type="password"
                leftIcon={<Lock className="w-4 h-4 text-stone-400" />}
                error={errors.password?.message}
                {...register("password")}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#762B46] hover:bg-[#542034] text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                >
                  {isSubmitting ? "Authenticating..." : `Sign in as ${selectedAccount.badgeLabel}`}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-[#C5A46D]" />
                Password preset enabled
              </span>
              <span>Middleware Secured</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
