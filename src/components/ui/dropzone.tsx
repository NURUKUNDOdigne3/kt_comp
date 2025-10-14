"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  > {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  dropzoneClassName?: string;
}

export const Dropzone = React.forwardRef<HTMLInputElement, DropzoneProps>(
  (
    {
      onFilesChange,
      maxFiles = 5,
      maxSize = 10 * 1024 * 1024, // 10MB default
      accept = "image/*",
      className,
      dropzoneClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    };

    const handleFiles = (files: File[]) => {
      // Filter files by accept type
      const acceptedFiles = files.filter((file) => {
        if (accept === "image/*") {
          return file.type.startsWith("image/");
        }
        return true;
      });

      // Filter by max size
      const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);

      // Limit to maxFiles
      const limitedFiles = validFiles.slice(0, maxFiles);

      if (onFilesChange && limitedFiles.length > 0) {
        onFilesChange(limitedFiles);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      handleFiles(files);
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <div className={cn("relative", className)}>
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            disabled && "opacity-50 cursor-not-allowed",
            dropzoneClassName
          )}
        >
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Upload
              className={cn(
                "h-8 w-8 text-muted-foreground",
                isDragging && "text-primary"
              )}
            />
            <div className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </div>
            <p className="text-xs text-muted-foreground">
              {accept === "image/*" ? "PNG, JPG, WEBP" : "Files"} up to{" "}
              {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
          {...props}
        />
      </div>
    );
  }
);

Dropzone.displayName = "Dropzone";

export interface ImagePreviewProps {
  images: string[];
  onRemove?: (index: number) => void;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  onRemove,
  className,
}) => {
  if (images.length === 0) return null;

  return (
    <div className={cn("grid grid-cols-4 gap-4 mt-4", className)}>
      {images.map((url, index) => (
        <div key={index} className="relative group">
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="w-full h-24 object-cover rounded-lg border"
          />
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
