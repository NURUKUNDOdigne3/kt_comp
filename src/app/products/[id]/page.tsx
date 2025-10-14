import ProductDetails from "@/components/ProductDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Get product from database
async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        oldPrice: true,
        image: true,
        images: true,
        model3dId: true,
        badge: true,
        rating: true,
        reviewCount: true,
        stockCount: true,
        inStock: true,
        featured: true,
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
    });

    if (!product) {
      return null;
    }

    // Transform product to match ProductDetails interface
    return {
      id: product.id,
      name: product.name,
      brand: product.brand?.name || "Unknown",
      category: product.category?.name || "Products",
      images: product.images.length > 0 ? product.images : [product.image || "/placeholder-product.png"],
      price: product.price,
      oldPrice: product.oldPrice || undefined,
      priceFormatted: `RWF ${product.price.toLocaleString()}`,
      oldPriceFormatted: product.oldPrice ? `RWF ${product.oldPrice.toLocaleString()}` : undefined,
      inStock: product.inStock,
      stockCount: product.stockCount,
      sku: `${product.brand?.name.toUpperCase() || "PROD"}-${product.id.slice(0, 8)}`,
      rating: product.rating,
      reviewCount: product.reviewCount,
      description: product.description || "",
      shortDescription: product.description?.slice(0, 150) || "",
      model3dId: product.model3dId || undefined,
      features: [
        product.description || "",
        `Brand: ${product.brand?.name || "Unknown"}`,
        product.featured ? "Featured Product" : "",
        product.badge ? `Badge: ${product.badge}` : "",
      ].filter(Boolean),
      specifications: {
        Brand: product.brand?.name || "Unknown",
        Model: product.name,
        Category: product.category?.name || "Products",
        "Stock Status": product.inStock ? "In Stock" : "Out of Stock",
        "Stock Count": `${product.stockCount} units`,
        Rating: `${product.rating}/5`,
        Reviews: `${product.reviewCount} customer reviews`,
      },
      variants: [
        { id: "default", name: "Standard", inStock: product.inStock },
      ],
      shipping: {
        freeShipping: product.price > 99000,
        estimatedDays: "2-3 business days",
        expressAvailable: true,
      },
      returnPolicy:
        "30-day return policy. Item must be in original condition with all accessories.",
      tags: [
        product.category?.slug || "",
        product.brand?.slug || "",
        product.featured ? "featured" : "",
        product.badge?.toLowerCase() || "",
      ].filter(Boolean),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found - KT Computer Supply",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} - KT Computer Supply`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true },
      take: 100, // Limit for build performance
    });

    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export const dynamicParams = true; // Fallback for non-pre-rendered products
