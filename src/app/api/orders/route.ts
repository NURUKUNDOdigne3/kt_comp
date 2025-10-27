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

    const body = await request.json();
    const { items, shippingInfo, totalAmount, shippingAddress, phone, notes } = body;

    // Handle both checkout format and direct order format
    let orderData;
    if (shippingInfo) {
      // Checkout format
      orderData = {
        customerName: shippingInfo.fullName,
        customerEmail: shippingInfo.email,
        customerPhone: shippingInfo.phone,
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}${
          shippingInfo.district ? `, ${shippingInfo.district}` : ""
        }${shippingInfo.postalCode ? `, ${shippingInfo.postalCode}` : ""}`,
        totalAmount: totalAmount,
      };
    } else {
      // Direct order format
      const user = await prisma.user.findUnique({
        where: { id: currentUser.userId },
        select: { name: true, email: true, phone: true },
      });

      if (!user) {
        return errorResponse("User not found", 404);
      }

      orderData = {
        customerName: user.name || user.email.split('@')[0],
        customerEmail: user.email,
        customerPhone: phone || user.phone || 'N/A',
        shippingAddress: shippingAddress || 'N/A',
        totalAmount: totalAmount || items.reduce((total: number, item: any) => {
          return total + item.price * item.quantity;
        }, 0),
        notes: notes,
      };
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: currentUser.userId,
        ...orderData,
        status: "PENDING",
        paymentStatus: "PENDING",
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
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

    return successResponse({ id: order.id, order }, 'Order created successfully');
  } catch (error) {
    console.error('Create order error:', error);
    return errorResponse('Failed to create order', 500);
  }
}
