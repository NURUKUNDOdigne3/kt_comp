import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserFromHeader } from '@/lib/auth';
import { createOrderSchema } from '@/lib/validations';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/orders - Get orders (all for admin, user's own for customers)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const currentUser = getCurrentUserFromHeader(authHeader);
    if (!currentUser) {
      return unauthorizedResponse('Authentication required');
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    const where: any = currentUser.role === 'ADMIN' 
      ? {} 
      : { userId: currentUser.userId };
    
    // Add status filter if provided
    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          orderItems: {
            include: {
              product: {
                include: {
                  brand: true,
                  category: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    return successResponse({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return errorResponse('Failed to fetch orders', 500);
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const currentUser = getCurrentUserFromHeader(authHeader);

    if (!currentUser) {
      return unauthorizedResponse("Authentication required");
    }

    // Get user details from database
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: { name: true, email: true, phone: true },
    });

    if (!user) {
      return errorResponse("User not found", 404);
    }

    const validation = createOrderSchema.safeParse(await request.json());

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const { items, shippingAddress, phone, notes } = validation.data;

    // Fetch products and validate stock
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return errorResponse("One or more products not found");
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: currentUser.userId,
        customerName: user.name || user.email.split('@')[0], // Use email username if name is not set
        customerEmail: user.email,
        customerPhone: phone || user.phone || 'N/A', // Provide a default value if no phone number is available
        shippingAddress,
        notes,
        totalAmount: items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          return total + (product?.price || 0) * item.quantity;
        }, 0),
        orderItems: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return {
              productId: item.productId,
              name: product.name,
              quantity: item.quantity,
              price: product.price,
            };
          }),
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return successResponse(order, 'Order created successfully');
  } catch (error) {
    console.error('Create order error:', error);
    return errorResponse('Failed to create order', 500);
  }
}
