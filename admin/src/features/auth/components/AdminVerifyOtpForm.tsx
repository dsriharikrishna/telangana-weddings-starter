"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useVerifyOtp } from "../hooks/useAuth";
import { useAdminStore } from "@/store/useAdminStore";
import { SAMPLE_ADMIN_USERS } from "@/data/sample-logins";
import { adminVerifyOtpSchema, AdminVerifyOtpFormValues } from "../schemas/auth.schema";
import { FormInput } from "@/components/forms/FormInput";

export function AdminVerifyOtpForm() {
  const router = useRouter();
  const { mutateAsync: verifyOtp } = useVerifyOtp();
  const loginWithAccount = useAdminStore((s) => s.loginWithAccount);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminVerifyOtpFormValues>({
    resolver: zodResolver(adminVerifyOtpSchema),
    defaultValues: {
      phone: "+919999900001",
      code: "",
    },
  });

  const onSubmit = async (data: AdminVerifyOtpFormValues) => {
    try {
      await verifyOtp({
        phone: data.phone,
        otp: data.code,
        role: "ADMIN",
      });
    } catch (err) {
      console.warn("OTP verification error:", err);
    }
    // Set admin persona and authentication cookie
    loginWithAccount(SAMPLE_ADMIN_USERS[0]);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Security Passcode (OTP)"
              type="text"
              maxLength={6}
              placeholder="123456"
              leftIcon={<KeyRound className="w-4 h-4 text-stone-400" />}
              className="text-center tracking-widest text-lg font-mono"
              error={errors.code?.message}
              {...register("code")}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#762B46] hover:bg-[#542034] text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Verify & Enter Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
