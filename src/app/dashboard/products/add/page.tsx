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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Image, Save, X } from "lucide-react";

export default function AddProductPage() {
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
                  <BreadcrumbPage>Add Product</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Add New Product</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Enter the basic details of your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="Enter product name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    placeholder="Enter product description"
                    className="min-h-32"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computers">
                        Computers & Laptops
                      </SelectItem>
                      <SelectItem value="phones">Smartphones</SelectItem>
                      <SelectItem value="printers">Printers</SelectItem>
                      <SelectItem value="routers">
                        Routers & Networking
                      </SelectItem>
                      <SelectItem value="monitors">Monitors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="product-brand">Brand</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="dell">Dell</SelectItem>
                      <SelectItem value="hp">HP</SelectItem>
                      <SelectItem value="lenovo">Lenovo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>
                    Set the price for your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-price">Price (RWF)</Label>
                    <Input
                      id="product-price"
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-old-price">
                      Compare at Price (RWF)
                    </Label>
                    <Input
                      id="product-old-price"
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                  <CardDescription>Manage stock levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-stock">Stock Quantity</Label>
                    <Input id="product-stock" type="number" defaultValue="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-sku">SKU</Label>
                    <Input id="product-sku" placeholder="Enter SKU" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Upload images for your product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-32">
                    <div className="text-center">
                      <Image className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Click to upload or drag and drop
                      </p>
                      <Button size="sm" className="mt-2">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Image
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
