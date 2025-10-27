"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

interface PaymentStatusCheckerProps {
  orderId: string;
  onStatusChange: (status: "PENDING" | "PAID" | "FAILED") => void;
}

export default function PaymentStatusChecker({ orderId, onStatusChange }: PaymentStatusCheckerProps) {
  const [status, setStatus] = useState<"PENDING" | "PAID" | "FAILED">("PENDING");
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let statusChecker: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          const order = data.data || data.order;
          const newStatus = order.paymentStatus;
          
          console.log('💳 Payment Status Check:', {
            orderId,
            currentStatus: newStatus,
            timeElapsed: `${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}`
          });
          
          if (newStatus !== status) {
            setStatus(newStatus);
            onStatusChange(newStatus);
            
            if (newStatus === "PAID" || newStatus === "FAILED") {
              clearInterval(timer);
              clearInterval(statusChecker);
            }
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    // Start timers
    timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    statusChecker = setInterval(checkStatus, 2000);
    
    // Initial check
    checkStatus();

    return () => {
      clearInterval(timer);
      clearInterval(statusChecker);
    };
  }, [orderId, status, timeElapsed, onStatusChange]);

  const getStatusIcon = () => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-8 w-8 text-blue-600 animate-pulse" />;
      case "PAID":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case "FAILED":
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <Loader2 className="h-8 w-8 text-gray-600 animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "PENDING":
        return "Waiting for Paypack confirmation...";
      case "PAID":
        return "Payment confirmed by Paypack!";
      case "FAILED":
        return "Payment failed or was cancelled";
      default:
        return "Checking payment status...";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {getStatusIcon()}
      <div className="text-center">
        <p className="font-medium text-gray-900">{getStatusMessage()}</p>
        <p className="text-sm text-gray-500 mt-1">
          Time elapsed: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
        </p>
        {status === "PENDING" && (
          <p className="text-xs text-blue-600 mt-2">
            ⚡ Real-time status checking every 2 seconds
          </p>
        )}
      </div>
    </div>
  );
}