import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/features/common/components/Navbar";
import Footer from "@/features/common/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Photobin — Professional Photography Studio",
    template: "%s | Photobin",
  },
  description:
    "Capturing life's most precious moments. Professional photo booth services, premium merch, and custom stickers.",
  keywords: [
    "photo booth",
    "merch",
    "sticker",
    "custom stickers",
    "photobin",
  ],
  authors: [{ name: "Photobin Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Photobin — Professional Photography Studio",
    description:
      "Capturing life's most precious moments. Professional photo booth services, premium merch, and custom stickers.",
    siteName: "Photobin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photobin — Professional Photography Studio",
    description:
      "Capturing life's most precious moments. Book your session today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
