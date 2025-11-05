"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { getSocket, registerForPaymentUpdates, onPaymentUpdate, offPaymentUpdate } from "@/lib/socket";

interface PaypackPaymentButtonProps {
  amount: number;
  orderId: string;
  phoneNumber?: string; // Optional phone number from shipping form
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function PaypackPaymentButton({
  amount,
  orderId,
  phoneNumber: prefilledPhoneNumber,
  onSuccess,
  onError,
}: PaypackPaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(prefilledPhoneNumber || "");
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const handlePaymentUpdate = (data: { status: "SUCCESSFUL" | "FAILED" }) => {
      console.log("Received payment update:", data);
      setIsProcessing(false);

      if (data.status === "SUCCESSFUL") {
        toast.success("Payment successful!");
        setPaymentId(null);
        setPhoneNumber("");
        onSuccess?.();
      } else {
        toast.error("Payment failed. Please try again.");
        setPaymentId(null);
        setPhoneNumber("");
        onError?.("Payment was not approved or failed.");
      }
    };

    onPaymentUpdate(handlePaymentUpdate);

    return () => {
      offPaymentUpdate(handlePaymentUpdate);
    };
  }, [onSuccess, onError]);

  const handlePayment = async () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    // Clean the phone number - remove any + or spaces
    const cleanPhoneNumber = phoneNumber.replace(/[\+\s]/g, '');

    // Check if it starts with 07 and is exactly 10 digits total (07 + 8 digits = 10)
    if (!/^07\d{8}$/.test(cleanPhoneNumber)) {
      toast.error("Please enter a valid Rwandan phone number (07XXXXXXXX - 10 digits total starting with 07)");
      return;
    }

    setIsProcessing(true);

    try {
      // Initiate payment directly
      const paymentResponse = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: cleanPhoneNumber,
          amount,
          orderId, // Include orderId for linking payment to order
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || "Payment initiation failed");
      }

      const { paymentId: newPaymentId } = paymentData;
      setPaymentId(newPaymentId);

      // Register this payment with the WebSocket server
      if (newPaymentId) {
        registerForPaymentUpdates(newPaymentId);
      }

      // Payment initiated successfully
      toast.success("Payment initiated! Check your phone to approve.");
    } catch (error: any) {
      console.error("Paypack payment error:", error);
      toast.error(error.message || "Payment failed");
      onError?.(error.message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {!prefilledPhoneNumber && (
        <div>
          <Label htmlFor="paypack-phone">
            Mobile Money Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="paypack-phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="07XXXXXXXX (10 digits total)"
            disabled={isProcessing}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter your MTN Mobile Money or Airtel Money number (10 digits total starting with 07)
          </p>
        </div>
      )}

      {prefilledPhoneNumber && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            📱 Using phone number: <strong>{prefilledPhoneNumber}</strong>
          </p>
          <p className="text-xs text-blue-600 mt-1">
            This number will be used for your mobile money payment
          </p>
        </div>
      )}

      <Button
        onClick={handlePayment}
        disabled={isProcessing || !phoneNumber}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Smartphone className="mr-2 h-4 w-4" />
            Pay RWF {amount.toLocaleString()} with Paypack
          </>
        )}
      </Button>
    </div>
  );
}