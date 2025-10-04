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
import Link from "next/link";
import Header from "@/components/Header";

export default function BrandsPage() {
  // Combine all products from all categories
  const allProducts = [
    ...products,
    ...phoneProducts,
    ...printerProducts,
    ...routerProducts,
    ...speakerProducts,
    ...monitorProducts,
  ];

  // Get product count for each brand
  const getBrandProductCount = (brandName: string) => {
    return allProducts.filter(
      (product) => product.brand.toLowerCase() === brandName.toLowerCase()
    ).length;
  };

  // Get categories for display
  const getCategoryNames = (categories: string[]) => {
    return categories
      .map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1))
      .join(", ");
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Brands
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover products from our trusted brand partners
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brandData.map((brand) => {
            const brandSlug = brand.name.toLowerCase().replace(/\s+/g, "-");
            const productCount = getBrandProductCount(brand.name);

            // Only show brands that have products
            if (productCount === 0) return null;

            return (
              <Link
                key={brandSlug}
                href={brand.href}
                className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-20 h-20 mb-4 flex items-center justify-center p-2">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    width={80}
                    height={80}
                    className="object-contain h-full w-full transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-1">
                  {brand.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {productCount} {productCount === 1 ? "product" : "products"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                  {getCategoryNames(brand.categories)}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {brandData.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Brands
            </div>
          </div>
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {allProducts.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Products
            </div>
          </div>
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              6
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Categories
            </div>
          </div>
          <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              100%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Authentic
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// This function gets called at build time
export async function generateStaticParams() {
  return brandData.map((brand) => ({
    brand: brand.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}
