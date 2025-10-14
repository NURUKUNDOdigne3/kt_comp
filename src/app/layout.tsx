import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NProgressProvider from "@/components/NProgressProvider";
import NProgressHandler from "@/components/NProgressHandler";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ktcomputersupply.vercel.rw"),
  title: {
    default:
      "KT Computer Supply - Premium Electronics & Computer Solutions in Rwanda",
    template: "%s | KT Computer Supply",
  },
  description:
    "KT Computer Supply - Your trusted source for premium electronics, computers, and tech solutions in Rwanda. We offer high-quality products, expert service, and competitive prices.",
  keywords: [
    "computer supply rwanda",
    "electronics store kigali",
    "laptop sales rwanda",
    "computer accessories",
    "tech solutions rwanda",
    "IT equipment kigali",
    "computer parts rwanda",
    "electronics retailer",
    "computer store kigali",
    "tech shop rwanda",
  ],
  authors: { name: "KT Computer Supply" },
  creator: "KT Computer Supply",
  publisher: "KT Computer Supply",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "KT Computer Supply - Premium Electronics & Computer Solutions",
    description:
      "Your trusted source for premium electronics, computers, and tech solutions in Rwanda. We offer high-quality products, expert service, and competitive prices.",
    siteName: "KT Computer Supply",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "KT Computer Supply - Premium Electronics & Computer Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KT Computer Supply - Premium Electronics & Computer Solutions",
    description:
      "Your trusted source for premium electronics, computers, and tech solutions in Rwanda",
    images: ["/logo.png"],
    creator: "@ktcomputer",
    site: "@ktcomputer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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

      <Analytics />
    </html>
  );
}
