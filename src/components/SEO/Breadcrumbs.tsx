"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "./StructuredData";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ktcomputersupply.vercel.rw";
  
  const breadcrumbItems = [
    { name: "Home", url: baseUrl },
    ...items.map(item => ({ name: item.name, url: `${baseUrl}${item.href}` }))
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link 
          href="/" 
          className="flex items-center hover:text-blue-600 transition-colors"
          aria-label="Go to homepage"
        >
          <Home className="w-4 h-4" />
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}