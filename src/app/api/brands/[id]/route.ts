import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { updateBrandSchema } from '@/lib/validations';
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/brands/[id] - Get a single brand
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const brand = await prisma.brand.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            category: true,
          },
          take: 20,
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!brand) {
      return notFoundResponse('Brand not found');
    }

    return successResponse(brand);
  } catch (error) {
    console.error('Get brand error:', error);
    return errorResponse('Failed to fetch brand', 500);
  }
}

// PATCH /api/brands/[id] - Update a brand (Admin only)
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
    const validation = updateBrandSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: validation.data,
    });

    return successResponse(brand, 'Brand updated successfully');
  } catch (error: any) {
    console.error('Update brand error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Brand not found');
    }
    if (error.code === 'P2002') {
      return errorResponse('Brand with this name or slug already exists', 409);
    }
    return errorResponse('Failed to update brand', 500);
  }
}

// DELETE /api/brands/[id] - Delete a brand (Admin only)
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

    await prisma.brand.delete({
      where: { id },
    });

    return successResponse(null, 'Brand deleted successfully');
  } catch (error: any) {
    console.error('Delete brand error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Brand not found');
    }
    return errorResponse('Failed to delete brand', 500);
  }
}
