"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

type PaymentStatus = "idle" | "processing" | "success" | "failed";

export default function TestPaypackPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(100);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
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
        if (data.status === "SUCCESSFUL") {
          setPaymentStatus("success");
        } else {
          setPaymentStatus("failed");
          setErrorMessage("Payment was not approved or failed.");
        }
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handlePayment = async () => {
    if (!phoneNumber || !amount) {
      toast.error("Please enter phone number and amount");
      return;
    }

    if (!/^07\d{8}$/.test(phoneNumber)) {
      toast.error("Please enter a valid Rwandan phone number (07XXXXXXXX)");
      return;
    }

    if (amount < 100) {
      toast.error("Amount must be at least 100 RWF");
      return;
    }

    setPaymentStatus("processing");
    setErrorMessage("");

    try {
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment initiation failed");
      }

      const { paymentId: newPaymentId } = data;
      setPaymentId(newPaymentId);

      // Register this payment with the WebSocket server
      if (socket && newPaymentId) {
        socket.emit("registerPayment", newPaymentId);
        console.log(`Registered payment ID ${newPaymentId} with socket.`);
      }

      toast.success("Payment initiated! Check your phone to approve.");
    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentStatus("failed");
      setErrorMessage(error.message || "Payment failed");
      toast.error(error.message || "Payment failed");
    }
  };

  const resetPayment = () => {
    setPaymentStatus("idle");
    setErrorMessage("");
    setPaymentId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">PayPack Payment Test</h1>

        {paymentStatus === "idle" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Mobile Money Number</Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="07XXXXXXXX"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                MTN Mobile Money or Airtel Money number
              </p>
            </div>

            <div>
              <Label htmlFor="amount">Amount (RWF)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="100"
                min="100"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 100 RWF
              </p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!phoneNumber || !amount || amount < 100}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Initiate Payment
            </Button>
          </div>
        )}

        {paymentStatus === "processing" && (
          <div className="text-center p-8">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-600" />
            <h3 className="font-semibold mt-4">Processing Payment...</h3>
            <p className="text-sm text-gray-500 mt-2">
              Please check your phone and enter your PIN to approve the transaction.
            </p>
          </div>
        )}

        {paymentStatus === "success" && (
          <div className="text-center p-8">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <h3 className="font-semibold mt-4">Payment Successful!</h3>
            <p className="text-sm text-gray-500 mt-2">
              The payment has been processed successfully.
            </p>
            <Button onClick={resetPayment} className="mt-6">
              Test Another Payment
            </Button>
          </div>
        )}

        {paymentStatus === "failed" && (
          <div className="text-center p-8">
            <XCircle className="h-12 w-12 mx-auto text-red-500" />
            <h3 className="font-semibold mt-4">Payment Failed</h3>
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
            <Button onClick={resetPayment} className="mt-6">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}