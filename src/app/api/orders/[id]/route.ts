import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserFromHeader } from '@/lib/auth';
import { updateOrderStatusSchema } from '@/lib/validations';
import { successResponse, errorResponse, notFoundResponse, unauthorizedResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/orders/[id] - Get a single order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    const currentUser = getCurrentUserFromHeader(authHeader);
    
    if (!currentUser) {
      return unauthorizedResponse('Authentication required');
    }

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
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
    });

    if (!order) {
      return notFoundResponse('Order not found');
    }

    // Check if user owns this order or is admin
    if (order.userId !== currentUser.userId && currentUser.role !== 'ADMIN') {
      return forbiddenResponse('Access denied');
    }

    return successResponse(order);
  } catch (error) {
    console.error('Get order error:', error);
    return errorResponse('Failed to fetch order', 500);
  }
}

// PATCH /api/orders/[id] - Update order status (Admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    const currentUser = getCurrentUserFromHeader(authHeader);
    
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return forbiddenResponse('Admin access required');
    }

    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validation = updateOrderStatusSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status: validation.data.status },
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
            product: true,
          },
        },
      },
    });

    return successResponse(order, 'Order status updated successfully');
  } catch (error: any) {
    console.error('Update order error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Order not found');
    }
    return errorResponse('Failed to update order', 500);
  }
}

// DELETE /api/orders/[id] - Cancel order (Admin or owner within time limit)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    const currentUser = getCurrentUserFromHeader(authHeader);
    
    if (!currentUser) {
      return unauthorizedResponse('Authentication required');
    }

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return notFoundResponse('Order not found');
    }

    // Check permissions
    if (order.userId !== currentUser.userId && currentUser.role !== 'ADMIN') {
      return forbiddenResponse('Access denied');
    }

    // Only allow cancellation if order is PENDING or PROCESSING
    if (!['PENDING', 'PROCESSING'].includes(order.status)) {
      return errorResponse('Order cannot be cancelled at this stage');
    }

    // Cancel order and restore stock
    await prisma.$transaction(async (tx: any) => {
      await tx.order.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });

      // Restore product stock
      for (const item of order.orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockCount: {
              increment: item.quantity,
            },
          },
        });
      }
    });

    return successResponse(null, 'Order cancelled successfully');
  } catch (error) {
    console.error('Cancel order error:', error);
    return errorResponse('Failed to cancel order', 500);
  }
}
