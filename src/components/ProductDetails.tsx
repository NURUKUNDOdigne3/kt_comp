"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Package,
  Zap,
  Award,
  HelpCircle,
  View,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import Header from "./Header";
import Product3DModal from "./Product3DModal";
import WriteReviewModal from "./WriteReviewModal";
import {
  products,
  phoneProducts,
  printerProducts,
  routerProducts,
  speakerProducts,
  monitorProducts,
} from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductVariant {
  id: string;
  name: string;
  inStock: boolean;
}

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    brand: string;
    category: string;
    images: string[];
    price: number;
    oldPrice?: number;
    priceFormatted: string;
    oldPriceFormatted?: string;
    inStock: boolean;
    stockCount: number;
    sku: string;
    rating: number;
    reviewCount: number;
    description: string;
    shortDescription: string;
    features: string[];
    specifications: Record<string, string>;
    variants?: ProductVariant[];
    shipping: {
      freeShipping: boolean;
      estimatedDays: string;
      expressAvailable: boolean;
    };
    returnPolicy: string;
    tags: string[];
  };
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    avatar: string | null;
  };
}

interface ReviewData {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.id || ""
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");

  const { addItem, setIsCartOpen } = useCart();

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && quantity < product.stockCount) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Add items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/placeholder-product.png",
        brand: product.brand,
        category: product.category,
      });
    }

    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => setIsCartOpen(true),
      },
    });
  };

  // Fetch reviews
  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const response = await fetch(`/api/products/${product.id}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviewData(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  // Get related products
  const allProducts = [
    ...products,
    ...phoneProducts,
    ...printerProducts,
    ...routerProducts,
    ...speakerProducts,
    ...monitorProducts,
  ];
  const relatedProducts = allProducts
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50/50">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/category/${product.category.toLowerCase()}`}
              className="text-gray-500 hover:text-gray-700"
            >
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/brand/${product.brand.toLowerCase()}`}
              className="text-gray-500 hover:text-gray-700"
            >
              {product.brand}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
                  {discount > 0 && (
                    <span className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{discount}%
                    </span>
                  )}
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Thumbnail Gallery */}
                <div className="space-y-3">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                          selectedImage === index
                            ? "border-blue-600 ring-2 ring-blue-600/20"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-contain bg-gray-50"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>

                  {/* 3D View Button */}
                  <button
                    onClick={() => setIs3DModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <View className="w-5 h-5" />
                    View in 3D
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Link
                      href={`/brand/${product.brand.toLowerCase()}`}
                      className="hover:text-blue-600"
                    >
                      {product.brand}
                    </Link>
                    <span>•</span>
                    <span>SKU: {product.sku}</span>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-5 h-5",
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">
                      {product.reviewCount} reviews
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {product.priceFormatted}
                    </span>
                    {product.oldPriceFormatted && (
                      <>
                        <span className="text-xl text-gray-400 line-through">
                          {product.oldPriceFormatted}
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          Save {discount}%
                        </span>
                      </>
                    )}
                  </div>
                  {product.inStock ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">
                        In Stock
                      </span>
                      <span className="text-gray-500">
                        ({product.stockCount} units available)
                      </span>
                    </div>
                  ) : (
                    <span className="text-red-600 text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-gray-600">{product.shortDescription}</p>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          disabled={!variant.inStock}
                          className={cn(
                            "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                            selectedVariant === variant.id
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : variant.inStock
                              ? "border-gray-200 hover:border-gray-300 text-gray-700"
                              : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                          )}
                        >
                          {variant.name}
                          {!variant.inStock && " (Out of stock)"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all",
                      isWishlisted
                        ? "border-red-500 bg-red-50 text-red-500"
                        : "border-gray-300 hover:border-gray-400 text-gray-600"
                    )}
                  >
                    <Heart
                      className={cn("w-5 h-5", isWishlisted && "fill-current")}
                    />
                  </button>
                  <button className="p-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 text-gray-600 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600 mb-1" />
                    <span className="text-xs text-gray-600 text-center">
                      Original Product
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600 mb-1" />
                    <span className="text-xs text-gray-600 text-center">
                      Fast Delivery
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600 mb-1" />
                    <span className="text-xs text-gray-600 text-center">
                      Best Price
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("description")}
                  className={cn(
                    "px-6 py-4 text-sm font-medium transition-colors relative",
                    activeTab === "description"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Description
                </button>
                {/* <button
                  onClick={() => setActiveTab("specs")}
                  className={cn(
                    "px-6 py-4 text-sm font-medium transition-colors relative",
                    activeTab === "specs"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Specifications
                </button> */}
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={cn(
                    "px-6 py-4 text-sm font-medium transition-colors relative",
                    activeTab === "reviews"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Reviews ({product.reviewCount})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 lg:p-8">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Product Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Technical Specifications
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specifications).map(
                          ([key, value], index) => (
                            <tr
                              key={key}
                              className={cn(
                                "border-b border-gray-100",
                                index % 2 === 0 && "bg-gray-50"
                              )}
                            >
                              <td className="py-3 px-4 text-sm font-medium text-gray-700 w-1/3">
                                {key}
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {value}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Review Summary */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-3xl font-bold text-gray-900">
                            {product.rating}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-5 h-5",
                                  i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Based on {product.reviewCount} reviews
                        </p>
                      </div>
                      <button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Write a Review
                      </button>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviewData?.ratingBreakdown[rating as keyof typeof reviewData.ratingBreakdown] || 0;
                        const percentage = reviewData?.totalReviews
                          ? Math.round((count / reviewData.totalReviews) * 100)
                          : 0;
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-12">
                              {rating} star
                            </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-yellow-400 h-full rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-10 text-right">
                              {percentage}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reviews List */}
                  {isLoadingReviews ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : reviewData && reviewData.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviewData.reviews.map((review) => {
                        const timeAgo = new Date(review.createdAt).toLocaleDateString();
                        return (
                          <div key={review.id} className="border-b border-gray-200 pb-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, j) => (
                                      <Star
                                        key={j}
                                        className={cn(
                                          "w-4 h-4",
                                          j < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200"
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">
                                    {review.user.name || "Anonymous"}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    Verified Buyer
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500">{timeAgo}</p>
                              </div>
                            </div>
                            {review.comment && (
                              <p className="text-sm text-gray-600">
                                {review.comment}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                You May Also Like
              </h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Modal */}
      <Product3DModal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
        productName={product.name}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productId={product.id}
        productName={product.name}
        onReviewSubmitted={handleReviewSubmitted}
        sketchfabModelId={
          product.category === "Computers" &&
          product.brand.toLowerCase() === "apple"
            ? "efab224280fd4c3993c808107f7c0b38"
            : product.category === "Computers"
            ? "efab224280fd4c3993c808107f7c0b38"
            : product.category === "Phones"
            ? "41a071ae12794b668502f58d1e0fd1a3"
            : product.category === "Printers"
            ? "aa232d8302ca44ee9f08adfef2f3f894"
            : product.category === "Routers"
            ? "ac86d8ae65a54f4aa99d7d624f71e5f4"
            : product.category === "Speakers"
            ? "661f85fe3e4048f59785b2a75ffa52f8"
            : product.category === "Monitors"
            ? "f84d24b6df3648d884fd9be9c8007dd4"
            : "4e72a2078b3c4a75a821ab09830693fe"
        }
        artistName="Sketchfab"
        artistUrl="https://sketchfab.com"
      />
    </>
  );
}
