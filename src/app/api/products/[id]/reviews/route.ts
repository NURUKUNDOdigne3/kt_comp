import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/api-response";
import { getCurrentUserFromHeader } from "@/lib/auth";

// GET /api/products/[id]/reviews - Get reviews for a specific product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate rating breakdown
    const ratingBreakdown = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return successResponse({
      reviews,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length,
      ratingBreakdown,
    });
  } catch (error) {
    console.error("Get product reviews error:", error);
    return errorResponse("Failed to fetch reviews", 500);
  }
}

// POST /api/products/[id]/reviews - Create a review for a product
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    const currentUser = getCurrentUserFromHeader(authHeader);

    if (!currentUser) {
      return unauthorizedResponse("Please login to write a review");
    }

    const { id: productId } = await params;
    const body = await request.json();
    const { rating, comment } = body;

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return errorResponse("Rating must be between 1 and 5");
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return errorResponse("Product not found", 404);
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId: currentUser.userId,
      },
    });

    if (existingReview) {
      return errorResponse("You have already reviewed this product", 409);
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        rating,
        comment: comment || null,
        productId,
        userId: currentUser.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Update product rating
    const allProductReviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const newAverageRating =
      allProductReviews.reduce((sum, r) => sum + r.rating, 0) /
      allProductReviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: newAverageRating,
        reviewCount: allProductReviews.length,
      },
    });

    return successResponse(review, "Review created successfully", 201);
  } catch (error) {
    console.error("Create review error:", error);
    return errorResponse("Failed to create review", 500);
  }
}
