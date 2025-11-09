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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.ktcomputersupplying.com";
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const defaultKeywords = [
    // Core Business Keywords
    "computer supply rwanda", "electronics store kigali", "laptop sales rwanda", "mobile money payments", "paypack rwanda", "tech solutions rwanda", "kigali electronics trading", "rwanda computer supply", "electronics rwanda", "kigali tech store", "computer accessories rwanda", "IT equipment kigali", "computer parts rwanda", "electronics retailer rwanda", "computer store kigali", "tech shop rwanda", "mobile money payments rwanda", "paypack payments", "apple products rwanda", "dell laptops rwanda", "hp printers rwanda", "samsung monitors rwanda", "gaming laptops rwanda", "office computers rwanda", "networking equipment rwanda", "audio systems rwanda",
    
    // Product Categories - Computers & Laptops
    "laptop kigali", "desktop computer rwanda", "gaming laptop kigali", "business laptop rwanda", "student laptop kigali", "workstation rwanda", "ultrabook kigali", "chromebook rwanda", "macbook kigali", "surface laptop rwanda", "2-in-1 laptop kigali", "convertible laptop rwanda", "budget laptop kigali", "premium laptop rwanda", "refurbished laptop kigali", "used computer rwanda", "new laptop kigali", "laptop deals rwanda", "cheap laptop kigali", "expensive laptop rwanda",
    
    // Brands - Major Computer Brands
    "hp laptop kigali", "dell computer rwanda", "lenovo laptop kigali", "asus computer rwanda", "acer laptop kigali", "apple macbook rwanda", "microsoft surface kigali", "toshiba laptop rwanda", "sony computer kigali", "samsung laptop rwanda", "lg computer kigali", "msi gaming laptop rwanda", "alienware kigali", "razer laptop rwanda", "gigabyte computer kigali", "origin pc rwanda", "system76 laptop kigali", "framework laptop rwanda", "purism computer kigali", "pine64 laptop rwanda",
    
    // Mobile Phones & Tablets
    "smartphone kigali", "mobile phone rwanda", "android phone kigali", "iphone rwanda", "samsung galaxy kigali", "huawei phone rwanda", "xiaomi smartphone kigali", "oppo phone rwanda", "vivo smartphone kigali", "oneplus phone rwanda", "google pixel kigali", "nokia phone rwanda", "motorola smartphone kigali", "realme phone rwanda", "infinix smartphone kigali", "tecno phone rwanda", "itel smartphone kigali", "tablet rwanda", "ipad kigali", "android tablet rwanda", "samsung tablet kigali", "huawei tablet rwanda", "lenovo tablet kigali", "microsoft surface tablet rwanda",
    
    // Networking Equipment
    "router kigali", "wifi router rwanda", "wireless router kigali", "mesh router rwanda", "gaming router kigali", "business router rwanda", "modem kigali", "internet modem rwanda", "fiber modem kigali", "adsl modem rwanda", "network switch kigali", "ethernet switch rwanda", "poe switch kigali", "managed switch rwanda", "unmanaged switch kigali", "access point rwanda", "wifi extender kigali", "range extender rwanda", "powerline adapter kigali", "network cable rwanda",
    
    // Audio & Visual Equipment
    "speaker kigali", "bluetooth speaker rwanda", "wireless speaker kigali", "portable speaker rwanda", "home theater speaker kigali", "soundbar rwanda", "subwoofer kigali", "headphone rwanda", "wireless headphone kigali", "gaming headset rwanda", "earbuds kigali", "airpods rwanda", "monitor kigali", "computer monitor rwanda", "gaming monitor kigali", "4k monitor rwanda", "ultrawide monitor kigali", "curved monitor rwanda", "led monitor kigali", "lcd monitor rwanda", "oled monitor kigali", "projector rwanda", "home projector kigali", "business projector rwanda",
    
    // Printers & Office Equipment
    "printer kigali", "inkjet printer rwanda", "laser printer kigali", "multifunction printer rwanda", "all-in-one printer kigali", "photo printer rwanda", "3d printer kigali", "scanner rwanda", "copier kigali", "fax machine rwanda", "shredder kigali", "laminator rwanda", "binding machine kigali", "calculator rwanda", "cash register kigali", "pos system rwanda", "barcode scanner kigali", "label printer rwanda",
    
    // Accessories & Peripherals
    "keyboard kigali", "wireless keyboard rwanda", "gaming keyboard kigali", "mechanical keyboard rwanda", "mouse kigali", "wireless mouse rwanda", "gaming mouse kigali", "trackpad rwanda", "webcam kigali", "usb camera rwanda", "microphone kigali", "usb microphone rwanda", "external hard drive kigali", "ssd rwanda", "usb flash drive kigali", "memory card rwanda", "power bank kigali", "charger rwanda", "cable kigali", "adapter rwanda",
    
    // Gaming Equipment
    "gaming computer kigali", "gaming pc rwanda", "gaming setup kigali", "esports equipment rwanda", "gaming chair kigali", "gaming desk rwanda", "gaming accessories kigali", "console rwanda", "playstation kigali", "xbox rwanda", "nintendo switch kigali", "gaming controller rwanda", "vr headset kigali", "oculus rwanda", "htc vive kigali", "psvr rwanda",
    
    // Location-Based Keywords
    "electronics nyarugenge", "computer shop gasabo", "tech store kicukiro", "laptop dealer remera", "phone shop kimisagara", "computer repair gikondo", "electronics muhanga", "tech store musanze", "computer shop huye", "electronics rubavu", "tech store nyagatare", "computer dealer kayonza", "electronics rwamagana", "tech shop rusizi", "computer store karongi",
    
    // Price & Quality Keywords
    "cheap computer kigali", "affordable laptop rwanda", "budget smartphone kigali", "premium electronics rwanda", "high-end computer kigali", "luxury tech rwanda", "discounted electronics kigali", "sale computer rwanda", "promotion laptop kigali", "clearance electronics rwanda", "wholesale computer kigali", "bulk electronics rwanda", "refurbished computer kigali", "used electronics rwanda", "certified refurbished kigali", "warranty computer rwanda", "guaranteed electronics kigali", "authentic products rwanda",
    
    // Business & Professional
    "business computer kigali", "office laptop rwanda", "corporate electronics kigali", "enterprise computer rwanda", "professional laptop kigali", "workstation rwanda", "server kigali", "network equipment rwanda", "security camera kigali", "cctv system rwanda", "access control kigali", "biometric system rwanda", "time attendance kigali", "pos terminal rwanda", "receipt printer kigali", "cash drawer rwanda",
    
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