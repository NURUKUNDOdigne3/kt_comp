"use client";

import Header from "@/components/Header";
import WelcomeHero from "@/components/WelcomeHero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import { useFilter } from "@/contexts/FilterContext";
import { useProducts } from "@/hooks/use-api";

export default function Page() {
  const { selectedBrand } = useFilter();
  const { data, isLoading } = useProducts({ category: "computers" });

  const breadcrumbItems = [
    { name: "Computers & Laptops", href: "/computers" },
  ];

  const products = data?.products || [];
  const filteredProducts = selectedBrand
    ? products.filter((p: any) => p.brand.slug === selectedBrand)
    : products;

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      

      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="shop">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-sm text-gray-600">
              Curated picks from top brands
            </p>
          </div>
        </div>
        {products.featured.length > 0 ? (
          <FeaturedProductsCarousel products={products.featured} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500">No featured products available.</p>
          </div>
        )}
      </div> */}

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="all-products"
      >
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedBrand ? `${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Computers` : 'All Products'}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedBrand ? `Computers from ${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}` : 'Browse the full catalog'}
            </p>
          </div>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-500">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500">
              No products available at the moment.
            </p>
          </div>
        )}
      </div>
      
      <WelcomeHero />

      <Footer />
    </main>
  );
}
