"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { PageLoader } from "@/components/common/PageLoader";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PageLoader />
      {children}
    </AuthProvider>
  );
}
