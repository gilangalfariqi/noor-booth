"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import LightboxWrapper from "./LightboxWrapper";
import { getGallery } from "@/features/gallery/gallery.service";
import type { GalleryItem } from "@/types";

const PREVIEW_COUNT = 6;

export default function GalleryPreview() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const fetchGallery = async () => {
    try {
      const data = await getGallery();
      setItems(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGallery();
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, scale: 0.97 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-[#FAF5F0]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Our Work
            </p>
            <h2
              className="text-heading text-3xl md:text-4xl text-foreground"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Selected Moments
            </h2>
          </div>

<Button variant="outline" className="flex items-center gap-2">
            <Link href="/portfolio">
              View Full Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div
                key={i}
                className="h-[220px] bg-muted animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            style={{ gridAutoRows: "220px" }}
          >
            {items.slice(0, PREVIEW_COUNT).map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariant}
                className="relative overflow-hidden rounded-xl group cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={item.image_url}
                  alt={`Photography — ${item.category}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {lightboxIndex >= 0 && (
          <LightboxWrapper
            images={items.slice(0, PREVIEW_COUNT)}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(-1)}
          />
        )}
      </div>
    </section>
  );
}