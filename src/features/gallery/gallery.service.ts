
import type { GalleryItem, GalleryCategory } from '@/types';

// Placeholder hook - implement with SWR if needed

export async function getGallery(category?: GalleryCategory): Promise<GalleryItem[]> {
  const params = category && category !== 'all' ? `?category=${category}` : '';
  const res = await fetch(`/api/gallery${params}`);
  if (!res.ok) throw new Error('Gallery fetch failed');
  const { data } = await res.json();
  return data as GalleryItem[];
}

export async function uploadGalleryImage(file: File, category: Exclude<GalleryCategory, 'all'>) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);
  const res = await fetch('/api/gallery', { method: 'POST', body: formData });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

