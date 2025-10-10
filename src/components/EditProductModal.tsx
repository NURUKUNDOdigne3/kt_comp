"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  stock: number;
  sku: string;
  image: string;
}

interface EditProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedProduct: Product) => void;
}

export function EditProductModal({
  product,
  open,
  onOpenChange,
  onSave,
}: EditProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    oldPrice: "",
    stock: "",
    sku: "",
    image: "",
  });

  // Pre-fill form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        brand: product.brand || "",
        price: product.price?.toString() || "",
        oldPrice: product.oldPrice?.toString() || "",
        stock: product.stock?.toString() || "",
        sku: product.sku || "",
        image: product.image || "",
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    // Create updated product object
    const updatedProduct: Product = {
      ...product,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      brand: formData.brand,
      price: parseFloat(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
      stock: parseInt(formData.stock) || 0,
      sku: formData.sku,
      image: formData.image,
    };

    // Call the onSave handler passed from parent
    onSave(updatedProduct);

    // Close the modal
    onOpenChange(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details of your product here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="min-h-32"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
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
                <Label htmlFor="brand">Brand</Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, brand: value }))
                  }
                >
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (RWF)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="oldPrice">Compare at Price (RWF)</Label>
                <Input
                  id="oldPrice"
                  name="oldPrice"
                  type="number"
                  value={formData.oldPrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="Enter SKU"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
              {formData.image && (
                <div className="mt-2">
                  <Label>Preview</Label>
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted mt-1">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
