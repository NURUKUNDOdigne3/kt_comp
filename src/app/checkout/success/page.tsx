"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutSuccessPage() {
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
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Verifying your payment...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
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
                Thank you for your purchase. Your order has been confirmed and
                will be processed shortly.
              </p>

              {orderDetails && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">
                      RWF {orderDetails.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">
                      {orderDetails.status}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  A confirmation email has been sent to your email address with
                  order details.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/account/orders">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Package className="mr-2 h-4 w-4" />
                      View Orders
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                      Continue Shopping
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
