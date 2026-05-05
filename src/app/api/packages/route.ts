import { NextResponse } from "next/server";
import type { Package } from "@/types";

// ─── Real Photobin Packages ───────────────────────────────────────────────────
const packages: Package[] = [
  {
    id: "standard-event",
    name: "Standard Event Package",
    price: 2800000,
    description: "Ideal untuk acara intimate dengan sentuhan profesional.",
    features: [
      "Standard photo booth setup",
      "Standard template",
      "Softcopy foto",
      "Maksimal 120 print photo",
      "Properti sederhana",
    ],
    featured: false,
  },
  {
    id: "premium-event",
    name: "Premium Event Package",
    price: 4000000,
    description: "Pengalaman aesthetic premium dengan semua yang Anda butuhkan untuk acara yang memukau.",
    features: [
      "Premium aesthetic setup",
      "Custom template",
      "Softcopy foto",
      "Unlimited print photo",
      "Properti lengkap",
      "Premium backdrop setup",
    ],
    featured: true,
  },
];

export async function GET() {
  try {
    return NextResponse.json({ data: packages });
  } catch (error) {
    console.error("Packages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
