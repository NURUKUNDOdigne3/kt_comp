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

export default function AddBrandPage() {
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
                  <BreadcrumbLink href="/dashboard/brands">
                    Brands
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Add Brand</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Add New Brand</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Brand
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Information</CardTitle>
                <CardDescription>
                  Enter the details of your brand
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="brand-name">Brand Name</Label>
                  <Input id="brand-name" placeholder="Enter brand name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand-description">Description</Label>
                  <Textarea
                    id="brand-description"
                    placeholder="Enter brand description"
                    className="min-h-32"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand-website">Website</Label>
                  <Input id="brand-website" placeholder="https://example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand-categories">Categories</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select categories" />
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
                      <SelectItem value="speakers">Speakers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brand Logo</CardTitle>
                <CardDescription>Upload the brand logo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-48">
                  <div className="text-center">
                    <Image className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Click to upload or drag and drop
                    </p>
                    <Button size="sm" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
