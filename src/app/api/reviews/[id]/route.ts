import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/reviews/[id] - Get a single review (Admin only)
export async function GET(
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

    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            images: true,
          },
        },
      },
    });

    if (!review) {
      return notFoundResponse('Review not found');
    }

    return successResponse(review);
  } catch (error) {
    console.error('Get review error:', error);
    return errorResponse('Failed to fetch review', 500);
  }
}

// PATCH /api/reviews/[id] - Update review status (Admin only)
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
    const { status } = body;

    if (!status || !['APPROVED', 'PENDING', 'REJECTED'].includes(status)) {
      return errorResponse('Invalid status. Must be APPROVED, PENDING, or REJECTED');
    }

    const review = await prisma.review.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            images: true,
          },
        },
      },
    });

    return successResponse(review, 'Review status updated successfully');
  } catch (error: any) {
    console.error('Update review error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Review not found');
    }
    return errorResponse('Failed to update review', 500);
  }
}

// DELETE /api/reviews/[id] - Delete a review (Admin only)
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

    await prisma.review.delete({
      where: { id },
    });

    return successResponse(null, 'Review deleted successfully');
  } catch (error: any) {
    console.error('Delete review error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Review not found');
    }
    return errorResponse('Failed to delete review', 500);
  }
}
