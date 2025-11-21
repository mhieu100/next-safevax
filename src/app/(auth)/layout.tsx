"use client";

import { useStoreHydration } from "@/hooks/useStoreHydration";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const isHydrated = useStoreHydration();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.back();
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}