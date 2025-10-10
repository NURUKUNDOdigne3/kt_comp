import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromHeader } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/api-response";
import bcrypt from "bcryptjs";

// PUT /api/user/password - Update user password
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = getCurrentUserFromHeader(authHeader);

    if (!user) {
      return unauthorizedResponse("Please login to update your password");
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return errorResponse("Current password and new password are required");
    }

    if (newPassword.length < 6) {
      return errorResponse("New password must be at least 6 characters long");
    }

    // Get user with password
    const userWithPassword = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    if (!userWithPassword) {
      return errorResponse("User not found", 404);
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      userWithPassword.password
    );

    if (!isValidPassword) {
      return errorResponse("Current password is incorrect", 401);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: user.userId },
      data: { password: hashedPassword },
    });

    // Log the password change
    await prisma.auditLog.create({
      data: {
        action: "Password Changed",
        resource: "User Security",
        level: "SUCCESS",
        description: `User ${user.email} changed their password`,
        userId: user.userId,
        userEmail: user.email,
      },
    });

    return successResponse(null, "Password updated successfully");
  } catch (error) {
    console.error("Update password error:", error);
    return errorResponse("Failed to update password", 500);
  }
}
