import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import { categorySchema } from '@/lib/validations';
import { successResponse, errorResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return successResponse(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    return errorResponse('Failed to fetch categories', 500);
  }
}

// POST /api/categories - Create a new category (Admin only)
export async function POST(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return forbiddenResponse('Admin access required');
    }

    const body = await request.json();
    
    // Validate input
    const validation = categorySchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const category = await prisma.category.create({
      data: validation.data,
    });

    return successResponse(category, 'Category created successfully', 201);
  } catch (error: any) {
    console.error('Create category error:', error);
    if (error.code === 'P2002') {
      return errorResponse('Category with this name or slug already exists', 409);
    }
    return errorResponse('Failed to create category', 500);
  }
}
