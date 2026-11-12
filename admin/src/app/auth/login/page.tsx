"use client";

import React, { Suspense } from "react";
import { AdminLoginForm } from "@/features/auth";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
