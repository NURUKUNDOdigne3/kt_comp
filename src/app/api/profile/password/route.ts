import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import bcrypt from 'bcryptjs';

// POST /api/profile/password - Change user password
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const user = getCurrentUserFromHeader(authHeader);
    
    if (!user) {
      return unauthorizedResponse('Authentication required');
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return errorResponse('Current password and new password are required');
    }

    if (newPassword.length < 8) {
      return errorResponse('New password must be at least 8 characters long');
    }

    // Get user with password
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { id: true, password: true },
    });

    if (!dbUser) {
      return errorResponse('User not found', 404);
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, dbUser.password);
    if (!isValidPassword) {
      return errorResponse('Current password is incorrect', 401);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: user.userId },
      data: { password: hashedPassword },
    });

    return successResponse(null, 'Password updated successfully');
  } catch (error) {
    console.error('Change password error:', error);
    return errorResponse('Failed to change password', 500);
  }
}
