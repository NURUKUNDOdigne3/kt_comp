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
import { Save, X, Image, Plus, Loader2 } from "lucide-react";
import { Dropzone, ImagePreview } from "@/components/ui/dropzone";

interface Brand {
  id: string;
  name: string;
  description: string;
  status: string;
  website: string;
  categories: string[];
  products: number;
  logo?: string;
}

interface EditBrandModalProps {
  brand: Brand | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedBrand: Brand) => void;
}

export function EditBrandModal({
  brand,
  open,
  onOpenChange,
  onSave,
}: EditBrandModalProps) {
  const [logo, setLogo] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    website: "",
    categories: [] as string[],
    logo: "",
  });

  // Pre-fill form data when brand changes
  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name || "",
        description: brand.description || "",
        status: brand.status || "Active",
        website: brand.website || "",
        categories: brand.categories || [],
        logo: brand.logo || "",
      });
      // Set logo for preview if it exists
      setLogo(brand.logo ? [brand.logo] : []);
    }
  }, [brand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!brand) return;

    // Create updated brand object
    const updatedBrand: Brand = {
      ...brand,
      name: formData.name,
      description: formData.description,
      status: formData.status,
      website: formData.website,
      categories: formData.categories,
      logo: formData.logo,
    };

    // Call the onSave handler passed from parent
    onSave(updatedBrand);

    // Close the modal
    onOpenChange(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categories: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: categories
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c),
    }));
  };

  const handleLogoUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "brands");

        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          return result.data.url;
        }
        throw new Error("Upload failed");
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setLogo(uploadedUrls);
      setFormData((prev) => ({ ...prev, logo: uploadedUrls[0] || "" }));
    } catch (error) {
      console.error("Logo upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeLogo = () => {
    setLogo([]);
    setFormData((prev) => ({ ...prev, logo: "" }));
  };

  if (!brand) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogDescription>
            Update the brand details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Brand Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter brand name"
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
                placeholder="Enter brand description"
                className="min-h-24"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                type="url"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categories">Categories</Label>
              <Input
                id="categories"
                name="categories"
                value={formData.categories.join(", ")}
                onChange={(e) => handleCategoryChange(e.target.value)}
                placeholder="Computers, Phones, Printers (comma separated)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Brand Logo</Label>
              <Dropzone
                onFilesChange={handleLogoUpload}
                maxFiles={1}
                maxSize={5 * 1024 * 1024}
                accept="image/*"
                disabled={uploading}
              />

              {/* Logo Preview */}
              <ImagePreview images={logo} onRemove={removeLogo} />

              {uploading && (
                <div className="flex items-center justify-center mt-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm">Uploading...</span>
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
