"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardGuard } from "@/components/DashboardGuard";
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
import {
  BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  Download,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for reports
const salesData = [
  { month: "Jan", revenue: 4500000 },
  { month: "Feb", revenue: 5200000 },
  { month: "Mar", revenue: 4800000 },
  { month: "Apr", revenue: 6100000 },
  { month: "May", revenue: 5500000 },
  { month: "Jun", revenue: 6700000 },
];

const customerGrowthData = [
  { month: "Jan", customers: 1200 },
  { month: "Feb", customers: 1450 },
  { month: "Mar", customers: 1600 },
  { month: "Apr", customers: 1850 },
  { month: "May", customers: 2100 },
  { month: "Jun", customers: 2400 },
];

const productPerformanceData = [
  { name: "Computers", value: 35 },
  { name: "Phones", value: 25 },
  { name: "Printers", value: 15 },
  { name: "Accessories", value: 15 },
  { name: "Monitors", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function ReportsPage() {
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
                      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/dashboard/analytics">
                        Analytics
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Reports</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Reports</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChartIcon className="h-5 w-5" />
                      Revenue Trends
                    </CardTitle>
                    <CardDescription>Monthly revenue analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis
                          tickFormatter={(value) =>
                            `RWF ${(value / 1000000).toFixed(1)}M`
                          }
                        />
                        <Tooltip
                          formatter={(value: any) =>
                            `RWF ${(value / 1000000).toFixed(1)}M`
                          }
                        />
                        <Bar dataKey="revenue" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChartIcon className="h-5 w-5" />
                      Customer Growth
                    </CardTitle>
                    <CardDescription>Monthly customer acquisition</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={customerGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="customers"
                          stroke="#00C49F"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5" />
                      Product Performance
                    </CardTitle>
                    <CardDescription>Sales distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productPerformanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={(props) => {
                            if (!props.cx || !props.cy || !props.midAngle || !props.name || props.percent === undefined) {
                              return null;
                            }

                            const RADIAN = Math.PI / 180;
                            const radius = 80 * 1.1; // Use fixed outerRadius value
                            const x = Number(props.cx) + radius * Math.cos(-props.midAngle * RADIAN);
                            const y = Number(props.cy) + radius * Math.sin(-props.midAngle * RADIAN);
                            const percent = Number(props.percent);

                            return (
                              <text
                                x={x}
                                y={y}
                                fill="black"
                                textAnchor={x > Number(props.cx) ? "start" : "end"}
                                dominantBaseline="central"
                              >
                                {`${props.name} (${(percent * 100).toFixed(0)}%)`}
                              </text>
                            );
                          }}
                        >
                          {productPerformanceData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Key Metrics
                    </CardTitle>
                    <CardDescription>Performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold">RWF 33,000,000</h3>
                        <p className="text-sm text-green-600">+15% from last month</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Average Order Value</p>
                        <h3 className="text-2xl font-bold">RWF 450,000</h3>
                        <p className="text-sm text-green-600">+5% from last month</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Customer Retention Rate</p>
                        <h3 className="text-2xl font-bold">85%</h3>
                        <p className="text-sm text-green-600">+2% from last month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </DashboardGuard>
    </AuthProvider>
  );
}
