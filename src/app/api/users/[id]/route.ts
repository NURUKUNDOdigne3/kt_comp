import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/users/[id] - Get a single user (Admin only)
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

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return notFoundResponse('User not found');
    }

    return successResponse(user);
  } catch (error) {
    console.error('Get user error:', error);
    return errorResponse('Failed to fetch user', 500);
  }
}

// DELETE /api/users/[id] - Delete a user (Admin only)
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

    await prisma.user.delete({
      where: { id },
    });

    return successResponse(null, 'User deleted successfully');
  } catch (error: any) {
    console.error('Delete user error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('User not found');
    }
    return errorResponse('Failed to delete user', 500);
  }
}
