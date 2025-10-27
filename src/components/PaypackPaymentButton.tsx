"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface PaypackPaymentButtonProps {
  amount: number;
  orderId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function PaypackPaymentButton({
  amount,
  orderId,
  onSuccess,
  onError,
}: PaypackPaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to WebSocket server when the component mounts
    const newSocket = io(window.location.origin);
    setSocket(newSocket);

    newSocket.on("connect", () => console.log("Socket connected!"));

    // Listen for payment updates from the backend
    newSocket.on(
      "payment:update",
      (data: { status: "SUCCESSFUL" | "FAILED" }) => {
        console.log("Received payment update:", data);
        setIsProcessing(false); // Stop loading immediately

        if (data.status === "SUCCESSFUL") {
          toast.success("Payment successful!");
          setPaymentId(null);
          setPhoneNumber(""); // Reset for next use
          onSuccess?.();
        } else {
          toast.error("Payment failed. Please try again.");
          setPaymentId(null);
          setPhoneNumber(""); // Reset for retry
          onError?.("Payment was not approved or failed.");
        }
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, [onSuccess, onError]);

  const handlePayment = async () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!/^07\d{8}$/.test(phoneNumber)) {
      toast.error("Please enter a valid Rwandan phone number (07XXXXXXXX)");
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
          phoneNumber,
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
      if (socket && newPaymentId) {
        socket.emit("registerPayment", newPaymentId);
        console.log(`Registered payment ID ${newPaymentId} with socket ${socket.id}.`);
      } else {
        console.warn("Socket not connected or payment ID missing:", { socket: !!socket, paymentId: newPaymentId });
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
      <div>
        <Label htmlFor="paypack-phone">
          Mobile Money Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="paypack-phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="078XXXXXXX or 073XXXXXXX"
          disabled={isProcessing}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter your MTN Mobile Money or Airtel Money number
        </p>
      </div>

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