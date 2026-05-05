"use client";

import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const whatsappNumber = "628001234567"; // Placeholder
  const whatsappMessage = encodeURIComponent("Hi, saya tertarik dengan photobooth Photobin. Bisa info paket dan ketersediaan?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#FAF5F0]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="section-container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for Bookings
          </div>

          <h1 
            className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Photobooth Seru <br />
            <span className="text-primary italic">untuk Event Kamu 🎉</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
            Unlimited print, custom design, dan pengalaman seru yang akan membuat tamu Anda tersenyum sepanjang acara.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/20" render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Book via WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-2" render={<Link href="/pricing" />}>
              Check Packages
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Unlimited High-Quality Prints
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Fun Props & Backdrops
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="/1.jpeg" 
              alt="Fun Photobooth Experience" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative floating elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl -rotate-12 z-0 backdrop-blur-sm border border-white/50" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full z-0 backdrop-blur-sm border border-white/50" />
          
          <div className="absolute -bottom-4 right-10 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce-slow">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-muted overflow-hidden">
                  <img src={`/hp${i % 2 + 1}.jpeg`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-foreground">
              50+ Events this month
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
