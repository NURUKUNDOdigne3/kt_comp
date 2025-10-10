import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";

interface BrandPageProps {
  params: Promise<{
    brand: string;
  }>;
}

async function getBrandData(brandSlug: string) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { slug: brandSlug },
      include: {
        products: {
          include: {
            brand: { select: { id: true, name: true, slug: true, logo: true } },
            category: { select: { id: true, name: true, slug: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!brand) return null;

    // Group products by category
    const productsByCategory: Record<string, typeof brand.products> = {};
    brand.products.forEach((product) => {
      const categorySlug = product.category?.slug || "other";
      if (!productsByCategory[categorySlug]) {
        productsByCategory[categorySlug] = [];
      }
      productsByCategory[categorySlug].push(product);
    });

    return { brand, productsByCategory };
  } catch (error) {
    console.error("Error fetching brand data:", error);
    return null;
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: brandSlug } = await params;
  const data = await getBrandData(brandSlug);

  if (!data) {
    notFound();
  }

  const { brand, productsByCategory } = data;

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          {brand.logo && (
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={`${brand.name} Logo`}
                width={80}
                height={80}
                className="object-contain h-full w-full"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {brand.name}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {brand.products.length}{" "}
              {brand.products.length === 1 ? "product" : "products"} available
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Categories: {Object.keys(productsByCategory).map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}
            </p>
          </div>
        </div>

        {/* Products by Category */}
        {brand.products.length > 0 ? (
          Object.entries(productsByCategory).map(([categorySlug, categoryProducts]) => {
            if (categoryProducts.length === 0) return null;
            
            return (
              <div key={categorySlug} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
                  {categoryProducts[0]?.category?.name || categorySlug}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No products available for this brand at the moment.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// Generate static paths for all brands
export async function generateStaticParams() {
  try {
    const brands = await prisma.brand.findMany({
      select: { slug: true },
    });
    
    return brands.map((brand) => ({
      brand: brand.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export const dynamicParams = true; // Fallback for non-pre-rendered brands
