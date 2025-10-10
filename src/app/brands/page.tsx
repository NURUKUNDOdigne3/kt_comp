import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";

async function getBrandsData() {
  try {
    const [brands, totalProducts, totalCategories] = await Promise.all([
      prisma.brand.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
        orderBy: { name: "asc" },
      }),
      prisma.product.count(),
      prisma.category.count(),
    ]);

    return { brands, totalProducts, totalCategories };
  } catch (error) {
    console.error("Error fetching brands data:", error);
    return { brands: [], totalProducts: 0, totalCategories: 0 };
  }
}

export default async function BrandsPage() {
  const { brands, totalProducts, totalCategories } = await getBrandsData();

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
        {brands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brands.map((brand) => {
              const productCount = brand._count.products;

              // Only show brands that have products
              if (productCount === 0) return null;

              return (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                >
                  {brand.logo && (
                    <div className="w-20 h-20 mb-4 flex items-center justify-center p-2">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} Logo`}
                        width={80}
                        height={80}
                        className="object-contain h-full w-full transition-transform group-hover:scale-110"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {productCount} {productCount === 1 ? "product" : "products"}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No brands available at the moment.
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {brands.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Brands
            </div>
          </div>
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {totalProducts}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Products
            </div>
          </div>
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {totalCategories}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Categories
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
