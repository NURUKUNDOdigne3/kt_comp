import Header from "@/components/Header";
import EpicHeroSection from "@/components/EpicHeroSection";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMarquee } from "@/components/BrandMarquee";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";

async function getProductsByCategory(categorySlug: string, limit: number = 8) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) return [];

    const products = await prisma.product.findMany({
      where: { categoryId: category.id },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return products;
  } catch (error) {
    console.error(`Error fetching ${categorySlug} products:`, error);
    return [];
  }
}

export default async function Page() {
  // Fetch products for each category in parallel
  const [computers, phones, printers, routers, speakers, monitors] =
    await Promise.all([
      getProductsByCategory("computers", 8),
      getProductsByCategory("phones", 8),
      getProductsByCategory("printers", 8),
      getProductsByCategory("routers", 8),
      getProductsByCategory("speakers", 8),
      getProductsByCategory("monitors", 8),
    ]);
  return (
    <main>
      <Header />

      {/* Epic Hero Section */}
      <EpicHeroSection />

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Computers Section */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="computers"
      >
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
        {computers.length > 0 ? (
          <FeaturedProductsCarousel products={computers} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No computers available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Phones Section */}
      {/* <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900"
        id="phones"
      >
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
        {phones.length > 0 ? (
          <FeaturedProductsCarousel products={phones} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No phones available at the moment.
            </p>
          </div>
        )}
      </div> */}

      {/* Printers Section */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="printers"
      >
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
        {printers.length > 0 ? (
          <FeaturedProductsCarousel products={printers} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No printers available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Routers Section */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900"
        id="routers"
      >
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
        {routers.length > 0 ? (
          <FeaturedProductsCarousel products={routers} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No routers available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Speakers Section */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="speakers"
      >
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Speakers & Audio
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium sound systems and portable speakers
            </p>
          </div>
          <Link
            href="/speakers"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {speakers.length > 0 ? (
          <FeaturedProductsCarousel products={speakers} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No speakers available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Monitors Section */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900"
        id="monitors"
      >
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Monitors & Displays
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              High-resolution monitors for work and gaming
            </p>
          </div>
          <Link
            href="/monitors"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {monitors.length > 0 ? (
          <FeaturedProductsCarousel products={monitors} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No monitors available at the moment.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
