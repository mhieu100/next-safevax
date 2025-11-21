import type { Metadata } from "next";
import "./globals.css";
import { AntdProvider } from "@/components/share/AntdRegistry";
import ReactQueryProvider from "@/components/share/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "Safevax",
  description: "Vaccination System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdProvider>
          <ReactQueryProvider>{children}  <ReactQueryDevtools initialIsOpen={false} /></ReactQueryProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
