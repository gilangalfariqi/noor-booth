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
    default: "Noor Booth — Professional Photo Booth Service",
    template: "%s | Noor Booth",
  },
  description:
    "Membangun pengalaman photobooth yang seru dan merchandise custom berkualitas untuk setiap momen spesial Anda. @noorbooth.id",
  keywords: [
    "photo booth",
    "merch",
    "sticker",
    "custom stickers",
    "noor booth",
    "noor booth jakarta",
  ],
  authors: [{ name: "Noor Booth" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Noor Booth — Professional Photo Booth Service",
    description:
      "Membangun pengalaman photobooth yang seru dan merchandise custom berkualitas untuk setiap momen spesial Anda.",
    siteName: "Noor Booth",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noor Booth — Professional Photo Booth Service",
    description:
      "Membangun pengalaman photobooth yang seru dan merchandise custom berkualitas untuk setiap momen spesial Anda.",
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
