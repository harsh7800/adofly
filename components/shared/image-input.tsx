"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { X, ImageIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface ImageUploadProps {
  onImageSelect?: (file: File | null) => void;
  onImageUpload?: (file: File) => Promise<string>; // Returns uploaded image URL
  value?: string | File | null;
  label?: string;
  description?: string;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  dimensions?: {
    width: number;
    height: number;
    exact?: boolean; // If true, image must be exact dimensions
  };
  className?: string;
  disabled?: boolean;
  required?: boolean;
  showPreview?: boolean;
  placeholder?: string;
  defaultImageUrl?: string;
}

interface UploadState {
  isDragging: boolean;
  isUploading: boolean;
  error: string | null;
  preview: string | null;
  defaultImageUrl?: string | null;
}

export function ImageUploadInput({
  onImageSelect,
  onImageUpload,
  value,
  label,
  description,
  maxSize = 5, // 5MB default
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  dimensions,
  className,
  disabled = false,
  required = false,
  showPreview = true,
  placeholder,
  defaultImageUrl,
}: ImageUploadProps) {
  const [state, setState] = useState<UploadState>({
    isDragging: false,
    isUploading: false,
    error: null,
    preview: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current preview URL
  const getPreviewUrl = useCallback(() => {
    if (defaultImageUrl) return defaultImageUrl;
    if (state.preview) return state.preview;
    if (typeof value === "string") return value;
    if (value instanceof File) return URL.createObjectURL(value);
    return null;
  }, [value, state.preview]);

  // Validate file
  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      if (!acceptedTypes.includes(file.type)) {
        return `File type not supported. Please upload: ${acceptedTypes
          .map((type) => type.split("/")[1])
          .join(", ")}`;
      }

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        return `File size too large. Maximum size is ${maxSize}MB`;
      }

      return null;
    },
    [acceptedTypes, maxSize]
  );

  // Validate image dimensions
  const validateDimensions = useCallback(
    (file: File): Promise<string | null> => {
      return new Promise((resolve) => {
        if (!dimensions) {
          resolve(null);
          return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const { width, height, exact = false } = dimensions;

          if (exact) {
            if (img.width !== width || img.height !== height) {
              resolve(
                `Image must be exactly ${width}×${height}px. Current: ${img.width}×${img.height}px`
              );
              return;
            }
          } else {
            const aspectRatio = width / height;
            const imageAspectRatio = img.width / img.height;
            const tolerance = 0.1; // 10% tolerance

            if (Math.abs(aspectRatio - imageAspectRatio) > tolerance) {
              resolve(
                `Image aspect ratio should be approximately ${width}:${height}`
              );
              return;
            }
          }

          resolve(null);
        };

        img.onerror = () => resolve("Invalid image file");
        img.src = URL.createObjectURL(file);
      });
    },
    [dimensions]
  );

  // Handle file processing
  const processFile = useCallback(
    async (file: File) => {
      setState((prev) => ({ ...prev, isUploading: true, error: null }));

      try {
        // Basic validation
        const basicError = validateFile(file);
        if (basicError) {
          setState((prev) => ({
            ...prev,
            error: basicError,
            isUploading: false,
          }));
          return;
        }

        // Dimension validation
        const dimensionError = await validateDimensions(file);
        if (dimensionError) {
          setState((prev) => ({
            ...prev,
            error: dimensionError,
            isUploading: false,
          }));
          return;
        }

        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setState((prev) => ({ ...prev, preview: previewUrl }));

        // Handle upload if provided
        if (onImageUpload) {
          try {
            const uploadedUrl = await onImageUpload(file);
            onImageSelect?.(file);
            setState((prev) => ({
              ...prev,
              isUploading: false,
              preview: uploadedUrl,
            }));
          } catch (uploadError) {
            setState((prev) => ({
              ...prev,
              error:
                uploadError instanceof Error
                  ? uploadError.message
                  : "Upload failed",
              isUploading: false,
            }));
          }
        } else {
          onImageSelect?.(file);
          setState((prev) => ({ ...prev, isUploading: false }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "An error occurred",
          isUploading: false,
        }));
      }
    },
    [validateFile, validateDimensions, onImageSelect, onImageUpload]
  );

  // Handle drag events
  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setState((prev) => ({ ...prev, isDragging: true }));
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setState((prev) => ({ ...prev, isDragging: false }));

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        processFile(imageFile);
      }
    },
    [disabled, processFile]
  );

  // Handle file input change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  // Handle click to upload
  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  // Handle remove image
  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setState((prev) => ({ ...prev, preview: null, error: null }));
      onImageSelect?.(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onImageSelect]
  );

  const previewUrl = getPreviewUrl();
  const hasImage = !!previewUrl;
  const showError = !!state.error;
  const showSuccess = hasImage && !state.error && !state.isUploading;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Upload Area - Compact Input Style */}
      <div
        className={cn(
          "relative p-2 border border-dashed rounded-md transition-all duration-200 cursor-pointer min-h-[150px] flex justify-center items-center flex-col gap-2",
          "hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20",
          {
            "border-gray-300 bg-white":
              !state.isDragging && !showError && !disabled,
            "border-blue-400 bg-blue-50": state.isDragging && !disabled,
            "border-red-300 bg-red-50": showError,
            "border-green-300 bg-green-50": showSuccess,
            "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60":
              disabled,
          }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleFileChange}
          disabled={disabled}
          className="sr-only"
        />

        {/* Content */}
        <div className="flex flex-col justify-center items-center  gap-3">
          {/* Icon */}
          {!hasImage && (
            <div className="flex-shrink-0">
              <ImageIcon className="size-8 text-gray-400" />
            </div>
          )}

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            {hasImage && showPreview ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full rounded object-cover flex-shrink-0"
                  />
                  <span className="text-sm text-gray-900 truncate">
                    {value instanceof File ? value.name : "Uploaded image"}
                  </span>
                </div>
                {!disabled && (
                  <Button
                    size={"icon"}
                    icon={<X className="h-4 w-4" />}
                    onClick={handleRemove}
                    className="absolute -right-3 -top-3 flex-shrink-0 ml-2 hover:bg-red-400 cursor-pointer bg-red-500 text-white rounded-full p-1 transition-colors"
                    type="button"
                  ></Button>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {state.isUploading
                  ? "Uploading image..."
                  : placeholder
                  ? placeholder
                  : dimensions
                  ? `upload W×H = ${dimensions.width}×${dimensions.height}px ${
                      label?.toLowerCase() || "image"
                    }`
                  : "Click to upload or drag and drop"}
              </div>
            )}
          </div>

          {/* Upload Status */}
          {state.isUploading && (
            <div className="flex-shrink-0">
              <div className="text-xs text-blue-600">Uploading...</div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {description && !state.error && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      {/* Error Message */}
      {state.error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {state.error}
        </p>
      )}
    </div>
  );
}
