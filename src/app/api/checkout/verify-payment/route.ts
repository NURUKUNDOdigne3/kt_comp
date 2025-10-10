import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, orderId } = body;

    if (!sessionId || !orderId) {
      return NextResponse.json(
        { success: false, message: "Missing session ID or order ID" },
        { status: 400 }
      );
    }

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { success: false, message: "Payment not completed" },
        { status: 400 }
      );
    }

    // Update order status in database
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        paidAt: new Date(),
      },
      include: {
        orderItems: true,
      },
    });

    // Update product stock counts
    for (const item of order.orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockCount: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Log the successful payment
    if (order.userId) {
      await prisma.auditLog.create({
        data: {
          action: "Payment Completed",
          resource: "Order",
          level: "SUCCESS",
          description: `Payment completed for order ${order.id}`,
          userId: order.userId,
          userEmail: order.customerEmail,
        },
      });
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to verify payment",
      },
      { status: 500 }
    );
  }
}
