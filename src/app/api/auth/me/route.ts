import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromHeader } from "@/lib/auth";
import {
  successResponse,
  unauthorizedResponse,
  errorResponse,
} from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    console.log("Auth header received:", authHeader);
    
    const currentUser = getCurrentUserFromHeader(authHeader);
    console.log("Current user:", currentUser);

    if (!currentUser) {
      return unauthorizedResponse("Not authenticated");
    }

    // Get full user data
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return unauthorizedResponse("User not found");
    }

    return successResponse(user);
  } catch (error) {
    console.error("Get current user error:", error);
    return errorResponse("Failed to get user data", 500);
  }
}
