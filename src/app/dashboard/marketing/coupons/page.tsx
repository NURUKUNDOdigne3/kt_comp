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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Gift } from "lucide-react";

export default function CouponsPage() {
  // Mock data for coupons
  const coupons = [
    {
      id: "KT2025",
      code: "KT2025",
      discount: "20% OFF",
      status: "Active",
      expiry: "2025-12-31",
      usage: "125/500",
    },
    {
      id: "WELCOME10",
      code: "WELCOME10",
      discount: "10% OFF",
      status: "Active",
      expiry: "2025-11-30",
      usage: "89/200",
    },
    {
      id: "FREESHIP",
      code: "FREESHIP",
      discount: "Free Shipping",
      status: "Expired",
      expiry: "2025-09-30",
      usage: "200/200",
    },
    {
      id: "BACK2SCHOOL",
      code: "BACK2SCHOOL",
      discount: "15% OFF",
      status: "Scheduled",
      expiry: "2026-01-31",
      usage: "0/300",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default">{status}</Badge>;
      case "Scheduled":
        return <Badge variant="secondary">{status}</Badge>;
      case "Expired":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
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
                  <BreadcrumbLink href="/dashboard/marketing">
                    Marketing
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Coupons</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Coupons</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Coupon
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Discount Coupons
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search coupons..."
                      className="pl-8 w-full md:w-64"
                    />
                  </div>
                </div>
              </div>
              <CardDescription>
                Create and manage discount codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{coupon.code}</div>
                      <div className="text-sm text-muted-foreground">
                        {coupon.discount}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm">{coupon.usage}</div>
                        <div className="text-xs text-muted-foreground">
                          Usage
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{coupon.expiry}</div>
                        <div className="text-xs text-muted-foreground">
                          Expiry
                        </div>
                      </div>
                      <div>{getStatusBadge(coupon.status)}</div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
