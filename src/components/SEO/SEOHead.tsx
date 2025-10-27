"use client";

import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  price?: number;
  currency?: string;
  availability?: "in_stock" | "out_of_stock";
  brand?: string;
  category?: string;
}

export default function SEOHead({
  title = "KT Computer Supply - Premium Electronics & Computer Solutions in Rwanda",
  description = "Your trusted source for premium electronics, computers, and tech solutions in Rwanda. Mobile money payments, fast delivery, warranty included.",
  keywords = [],
  image = "/logo.png",
  url = "/",
  type = "website",
  price,
  currency = "RWF",
  availability,
  brand,
  category,
}: SEOHeadProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ktcomputersupply.vercel.rw";
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const defaultKeywords = [
    "computer supply rwanda",
    "electronics store kigali",
    "laptop sales rwanda",
    "mobile money payments",
    "paypack rwanda",
    "tech solutions rwanda",
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(", ");

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="KT Computer Supply" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="RW" />
      <meta name="geo.placename" content="Kigali" />
      <meta name="geo.position" content="-1.9441;30.0619" />
      <meta name="ICBM" content="-1.9441, 30.0619" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="KT Computer Supply" />
      <meta property="og:locale" content="en_US" />
      
      {/* Product-specific Open Graph */}
      {type === "product" && price && (
        <>
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content={currency} />
          {availability && <meta property="product:availability" content={availability} />}
          {brand && <meta property="product:brand" content={brand} />}
          {category && <meta property="product:category" content={category} />}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@ktcomputer" />
      <meta name="twitter:site" content="@ktcomputer" />

      {/* Pinterest Rich Pins */}
      <meta property="pinterest-rich-pin" content="true" />
      <meta property="pin:description" content={description} />
      <meta property="pin:url" content={fullUrl} />
      <meta property="pin:media" content={fullImageUrl} />

      {/* LinkedIn */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://payments.paypack.rw" />
      <link rel="dns-prefetch" href="https://api.stripe.com" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#3b82f6" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo.png" />
    </Head>
  );
}