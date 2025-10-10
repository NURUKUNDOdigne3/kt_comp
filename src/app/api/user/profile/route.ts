import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromHeader } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/api-response";
import bcrypt from "bcryptjs";

// GET /api/user/profile - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = getCurrentUserFromHeader(authHeader);

    if (!user) {
      return unauthorizedResponse("Please login to view your profile");
    }

    const userProfile = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    if (!userProfile) {
      return errorResponse("User not found", 404);
    }

    return successResponse(userProfile);
  } catch (error) {
    console.error("Get profile error:", error);
    return errorResponse("Failed to fetch profile", 500);
  }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = getCurrentUserFromHeader(authHeader);

    if (!user) {
      return unauthorizedResponse("Please login to update your profile");
    }

    const body = await request.json();
    const { name, phone, bio, avatar } = body;

    // Validate input
    if (name && name.trim().length < 2) {
      return errorResponse("Name must be at least 2 characters long");
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: user.userId },
      data: {
        ...(name && { name: name.trim() }),
        ...(phone !== undefined && { phone: phone || null }),
        ...(bio !== undefined && { bio: bio || null }),
        ...(avatar !== undefined && { avatar: avatar || null }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    // Log the update activity
    await prisma.auditLog.create({
      data: {
        action: "Profile Updated",
        resource: "User Profile",
        level: "INFO",
        description: `User ${updatedUser.email} updated their profile`,
        userId: user.userId,
        userEmail: user.email,
      },
    });

    return successResponse(updatedUser, "Profile updated successfully");
  } catch (error) {
    console.error("Update profile error:", error);
    return errorResponse("Failed to update profile", 500);
  }
}
