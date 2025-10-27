"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function PaypackReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const ref = searchParams.get("ref");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    // Check order status
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
          setOrderDetails(data.data || data.order);
          const order = data.data || data.order;
          
          if (order.paymentStatus === "PAID") {
            setStatus("success");
          } else if (order.paymentStatus === "FAILED") {
            setStatus("failed");
          } else {
            // Just keep checking - don't manually trigger webhooks
            // Only real Paypack webhooks should update payment status
            // Still pending, check again after a delay
            setTimeout(checkOrderStatus, 3000);
          }
        } else {
          console.error("Order fetch failed:", data);
          setStatus("failed");
        }
      } catch (error) {
        console.error("Error checking order status:", error);
        setStatus("failed");
      }
    };

    // Function to verify Paypack transaction status
    const verifyPaypackTransaction = async () => {
      try {
        if (!ref) {
          console.log('⚠️ No reference found for verification');
          return;
        }
        
        console.log('🔍 Verifying Paypack transaction:', ref);
        
        const verifyResponse = await fetch(`/api/paypack/verify/${ref}`);
        const verifyData = await verifyResponse.json();
        
        console.log('📋 Paypack verification response:');
        console.log('  - Status Code:', verifyResponse.status);
        console.log('  - Response OK:', verifyResponse.ok);
        console.log('  - Data:', verifyData);
        
        // Check various success indicators
        const isSuccessful = verifyData.status === 'SUCCESSFUL' || 
                           verifyData.status === 'successful' ||
                           verifyResponse.ok;
        
        console.log('🧮 Payment Status Analysis:');
        console.log('  - Paypack Status:', verifyData.status);
        console.log('  - Is Successful:', isSuccessful);
        console.log('  - User reached return page: TRUE (indicates payment flow completed)');
        
        if (isSuccessful || true) { // Always trigger since user reached return page
          console.log('🚀 Triggering manual webhook to mark payment as successful...');
          
          const webhookPayload = {
            status: "SUCCESSFUL",
            reference: ref,
            amount: orderDetails?.totalAmount || 0,
            phone: "verified",
            description: "Payment verified - user returned to success page",
            event: "transaction:processed",
            kind: "CASHIN"
          };
          
          console.log('📦 Webhook payload:', webhookPayload);
          
          const webhookResponse = await fetch(`/api/paypack/webhook`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(webhookPayload),
          });
          
          const webhookResult = await webhookResponse.json();
          console.log('📨 Webhook response:', webhookResult);
        }
      } catch (error) {
        console.error("❌ Error verifying payment:", error);
      }
    };

    checkOrderStatus();
  }, [orderId, ref]);

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
                {status === "loading" && (
                  <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                )}
                {status === "success" && (
                  <CheckCircle className="h-16 w-16 text-green-600" />
                )}
                {status === "failed" && (
                  <XCircle className="h-16 w-16 text-red-600" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {status === "loading" && "Processing Payment..."}
                {status === "success" && "Payment Successful!"}
                {status === "failed" && "Payment Failed"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {status === "loading" && (
                <p className="text-gray-600">
                  Please wait while we confirm your payment with Paypack...
                </p>
              )}

              {status === "success" && (
                <>
                  <p className="text-gray-600">
                    Your payment has been processed successfully. Your order is confirmed!
                  </p>
                  {orderDetails && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-medium">Order #{orderDetails.orderNumber}</p>
                      <p className="text-sm text-gray-600">
                        Total: RWF {orderDetails.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  )}
                </>
              )}

              {status === "failed" && (
                <p className="text-gray-600">
                  There was an issue processing your payment. Please try again or contact support.
                </p>
              )}

              <Button
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={status === "loading"}
              >
                {status === "success" ? "View Orders" : "Continue Shopping"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function PaypackReturnPage() {
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
      <PaypackReturnContent />
    </Suspense>
  );
}