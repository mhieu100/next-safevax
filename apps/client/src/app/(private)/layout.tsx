"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import { Spin } from "antd";

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

  // Nếu chưa hydrate và chưa authenticated, hiển thị loading
  // Nhưng nếu đã authenticated (dù chưa hydrate hoàn toàn), cho phép hiển thị
  if (!isHydrated && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  // Đang redirect đến login
  if (isHydrated && !isAuthenticated) return null;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
