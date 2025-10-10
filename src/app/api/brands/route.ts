import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import { brandSchema } from '@/lib/validations';
import { successResponse, errorResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/brands - Get all brands
export async function GET(request: NextRequest) {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return successResponse(brands);
  } catch (error) {
    console.error('Get brands error:', error);
    return errorResponse('Failed to fetch brands', 500);
  }
}

// POST /api/brands - Create a new brand (Admin only)
export async function POST(request: NextRequest) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return forbiddenResponse('Admin access required');
    }

    const body = await request.json();
    
    // Validate input
    const validation = brandSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const brand = await prisma.brand.create({
      data: validation.data,
    });

    return successResponse(brand, 'Brand created successfully', 201);
  } catch (error: any) {
    console.error('Create brand error:', error);
    if (error.code === 'P2002') {
      return errorResponse('Brand with this name or slug already exists', 409);
    }
    return errorResponse('Failed to create brand', 500);
  }
}
