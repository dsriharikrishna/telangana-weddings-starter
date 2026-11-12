"use client";

import React, { Suspense } from "react";
import { AdminRegisterForm } from "@/features/auth";

export default function AdminRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminRegisterForm />
    </Suspense>
  );
}
