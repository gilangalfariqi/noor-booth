"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import type { Package } from "@/types";

interface PricingCardProps {
  pkg: Package;
  featured?: boolean;
  index?: number;
}

function formatRupiah(price: number, isPlus?: boolean): string {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return isPlus ? `${formatted}+` : formatted;
}

function getDefaultFeatures(pkg: Package): string[] {
  if (pkg.features && pkg.features.length > 0) return pkg.features;
  return [
    "Professional editing",
    "High-resolution digital files",
    "Online gallery delivery",
    "Print-ready JPEGs",
  ];
}

export default function PricingCard({
  pkg,
  featured = false,
  index = 0,
}: PricingCardProps) {
  const features = getDefaultFeatures(pkg);
  const isFeatured = featured || pkg.featured;
  const isPremium = pkg.id === "premium-event";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Card
        className={`h-full relative transition-all duration-300 hover:shadow-2xl overflow-hidden ${
          isFeatured
            ? "border-2 border-primary shadow-xl ring-4 ring-primary/10 scale-[1.02]"
            : "border-border hover:border-primary/40 hover:shadow-lg"
        }`}
      >
        {/* Featured Gradient Background */}
        {isFeatured && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        )}

        {/* Most Popular Badge */}
        {isFeatured && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <Badge className="bg-primary text-primary-foreground px-4 py-1 flex items-center gap-1.5 shadow-md text-xs font-semibold">
              <Star className="w-3 h-3 fill-current" />
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className={`pb-4 ${isFeatured ? "pt-10" : "pt-8"}`}>
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
            isFeatured ? "bg-primary/15" : "bg-muted"
          }`}>
            <Sparkles className={`w-5 h-5 ${isFeatured ? "text-primary" : "text-muted-foreground"}`} />
          </div>

          <CardTitle
            className={`text-xl font-bold ${isFeatured ? "text-primary" : ""}`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {pkg.name}
          </CardTitle>

          <CardDescription className="text-sm leading-relaxed mt-1">
            {pkg.description}
          </CardDescription>

          <div className="pt-4">
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-bold ${isFeatured ? "text-primary" : "text-foreground"}`}>
                {formatRupiah(pkg.price, isPremium)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">per event</p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <div className={`h-px w-full ${isFeatured ? "bg-primary/20" : "bg-border"}`} />

          <ul className="space-y-2.5">
            {features.map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2.5 text-sm"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isFeatured ? "bg-primary/15" : "bg-muted"
                }`}>
                  <Check className={`w-3 h-3 ${isFeatured ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <span className="text-muted-foreground leading-snug">{feat}</span>
              </li>
            ))}
          </ul>

          <Button
            className={`w-full mt-2 ${isFeatured ? "" : ""}`}
            variant={isFeatured ? "default" : "outline"}
            render={<Link href={`/booking?package=${encodeURIComponent(pkg.name)}`} />}
          >
            {isFeatured ? "Book Premium Package" : "Book Standard Package"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}