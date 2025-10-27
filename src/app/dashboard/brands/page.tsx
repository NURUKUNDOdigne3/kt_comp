"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Image, Pencil, Loader2, Trash2, Package } from "lucide-react";
import { AddBrandModal } from "@/components/AddBrandModal";
import { EditBrandModal } from "@/components/EditBrandModal";
import { useRouter } from "next/navigation";
import {
  useBrands,
  useBrand,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
} from "@/hooks/use-api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function BrandsPage() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data
  const { data: brands, isLoading, mutate: refetchBrands } = useBrands();
  const { trigger: createBrand } = useCreateBrand();
  const { trigger: updateBrand } = useUpdateBrand(selectedBrand?.id || "");
  const { trigger: deleteBrand } = useDeleteBrand(selectedBrand?.id || "");


  const handleAddBrand = async (newBrand: {
    name: string;
    description?: string;
    logoUrl?: string;
  }) => {
    try {
      // Transform data to match API schema
      const brandData: any = {
        name: newBrand.name,
        slug: newBrand.name.toLowerCase().replace(/\s+/g, '-'),
      };
      if (newBrand.logoUrl) brandData.logo = newBrand.logoUrl;
      
      await createBrand(brandData);
      refetchBrands();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to create brand:", error);
      alert("Failed to create brand");
    }
  };

  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand);
    setIsEditModalOpen(true);
  };

  const handleSaveBrand = async (updatedBrand: any) => {
    try {
      // Transform data to match API schema
      const brandData: any = {
        name: updatedBrand.name,
        slug: updatedBrand.name.toLowerCase().replace(/\s+/g, '-'),
      };
      if (updatedBrand.logoUrl) brandData.logo = updatedBrand.logoUrl;
      
      await updateBrand(brandData);
      refetchBrands();
      setIsEditModalOpen(false);
      setSelectedBrand(null);
    } catch (error) {
      console.error("Failed to update brand:", error);
      alert("Failed to update brand");
    }
  };

  const handleDeleteBrand = async () => {
    try {
      await deleteBrand();
      setIsDeleteDialogOpen(false);
      setSelectedBrand(null);
      refetchBrands();
    } catch (error) {
      console.error("Failed to delete brand:", error);
      alert("Failed to delete brand");
    }
  };

  const handleViewProducts = (brandName: string) => {
    // Navigate to products page with brand filter applied
    router.push(`/dashboard/products?brand=${encodeURIComponent(brandName)}`);
  };

  // Filter brands based on search query
  const brandsArray = brands || [];
  const filteredBrands = brandsArray.filter((brand: any) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (brand.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <AuthProvider>
      <DashboardGuard>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
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

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Brands</CardTitle>
                      <CardDescription>
                        Manage product brands and manufacturers
                      </CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Brand
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search brands..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Brands Grid */}
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredBrands.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Package className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold">No brands found</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery
                          ? "Try adjusting your search"
                          : "No brands added yet"}
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredBrands.map((brand: any) => (
                        <Card
                          key={brand.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-lg">
                                {brand.logoUrl ? (
                                  <img
                                    src={brand.logoUrl}
                                    alt={brand.name}
                                    className="h-12 w-12 object-contain"
                                  />
                                ) : (
                                  <Image className="h-8 w-8 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{brand.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {brand.description || "No description"}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {brand._count?.products || 0} products
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
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive"
                                    onClick={() => {
                                      setSelectedBrand(brand);
                                      setIsDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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

            {/* Delete Confirmation */}
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{selectedBrand?.name}". All
                    products associated with this brand will lose their brand
                    association. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setSelectedBrand(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteBrand}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SidebarInset>
        </SidebarProvider>
      </DashboardGuard>
    </AuthProvider>
  );
}
