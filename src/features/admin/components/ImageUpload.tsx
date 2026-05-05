"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { GalleryCategory } from "@/types";

const categories: { value: Exclude<GalleryCategory, "all">; label: string }[] = [
  { value: "photobooth", label: "Photo Booth" },
  { value: "merch", label: "Merch" },
  { value: "sticker", label: "Sticker" },
];

interface ImageUploadProps {
  onUploaded?: () => void;
}

export default function ImageUpload({ onUploaded }: ImageUploadProps) {
  const [category, setCategory] = useState<Exclude<GalleryCategory, "all">>("photobooth");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5 MB.");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Upload failed");

      toast.success("Image uploaded successfully!");
      handleRemove();
      onUploaded?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-xl font-semibold text-foreground mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Upload Image
        </h2>
        <p className="text-sm text-muted-foreground">
          Add new photos to your gallery. Supported: JPG, PNG, WebP (max 5 MB).
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl transition-colors ${
          preview ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/40 cursor-pointer"
        }`}
        onClick={() => !preview && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !preview && inputRef.current?.click()}
        role={preview ? undefined : "button"}
        tabIndex={preview ? undefined : 0}
        aria-label="Click to upload image"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Select image file"
        />
        {preview ? (
          <div className="relative p-2">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg"
            />
            <button
              onClick={handleRemove}
              className="absolute top-4 right-4 bg-destructive text-white rounded-full p-1 hover:bg-destructive/80 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 gap-3 text-muted-foreground">
            <ImageIcon className="w-10 h-10 text-muted-foreground/50" />
            <p className="text-sm font-medium">Click to select an image</p>
            <p className="text-xs">JPG, PNG, WebP up to 5 MB</p>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="upload-category">Category</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as Exclude<GalleryCategory, "all">)}>
          <SelectTrigger id="upload-category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full"
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Upload to Gallery
          </>
        )}
      </Button>
    </div>
  );
}

