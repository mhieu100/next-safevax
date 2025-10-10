"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/not-found"];
  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}
