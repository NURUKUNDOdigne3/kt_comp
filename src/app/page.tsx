import Header from "@/components/Header";
import EpicHeroSection from "@/components/EpicHeroSection";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  products,
  phoneProducts,
  printerProducts,
  routerProducts,
} from "@/lib/products";

export default function Page() {
  return (
    <main>
      <Header />

      {/* Epic Hero Section */}
      <EpicHeroSection />

      {/* Computers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="computers">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Computers & Laptops
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium laptops and desktops from top brands
            </p>
          </div>
          <Link
            href="/computers"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <FeaturedProductsCarousel products={products.slice(0, 8)} />
      </div>

      {/* Phones Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900" id="phones">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Smartphones
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Latest phones from leading manufacturers
            </p>
          </div>
          <Link
            href="/phones"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <FeaturedProductsCarousel products={phoneProducts.slice(0, 8)} />
      </div>

      {/* Printers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="printers">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Printers
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Professional printing solutions for home and office
            </p>
          </div>
          <Link
            href="/printers"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <FeaturedProductsCarousel products={printerProducts.slice(0, 8)} />
      </div>

      {/* Routers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900" id="routers">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Routers & Networking
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              High-speed WiFi routers and mesh systems
            </p>
          </div>
          <Link
            href="/routers"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <FeaturedProductsCarousel products={routerProducts.slice(0, 8)} />
      </div>
    </main>
  );
}
