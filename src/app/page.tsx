"use client";

import Hero from "@/features/home/components/Hero";
import WhyPhotobin from "@/features/home/components/WhyPhotobin";
import HowItWorks from "@/features/home/components/HowItWorks";
import MerchShowcase from "@/features/home/components/MerchShowcase";
import Testimonials from "@/features/home/components/Testimonials";
import GalleryPreview from "@/features/gallery/components/GalleryPreview";
import FloatingWA from "@/features/common/components/FloatingWA";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Home() {
  const whatsappUrl = "https://wa.me/628001234567?text=" + encodeURIComponent("Hi, saya tertarik dengan photobooth Photobin. Bisa info paket dan ketersediaan?");

  return (
    <>
      <main className="flex flex-col">
        <Hero />
        <WhyPhotobin />
        
        <div className="bg-white py-12">
          <div className="section-container">
            <div className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
              <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Siap Ramaikan Event Kamu?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Konsultasikan kebutuhan photobooth dan merch kamu sekarang juga. Gratis tanya-tanya!
              </p>
              <Button size="lg" render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat Sekarang
              </Button>
            </div>
          </div>
        </div>

        <HowItWorks />
        <GalleryPreview />
        <MerchShowcase />
        <Testimonials />
        
        {/* Bottom CTA for all pages */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="section-container">
            <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
              Ayo Foto Seru Bareng Photobin!
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              Jangan lewatkan momen bahagia kamu tanpa kenangan fisik yang berkesan.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" variant="secondary" className="h-16 px-10 text-lg font-bold" render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}>
                Booking via WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FloatingWA />
      
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-border z-[90]">
        <Button className="w-full h-14 text-base font-bold shadow-lg" render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}>
          <MessageCircle className="w-5 h-5 mr-2" />
          Book via WhatsApp Sekarang
        </Button>
      </div>
    </>
  );
}
