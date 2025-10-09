"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/currency";
import { Star, ShoppingCart, Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  priceFormatted: string;
  oldPriceFormatted?: string;
  description: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  stockCount: number;
  inStock: boolean;
}

interface ViewProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewProductModal({
  product,
  open,
  onOpenChange,
}: ViewProductModalProps) {
  if (!product) return null;

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {rating} ({product.reviewCount} reviews)
        </span>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl">{product.name}</DialogTitle>
            <DialogDescription className="text-base">
              {product.brand}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {product.badge && (
                <Badge variant="secondary">{product.badge}</Badge>
              )}
              {product.inStock ? (
                <Badge variant="default">
                  In Stock ({product.stockCount} available)
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <div className="space-y-2">{renderStars(product.rating)}</div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  {product.priceFormatted}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
