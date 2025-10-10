"use client";

import Header from "@/components/Header";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Footer from "@/components/Footer";

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !orderId) {
        router.push("/");
        return;
      }

      try {
        // Verify payment with backend
        const response = await fetch("/api/checkout/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId, orderId }),
        });

        const data = await response.json();

        if (data.success) {
          setOrderDetails(data.order);
          // Clear cart after successful payment
          clearCart();
        } else {
          router.push("/checkout/cancel");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        router.push("/checkout/cancel");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, orderId, router, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Order Details</h3>
              <p className="text-sm text-gray-600 mb-1">
                Order ID: {orderDetails?.id}
              </p>
              <p className="text-sm text-gray-600">
                Total Amount: RWF {orderDetails?.totalAmount.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/orders">
                <Button variant="outline" className="w-full sm:w-auto">
                  View Order
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full sm:w-auto">Continue Shopping</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <CheckoutSuccessContent />
      </Suspense>

      <Footer />
    </>
  );
}
