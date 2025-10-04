"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export type Product = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  priceFormatted?: string;
  oldPriceFormatted?: string;
  description?: string; // e.g., "Intel Core i7, 16GB RAM, 512GB SSD"
  badge?: string; // e.g., "New", "Hot", "Sale"
  rating?: number;
  reviewCount?: number;
  stockCount?: number;
  inStock?: boolean;
};

type ProductCardProps = {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
};

export default function ProductCard({
  product,
  className,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const {
    name,
    brand,
    image,
    price,
    oldPrice,
    priceFormatted,
    oldPriceFormatted,
    description,
    badge,
  } = product;

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : undefined;

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-gray-200 bg-background shadow-sm transition-all hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-blue-500",
        className
      )}
    >
      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        {!!badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            {badge}
          </span>
        )}
        {discount !== undefined && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            -{discount}%
          </span>
        )}
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover actions */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ShoppingCart className="h-4 w-4" /> Add to cart
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist?.(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-gray-700 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        <div className="text-xs font-medium text-gray-500">{brand}</div>
        <div className="line-clamp-2 text-sm font-semibold text-gray-900">
          {name}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5",
                    i < Math.floor(product.rating!)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {product.rating} ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="text-xs text-gray-600">{description}</div>
        )}

        {/* Price and Stock */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div
              className="text-base font-bold text-gray-900"
              suppressHydrationWarning
            >
              {priceFormatted ?? price}
            </div>
            {oldPrice !== undefined && (
              <div
                className="text-sm text-gray-400 line-through"
                suppressHydrationWarning
              >
                {oldPriceFormatted ?? oldPrice}
              </div>
            )}
          </div>

          {/* Stock Status */}
          {product.stockCount !== undefined && (
            <div className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-gray-400" />
              {product.stockCount > 0 ? (
                <span
                  className={cn(
                    "text-xs font-medium",
                    product.stockCount <= 5
                      ? "text-orange-600"
                      : "text-green-600"
                  )}
                >
                  {product.stockCount <= 5
                    ? `Only ${product.stockCount} left`
                    : `${product.stockCount} in stock`}
                </span>
              ) : (
                <span className="text-xs font-medium text-red-600">
                  Out of stock
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
