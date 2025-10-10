import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NProgressProvider from "@/components/NProgressProvider";
import NProgressHandler from "@/components/NProgressHandler";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KT Computer Supply",
  description: "Top notch electronic and computer solutions in Rwanda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Suspense fallback={null}>
            <NProgressProvider />
          </Suspense>
          <NProgressHandler />
          {children}
          <Toaster richColors />
        </CartProvider>
      </body>
    </html>
  );
}
