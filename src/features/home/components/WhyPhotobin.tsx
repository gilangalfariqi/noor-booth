"use client";

import { motion } from "framer-motion";
import { Printer, Palette, Zap, Users, Camera } from "lucide-react";

const features = [
  {
    icon: Printer,
    title: "Unlimited Print",
    description: "Cetak sepuasnya! Semua tamu bisa bawa pulang kenangan fisik berkualitas tinggi."
  },
  {
    icon: Palette,
    title: "Custom Template",
    description: "Desain layout foto sesuai tema event kamu. Eksklusif dan unik."
  },
  {
    icon: Zap,
    title: "Instant Result",
    description: "Hanya hitungan detik, foto langsung jadi dan bisa langsung di-share ke sosmed."
  },
  {
    icon: Users,
    title: "Fun Group Photos",
    description: "Momen seru bareng teman dan keluarga jadi lebih ekspresif dengan properti lucu."
  },
  {
    icon: Camera,
    title: "Unique Experience",
    description: "Bukan sekadar foto, tapi hiburan interaktif yang buat event kamu tak terlupakan."
  }
];

export default function WhyPhotobin() {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Value Proposition</p>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Kenapa Pilih Photobin?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kami menghadirkan lebih dari sekadar kamera. Kami menghadirkan keceriaan instan di setiap lembar cetakan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#FAF5F0] border border-primary/5 hover:border-primary/20 hover:shadow-lg transition-all text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
