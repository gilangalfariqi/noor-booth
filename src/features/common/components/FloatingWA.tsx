"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWA() {
  const whatsappNumber = "628001234567";
  const whatsappMessage = encodeURIComponent("Hi, saya tertarik dengan photobooth Photobin. Bisa info paket dan ketersediaan?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 px-3 py-1.5 bg-white text-foreground text-sm font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
        Ada pertanyaan? Chat kami!
      </span>
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 -z-10" />
    </motion.a>
  );
}
