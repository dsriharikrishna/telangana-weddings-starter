"use client";

import React, { Suspense } from "react";
import { AdminVerifyOtpForm } from "@/features/auth";

export default function AdminVerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminVerifyOtpForm />
    </Suspense>
  );
}
