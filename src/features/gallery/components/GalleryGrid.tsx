"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import CategoryFilter from './CategoryFilter';
import LightboxWrapper from './LightboxWrapper';
import type { GalleryItem, GalleryCategory } from '@/types';

interface GalleryGridProps {
  items: GalleryItem[];
  loading?: boolean;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.45, 
ease: "easeOut" 
    } 
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-xl" />
      ))}
    </div>
  );
}

export default function GalleryGrid({ items, loading = false }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = useMemo(() => {
    if (!Array.isArray(items)) return [];
    if (activeCategory === 'all') return items;
    return items.filter((img) => img.category === activeCategory);
  }, [items, activeCategory]);

  if (loading) return <GallerySkeleton />;

  return (
    <div className="space-y-10">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {filtered.length === 0 && !loading && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-sm">No images in this category yet.</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              variants={itemVariant}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open photo ${i + 1}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
            >
              <Image
                src={item.image_url}
                alt={`Photography — ${item.category}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#1C1410]/0 group-hover:bg-[#1C1410]/40 transition-colors duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 capitalize bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {lightboxIndex >= 0 && (
        <LightboxWrapper
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </div>
  );
}

