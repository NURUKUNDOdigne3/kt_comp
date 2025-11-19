import ProductDetails from "@/components/ProductDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generateProductMetadata } from "@/lib/seo";
import { ProductSchema, FAQSchema } from "@/components/SEO/StructuredData";
import Breadcrumbs from "@/components/SEO/Breadcrumbs";

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
  
  try {
    const rawProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        brand: { select: { name: true, slug: true } },
        category: { select: { name: true, slug: true } },
      },
    });

    if (!rawProduct) {
      return {
        title: "Product Not Found - KT Computer Supply",
        description: "The requested product could not be found.",
      };
    }

    return generateProductMetadata(rawProduct);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product - KT Computer Supply",
      description: "Premium electronics and computer supplies in Rwanda.",
    };
  }
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

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.ktcomputersupplying.com";
  const productUrl = `${baseUrl}/products/${id}`;

  const breadcrumbItems = [
    { name: product.category, href: `/${product.category.toLowerCase()}` },
    { name: product.name, href: `/products/${id}` },
  ];

  // FAQ data for products
  const faqQuestions = [
    {
      question: `What is the warranty for ${product.name}?`,
      answer: "All products come with manufacturer warranty. Contact our support team for specific warranty details and terms."
    },
    {
      question: "Do you offer free delivery?",
      answer: `Free delivery is available for orders over RWF 99,000. For orders under this amount, delivery charges apply based on location within Rwanda.`
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Mobile Money payments (MTN MoMo, Airtel Money), bank transfers, and cash on delivery. PayPack payments are also supported."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 2-3 business days within Kigali. Express delivery is available for urgent orders. Nationwide delivery is available across Rwanda."
    },
    {
      question: "Can I return or exchange this product?",
      answer: "We offer a 30-day return policy. Items must be in original condition with all accessories and packaging. Contact our customer service for return procedures."
    },
    {
      question: "Do you provide technical support?",
      answer: "Yes, we provide free technical support for all products. Our team of experts is available to help with setup, troubleshooting, and product usage."
    }
  ];

  return (
    <div itemScope itemType="https://schema.org/Product">
      <ProductSchema
        product={{
          name: product.name,
          description: product.description,
          image: product.images[0],
          price: product.price,
          currency: "RWF",
          availability: product.inStock ? "InStock" : "OutOfStock",
          brand: product.brand,
          category: product.category,
          sku: product.sku,
          rating: product.rating,
          reviewCount: product.reviewCount,
        }}
        url={productUrl}
      />
      <FAQSchema questions={faqQuestions} />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductDetails product={product} />
      </div>
    </div>
  );
}

// Generate static params for all products
export async function generateStaticParams() {
  // Skip static generation during build if database is unavailable
  if (process.env.NODE_ENV === 'production' && process.env.SKIP_BUILD_STATIC_GENERATION) {
    return [];
  }
  
  try {
    const products = await prisma.product.findMany({
      select: { id: true },
      take: 50, // Reduced for faster builds
    });

    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.warn("Database not available during build, skipping static generation for products");
    return [];
  }
}

export const dynamicParams = true; // Fallback for non-pre-rendered products
export const dynamic = 'force-dynamic'; // Force dynamic rendering if static generation fails
