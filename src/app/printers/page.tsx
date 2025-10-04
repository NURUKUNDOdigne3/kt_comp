import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import { Suspense } from "react";
import WelcomeHeroPrinter from "@/components/WelcomeHeroPrinter";
import { printerProducts } from "@/lib/products";

export default function Page() {
  return (
    <main>
      <Header />
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <WelcomeHeroPrinter />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="shop">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Printers
            </h2>
            <p className="text-sm text-gray-600">
              Curated picks from top brands
            </p>
          </div>
        </div>
        <FeaturedProductsCarousel products={printerProducts} />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="all-products"
      >
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Printers</h2>
            <p className="text-sm text-gray-600">Browse the full catalog</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {printerProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
