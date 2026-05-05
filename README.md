# Photobin - Professional Photography Studio 🚀

Production-ready Next.js 16 photography booking website with Supabase backend.

[![Vercel](https://thereadme.com/project-status/Deploy%20with%20Vercel.svg)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/photobin&env=NEXT_PUBLIC_SUPABASE_URL&env=NEXT_PUBLIC_SUPABASE_ANON_KEY&env=ADMIN_SECRET&project-name=photobin&repository-name=photobin)

## ✨ Features

- **Modern UI/UX** - Tailwind + shadcn/ui + Framer Motion
- **Full Booking System** - Form validation + rate limiting
- **Portfolio Gallery** - Image upload + lightbox + categories
- **Dynamic Pricing** - Admin CRUD
- **Admin Dashboard** - Auth + bookings/packages/images management
- **Supabase Integration** - PostgreSQL + Storage
- **SEO Optimized** - Metadata + OpenGraph
- **Production Ready** - Error boundaries + loading states + toasts

## 🛠 Tech Stack

```
Frontend: Next.js 16 (App Router) + TypeScript + TailwindCSS
Backend: Next.js API Routes + Supabase (PostgreSQL + Storage)
UI: shadcn/ui + Framer Motion + Lucide React
Forms: React Hook Form + Zod
Deployment: Vercel (free tier)
```

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo> photobin
cd photobin
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Setup Supabase (5 minutes)
1. [Create Supabase project](https://supabase.com/dashboard)
2. Copy `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
3. Create storage bucket `gallery` (public access)
4. Run SQL (Dashboard > SQL Editor):

```sql
-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  package TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Packages table  
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL,
  features TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  category TEXT CHECK (category IN ('wedding', 'portrait', 'event', 'family')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (optional, allows public reads)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);

-- Insert sample packages
INSERT INTO packages (name, price, description) VALUES
('Essentials', 299, 'Perfect for small gatherings'),
('Signature', 599, 'Comprehensive wedding coverage', ARRAY['8 hours', '300+ photos']),
('Elite', 999, 'Luxury service with album');
```

### 4. Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)  
**Password:** `admin123` (change `ADMIN_SECRET` in `.env.local`)

### 5. Deploy to Vercel (Free!)
1. Push to GitHub
2. [Import to Vercel](https://vercel.com/new)
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_SECRET`
4. Deploy! ✅

## 📱 Pages & Features

| Page | Features |
|------|----------|
| `/` | Hero, Services, Gallery preview, Testimonials, CTA |
| `/portfolio` | Filterable gallery + lightbox |
| `/pricing` | Dynamic pricing cards |
| `/booking` | Form + validation + submission |
| `/admin` | Auth + tabs: Bookings/Packages/Images/Settings |

## 🔐 Admin Password
Default: `admin123`  
Change `ADMIN_SECRET=your-secret` in `.env.local` or Vercel dashboard.

## 🗄 Database Schema
See SQL above. Tables: `bookings`, `packages`, `gallery`. Bucket: `gallery`.

## 🎨 Customization
- **Colors**: Edit `tailwind.config.ts`
- **Content**: Static content in components
- **Images**: Upload via admin to Supabase Storage
- **Fonts**: Playfair Display + Inter (Google Fonts)

## 🧪 Testing
```bash
npm run build && npm start
npm run lint
```

## 📦 Production Checklist
- [ ] Supabase tables created
- [ ] `.env` vars set
- [ ] Admin password changed
- [ ] Custom domain (Vercel)
- [ ] Analytics (Vercel)

## 🙌 Credits
Built by [BLACKBOXAI](https://blackbox.ai) - Fullstack AI engineer.

---

⭐ **Star on GitHub if helpful!**  
📢 **Deploy in 5 mins →** [Vercel](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/photobin)

