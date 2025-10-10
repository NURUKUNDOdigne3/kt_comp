import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/profile - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const user = getCurrentUserFromHeader(authHeader);
    
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        bio: true,
        role: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!profile) {
      return errorResponse('User not found', 404);
    }

    return successResponse(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    return errorResponse('Failed to fetch profile', 500);
  }
}

// PATCH /api/profile - Update current user profile
export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const user = getCurrentUserFromHeader(authHeader);
    
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }

    const body = await request.json();
    const { name, phone, avatar, bio } = body;

    // Validate input
    if (name && typeof name !== 'string') {
      return errorResponse('Invalid name format');
    }
    if (phone && typeof phone !== 'string') {
      return errorResponse('Invalid phone format');
    }
    if (avatar && typeof avatar !== 'string') {
      return errorResponse('Invalid avatar format');
    }
    if (bio && typeof bio !== 'string') {
      return errorResponse('Invalid bio format');
    }

    const updatedProfile = await prisma.user.update({
      where: { id: user.userId },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(avatar !== undefined && { avatar }),
        ...(bio !== undefined && { bio }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        bio: true,
        role: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return successResponse(updatedProfile, 'Profile updated successfully');
  } catch (error: any) {
    console.error('Update profile error:', error);
    if (error.code === 'P2025') {
      return errorResponse('User not found', 404);
    }
    return errorResponse('Failed to update profile', 500);
  }
}
