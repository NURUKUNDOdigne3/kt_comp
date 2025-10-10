import Header from "@/components/Header";
import WelcomeHero from "@/components/WelcomeHero";
import ProductCard from "@/components/ProductCard";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";

async function getComputerProducts() {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: "computers" },
    });

    if (!category) return { featured: [], all: [] };

    const [featured, all] = await Promise.all([
      prisma.product.findMany({
        where: { categoryId: category.id, featured: true },
        include: {
          brand: { select: { id: true, name: true, slug: true, logo: true } },
          category: { select: { id: true, name: true, slug: true } },
        },
        take: 8,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.findMany({
        where: { categoryId: category.id },
        include: {
          brand: { select: { id: true, name: true, slug: true, logo: true } },
          category: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return { featured, all };
  } catch (error) {
    console.error("Error fetching computer products:", error);
    return { featured: [], all: [] };
  }
}

export default async function Page() {
  const { featured, all } = await getComputerProducts();
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
        <WelcomeHero />
      </Suspense>

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
        {featured.length > 0 ? (
          <FeaturedProductsCarousel products={featured} />
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
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <p className="text-sm text-gray-600">Browse the full catalog</p>
          </div>
        </div>
        {all.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {all.map((p) => (
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
      <Footer />
    </main>
  );
}
