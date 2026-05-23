# Noor Booth — Professional Photography Booking Web App 🚀

Production-ready **Next.js 16** photography booking website with **Supabase** (PostgreSQL + Storage).

[![Deploy with Vercel](https://thereadme.com/project-status/Deploy%20with%20Vercel.svg)](https://vercel.com/new/clone)

## ✨ Features

- **Modern UI/UX**: Tailwind + shadcn/ui + Framer Motion
- **Booking System**: form validation, rate limiting, and Supabase-backed submissions
- **Portfolio Gallery**: categorized gallery with image upload and lightbox
- **Dynamic Pricing**: admin-managed packages
- **Admin Dashboard**: authentication + manage bookings, packages, and gallery images
- **Supabase Integration**: PostgreSQL + Storage
- **SEO Optimized**: metadata + OpenGraph
- **Production Ready**: loading states, error handling, and user feedback

## 🧰 Tech Stack

```txt
Frontend: Next.js 16 (App Router) + TypeScript + TailwindCSS
Backend: Next.js API Routes + Supabase (PostgreSQL + Storage)
UI: shadcn/ui + Framer Motion + Lucide React
Forms: React Hook Form + Zod
Deployment: Vercel
```

## 🚀 Quick Start

### 1) Clone & Install

```bash
git clone <your-repo> noor-booth
cd noor-booth
npm install
```

### 2) Environment Variables

1. Create `.env.local` from `.env.example`.
2. Set at minimum:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_SECRET` (server-side admin authentication secret)

> **Security note:** Do not commit `.env.local` or any secret values to GitHub.

### 3) Setup Supabase

1. Create a Supabase project.
2. Create a storage bucket named `gallery`.
3. Run database schema SQL (see `supabase-setup.sql`).

### 4) Development

```bash
npm run dev
```

Open: http://localhost:3000

Admin panel: http://localhost:3000/admin

### 5) Deploy to Vercel

1. Push to GitHub.
2. Import the project into Vercel.
3. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_SECRET`
4. Deploy.

## 📚 Pages

| Route | Purpose |
|------|---------|
| `/` | Landing page (hero, services, gallery preview, CTA) |
| `/portfolio` | Filterable gallery + lightbox |
| `/pricing` | Pricing/packages |
| `/booking` | Booking form (validation + submit) |
| `/admin` | Admin dashboard (bookings, packages, gallery, settings) |

## 🔐 Admin Access

Admin authentication is protected using `ADMIN_SECRET`.

- Change `ADMIN_SECRET` immediately after setup.
- Never expose `ADMIN_SECRET` in client-side code.

## 🗄️ Database Schema

The schema is maintained in `supabase-setup.sql`.

## 🧩 Customization

- UI content/components: under `src/`
- Gallery bucket name & categories: managed via Supabase configuration/policies

## 🧪 Testing & Checks

```bash
npm run build && npm start
npm run lint
```

## ✅ Production Checklist

- [ ] Supabase tables created
- [ ] Storage bucket configured
- [ ] RLS policies verified
- [ ] `ADMIN_SECRET` set
- [ ] Deployment environment variables set in Vercel

## 📄 License

See `LICENSE` file in this repository.
