"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getGallery } from '@/features/gallery/gallery.service';
import type { GalleryItem } from '@/types';

export default function SelectedMoment() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getGallery();
      setImages(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchImages();
  }, []);

  return (
    <section className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Featured Moments
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Captured Emotion
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Moments that tell stories and evoke feelings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-muted animate-pulse" />
            ))
          ) : images.length > 0 ? (
            images.slice(0, 6).map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={image.image_url}
                  alt={`Featured moment — ${image.category}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-2xl font-bold mb-2 text-muted-foreground">
                Gallery Coming Soon
              </h3>
              <Link href="/portfolio" className="mt-4 text-primary underline">
                Explore Portfolio
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
