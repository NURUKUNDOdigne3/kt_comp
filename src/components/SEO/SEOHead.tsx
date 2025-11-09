"use client";

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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.ktcomputersupplying.com";
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  // Focus on high-value, relevant keywords only
  const defaultKeywords = [
    "computer supply rwanda",
    "electronics store kigali",
    "laptop sales rwanda",
    "mobile money payments rwanda",
    "paypack payments",
    "tech solutions rwanda",
    "IT equipment kigali",
    "computer store kigali",
    "apple products rwanda",
    "dell laptops rwanda",
    "hp printers rwanda",
    "gaming laptops rwanda",
    "office computers rwanda",
    "KT computer supply",
 
    
    // Educational & Student
    "student laptop kigali", "school computer rwanda", "educational tablet kigali", "classroom projector rwanda", "interactive whiteboard kigali", "learning software rwanda", "educational app kigali", "student discount rwanda", "university computer kigali", "research laptop rwanda", "thesis computer kigali", "academic software rwanda",
    
    // Services
    "computer repair kigali", "laptop repair rwanda", "phone repair kigali", "screen replacement rwanda", "data recovery kigali", "virus removal rwanda", "software installation kigali", "hardware upgrade rwanda", "computer maintenance kigali", "tech support rwanda", "it services kigali", "network setup rwanda", "wifi installation kigali", "computer training rwanda",
    
    // Payment & Delivery
    "mobile money computer", "mtn momo electronics", "airtel money laptop", "paypack computer", "bank transfer electronics", "cash on delivery computer", "installment laptop", "credit computer", "financing electronics", "free delivery computer", "same day delivery laptop", "express shipping electronics", "nationwide delivery computer", "kigali delivery laptop",
    
    // Technical Specifications
    "intel processor laptop", "amd processor computer", "core i3 laptop", "core i5 computer", "core i7 laptop", "ryzen processor computer", "4gb ram laptop", "8gb ram computer", "16gb ram laptop", "32gb ram computer", "256gb ssd laptop", "512gb ssd computer", "1tb hdd laptop", "2tb hdd computer", "nvidia graphics laptop", "amd graphics computer", "integrated graphics laptop", "dedicated graphics computer", "full hd laptop", "4k computer", "touchscreen laptop", "backlit keyboard computer",
    
    // Seasonal & Trending
    "back to school laptop", "christmas computer deals", "new year electronics", "black friday computer", "cyber monday laptop", "holiday electronics", "graduation laptop", "valentine computer", "mother's day electronics", "father's day computer", "independence day laptop", "end of year electronics", "january sale computer", "march promotion laptop",
    
    // Comparison & Reviews
    "best laptop kigali", "top computer rwanda", "laptop comparison kigali", "computer review rwanda", "laptop vs desktop", "android vs iphone", "intel vs amd", "ssd vs hdd", "laptop buying guide", "computer specifications", "tech recommendations", "product comparison", "expert review", "customer rating", "user feedback", "performance test",
    
    // Additional 100 Keywords
    "computer accessories kigali", "laptop bag rwanda", "cooling pad kigali", "laptop stand rwanda", "docking station kigali", "usb hub rwanda", "hdmi cable kigali", "displayport cable rwanda", "ethernet cable kigali", "audio cable rwanda", "video cable kigali", "power cable rwanda", "extension cord kigali", "surge protector rwanda", "ups battery kigali", "inverter rwanda", "stabilizer kigali", "voltage regulator rwanda", "computer desk kigali", "office chair rwanda", "ergonomic chair kigali", "standing desk rwanda", "monitor arm kigali", "cable management rwanda", "computer case kigali", "cpu cooler rwanda", "thermal paste kigali", "ram memory rwanda", "graphics card kigali", "motherboard rwanda", "processor kigali", "hard drive rwanda", "solid state drive kigali", "optical drive rwanda", "network card kigali", "sound card rwanda", "wifi card kigali", "bluetooth adapter rwanda", "usb wifi kigali", "wireless adapter rwanda", "antenna kigali", "signal booster rwanda", "repeater kigali", "bridge rwanda", "gateway kigali", "firewall rwanda", "nas storage kigali", "cloud storage rwanda", "backup solution kigali", "data backup rwanda", "antivirus kigali", "security software rwanda", "vpn service kigali", "remote access rwanda", "team viewer kigali", "anydesk rwanda", "chrome remote kigali", "rdp connection rwanda", "ssh client kigali", "ftp client rwanda", "file transfer kigali", "sync software rwanda", "productivity suite kigali", "office suite rwanda", "word processor kigali", "spreadsheet rwanda", "presentation software kigali", "pdf reader rwanda", "image editor kigali", "video player rwanda", "music player kigali", "media center rwanda", "streaming software kigali", "recording software rwanda", "screen capture kigali", "screenshot tool rwanda", "password manager kigali", "encryption software rwanda", "compression tool kigali", "archive software rwanda", "system cleaner kigali", "registry cleaner rwanda", "disk cleaner kigali", "defragmentation rwanda", "system optimizer kigali", "performance monitor rwanda", "task manager kigali", "process monitor rwanda", "network monitor kigali", "bandwidth monitor rwanda", "temperature monitor kigali", "fan control rwanda", "overclocking software kigali", "benchmarking tool rwanda", "stress test kigali", "diagnostic software rwanda", "driver updater kigali", "firmware update rwanda", "bios update kigali", "system recovery rwanda", "boot repair kigali", "partition manager rwanda", "disk imaging kigali", "clone software rwanda","arison kigali", "computer review rwanda", "laptop vs desktop", "android vs iphone", "intel vs amd", "ssd vs hdd", "laptop buying guide", "computer specifications", "tech recommendations", "product comparison", "expert review", "customer rating", "user feedback", "performance test",
    
    // Industry & Technology
    "artificial intelligence computer", "machine learning laptop", "blockchain technology", "cryptocurrency mining", "cloud computing", "edge computing", "quantum computer", "5g technology", "iot devices", "smart home", "automation system", "robotics", "drone technology", "3d printing", "virtual reality", "augmented reality", "mixed reality", "digital transformation", "industry 4.0", "fintech rwanda",
    
    // Sustainability & Environment
    "eco friendly computer", "green technology", "energy efficient laptop", "sustainable electronics", "recycled computer", "carbon neutral tech", "renewable energy computer", "solar powered laptop", "environmental friendly electronics", "e-waste recycling", "circular economy tech", "sustainable computing",
    
    // Emerging Markets & Trends
    "startup computer", "entrepreneur laptop", "freelancer electronics", "remote work computer", "work from home laptop", "digital nomad electronics", "content creator computer", "youtuber laptop", "streamer electronics", "podcaster computer", "blogger laptop", "influencer electronics", "social media computer", "online business laptop",
    
    // Health & Safety
    "ergonomic computer", "blue light filter laptop", "eye protection monitor", "posture friendly computer", "health conscious electronics", "radiation free laptop", "safe computer", "child safe electronics", "parental control computer", "family friendly laptop",
    
    // Connectivity & Communication
    "wifi 6 router", "5g modem", "fiber optic equipment", "satellite internet", "mesh network", "vpn router", "firewall device", "network security", "wireless communication", "bluetooth device", "nfc technology", "wireless charging", "fast charging", "usb-c device", "thunderbolt computer",
    
    // Software & Applications
    "microsoft office", "adobe creative suite", "antivirus software", "accounting software", "design software", "video editing", "photo editing", "programming software", "database software", "erp system", "crm software", "project management", "collaboration tools", "productivity software", "educational software",
    
    // Market Segments
    "sme computer solution", "enterprise technology", "government electronics", "ngo computer", "healthcare technology", "education technology", "agriculture tech", "tourism technology", "hospitality electronics", "retail technology", "banking technology", "insurance tech", "logistics technology", "transport electronics",
    
    // Future Technology
    "next generation computer", "future electronics", "emerging technology", "innovation hub", "tech startup", "digital innovation", "smart city technology", "connected devices", "internet of things", "edge ai", "neuromorphic computing", "quantum networking", "6g technology", "holographic display", "brain computer interface",
    
    // 200 Kigali-Specific Keywords
    "computer store kigali city", "electronics shop kigali center", "laptop dealer kigali downtown", "tech store kigali mall", "computer repair kigali city", "phone shop kigali market", "electronics kigali rwanda", "computer kigali price", "laptop kigali buy", "smartphone kigali store", "tablet kigali shop", "router kigali dealer", "speaker kigali electronics", "monitor kigali computer", "printer kigali office", "keyboard kigali gaming", "mouse kigali wireless", "headphone kigali audio", "webcam kigali video", "charger kigali mobile", "cable kigali computer", "adapter kigali power", "battery kigali laptop", "memory kigali computer", "storage kigali external", "graphics kigali gaming", "processor kigali intel", "motherboard kigali asus", "cooling kigali computer", "case kigali gaming", "power kigali supply", "network kigali equipment", "security kigali camera", "software kigali microsoft", "antivirus kigali security", "office kigali suite", "design kigali software", "video kigali editing", "photo kigali editor", "music kigali player", "game kigali software", "utility kigali system", "driver kigali update", "backup kigali solution", "recovery kigali data", "optimization kigali system", "cleaning kigali computer", "maintenance kigali laptop", "upgrade kigali hardware", "installation kigali software", "configuration kigali system", "troubleshooting kigali computer", "diagnosis kigali hardware", "testing kigali performance", "benchmarking kigali system", "monitoring kigali network", "scanning kigali security", "protection kigali virus", "encryption kigali data", "compression kigali file", "synchronization kigali data", "streaming kigali media", "recording kigali audio", "capturing kigali screen", "editing kigali document", "processing kigali image", "rendering kigali video", "encoding kigali media", "decoding kigali format", "converting kigali file", "transferring kigali data", "sharing kigali network", "connecting kigali wireless", "pairing kigali bluetooth", "syncing kigali device", "updating kigali firmware", "flashing kigali bios", "overclocking kigali processor", "undervolting kigali cpu", "cooling kigali thermal", "ventilation kigali computer", "airflow kigali case", "temperature kigali monitoring", "voltage kigali regulation", "current kigali protection", "surge kigali protector", "stabilizer kigali voltage", "inverter kigali power", "generator kigali backup", "solar kigali computer", "renewable kigali energy", "sustainable kigali tech", "green kigali computing", "eco kigali electronics", "recycling kigali ewaste", "disposal kigali electronic", "refurbishing kigali computer", "restoration kigali laptop", "renovation kigali electronics", "modernization kigali system", "digitization kigali business", "automation kigali office", "integration kigali system", "migration kigali data", "transformation kigali digital", "innovation kigali technology", "development kigali software", "programming kigali code", "scripting kigali automation", "debugging kigali software", "testing kigali application", "deployment kigali system", "hosting kigali server", "cloud kigali computing", "virtualization kigali server", "containerization kigali app", "orchestration kigali container", "scaling kigali infrastructure", "load kigali balancing", "clustering kigali server", "replication kigali data", "synchronization kigali database", "indexing kigali search", "caching kigali performance", "optimization kigali database", "tuning kigali performance", "profiling kigali application", "monitoring kigali server", "logging kigali system", "alerting kigali notification", "reporting kigali analytics", "dashboard kigali monitoring", "visualization kigali data", "analysis kigali business", "intelligence kigali artificial", "learning kigali machine", "processing kigali natural", "recognition kigali pattern", "classification kigali data", "prediction kigali model", "forecasting kigali trend", "simulation kigali system", "modeling kigali process", "optimization kigali algorithm", "automation kigali workflow", "orchestration kigali process", "integration kigali api", "communication kigali protocol", "messaging kigali system", "notification kigali service", "alerting kigali system", "monitoring kigali infrastructure", "surveillance kigali security", "detection kigali intrusion", "prevention kigali threat", "protection kigali cyber", "defense kigali security", "firewall kigali network", "filtering kigali content", "blocking kigali access", "authentication kigali user", "authorization kigali permission", "encryption kigali communication", "decryption kigali data", "hashing kigali password", "signing kigali digital", "verification kigali identity", "validation kigali certificate", "auditing kigali security", "compliance kigali regulation", "governance kigali data", "policy kigali security", "procedure kigali standard", "protocol kigali communication", "framework kigali development", "architecture kigali system", "design kigali software", "pattern kigali architecture", "methodology kigali development", "practice kigali best", "standard kigali industry", "certification kigali professional", "training kigali technical", "education kigali computer", "course kigali programming", "workshop kigali technology", "seminar kigali digital", "conference kigali tech", "meetup kigali developer", "community kigali tech", "network kigali professional", "association kigali computer", "society kigali technology", "organization kigali digital", "institution kigali education", "academy kigali computer", "school kigali technology", "university kigali computer", "college kigali technical", "institute kigali technology", "center kigali training", "facility kigali computer", "laboratory kigali tech", "studio kigali digital", "workspace kigali creative", "office kigali technology", "headquarters kigali tech", "branch kigali computer", "outlet kigali electronics", "showroom kigali technology", "warehouse kigali computer", "distribution kigali electronics", "logistics kigali technology", "supply kigali computer", "chain kigali electronics", "vendor kigali technology", "supplier kigali computer", "distributor kigali electronics", "retailer kigali technology", "dealer kigali computer", "reseller kigali electronics", "partner kigali technology", "affiliate kigali computer", "agent kigali electronics", "representative kigali technology"
  ];
 

  const allKeywords = [...defaultKeywords, ...keywords].slice(0, 20).join(", ");

  // Return structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "product" ? "Product" : "WebPage",
    "name": title,
    "description": description,
    "url": fullUrl,
    "image": fullImageUrl,
    ...(type === "product" && price && {
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": currency,
        "availability": availability === "in_stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    })
  };

  return (
    <>
      {/* Essential Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1f2937" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="KT Computer Supply" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="KT Computer Supply" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@ktcomputer" />
      <meta name="twitter:site" content="@ktcomputer" />

      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="KT Computer Supply" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Hreflang for future multi-language support */}
      <link rel="alternate" hrefLang="en" href={fullUrl} />
      <link rel="alternate" hrefLang="en-us" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

      {/* Social Media Links */}
      <link rel="me" href="https://twitter.com/ktcomputer" />
      <link rel="me" href="https://facebook.com/ktcomputersupply" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...structuredData,
            "@context": "https://schema.org",
            "publisher": {
              "@type": "Organization",
              "name": "KT Computer Supply",
              "url": baseUrl,
              "logo": `${baseUrl}/logo.png`,
              "sameAs": [
                "https://twitter.com/ktcomputer",
                "https://facebook.com/ktcomputersupply",
                `${baseUrl}/about`
              ]
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+250-788-123-456",
              "contactType": "customer service",
              "areaServed": "RW",
              "availableLanguage": "en"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Rwanda"
            }
          }),
        }}
      />
    </>
  );
}