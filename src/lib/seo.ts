import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  price?: number;
  currency?: string;
  availability?: "in_stock" | "out_of_stock";
  brand?: string;
  category?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ktcomputersupply.vercel.rw";
  const fullUrl = config.url ? `${baseUrl}${config.url}` : baseUrl;
  const imageUrl = config.image || "/logo.png";
  const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;

  // Shorten title if too long (rough estimate: ~45-50 chars for 580px)
  const shortTitle = config.title.length > 50 ? "KT Computer Supply - Premium Electronics in Rwanda" : config.title;

  // Shorten description if too long (rough estimate: ~130-140 chars for 1000px)
  const shortDescription = config.description.length > 140 ? "KT Computer Supply - Your trusted source for premium electronics, computers, and tech solutions in Rwanda. Best prices, fast delivery, expert support." : config.description;

  return {
    title: shortTitle,
    description: shortDescription,
    keywords: config.keywords,
    openGraph: {
      title: shortTitle,
      description: shortDescription,
      url: fullUrl,
      siteName: "KT Computer Supply",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      type: config.type || "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: shortTitle,
      description: shortDescription,
      images: [fullImageUrl],
      creator: "@ktcomputer",
      site: "@ktcomputer",
    },
    alternates: {
      canonical: fullUrl,
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
}

export function generateProductMetadata(product: any): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ktcomputersupply.vercel.rw";
  const productUrl = `/products/${product.id}`;
  const fullUrl = `${baseUrl}${productUrl}`;
  const imageUrl = product.image || "/logo.png";
  const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;

  const title = `${product.name} - ${product.brand?.name || "KT Computer Supply"}`;
  const description = product.description ||
    `Buy ${product.name} from ${product.brand?.name || "top brands"} at KT Computer Supply. ${product.category?.name || "Electronics"} with warranty and fast delivery in Rwanda.`;

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      product.brand?.name?.toLowerCase(),
      product.category?.name?.toLowerCase(),
      "rwanda",
      "kigali",
      "electronics",
      "computer supply",
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "KT Computer Supply",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      "product:price:amount": product.price?.toString(),
      "product:price:currency": "RWF",
      "product:availability": product.inStock ? "in_stock" : "out_of_stock",
      "product:brand": product.brand?.name,
      "product:category": product.category?.name,
    },
  };
}

export function generateCategoryMetadata(category: any, products: any[]): Metadata {
  const title = `${category.name} - Premium ${category.name} in Rwanda | KT Computer Supply`;
  const description = category.description ||
    `Shop premium ${category.name.toLowerCase()} from top brands at KT Computer Supply. Best prices, warranty, and fast delivery across Rwanda. ${products.length}+ products available.`;

  return generateMetadata({
    title,
    description,
    keywords: [
      category.name.toLowerCase(),
      `${category.name.toLowerCase()} rwanda`,
      `${category.name.toLowerCase()} kigali`,
      "electronics rwanda",
      "computer supply",
      "tech store rwanda",
    ],
    url: `/${category.slug}`,
    image: category.image,
  });
}

export function generateBrandMetadata(brand: any, products: any[]): Metadata {
  const title = `${brand.name} Products - Official ${brand.name} Store in Rwanda | KT Computer Supply`;
  const description = `Shop authentic ${brand.name} products at KT Computer Supply. Official retailer with warranty, competitive prices, and fast delivery across Rwanda. ${products.length}+ ${brand.name} products available.`;

  return generateMetadata({
    title,
    description,
    keywords: [
      brand.name.toLowerCase(),
      `${brand.name.toLowerCase()} rwanda`,
      `${brand.name.toLowerCase()} kigali`,
      `${brand.name.toLowerCase()} official store`,
      "electronics rwanda",
    ],
    url: `/brands/${brand.slug}`,
    image: brand.logo,
  });
}

// SEO Performance Monitoring
export interface SEOMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToFirstByte: number;
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
  seoScore: number;
  issues: string[];
}

export function trackSEOMetrics(metrics: Partial<SEOMetrics>) {
  // In a real implementation, this would send data to analytics service
  if (typeof window !== 'undefined') {
    console.log('SEO Metrics:', metrics);

    // Send to analytics (Google Analytics, Vercel Analytics, etc.)
    if ((window as any).gtag) {
      (window as any).gtag('event', 'seo_metrics', {
        custom_map: { metric1: 'page_load_time' },
        metric1: metrics.pageLoadTime,
        lcp: metrics.coreWebVitals?.lcp,
        fid: metrics.coreWebVitals?.fid,
        cls: metrics.coreWebVitals?.cls,
      });
    }
  }
}

export function calculateSEOScore(metrics: SEOMetrics): number {
  let score = 100;

  // Core Web Vitals penalties
  if (metrics.coreWebVitals.lcp > 2500) score -= 15;
  else if (metrics.coreWebVitals.lcp > 4000) score -= 30;

  if (metrics.coreWebVitals.fid > 100) score -= 10;
  else if (metrics.coreWebVitals.fid > 300) score -= 25;

  if (metrics.coreWebVitals.cls > 0.1) score -= 10;
  else if (metrics.coreWebVitals.cls > 0.25) score -= 25;

  // Page load time penalties
  if (metrics.pageLoadTime > 3000) score -= 10;
  else if (metrics.pageLoadTime > 5000) score -= 20;

  return Math.max(0, Math.min(100, score));
}