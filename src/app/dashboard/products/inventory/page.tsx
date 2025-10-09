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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";

export default function InventoryPage() {
  // Mock data for inventory
  const inventory = [
    {
      id: "macbook-pro-m3",
      name: 'MacBook Pro 14" M3 Pro (2024) 18GB 1TB - Space Black',
      sku: "MBP-M3-14-BLK",
      stock: 5,
      reserved: 2,
      available: 3,
      status: "In Stock",
    },
    {
      id: "iphone-15-pro-max",
      name: "iPhone 15 Pro Max 256GB - Natural Titanium",
      sku: "IPH-15PM-256-TIT",
      stock: 15,
      reserved: 3,
      available: 12,
      status: "In Stock",
    },
    {
      id: "dell-xps-15",
      name: "Dell XPS 15 OLED (2024) i9/32GB/1TB RTX 4070",
      sku: "DELL-XPS15-OLED",
      stock: 12,
      reserved: 1,
      available: 11,
      status: "In Stock",
    },
    {
      id: "samsung-s24-ultra",
      name: "Samsung Galaxy S24 Ultra 512GB - Titanium Gray",
      sku: "SAMS-S24U-512-GRY",
      stock: 12,
      reserved: 4,
      available: 8,
      status: "Low Stock",
    },
    {
      id: "hp-laserjet-pro-m404dn",
      name: "HP LaserJet Pro M404dn",
      sku: "HP-LJP-M404DN",
      stock: 20,
      reserved: 5,
      available: 15,
      status: "In Stock",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge variant="default">{status}</Badge>;
      case "Low Stock":
        return <Badge variant="destructive">{status}</Badge>;
      case "Out of Stock":
        return <Badge variant="secondary">{status}</Badge>;
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
                  <BreadcrumbLink href="/dashboard/products">
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inventory</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Inventory Levels</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
                      className="pl-8 w-full md:w-64"
                    />
                  </div>
                </div>
              </div>
              <CardDescription>
                Track and manage product stock levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center">Reserved</TableHead>
                    <TableHead className="text-center">Available</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell className="text-center">
                        {item.stock}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.reserved}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.available}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Adjust
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
