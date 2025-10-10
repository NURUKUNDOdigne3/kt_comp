import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { updateProductSchema } from '@/lib/validations';
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
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
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      return notFoundResponse('Product not found');
    }

    return successResponse(product);
  } catch (error) {
    console.error('Get product error:', error);
    return errorResponse('Failed to fetch product', 500);
  }
}

// PATCH /api/products/[id] - Update a product (Admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    const admin = isAdminFromHeader(authHeader);
    if (!admin) {
      return forbiddenResponse('Admin access required');
    }

    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validation = updateProductSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const product = await prisma.product.update({
      where: { id },
      data: validation.data,
      include: {
        brand: true,
        category: true,
      },
    });

    return successResponse(product, 'Product updated successfully');
  } catch (error: any) {
    console.error('Update product error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Product not found');
    }
    return errorResponse('Failed to update product', 500);
  }
}

// DELETE /api/products/[id] - Delete a product (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    const admin = isAdminFromHeader(authHeader);
    if (!admin) {
      return forbiddenResponse('Admin access required');
    }

    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return successResponse(null, 'Product deleted successfully');
  } catch (error: any) {
    console.error('Delete product error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Product not found');
    }
    return errorResponse('Failed to delete product', 500);
  }
}
