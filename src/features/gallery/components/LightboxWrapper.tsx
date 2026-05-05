"use client";

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { GalleryItem } from '@/types';

interface LightboxWrapperProps {
  images: GalleryItem[];
  index: number;
  onClose: () => void;
}

export default function LightboxWrapper({
  images,
  index,
  onClose,
}: LightboxWrapperProps) {
  const slides = images.map((img) => ({
    src: img.image_url,
    alt: `Gallery photo — ${img.category}`,
  }));

  return (
    <Lightbox
      open={index >= 0}
      index={index}
      close={onClose}
      slides={slides}
      styles={{
        container: { backgroundColor: 'rgba(28, 20, 16, 0.95)' },
      }}
    />
  );
}

