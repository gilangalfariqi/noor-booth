import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking data" },
        { status: 400 }
      );
    }

    const { name, date, package: pkg, notes } = parsed.data;

    // Mock DB insert (replace with Supabase when configured)
    console.log("New booking:", { name, date, pkg, notes });
    
// Forward to admin API to store
    const adminRes = await fetch(`${request.nextUrl.origin}/api/admin/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    
    if (!adminRes.ok) {
      throw new Error("Failed to store booking");
    }
    
    return NextResponse.json({
      success: true,
      message: "Booking request submitted successfully!",
    });

  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

