import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Material Management System",
  description: "Construction material tracking system for Union Hospital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
