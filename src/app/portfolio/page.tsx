"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import GalleryGrid from "@/features/gallery/components/GalleryGrid";
import { getGallery } from "@/features/gallery/gallery.service";
import { Skeleton } from "@/components/ui/skeleton";

import type { GalleryItem } from "@/types";

export default function PortfolioPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGallery();
      setImages(data);
    } catch (err) {
      setError("Failed to load portfolio. Please try again later.");
      toast.error("Portfolio load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="section-container py-20">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Photography Portfolio
          </h1>
          <p className="text-muted-foreground text-lg">
            A visual journey through the moments we&apos;ve had the privilege to capture.
          </p>
        </div>

        {error ? (
          <div className="text-center py-20">
            <Skeleton className="h-64 w-96 mx-auto mb-4" />
            <p className="text-destructive">{error}</p>
            <button 
              onClick={fetchGallery}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        ) : (
          <GalleryGrid items={images} loading={loading} />
        )}
      </div>
    </div>
  );
}
