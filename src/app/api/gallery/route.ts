import { NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { GalleryItem } from "@/types";

// ─── Static gallery for when Supabase is not configured ───────────────────────
const STATIC_GALLERY: GalleryItem[] = [
  { id: "pb1", image_url: "/1.jpeg",     category: "photobooth", created_at: "2026-01-01T00:00:00Z" },
  { id: "pb2", image_url: "/2.jpeg",     category: "photobooth", created_at: "2026-01-01T00:00:01Z" },
  { id: "m1",  image_url: "/merch.jpeg", category: "merch",      created_at: "2026-01-01T00:00:02Z" },
  { id: "m2",  image_url: "/merch2.jpeg",category: "merch",      created_at: "2026-01-01T00:00:03Z" },
  { id: "s1",  image_url: "/hp1.jpeg",   category: "sticker",    created_at: "2026-01-01T00:00:04Z" },
  { id: "s2",  image_url: "/hp2.jpeg",   category: "sticker",    created_at: "2026-01-01T00:00:05Z" },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // Return static gallery if Supabase is not configured
    if (!isSupabaseConfigured) {
      const data = category
        ? STATIC_GALLERY.filter((img) => img.category === category)
        : STATIC_GALLERY;
      return Response.json({ data });
    }

    const { supabase } = await import("@/lib/supabase");
    let query = supabase.from("gallery").select("*");

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return Response.json({ error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isSupabaseConfigured) {
      return Response.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const { supabase } = await import("@/lib/supabase");
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;

    if (!file || !category) {
      return Response.json({ error: "Missing file or category" }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filename, file, { contentType: file.type });

    if (uploadError) {
      return Response.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filename);

    const { data, error } = await supabase.from("gallery").insert({
      image_url: urlData.publicUrl,
      category,
    }).select().single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return Response.json({ error: errorMsg }, { status: 500 });
  }
}