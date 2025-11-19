export default function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KT Computer Supply",
    "alternateName": "KT Computer Supply Rwanda",
    "url": "https://www.ktcomputersupplying.com",
    "logo": "https://www.ktcomputersupplying.com/logo.png",
    "image": "https://www.ktcomputersupplying.com/logo.png",
    "description": "KT Computer Supply - Your trusted source for premium electronics, computers, and tech solutions in Rwanda. Best prices, fast delivery, expert support.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RW",
      "addressLocality": "Kigali",
      "addressRegion": "Kigali City"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.9441,
      "longitude": 30.0619
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "RW",
      "availableLanguage": ["English", "Kinyarwanda", "French"]
    },
    "sameAs": [
      "https://twitter.com/ktcomputer",
      "https://www.facebook.com/ktcomputersupply"
    ],
    "founder": {
      "@type": "Person",
      "name": "KT Computer Supply Team"
    },
    "foundingDate": "2020",
    "slogan": "Premium Electronics & Computer Solutions in Rwanda"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData),
      }}
    />
  );
}