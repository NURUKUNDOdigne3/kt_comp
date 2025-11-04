"use client";

import Image from "next/image";

const brands = [
  { name: "Dell", logo: "/brands/dell.png" },
  { name: "HP", logo: "/brands/hp.png" },
  { name: "Lenovo", logo: "/brands/lenovo.png" },
  { name: "Apple", logo: "/brands/apple.png" },
  { name: "Asus", logo: "/brands/asus.png" },
  { name: "Acer", logo: "/brands/acer.png" },
  { name: "Microsoft", logo: "/brands/microsoft.png" },
  { name: "Samsung", logo: "/brands/samsung.png" },
  { name: "LG", logo: "/brands/lg.png" },
  { name: "Canon", logo: "/brands/canon.png" },
  { name: "Epson", logo: "/brands/epson.png" },
  { name: "Brother", logo: "/brands/brother.png" },
  { name: "TP-Link", logo: "/brands/tp-link.png" },
  // { name: "Cisco", logo: "/brands/cisco.png" },
  // { name: "Logitech", logo: "/brands/logitech.png" },
];

export function BrandMarquee() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 overflow-hidden border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h2 className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          Trusted Brands We Carry
        </h2>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10" />

        {/* Marquee container */}
        <div className="flex">
          {/* First set of brands */}
          <div className="flex animate-marquee space-x-16 px-8">
            {brands.map((brand, index) => (
              <div
                key={`brand-1-${index}`}
                className="flex items-center justify-center min-w-[120px] h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} products available at KT Computer Supply Rwanda`}
                  width={120}
                  height={60}
                  className="object-contain max-h-12"
                  loading="lazy"
                  quality={80}
                />
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div
            className="flex animate-marquee space-x-16 px-8"
            aria-hidden="true"
          >
            {brands.map((brand, index) => (
              <div
                key={`brand-2-${index}`}
                className="flex items-center justify-center min-w-[120px] h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
