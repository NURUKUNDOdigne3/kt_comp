import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { paypackService } from '@/services/paypack.service';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, orderId } = await request.json();

    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { error: "Phone number and amount are required." },
        { status: 400 }
      );
    }

    const payment = await prisma.payment.create({
      data: {
        amount,
        orderId: orderId || null // Link payment to order if provided
      }
    });
    console.log(`Created pending payment in DB: ${payment.id}`);

    console.log(`Initiating PayPack payment for ${phoneNumber} with amount ${amount}`);

    const paypackResponse = await paypackService.cashin({
      number: phoneNumber,
      amount,
    });

    console.log("PayPack API Response:", paypackResponse);

    await prisma.payment.update({
      where: { id: payment.id },
      data: { paypackRef: paypackResponse.ref },
    });
    console.log(
      `Updated payment ${payment.id} with Paypack ref: ${paypackResponse.ref}`
    );

    return NextResponse.json({ paymentId: payment.id });
  } catch (error: any) {
    console.error(
      "Error initiating payment:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to initiate payment." },
      { status: 500 }
    );
  }
}