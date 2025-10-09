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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo, useEffect } from "react";
import { AddProductModal } from "@/components/AddProductModal";
import { ViewProductModal } from "@/components/ViewProductModal";
import { EditProductModal } from "@/components/EditProductModal";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { useSearchParams } from "next/navigation";

// Mock data for products (in a real app, this would come from your API or lib/products.ts)
const products = [
  {
    id: "macbook-pro-m3",
    name: 'MacBook Pro 14" M3 Pro (2024) 18GB 1TB - Space Black',
    brand: "Apple",
    image:
      "https://macfinder.co.uk/wp-content/uploads/2023/12/img-MacBook-Pro-Retina-14-Inch-96139-scaled.jpg",
    price: 2399000,
    oldPrice: 2599000,
    priceFormatted: "RWF 2,399,000",
    oldPriceFormatted: "RWF 2,599,000",
    description: "Apple M3 Pro, 18GB RAM, 1TB SSD",
    badge: "New",
    rating: 4.8,
    reviewCount: 127,
    stockCount: 5,
    inStock: true,
    category: "computers",
    sku: "MBP-M3-14-BLK",
    dateAdded: "2025-01-15",
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max 256GB - Natural Titanium",
    brand: "Apple",
    image:
      "https://eworkshop.co.za/cdn/shop/files/iPhone15ProMax256GB-NaturalTitanium.png?v=1726073287&width=1946",
    price: 1299000,
    oldPrice: 1399000,
    priceFormatted: "RWF 1,299,000",
    oldPriceFormatted: "RWF 1,399,000",
    description: "A17 Pro chip, 256GB storage, ProMotion display",
    badge: "New",
    rating: 4.9,
    reviewCount: 342,
    stockCount: 15,
    inStock: true,
    category: "phones",
    sku: "IPH-15PM-256-TIT",
    dateAdded: "2025-02-20",
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15 OLED (2024) i9/32GB/1TB RTX 4070",
    brand: "Dell",
    image:
      "https://astringo-rugged.com/wp-content/uploads/2023/10/Dell-XPS-15-9530-b.jpg",
    price: 1999000,
    oldPrice: 2199000,
    priceFormatted: "RWF 1,999,000",
    oldPriceFormatted: "RWF 2,199,000",
    description: "Intel Core i9, 32GB RAM, 1TB SSD, RTX 4070",
    badge: "Hot",
    rating: 4.6,
    reviewCount: 89,
    stockCount: 12,
    inStock: true,
    category: "computers",
    sku: "DELL-XPS15-OLED",
    dateAdded: "2025-03-10",
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 512GB - Titanium Gray",
    brand: "Samsung",
    image:
      "https://d2x1ielih67ej4.cloudfront.net/media/ee/41/18/1706117313/SM-S928BZTHEUB%205.webp?ts=1706117313",
    price: 1349000,
    oldPrice: 1449000,
    priceFormatted: "RWF 1,349,000",
    oldPriceFormatted: "RWF 1,449,000",
    description: "Snapdragon 8 Gen 3, 512GB, S Pen included",
    badge: "New",
    rating: 4.8,
    reviewCount: 278,
    stockCount: 12,
    inStock: true,
    category: "phones",
    sku: "SAMS-S24U-512-GRY",
    dateAdded: "2025-04-05",
  },
  {
    id: "hp-laserjet-pro-m404dn",
    name: "HP LaserJet Pro M404dn",
    brand: "HP",
    image:
      "https://www.blessingcomputers.com/wp-content/uploads/2021/03/HP-LJ-M436DN-2KY38A-WHITE-1.png",
    price: 450000,
    oldPrice: 500000,
    priceFormatted: "RWF 450,000",
    oldPriceFormatted: "RWF 500,000",
    description: "Monochrome Laser Printer, Duplex, Ethernet",
    badge: "New",
    rating: 4.8,
    reviewCount: 198,
    stockCount: 20,
    inStock: true,
    category: "printers",
    sku: "HP-LJP-M404DN",
    dateAdded: "2025-05-12",
  },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Set brand filter from URL parameter
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setBrandFilter(decodeURIComponent(brandParam));
    }
  }, [searchParams]);

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

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (categoryFilter !== "all" && product.category !== categoryFilter) {
        return false;
      }

      // Brand filter
      if (brandFilter !== "all" && product.brand !== brandFilter) {
        return false;
      }

      // Status filter
      const productStatus = product.inStock ? "In Stock" : "Out of Stock";
      if (statusFilter !== "all" && productStatus !== statusFilter) {
        return false;
      }

      // Price filter
      if (minPrice && product.price < parseFloat(minPrice)) {
        return false;
      }

      if (maxPrice && product.price > parseFloat(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    categoryFilter,
    brandFilter,
    statusFilter,
    minPrice,
    maxPrice,
  ]);

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveProduct = (updatedProduct: any) => {
    // In a real application, you would make an API call to update the product
    console.log("Saving product:", updatedProduct);
    // Here you would typically update the product in your state or make an API call
    // For now, we'll just close the modal
    setIsEditModalOpen(false);
  };

  const confirmDeleteProduct = () => {
    // In a real application, you would make an API call to delete the product
    console.log("Deleting product:", selectedProduct?.name);
    // Here you would typically remove the product from your state or make an API call
    // For now, we'll just close the dialog
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  // Get unique categories and brands for filter dropdowns
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const brands = ["all", ...new Set(products.map((p) => p.brand))];

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
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Products</CardTitle>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        className="pl-8 w-full md:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filters
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Filter Products</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="p-2 space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-sm font-medium">
                                Category
                              </label>
                              <Select
                                value={categoryFilter}
                                onValueChange={setCategoryFilter}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category === "all"
                                        ? "All Categories"
                                        : category.charAt(0).toUpperCase() +
                                          category.slice(1)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Brand
                              </label>
                              <Select
                                value={brandFilter}
                                onValueChange={setBrandFilter}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Brand" />
                                </SelectTrigger>
                                <SelectContent>
                                  {brands.map((brand) => (
                                    <SelectItem key={brand} value={brand}>
                                      {brand === "all" ? "All Brands" : brand}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-sm font-medium">
                                Min Price (RWF)
                              </label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Max Price (RWF)
                              </label>
                              <Input
                                type="number"
                                placeholder="1000000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              Status
                            </label>
                            <Select
                              value={statusFilter}
                              onValueChange={setStatusFilter}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">
                                  All Statuses
                                </SelectItem>
                                <SelectItem value="In Stock">
                                  In Stock
                                </SelectItem>
                                <SelectItem value="Out of Stock">
                                  Out of Stock
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCategoryFilter("all");
                                setBrandFilter("all");
                                setStatusFilter("all");
                                setMinPrice("");
                                setMaxPrice("");
                                setSearchQuery("");
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <CardDescription>Manage your product inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.priceFormatted}</TableCell>
                      <TableCell>{product.stockCount}</TableCell>
                      <TableCell>
                        {getStatusBadge(
                          product.inStock ? "In Stock" : "Out of Stock"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewProduct(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleEditProduct(product)}
                              >
                                Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleViewProduct(product)}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(product)}
                                className="text-destructive focus:text-destructive"
                              >
                                Delete Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <AddProductModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
        />
        <ViewProductModal
          product={selectedProduct}
          open={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
        />
        <EditProductModal
          product={selectedProduct}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSave={handleSaveProduct}
        />
        <DeleteConfirmationDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDeleteProduct}
          productName={selectedProduct?.name}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
