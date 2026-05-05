"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Pilih Paket",
    description: "Tentukan paket yang sesuai dengan kebutuhan dan skala event kamu."
  },
  {
    number: "02",
    title: "Booking Tanggal",
    description: "Amankan jadwalmu! Konsultasikan tanggal dan tema via WhatsApp."
  },
  {
    number: "03",
    title: "Datang & Foto Seru",
    description: "Tim kami akan setup di lokasi. Kamu dan tamu tinggal gaya & foto sepuasnya."
  },
  {
    number: "04",
    title: "Langsung Dapat Hasil",
    description: "Cetak fisik instan dan softcopy siap diunduh saat itu juga."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#FAF5F0]">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Process Flow</p>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Cara Kerja Noor Booth
          </h2>
          <p className="text-muted-foreground text-lg">Sesederhana senyum, secepat kilat hasilnya.</p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center mb-6 group-hover:border-primary transition-colors shadow-lg">
                  <span className="text-xl font-black text-primary">{s.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
