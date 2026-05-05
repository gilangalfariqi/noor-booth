// ─── Database Types ─────────────────────────────────────────────────────────

export interface Booking {
  id: string;
  name: string;
  date: string;
  package: string;
  notes: string;
  created_at: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features?: string[];
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  category: GalleryCategory;
  created_at: string;
}

// ─── Enum-like Types ─────────────────────────────────────────────────────────

export type GalleryCategory =
  | "all"
  | "photobooth"
  | "merch"
  | "sticker";

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export interface BookingFormData {
  name: string;
  date: string;
  package: string;
  notes: string;
}
