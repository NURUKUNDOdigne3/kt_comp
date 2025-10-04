import ProductDetails from "@/components/ProductDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  phoneProducts,
  printerProducts,
  routerProducts,
  speakerProducts,
  monitorProducts,
} from "@/lib/products";

// Get product from all categories
const getProduct = (id: string) => {
  // Combine all products from all categories
  const allProducts = [
    ...products,
    ...phoneProducts,
    ...printerProducts,
    ...routerProducts,
    ...speakerProducts,
    ...monitorProducts,
  ];

  // Find product by ID
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return null;
  }

  // Determine category
  let category = "Products";
  if (products.includes(product)) category = "Computers";
  else if (phoneProducts.includes(product)) category = "Phones";
  else if (printerProducts.includes(product)) category = "Printers";
  else if (routerProducts.includes(product)) category = "Routers";
  else if (speakerProducts.includes(product)) category = "Speakers";
  else if (monitorProducts.includes(product)) category = "Monitors";

  // Transform product to match ProductDetails interface
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category,
    images: [product.image, product.image, product.image, product.image],
    price: product.price,
    oldPrice: product.oldPrice,
    priceFormatted: product.priceFormatted,
    oldPriceFormatted: product.oldPriceFormatted,
    inStock: product.inStock,
    stockCount: product.stockCount,
    sku: `${product.brand.toUpperCase()}-${product.id}`,
    rating: product.rating,
    reviewCount: product.reviewCount,
    description: product.description,
    shortDescription: product.description,
    features: [
      product.description,
      `Brand: ${product.brand}`,
      `Rating: ${product.rating}/5 (${product.reviewCount} reviews)`,
      product.badge ? `Special: ${product.badge}` : "",
    ].filter(Boolean),
    specifications: {
      Brand: product.brand,
      Model: product.name,
      Category: category,
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
      category.toLowerCase(),
      product.brand.toLowerCase(),
      product.badge?.toLowerCase() || "",
    ].filter(Boolean),
  };
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProduct(params.id);

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

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

// Generate static params for all products
export async function generateStaticParams() {
  const allProducts = [
    ...products,
    ...phoneProducts,
    ...printerProducts,
    ...routerProducts,
    ...speakerProducts,
    ...monitorProducts,
  ];

  return allProducts.map((product) => ({
    id: product.id,
  }));
}
