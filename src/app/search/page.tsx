import { Suspense } from "react";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Search Products - KT Computer Supply",
  description: "Search for electronics, computers, and tech products at KT Computer Supply. Find the best deals on laptops, printers, routers, and more in Rwanda.",
  keywords: [
    "search electronics rwanda",
    "find computers kigali",
    "search laptops rwanda",
    "electronics search",
    
    "computer search rwanda",
  ],
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; brand?: string; min?: string; max?: string }>;
}

async function searchProducts(query: string, filters: any) {
  if (!query && !filters.category && !filters.brand) {
    return [];
  }

  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { brand: { name: { contains: query, mode: "insensitive" } } },
      { category: { name: { contains: query, mode: "insensitive" } } },
    ];
  }

  if (filters.category) {
    where.category = { slug: filters.category };
  }

  if (filters.brand) {
    where.brand = { slug: filters.brand };
  }

  if (filters.min || filters.max) {
    where.price = {};
    if (filters.min) where.price.gte = parseInt(filters.min);
    if (filters.max) where.price.lte = parseInt(filters.max);
  }

  try {
    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        oldPrice: true,
        images: true,
        stockCount: true,
        featured: true,
        image: true,
        badge: true,
        rating: true,
        reviewCount: true,
        inStock: true,
        brand: { select: { id: true, name: true, slug: true, logo: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
      take: 50,
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return products;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const filters = {
    category: params.category,
    brand: params.brand,
    min: params.min,
    max: params.max,
  };

  const products = await searchProducts(query, filters);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {query ? `Search Results for "${query}"` : "Search Products"}
            </h1>
            
            {/* Search Form */}
            <form method="GET" className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="q"
                  defaultValue={query}
                  placeholder="Search for products, brands, or categories..."
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </form>

            {/* Results Count */}
            <p className="text-gray-600">
              {products.length > 0 
                ? `Found ${products.length} product${products.length !== 1 ? 's' : ''}`
                : query 
                  ? `No products found for "${query}"`
                  : "Enter a search term to find products"
              }
            </p>
          </div>

          {/* Search Results */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse our categories
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" asChild>
                  <a href="/computers">Computers</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/printers">Printers</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/routers">Routers</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/speakers">Speakers</a>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}