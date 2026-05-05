-- Photobin Gallery Table + RLS Setup
-- Run this in Supabase Dashboard → SQL Editor (https://supabase.com/dashboard/project/[your-project]/sql)

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('wedding', 'portrait', 'event', 'family', 'selected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- 3. Policies for anon/public access
DROP POLICY IF EXISTS "Allow public gallery read" ON public.gallery;
CREATE POLICY "Allow public gallery read" ON public.gallery
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public gallery insert" ON public.gallery;
CREATE POLICY "Allow public gallery insert" ON public.gallery
  FOR INSERT WITH CHECK (true);

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery (category);
CREATE INDEX IF NOT EXISTS idx_gallery_created ON public.gallery (created_at DESC);

-- 5. Make 'photobooth' bucket public (if not)
-- Go to Storage → photobooth → Settings → Public bucket: ON
