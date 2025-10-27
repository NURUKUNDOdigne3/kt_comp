import Script from "next/script";

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  address,
  contactPoint,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    ...(address && { address: { "@type": "PostalAddress", ...address } }),
    ...(contactPoint && { contactPoint: { "@type": "ContactPoint", ...contactPoint } }),
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  product: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency: string;
    availability: "InStock" | "OutOfStock";
    brand: string;
    category: string;
    sku?: string;
    rating?: number;
    reviewCount?: number;
  };
  url: string;
}

export function ProductSchema({ product, url }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    ...(product.sku && { sku: product.sku }),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      url,
      seller: {
        "@type": "Organization",
        name: "KT Computer Supply",
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: product.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "RW",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitText: "Day",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitText: "Day",
          },
        },
      },
    },
    ...(product.rating && product.reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Warranty",
        value: "Manufacturer Warranty Included",
      },
      {
        "@type": "PropertyValue",
        name: "Support",
        value: "Free Technical Support",
      },
    ],
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  name: string;
  url: string;
  description: string;
  searchUrl: string;
}

export function WebsiteSchema({ name, url, description, searchUrl }: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${searchUrl}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  name: string;
  url: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  email?: string;
  openingHours?: string[];
  priceRange?: string;
  image?: string;
}

export function LocalBusinessSchema({
  name,
  url,
  description,
  address,
  geo,
  telephone,
  email,
  openingHours,
  priceRange,
  image,
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    description,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(openingHours && { openingHours }),
    ...(priceRange && { priceRange }),
    ...(image && { image }),
    sameAs: [
      "https://www.facebook.com/ktcomputersupply",
      "https://www.instagram.com/ktcomputersupply",
      "https://www.twitter.com/ktcomputer",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electronics & Computer Products",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Computers & Laptops",
            category: "Electronics",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Smartphones",
            category: "Electronics",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Printers",
            category: "Electronics",
          },
        },
      ],
    },
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  url: string;
  mainEntityOfPage?: string;
  articleSection?: string;
  keywords?: string[];
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  url,
  mainEntityOfPage,
  articleSection,
  keywords,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      logo: {
        "@type": "ImageObject",
        url: publisher.logo,
      },
    },
    url,
    ...(mainEntityOfPage && { mainEntityOfPage }),
    ...(articleSection && { articleSection }),
    ...(keywords && { keywords: keywords.join(", ") }),
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}