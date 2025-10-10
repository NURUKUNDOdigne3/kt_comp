import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getCurrentUserFromHeader } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const user = getCurrentUserFromHeader(authHeader);

    const body = await request.json();
    const { items, shippingInfo, totalAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items in cart" },
        { status: 400 }
      );
    }

    // Validate shipping info
    if (
      !shippingInfo?.fullName ||
      !shippingInfo?.email ||
      !shippingInfo?.phone ||
      !shippingInfo?.address ||
      !shippingInfo?.city
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required shipping information" },
        { status: 400 }
      );
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        customerEmail: shippingInfo.email,
        customerName: shippingInfo.fullName,
        customerPhone: shippingInfo.phone,
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}${
          shippingInfo.district ? `, ${shippingInfo.district}` : ""
        }${shippingInfo.postalCode ? `, ${shippingInfo.postalCode}` : ""}`,
        totalAmount: totalAmount,
        status: "PENDING",
        paymentStatus: "PENDING",
        ...(user?.userId && {
          user: {
            connect: { id: user.userId },
          },
        }),
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
          })),
        },
      },
    });

    // Create Stripe line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "rwf",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price), // Stripe expects amount in smallest currency unit (RWF doesn't have decimals)
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel?order_id=${order.id}`,
      customer_email: shippingInfo.email,
      metadata: {
        orderId: order.id,
        userId: user?.userId || "guest",
      },
      shipping_address_collection: {
        allowed_countries: ["RW"], // Rwanda
      },
      billing_address_collection: "required",
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    // Log the checkout activity
    if (user) {
      await prisma.auditLog.create({
        data: {
          action: "Checkout Initiated",
          resource: "Order",
          level: "INFO",
          description: `User initiated checkout for order ${order.id}`,
          userId: user.userId,
          userEmail: user.email,
        },
      });
    }

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}
