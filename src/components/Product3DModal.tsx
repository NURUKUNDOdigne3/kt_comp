"use client";

import { useEffect, useRef, useState } from "react";
import { X, Maximize2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  sketchfabUrl?: string;
  sketchfabModelId?: string;
  artistName?: string;
  artistUrl?: string;
}

export default function Product3DModal({
  isOpen,
  onClose,
  productName,
  sketchfabUrl,
  sketchfabModelId,
  artistName = "Sketchfab",
  artistUrl,
}: Product3DModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Generate embed URL from model ID if provided
  const embedUrl = sketchfabModelId
    ? `https://sketchfab.com/models/${sketchfabModelId}/embed?autospin=1&autostart=1&ui_hint=0`
    : sketchfabUrl;

  const modelPageUrl = sketchfabModelId
    ? `https://sketchfab.com/3d-models/${sketchfabModelId}`
    : undefined;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isFullscreen, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && modalRef.current) {
      modalRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col",
          isFullscreen
            ? "w-full h-full rounded-none"
            : "w-[90vw] h-[80vh] max-w-6xl max-h-[800px]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">3D View</h2>
            <p className="text-sm text-gray-600">{productName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sketchfab Iframe */}
        <div className="flex-1 relative bg-gray-100">
          {embedUrl ? (
            <iframe
              title={productName}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src={embedUrl}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                No 3D model available for this product
              </p>
            </div>
          )}
        </div>

        {/* Footer with Attribution */}
        {embedUrl && (
          <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
            <p>
              3D model From{" "}
              <a
                href="https://sketchfab.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sketchfab
              </a>
            </p>
            {modelPageUrl && (
              <a
                href={modelPageUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                View on Sketchfab
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
