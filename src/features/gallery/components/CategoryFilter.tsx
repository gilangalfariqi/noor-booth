"use client";

import { motion } from 'framer-motion';
import type { GalleryCategory } from '@/types';

const categories: { value: GalleryCategory; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'photobooth', label: 'Photo Booth' },
  { value: 'merch', label: 'Merch' },
  { value: 'sticker', label: 'Sticker' },
];

interface CategoryFilterProps {
  active: GalleryCategory;
  onChange: (cat: GalleryCategory) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Gallery categories">
      {categories.map((cat) => (
        <button
          key={cat.value}
          role="tab"
          aria-selected={active === cat.value}
          onClick={() => onChange(cat.value)}
          className="relative px-5 py-2 text-sm font-medium rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {active === cat.value && (
            <motion.div
              layoutId="active-category"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors ${
              active === cat.value ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
}

