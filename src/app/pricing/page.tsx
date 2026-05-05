"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PricingCard from "@/features/packages/components/PricingCard";
import { packagesService } from "@/features/packages/packages.service";
import type { Package } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback data matching real pricing
const FALLBACK_PACKAGES: Package[] = [
  {
    id: "standard-event",
    name: "Standard Event Package",
    price: 2800000,
    description: "Ideal untuk acara intimate dengan sentuhan profesional.",
    features: [
      "Standard photo booth setup",
      "Standard template",
      "Softcopy foto",
      "Maksimal 120 print photo",
      "Properti sederhana",
    ],
    featured: false,
  },
  {
    id: "premium-event",
    name: "Premium Event Package",
    price: 4000000,
    description: "Pengalaman aesthetic premium untuk acara yang memukau.",
    features: [
      "Premium aesthetic setup",
      "Custom template",
      "Softcopy foto",
      "Unlimited print photo",
      "Properti lengkap",
      "Premium backdrop setup",
    ],
    featured: true,
  },
];

export default function PricingPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await packagesService.getAll();
      setPackages(data);
    } catch {
      toast.error("Menggunakan data paket default.");
      setPackages(FALLBACK_PACKAGES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#FAF5F0] via-background to-[#FBE4D1]/30 py-24">
        <div className="section-container text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-widest uppercase text-primary mb-4"
          >
            Harga Paket
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Investasi Terbaik
            <br />
            <span className="text-primary">untuk Momen Istimewa</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-xl leading-relaxed"
          >
            Pilih paket yang sesuai dengan kebutuhan acara Anda.
            Harga transparan, kualitas premium.
          </motion.p>
        </div>
      </div>

      {/* Cards */}
      <div className="section-container py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-[480px] w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
            {packages.map((pkg, i) => (
              <PricingCard
                key={pkg.id}
                pkg={pkg}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-muted/60 rounded-2xl px-8 py-6 border border-border/60">
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
              💡 <strong className="text-foreground">Butuh paket custom?</strong> Hubungi kami untuk penawaran
              yang disesuaikan dengan kebutuhan spesifik acara Anda.
            </p>
            <a
              href="https://wa.me/62895365518017"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Hubungi via WhatsApp →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
