"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface CategoryFormProps {
  category?: any;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const [image, setImage] = useState<string>(category?.image || "");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      image: category?.image || "",
    },
  });

  useEffect(() => {
    setValue("image", image);
  }, [image, setValue]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "categories");

      const token = localStorage.getItem("auth-token");
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setImage(result.data.url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImage("");
  };

  const handleFormSubmit = async (data: CategoryFormData) => {
    setSubmitting(true);
    try {
      // Generate slug from name if not provided
      const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      await onSubmit({ 
        ...data, 
        slug,
        image: image || undefined,
      });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Category Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          {...register("name", { required: "Category name is required" })}
          placeholder="e.g., Computers & Laptops"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Brief description of the category..."
          rows={3}
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Category Image</Label>
        <div className="border-2 border-dashed rounded-lg p-4">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Category"
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm text-muted-foreground text-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-primary hover:underline"
                >
                  Click to upload
                </label>
                {" or drag and drop"}
              </div>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP up to 10MB
              </p>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </div>
          )}

          {uploading && (
            <div className="flex items-center justify-center mt-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm">Uploading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting || uploading}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {category ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{category ? "Update Category" : "Create Category"}</>
          )}
        </Button>
      </div>
    </form>
  );
}
