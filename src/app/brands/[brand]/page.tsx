import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  products,
  phoneProducts,
  printerProducts,
  routerProducts,
  speakerProducts,
  monitorProducts,
} from "@/lib/products";
import { brandData } from "@/lib/brands";
import Image from "next/image";
import Header from "@/components/Header";

interface BrandPageProps {
  params: {
    brand: string;
  };
}

export default function BrandPage({ params }: BrandPageProps) {
  const brandSlug = params.brand.toLowerCase();
  
  // Find brand info from brandData
  const brandInfo = brandData.find(
    (b) => b.href.toLowerCase().includes(brandSlug)
  );

  // Combine all products from all categories
  const allProducts = [
    ...products,
    ...phoneProducts,
    ...printerProducts,
    ...routerProducts,
    ...speakerProducts,
    ...monitorProducts,
  ];

  // Filter products by brand
  const brandProducts = allProducts.filter(
    (product) => product.brand.toLowerCase() === brandSlug.replace(/-/g, " ")
  );

  if (brandProducts.length === 0) {
    notFound();
  }

  const brandName = brandInfo?.name || brandSlug;
  const brandLogo = brandInfo?.logo;

  // Group products by category
  const productsByCategory = {
    computers: brandProducts.filter((p) => products.includes(p)),
    phones: brandProducts.filter((p) => phoneProducts.includes(p)),
    printers: brandProducts.filter((p) => printerProducts.includes(p)),
    routers: brandProducts.filter((p) => routerProducts.includes(p)),
    speakers: brandProducts.filter((p) => speakerProducts.includes(p)),
    monitors: brandProducts.filter((p) => monitorProducts.includes(p)),
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          {brandLogo && (
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-center">
              <Image
                src={brandLogo}
                alt={`${brandName} Logo`}
                width={80}
                height={80}
                className="object-contain h-full w-full"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {brandName}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {brandProducts.length}{" "}
              {brandProducts.length === 1 ? "product" : "products"} available
            </p>
            {brandInfo && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Categories: {brandInfo.categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Products by Category */}
        {Object.entries(productsByCategory).map(([category, categoryProducts]) => {
          if (categoryProducts.length === 0) return null;
          
          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Generate static paths for all brands
export async function generateStaticParams() {
  return brandData.map((brand) => ({
    brand: brand.href.split("/").pop() || "",
  }));
}

export const dynamicParams = true; // Fallback for non-pre-rendered brands
