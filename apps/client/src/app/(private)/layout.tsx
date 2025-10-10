"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStoreHydration } from "@/hooks/useStoreHydration";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const isHydrated = useStoreHydration();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
