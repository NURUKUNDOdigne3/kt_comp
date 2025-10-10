import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { updateCategorySchema } from '@/lib/validations';
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/categories/[id] - Get a single category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            brand: true,
          },
          take: 20,
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return notFoundResponse('Category not found');
    }

    return successResponse(category);
  } catch (error) {
    console.error('Get category error:', error);
    return errorResponse('Failed to fetch category', 500);
  }
}

// PATCH /api/categories/[id] - Update a category (Admin only)
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
    const validation = updateCategorySchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const category = await prisma.category.update({
      where: { id },
      data: validation.data,
    });

    return successResponse(category, 'Category updated successfully');
  } catch (error: any) {
    console.error('Update category error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Category not found');
    }
    if (error.code === 'P2002') {
      return errorResponse('Category with this name or slug already exists', 409);
    }
    return errorResponse('Failed to update category', 500);
  }
}

// DELETE /api/categories/[id] - Delete a category (Admin only)
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

    await prisma.category.delete({
      where: { id },
    });

    return successResponse(null, 'Category deleted successfully');
  } catch (error: any) {
    console.error('Delete category error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Category not found');
    }
    return errorResponse('Failed to delete category', 500);
  }
}
