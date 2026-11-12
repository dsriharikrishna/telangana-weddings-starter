"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Phone, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSendOtp } from "../hooks/useAuth";
import { adminRegisterSchema, AdminRegisterFormValues } from "../schemas/auth.schema";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";

export function AdminRegisterForm() {
  const router = useRouter();
  const { mutateAsync: sendOtp } = useSendOtp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminRegisterFormValues>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "support",
    },
  });

  const onSubmit = async (data: AdminRegisterFormValues) => {
    try {
      if (data.phone) {
        await sendOtp({ phone: data.phone });
      }
      router.push("/auth/verify-otp");
    } catch (err) {
      console.warn("Staff request dispatch:", err);
      router.push("/auth/verify-otp");
    }
  };

  const roleOptions = [
    { label: "Customer & Vendor Support", value: "support" },
    { label: "Content & Verification Moderator", value: "moderator" },
    { label: "Finance & Settlements", value: "finance" },
  ];

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Full Name"
              type="text"
              placeholder="Ramesh Sharma"
              leftIcon={<User className="w-3.5 h-3.5 text-stone-400" />}
              error={errors.name?.message}
              {...register("name")}
            />

            <FormInput
              label="Official Email"
              type="email"
              placeholder="ramesh@telanganaweddings.com"
              leftIcon={<Mail className="w-3.5 h-3.5 text-stone-400" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <FormInput
              label="Mobile Number for 2FA Verification"
              type="tel"
              placeholder="+91 98480 12345"
              leftIcon={<Phone className="w-3.5 h-3.5 text-stone-400" />}
              error={errors.phone?.message}
              {...register("phone")}
            />

            <FormSelect
              label="Requested Role"
              options={roleOptions}
              error={errors.role?.message}
              {...register("role")}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#762B46] hover:bg-[#542034] text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                </>
              ) : (
                <>
                  Submit Staff Request
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
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
