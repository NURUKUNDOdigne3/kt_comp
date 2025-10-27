"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentStatusChecker from "@/components/PaymentStatusChecker";

function PaypackWaitingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const ref = searchParams.get("ref");
  const [status, setStatus] = useState<"waiting" | "success" | "failed">("waiting");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    // Timer to track waiting time
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Check order status periodically - ONLY Paypack webhook can mark as success
    const checkOrderStatus = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        const data = await response.json();

        if (response.ok) {
          const order = data.data || data.order;
          setOrderDetails(order);
          
          console.log('📊 Order Status Check:', {
            paymentStatus: order.paymentStatus,
            orderStatus: order.status,
            reference: ref,
            waitingTime: `${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}`
          });
          
          // ONLY real Paypack webhook can set paymentStatus to PAID
          if (order.paymentStatus === "PAID") {
            console.log('✅ 🎉 PAYMENT CONFIRMED BY PAYPACK WEBHOOK!');
            setStatus("success");
            clearInterval(timer);
          } else if (order.paymentStatus === "FAILED") {
            console.log('❌ 💔 PAYMENT FAILED VIA PAYPACK WEBHOOK');
            setStatus("failed");
            clearInterval(timer);
          } else {
            console.log('⏳ 🔄 STILL WAITING FOR PAYPACK WEBHOOK... (Status: PENDING)');
            // Continue waiting - NO manual verification, ONLY webhook
          }
        } else {
          console.error("Order fetch failed:", data);
          if (timeElapsed > 300) { // 5 minutes timeout
            setStatus("failed");
            clearInterval(timer);
          }
        }
      } catch (error) {
        console.error("Error checking order status:", error);
        if (timeElapsed > 300) { // 5 minutes timeout
          setStatus("failed");
          clearInterval(timer);
        }
      }
    };

    // Check immediately and then every 3 seconds
    checkOrderStatus();
    const statusChecker = setInterval(checkOrderStatus, 3000);

    // Cleanup
    return () => {
      clearInterval(timer);
      clearInterval(statusChecker);
    };
  }, [orderId, ref, timeElapsed]);

  const handleContinue = () => {
    if (status === "success") {
      router.push(`/account/orders`);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {status === "waiting" && (
                  <Clock className="h-16 w-16 text-blue-600 animate-pulse" />
                )}
                {status === "success" && (
                  <CheckCircle className="h-16 w-16 text-green-600" />
                )}
                {status === "failed" && (
                  <XCircle className="h-16 w-16 text-red-600" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {status === "waiting" && "Waiting for Payment Confirmation"}
                {status === "success" && "Payment Successful!"}
                {status === "failed" && "Payment Failed"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {status === "waiting" && orderId && (
                <>
                  <PaymentStatusChecker
                    orderId={orderId}
                    onStatusChange={(newStatus) => {
                      if (newStatus === "PAID") {
                        setStatus("success");
                      } else if (newStatus === "FAILED") {
                        setStatus("failed");
                      }
                    }}
                  />
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-xs text-blue-600 mt-1">
                      Reference: {ref}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      🔔 Waiting for real Paypack webhook confirmation...
                    </p>
                    <p className="text-xs text-gray-400">
                      ⚠️ Only verified Paypack webhooks can confirm payment
                    </p>
                  </div>
                </>
              )}

              {status === "success" && (
                <>
                  <p className="text-gray-600">
                    Your payment has been confirmed! Your order is now confirmed.
                  </p>
                  {orderDetails && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-medium">Order #{orderDetails.orderNumber}</p>
                      <p className="text-sm text-gray-600">
                        Total: RWF {orderDetails.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">
                        ✅ Confirmed by Paypack webhook
                      </p>
                    </div>
                  )}
                </>
              )}

              {status === "failed" && (
                <p className="text-gray-600">
                  Payment confirmation failed or timed out. Please try again or contact support.
                </p>
              )}

              <Button
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={status === "waiting"}
              >
                {status === "success" ? "View Orders" :
                 status === "waiting" ? "Please Wait..." : "Try Again"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function PaypackWaitingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-2xl">Loading...</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    }>
      <PaypackWaitingContent />
    </Suspense>
  );
}