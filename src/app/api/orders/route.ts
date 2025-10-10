import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { createOrderSchema } from '@/lib/validations';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/orders - Get orders (all for admin, user's own for customers)
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
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
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unauthorizedResponse('Authentication required');
    }

    const body = await request.json();
    
    // Validate input
    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const { items, shippingAddress, city, phone, notes } = validation.data;

    // Get products and calculate total
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== items.length) {
      return errorResponse('Some products not found');
    }

    // Check stock availability
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return errorResponse(`Product ${item.productId} not found`);
      }
      if (!product.inStock || product.stockCount < item.quantity) {
        return errorResponse(`Product ${product.name} is out of stock or insufficient quantity`);
      }
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return sum + (product.price * item.quantity);
    }, 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx: any) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: currentUser.userId,
          totalAmount,
          shippingAddress,
          city,
          phone,
          notes,
          status: 'PENDING',
          orderItems: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
              return {
                productId: item.productId,
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

      // Update product stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockCount: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Clear user's cart
      await tx.cartItem.deleteMany({
        where: { userId: currentUser.userId },
      });

      return newOrder;
    });

    return successResponse(order, 'Order created successfully', 201);
  } catch (error) {
    console.error('Create order error:', error);
    return errorResponse('Failed to create order', 500);
  }
}
