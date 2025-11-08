import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response';

// GET /api/products/[id]/related - Get related products
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // First, get the current product to find its brand and category
    const currentProduct = await prisma.product.findUnique({
      where: { id },
      select: {
        brandId: true,
        categoryId: true,
      },
    });

    if (!currentProduct) {
      return notFoundResponse('Product not found');
    }

    // Get related products by same brand, excluding current product
    const relatedProducts = await prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { brandId: currentProduct.brandId },
              { categoryId: currentProduct.categoryId },
            ],
          },
          { id: { not: id } },
          { inStock: true },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        oldPrice: true,
        images: true,
        featured: true,
        badge: true,
        rating: true,
        reviewCount: true,
        stockCount: true,
        inStock: true,
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
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
      take: 4,
      orderBy: [
        { featured: 'desc' },
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
    });

    // Transform to match ProductCard expected format
    const transformedProducts = relatedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      compareAtPrice: product.oldPrice,
      images: product.images.length > 0 ? product.images : ['/placeholder-product.png'],
      featured: product.featured,
      brand: product.brand,
      category: product.category,
      // Legacy fields for backward compatibility
      image: product.images[0] || '/placeholder-product.png',
      oldPrice: product.oldPrice,
      priceFormatted: `RWF ${product.price.toLocaleString()}`,
      oldPriceFormatted: product.oldPrice ? `RWF ${product.oldPrice.toLocaleString()}` : undefined,
      badge: product.badge,
      rating: product.rating,
      reviewCount: product.reviewCount,
      stockCount: product.stockCount,
      inStock: product.inStock,
    }));

    return successResponse(transformedProducts);
  } catch (error) {
    console.error('Get related products error:', error);
    return errorResponse('Failed to fetch related products', 500);
  }
}