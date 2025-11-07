"use client";

import { useState } from "react";
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

interface AddBrandModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (brand: {
    name: string;
    description: string;
    status: string;
    website: string;
    categories: string[];
    logo?: string;
  }) => void;
}

export function AddBrandModal({
  open,
  onOpenChange,
  onSave,
}: AddBrandModalProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    // Reset form
    setFormData({
      name: "",
      description: "",
      status: "Active",
      website: "",
      categories: [],
      logo: "",
    });
    setLogo([]);
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
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        formDataUpload.append("folder", "brands");

        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataUpload,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Brand</DialogTitle>
          <DialogDescription>
            Create a new brand. Click save when you're done.
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
              Save Brand
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
