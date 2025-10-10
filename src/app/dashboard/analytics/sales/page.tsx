"use client";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardGuard } from "@/components/DashboardGuard";
import { useSalesAnalytics } from "@/hooks/use-api";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChartIcon,
  TrendingUp,
  Download,
  Filter,
  Loader2,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function SalesPage() {
  const [period, setPeriod] = useState("30");
  const { data: sales, isLoading } = useSalesAnalytics(period);

  const formatCurrency = (value: number) => {
    return `RWF ${value.toLocaleString()}`;
  };

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0;
    return (
      <span
        className={`flex items-center gap-1 text-xs ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        {isPositive ? "+" : ""}
        {growth}% from last period
      </span>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  return (
    <AuthProvider>
      <DashboardGuard>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/dashboard/analytics">
                        Analytics
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Sales</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Sales Analytics</h1>
                <div className="flex gap-2">
                  <Button
                    variant={period === "7" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod("7")}
                  >
                    Last 7 Days
                  </Button>
                  <Button
                    variant={period === "30" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod("30")}
                  >
                    Last 30 Days
                  </Button>
                  <Button
                    variant={period === "90" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod("90")}
                  >
                    Last 90 Days
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : !sales ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Failed to load sales data
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Sales
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {/* @ts-ignore */}
                          {formatCurrency(sales.overview.totalSales)}
                        </div>
                        {/* @ts-ignore */}
                        {formatGrowth(sales.overview.salesGrowth)}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Orders
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {/* @ts-ignore */}
                          {sales.overview.totalOrders.toLocaleString()}
                        </div>
                        {/* @ts-ignore */}
                        {formatGrowth(sales.overview.ordersGrowth)}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Avg. Order Value
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {/* @ts-ignore */}
                          {formatCurrency(sales.overview.averageOrderValue)}
                        </div>
                        {/* @ts-ignore */}
                        {formatGrowth(sales.overview.aovGrowth)}
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChartIcon className="h-5 w-5" />
                        Daily Sales Performance
                      </CardTitle>
                      <CardDescription>
                        Sales and orders over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          // @ts-ignore
                          data={sales.dailySales}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => formatDate(value)}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [
                              formatCurrency(value as number),
                              "Sales",
                            ]}
                            labelFormatter={(label) => formatDate(label)}
                          />
                          <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            fill="#93c5fd"
                            name="Sales"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Sales by Category
                        </CardTitle>
                        <CardDescription>
                          Revenue breakdown by product category
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            // @ts-ignore
                            data={sales.categorySales}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [
                                formatCurrency(value as number),
                                "Sales",
                              ]}
                            />
                            <Bar dataKey="sales" fill="#8b5cf6" name="Sales" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Top Brands
                        </CardTitle>
                        <CardDescription>
                          Best performing brands
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            // @ts-ignore
                            data={sales.brandSales.slice(0, 5)}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [
                                formatCurrency(value as number),
                                "Sales",
                              ]}
                            />
                            <Bar dataKey="sales" fill="#10b981" name="Sales" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top Products */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Selling Products</CardTitle>
                      <CardDescription>
                        Best performing products in selected period
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* @ts-ignore */}
                        {sales.topProducts.map(
                          (product: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {product.quantity} units sold
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  {formatCurrency(product.revenue)}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>
                        Latest orders in selected period
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* @ts-ignore */}
                        {sales.recentOrders.map((order: any) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between border-b pb-3 last:border-0"
                          >
                            <div>
                              <p className="font-medium">{order.orderNumber}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.customer} • {order.items} items
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {formatCurrency(order.total)}
                              </p>
                              <Badge
                                variant={
                                  order.status === "DELIVERED"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </DashboardGuard>
    </AuthProvider>
  );
}
