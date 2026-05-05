import { z } from "zod";

// ─── Booking Validation ───────────────────────────────────────────────────────

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim(),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date >= new Date();
    }, "Date must be today or in the future"),
  package: z.string().min(1, "Please select a package"),
  notes: z.string().max(500, "Notes are too long").optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

// ─── Package Validation ───────────────────────────────────────────────────────

export const packageSchema = z.object({
  name: z
    .string()
    .min(2, "Package name must be at least 2 characters")
    .max(80, "Name too long"),
  price: z.number().min(0, "Price cannot be negative"),
  description: z
    .string()
    .min(5, "Description is required")
    .max(500, "Description too long"),
  features: z.array(z.string()).optional().default([]),
});

export type PackageInput = z.infer<typeof packageSchema>;

// ─── Gallery Validation ───────────────────────────────────────────────────────

export const galleryItemSchema = z.object({
  image_url: z.string().url("Invalid image URL"),
  category: z.enum(["photobooth", "merch", "sticker"]),
});

export type GalleryItemInput = z.infer<typeof galleryItemSchema>;
