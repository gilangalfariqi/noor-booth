"use client";

import Link from "next/link";
import { Camera, Mail, Phone, MapPin } from "lucide-react";


const footerLinks = {
  Pages: [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Gallery Event" },
    { href: "/pricing", label: "Paket Harga" },
    { href: "/booking", label: "Booking" },
  ],
  Services: [
    { href: "/portfolio", label: "Photo Booth" },
    { href: "/portfolio", label: "Merch" },
    { href: "/portfolio", label: "Sticker" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#2A1A0A] text-[#D4B896] mt-auto">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 group-hover:scale-110 transition-transform">
                <img
                  src="/logo.jpeg"
                  alt="Noor Booth Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="text-xl font-bold text-[#FDFAF7]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Noor Booth
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#A8896C] max-w-xs mb-6">
              Membangun pengalaman photobooth yang seru dan merchandise custom berkualitas untuk setiap momen spesial Anda.
            </p>
            {/* Contact */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:NoorBooth2026@gmail.com"
                className="flex items-center gap-2 text-sm hover:text-[#E09540] transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                NoorBooth2026@gmail.com
              </a>
              <a
                href="https://wa.me/62895365518017"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-[#E09540] transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                +62 895-3655-18017
              </a>
              <a
                href="https://instagram.com/noorbooth.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-[#E09540] transition-colors"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                @noorbooth.id
              </a>
              <span className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                Bogor, Indonesia
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[#FDFAF7] font-semibold text-sm mb-4 tracking-wide uppercase">
                {title}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#A8896C] hover:text-[#E09540] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-8 h-px bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B5040]">
            © {new Date().getFullYear()} Noor Booth. All rights reserved.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/noorbooth.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#E09540] hover:text-[#E09540] transition-colors"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8,0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8,0 0,1 7.8,2M7.6,4A3.6,3.6,0 0,0 4,7.6V16.4A3.6,3.6,0 0,1 7.6,20H16.4A3.6,3.6,0 0,1 20,16.4V7.6A3.6,3.6,0 0,1 16.4,4H7.6M17.8,9A1,1,0 0,1 17.8,11A1,1,0 0,1 16.8,11A1,1,0 0,1 15.8,10A1,1,0 0,1 15.8,8A1,1,0 0,1 16.8,8A1,1,0 0,1 17.8,9M9,12.6A2.6,2.6,0 1,1 11.6,15.2A2.7,2.7,0 0,1 9,12.6Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
