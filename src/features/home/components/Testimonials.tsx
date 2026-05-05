"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Wijaya",
    event: "Wedding Celebration",
    text: "Noor Booth bener-bener buat acara saya jadi seru banget! Tamu-tamu pada antri dan hasilnya bagus banget. Unlimited print-nya beneran unlimited!",
    rating: 5
  },
  {
    name: "Andi Pratama",
    event: "Corporate Gathering",
    text: "Sangat profesional. Setup-nya rapi, tim-nya ramah, dan custom template-nya keren banget sesuai branding kantor kami.",
    rating: 5
  },
  {
    name: "Jessica Putri",
    event: "Birthday Party",
    text: "Puas banget sama Noor Booth! Propertinya lucu-lucu dan stiker HP-nya jadi rebutan. Definitively recommended untuk acara apapun.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#FAF5F0]">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Social Proof</p>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Apa Kata Mereka?
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex text-primary">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="font-bold">5.0 Rating</span>
            <span className="text-muted-foreground border-l border-muted-foreground/30 pl-2">Trusted by 200+ Events</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white shadow-xl shadow-primary/5 relative"
            >
              <div className="absolute top-6 right-8 text-primary/10">
                <Quote className="w-12 h-12 fill-current" />
              </div>
              <div className="flex text-primary mb-4">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg mb-6 leading-relaxed italic">&quot;{r.text}&quot;</p>
              <div>
                <p className="font-bold text-foreground">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
