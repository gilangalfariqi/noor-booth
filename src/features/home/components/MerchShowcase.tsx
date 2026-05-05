"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Custom Keychains",
    image: "/merch.jpeg",
    tag: "Best Seller"
  },
  {
    name: "HP Stickers",
    image: "/hp1.jpeg",
    tag: "Most Unique"
  },
  {
    name: "Photo Stickers",
    image: "/hp2.jpeg",
    tag: "Add-on"
  },
  {
    name: "Exclusive Prints",
    image: "/merch2.jpeg",
    tag: "Premium"
  }
];

export default function MerchShowcase() {
  const whatsappUrl = "https://wa.me/628001234567?text=" + encodeURIComponent("Hi, saya tertarik untuk menambah paket merch (keychain/sticker) ke booking photobooth saya.");

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Add-on Experiences</p>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Custom Merch untuk <br />
              Event Spesial Kamu
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Jadikan foto tamu Anda abadi dengan merch custom. Dari gantungan kunci estetik hingga stiker HP yang kekinian. Cocok untuk souvenir pernikahan, ulang tahun, atau branding event kantor.
            </p>

            <div className="space-y-4 mb-10">
              {["Souvenir Unik & Personal", "Kualitas Print Tajam", "Tersedia Berbagai Ukuran"].map((item) => (
                <div key={item} className="flex items-center gap-3 font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Button size="lg" className="h-14 px-8" render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}>
              <ShoppingBag className="w-5 h-5 mr-2" />
              Order with Photobooth Package
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-bold bg-primary px-2 py-0.5 rounded-full mb-1 inline-block">{p.tag}</p>
                  <p className="font-bold">{p.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
