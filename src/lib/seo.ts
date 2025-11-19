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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.ktcomputersupplying.com";
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.ktcomputersupplying.com";
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
  // Enhanced SEO metrics tracking with comprehensive data collection
  if (typeof window !== 'undefined') {
    const timestamp = new Date().toISOString();
    const pageData = {
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      connection: (navigator as any).connection || {},
      timestamp,
    };

    const fullMetrics = {
      ...metrics,
      pageData,
      seoScore: metrics.seoScore || calculateSEOScore(metrics as SEOMetrics),
    };

    console.log('Enhanced SEO Metrics:', fullMetrics);

    // Send to multiple analytics services
    if ((window as any).gtag) {
      (window as any).gtag('event', 'seo_metrics', {
        custom_map: {
          metric1: 'page_load_time',
          metric2: 'lcp',
          metric3: 'fid',
          metric4: 'cls',
          metric5: 'seo_score'
        },
        metric1: metrics.pageLoadTime,
        metric2: metrics.coreWebVitals?.lcp,
        metric3: metrics.coreWebVitals?.fid,
        metric4: metrics.coreWebVitals?.cls,
        metric5: fullMetrics.seoScore,
        page_url: pageData.url,
        viewport_width: pageData.viewport.width,
        connection_type: pageData.connection.effectiveType,
      });
    }

    // Send to Vercel Analytics if available
    if ((window as any).va) {
      (window as any).va('seo_performance', {
        pageLoadTime: metrics.pageLoadTime,
        lcp: metrics.coreWebVitals?.lcp,
        fid: metrics.coreWebVitals?.fid,
        cls: metrics.coreWebVitals?.cls,
        seoScore: fullMetrics.seoScore,
        url: pageData.url,
      });
    }

    // Store in localStorage for debugging and analysis
    try {
      const existingMetrics = JSON.parse(localStorage.getItem('seo_metrics') || '[]');
      existingMetrics.push(fullMetrics);
      // Keep only last 50 entries
      if (existingMetrics.length > 50) {
        existingMetrics.splice(0, existingMetrics.length - 50);
      }
      localStorage.setItem('seo_metrics', JSON.stringify(existingMetrics));
    } catch (error) {
      console.warn('Failed to store SEO metrics in localStorage:', error);
    }
  }
}

export function calculateSEOScore(metrics: SEOMetrics): number {
  let score = 100;

  // Core Web Vitals penalties (enhanced scoring)
  if (metrics.coreWebVitals.lcp > 4000) score -= 30;
  else if (metrics.coreWebVitals.lcp > 2500) score -= 15;
  else if (metrics.coreWebVitals.lcp < 1000) score += 5; // Bonus for excellent LCP

  if (metrics.coreWebVitals.fid > 300) score -= 25;
  else if (metrics.coreWebVitals.fid > 100) score -= 10;
  else if (metrics.coreWebVitals.fid < 50) score += 5; // Bonus for excellent FID

  if (metrics.coreWebVitals.cls > 0.25) score -= 25;
  else if (metrics.coreWebVitals.cls > 0.1) score -= 10;
  else if (metrics.coreWebVitals.cls < 0.05) score += 5; // Bonus for excellent CLS

  // Page load time penalties (enhanced)
  if (metrics.pageLoadTime > 5000) score -= 20;
  else if (metrics.pageLoadTime > 3000) score -= 10;
  else if (metrics.pageLoadTime < 1000) score += 5; // Bonus for fast loading

  // Time to First Byte penalties
  if (metrics.timeToFirstByte > 800) score -= 10;
  else if (metrics.timeToFirstByte > 1800) score -= 20;
  else if (metrics.timeToFirstByte < 200) score += 5; // Bonus for fast TTFB

  // First Contentful Paint bonuses/penalties
  if (metrics.firstContentfulPaint > 2000) score -= 10;
  else if (metrics.firstContentfulPaint < 1000) score += 5;

  // Largest Contentful Paint (already covered above but additional check)
  if (metrics.largestContentfulPaint > 2500) score -= 5; // Additional penalty

  // Cumulative Layout Shift (already covered but additional check)
  if (metrics.cumulativeLayoutShift > 0.15) score -= 5; // Additional penalty

  return Math.max(0, Math.min(100, score));
}

// Enhanced SEO monitoring hook for React components
export function useSEOMonitoring() {
  if (typeof window === 'undefined') return null;

  const startTime = performance.now();

  const trackPageView = () => {
    const loadTime = performance.now() - startTime;

    // Use Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackSEOMetrics({
          largestContentfulPaint: lastEntry.startTime,
          pageLoadTime: loadTime,
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          trackSEOMetrics({
            firstInputDelay: entry.processingStart - entry.startTime,
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        trackSEOMetrics({
          cumulativeLayoutShift: clsValue,
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Fallback metrics
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        trackSEOMetrics({
          timeToFirstByte: navigation.responseStart - navigation.requestStart,
          firstContentfulPaint: performance.getEntriesByType('paint')
            .find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
          pageLoadTime: loadTime,
        });
      }
    }, 0);
  };

  return { trackPageView };
}

// SEO audit function for development
export function runSEOAudit(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  const auditResults = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    issues: [] as string[],
    recommendations: [] as string[],
  };

  // Check for missing meta tags
  const metaTags = {
    title: document.querySelector('title'),
    description: document.querySelector('meta[name="description"]'),
    viewport: document.querySelector('meta[name="viewport"]'),
    robots: document.querySelector('meta[name="robots"]'),
    canonical: document.querySelector('link[rel="canonical"]'),
  };

  Object.entries(metaTags).forEach(([tag, element]) => {
    if (!element) {
      auditResults.issues.push(`Missing ${tag} meta tag`);
    }
  });

  // Check for structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    auditResults.issues.push('No structured data (JSON-LD) found');
  }

  // Check for Open Graph tags
  const ogTags = document.querySelectorAll('meta[property^="og:"]');
  if (ogTags.length < 4) {
    auditResults.recommendations.push('Add more Open Graph meta tags for better social media sharing');
  }

  // Check for Twitter Card tags
  const twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
  if (twitterTags.length < 4) {
    auditResults.recommendations.push('Add Twitter Card meta tags for better Twitter sharing');
  }

  // Check images for alt text
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.getAttribute('alt')) {
      auditResults.issues.push(`Image ${index + 1} missing alt text`);
    }
  });

  // Check headings hierarchy
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    auditResults.issues.push('No H1 tag found');
  } else if (h1Tags.length > 1) {
    auditResults.recommendations.push('Multiple H1 tags found - consider using only one per page');
  }

  console.group('🔍 SEO Audit Results');
  console.log('URL:', auditResults.url);
  console.log('Timestamp:', auditResults.timestamp);

  if (auditResults.issues.length > 0) {
    console.group('❌ Issues Found:');
    auditResults.issues.forEach(issue => console.log('•', issue));
    console.groupEnd();
  }

  if (auditResults.recommendations.length > 0) {
    console.group('💡 Recommendations:');
    auditResults.recommendations.forEach(rec => console.log('•', rec));
    console.groupEnd();
  }

  if (auditResults.issues.length === 0 && auditResults.recommendations.length === 0) {
    console.log('✅ No SEO issues found!');
  }

  console.groupEnd();
}