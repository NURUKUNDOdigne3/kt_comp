"use client";

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
} from "../../components/ui/card";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts
const salesData = [
  { month: "Jan", revenue: 4500000 },
  { month: "Feb", revenue: 5200000 },
  { month: "Mar", revenue: 4800000 },
  { month: "Apr", revenue: 6100000 },
  { month: "May", revenue: 5500000 },
  { month: "Jun", revenue: 6700000 },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="relative">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="size-10 text-muted-foreground absolute right-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">RWF 45,231,890</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="relative">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="size-10 text-muted-foreground absolute right-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +18.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="relative">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Package className="size-10 text-muted-foreground absolute right-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">
                  +5.3% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="relative">
                <CardTitle className="text-sm font-medium">
                  Active Customers
                </CardTitle>
                <Users className="size-10 text-muted-foreground absolute right-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+5,732</div>
                <p className="text-xs text-muted-foreground">
                  +12.4% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `RWF ${value.toLocaleString()}`,
                        "Revenue",
                      ]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>
                  Best selling products this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        MacBook Pro 14" M3 Pro
                      </p>
                      <p className="text-sm text-muted-foreground">Apple</p>
                    </div>
                    <div className="ml-auto font-medium">RWF 2,399,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        iPhone 15 Pro Max
                      </p>
                      <p className="text-sm text-muted-foreground">Apple</p>
                    </div>
                    <div className="ml-auto font-medium">RWF 1,299,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Samsung Galaxy S24 Ultra
                      </p>
                      <p className="text-sm text-muted-foreground">Samsung</p>
                    </div>
                    <div className="ml-auto font-medium">RWF 1,349,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Dell XPS 15 OLED
                      </p>
                      <p className="text-sm text-muted-foreground">Dell</p>
                    </div>
                    <div className="ml-auto font-medium">RWF 1,999,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        HP LaserJet Pro M404dn
                      </p>
                      <p className="text-sm text-muted-foreground">HP</p>
                    </div>
                    <div className="ml-auto font-medium">RWF 450,000</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Order #KT-001245
                      </p>
                      <p className="text-sm text-muted-foreground">John Doe</p>
                    </div>
                    <div className="ml-auto font-medium">RWF 2,399,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Order #KT-001244
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Jane Smith
                      </p>
                    </div>
                    <div className="ml-auto font-medium">RWF 1,299,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Order #KT-001243
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Robert Johnson
                      </p>
                    </div>
                    <div className="ml-auto font-medium">RWF 849,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Order #KT-001242
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Emily Williams
                      </p>
                    </div>
                    <div className="ml-auto font-medium">RWF 549,000</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Order #KT-001241
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Michael Brown
                      </p>
                    </div>
                    <div className="ml-auto font-medium">RWF 3,299,000</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Store Performance</CardTitle>
                <CardDescription>Key metrics and insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Conversion Rate</span>
                  </div>
                  <span className="font-medium">3.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Avg. Order Value</span>
                  </div>
                  <span className="font-medium">RWF 845,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Customer Retention</span>
                  </div>
                  <span className="font-medium">68.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Inventory Turnover</span>
                  </div>
                  <span className="font-medium">4.2x</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
