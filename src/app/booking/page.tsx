"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import BookingForm from "@/features/booking/components/BookingForm";
import { packagesService } from "@/features/packages/packages.service";
import type { Package } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const FALLBACK_PACKAGES: Package[] = [
  { id: "standard-event", name: "Standard Event Package", price: 2800000, description: "Standard photo booth setup" },
  { id: "premium-event", name: "Premium Event Package", price: 4000000, description: "Premium aesthetic setup", featured: true },
];

function BookingPageContent() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await packagesService.getAll();
      setPackages(data);
    } catch {
      toast.error("Could not load packages. Using default options.");
      setPackages(FALLBACK_PACKAGES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="section-container py-24 lg:py-32 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Book Your Photo Booth
          </h1>
          <p className="text-muted-foreground text-lg">
            Ceritakan tentang acara Anda. Kami akan mengkonfirmasi ketersediaan dalam 24 jam.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-10 w-1/2 mx-auto" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
        ) : (
          <BookingForm packages={packages} preselected={searchParams.get("package") ?? ""} />
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20">
        <div className="section-container py-24 lg:py-32 max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}
