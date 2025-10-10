import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, phone } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return errorResponse("All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse("Invalid email format");
    }

    // Validate password strength
    if (password.length < 6) {
      return errorResponse("Password must be at least 6 characters long");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("User with this email already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        phone: phone || null,
        role: "CUSTOMER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Log the signup activity
    await prisma.auditLog.create({
      data: {
        action: "User Signup",
        resource: "Authentication",
        level: "SUCCESS",
        description: `New user registered: ${user.email}`,
        userId: user.id,
        userEmail: user.email,
        metadata: {
          name: user.name,
          role: user.role,
        },
      },
    });

    return successResponse(
      {
        user,
        token,
      },
      "Account created successfully",
      201
    );
  } catch (error) {
    console.error("Signup error:", error);
    return errorResponse("Failed to create account. Please try again.", 500);
  }
}
