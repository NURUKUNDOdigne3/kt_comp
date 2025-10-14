"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Package,
  Search,
  Loader2,
  Eye,
  ShoppingBag,
  Truck,
  MapPin,
  CreditCard,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("Please login to view your orders");
      router.push("/auth/login");
      return;
    }

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return `RWF ${value.toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return (
          <Badge variant="default" className="bg-green-600">
            Delivered
          </Badge>
        );
      case "PROCESSING":
        return <Badge variant="secondary">Processing</Badge>;
      case "SHIPPED":
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case "PENDING":
        return <Badge variant="destructive">Pending</Badge>;
      case "CANCELLED":
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderItems.some((item: any) =>
        item.product?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">
              Track and manage your orders
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by order number or product..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "You haven't placed any orders yet"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Button onClick={() => router.push("/")}>
                    Start Shopping
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.orderNumber}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(order.createdAt)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsViewModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Order Items Preview */}
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {order.orderItems.slice(0, 3).map((item: any) => (
                          <div
                            key={item.id}
                            className="flex-shrink-0 flex items-center gap-3 bg-muted/50 p-3 rounded-lg min-w-[250px]"
                          >
                            <div className="relative h-12 w-12 rounded bg-white flex-shrink-0">
                              {item.product?.images?.[0] ? (
                                <Image
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.product?.name || "Product"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.orderItems.length > 3 && (
                          <div className="flex-shrink-0 flex items-center justify-center bg-muted/50 p-3 rounded-lg min-w-[100px]">
                            <p className="text-sm text-muted-foreground">
                              +{order.orderItems.length - 3} more
                            </p>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Order Summary */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {order.orderItems.length} item(s)
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {formatCurrency(order.totalAmount)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.orderNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status and Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium mt-1">
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <p className="font-medium mt-1">
                    {selectedOrder.paymentStatus}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium mt-1">
                    {formatCurrency(selectedOrder.totalAmount)}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium">{selectedOrder.shippingAddress}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedOrder.shippingCity}
                    {selectedOrder.shippingDistrict &&
                      `, ${selectedOrder.shippingDistrict}`}
                  </p>
                  {selectedOrder.shippingPhone && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Phone: {selectedOrder.shippingPhone}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <Package className="h-4 w-4" />
                  Order Items ({selectedOrder.orderItems.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.orderItems.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-muted/50 p-4 rounded-lg"
                    >
                      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-white flex-shrink-0">
                        {item.product?.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {item.product?.name || "Product"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {formatCurrency(item.price)} × {item.quantity} ={" "}
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <CreditCard className="h-4 w-4" />
                  Payment Summary
                </h3>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(
                        selectedOrder.orderItems.reduce(
                          (sum: number, item: any) =>
                            sum + item.price * item.quantity,
                          0
                        )
                      )}
                    </span>
                  </div>
                  {selectedOrder.shippingCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {formatCurrency(selectedOrder.shippingCost)}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      {formatCurrency(selectedOrder.totalAmount)}
                    </span>
                  </div>
                  {selectedOrder.stripePaymentIntentId && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Payment ID: {selectedOrder.stripePaymentIntentId}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
