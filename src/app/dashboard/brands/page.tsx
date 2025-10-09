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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Image, Pencil } from "lucide-react";
import { useState } from "react";
import { AddBrandModal } from "@/components/AddBrandModal";
import { EditBrandModal } from "@/components/EditBrandModal";
import { useRouter } from "next/navigation";

export default function BrandsPage() {
  const router = useRouter();

  // Mock data for brands
  const [brands, setBrands] = useState([
    {
      id: "apple",
      name: "Apple",
      description: "Innovative technology products",
      products: 12,
      status: "Active",
      website: "https://apple.com",
      categories: ["Computers", "Phones"],
    },
    {
      id: "samsung",
      name: "Samsung",
      description: "Electronics and mobile devices",
      products: 18,
      status: "Active",
      website: "https://samsung.com",
      categories: ["Phones", "Monitors"],
    },
    {
      id: "dell",
      name: "Dell",
      description: "Computer systems and accessories",
      products: 9,
      status: "Active",
      website: "https://dell.com",
      categories: ["Computers", "Monitors"],
    },
    {
      id: "hp",
      name: "HP",
      description: "Printing and computing solutions",
      products: 15,
      status: "Active",
      website: "https://hp.com",
      categories: ["Computers", "Printers"],
    },
    {
      id: "lenovo",
      name: "Lenovo",
      description: "Computers and smart devices",
      products: 7,
      status: "Active",
      website: "https://lenovo.com",
      categories: ["Computers"],
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default">{status}</Badge>;
      case "Inactive":
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAddBrand = (newBrand: {
    name: string;
    description: string;
    status: string;
    website: string;
    categories: string[];
  }) => {
    // In a real app, you would make an API call here
    const brand = {
      id: newBrand.name.toLowerCase().replace(/\s+/g, "-"),
      ...newBrand,
      products: 0,
    };
    setBrands([...brands, brand]);
    setIsAddModalOpen(false);
  };

  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand);
    setIsEditModalOpen(true);
  };

  const handleSaveBrand = (updatedBrand: any) => {
    // In a real app, you would make an API call here
    setBrands(brands.map((b) => (b.id === updatedBrand.id ? updatedBrand : b)));
    setIsEditModalOpen(false);
    setSelectedBrand(null);
  };

  const handleViewProducts = (brandName: string) => {
    // Navigate to products page with brand filter applied
    router.push(`/dashboard/products?brand=${encodeURIComponent(brandName)}`);
  };

  // Filter brands based on search query and status
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || brand.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
                <BreadcrumbItem>
                  <BreadcrumbPage>Brands</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Brands</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setStatusFilter(statusFilter === "all" ? "Active" : "all")
                }
              >
                <Filter className="mr-2 h-4 w-4" />
                {statusFilter === "all" ? "Active Only" : "All Brands"}
              </Button>
              <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Brand
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Brands</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search brands..."
                      className="pl-8 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <CardDescription>
                Manage product brands and manufacturers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredBrands.map((brand) => (
                  <Card
                    key={brand.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-lg">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold">{brand.name}</h3>
                            {getStatusBadge(brand.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {brand.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {brand.products} products
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {brand.categories.join(", ")}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditBrand(brand)}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewProducts(brand.name)}
                            >
                              View Products
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <AddBrandModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSave={handleAddBrand}
        />
        <EditBrandModal
          brand={selectedBrand}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSave={handleSaveBrand}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
