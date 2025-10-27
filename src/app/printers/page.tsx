import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import { Suspense } from "react";
import WelcomeHeroPrinter from "@/components/WelcomeHeroPrinter";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";
import { generateCategoryMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Breadcrumbs from "@/components/SEO/Breadcrumbs";

async function getPrinterProducts() {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: "printers" },
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
    console.error("Error fetching printer products:", error);
    return { featured: [], all: [] };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: "printers" },
    });

    if (!category) {
      return {
        title: "Printers - KT Computer Supply",
        description: "Professional printing solutions from top brands in Rwanda",
      };
    }

    const products = await prisma.product.findMany({
      where: { categoryId: category.id },
      select: { id: true },
    });

    return generateCategoryMetadata(category, products);
  } catch (error) {
    console.error("Error generating metadata for printers:", error);
    return {
      title: "Printers - KT Computer Supply",
      description: "Professional printing solutions from top brands in Rwanda",
    };
  }
}

export default async function Page() {
  const { featured, all } = await getPrinterProducts();
  const breadcrumbItems = [
    { name: "Printers", href: "/printers" },
  ];

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <WelcomeHeroPrinter />
      </Suspense>

      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="shop">
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
        {featured.length > 0 ? (
          <FeaturedProductsCarousel products={featured} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500">No featured printers available.</p>
          </div>
        )}
      </div> */}

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
        {all.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {all.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500">
              No printers available at the moment.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
