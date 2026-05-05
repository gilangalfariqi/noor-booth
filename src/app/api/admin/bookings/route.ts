import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demo (restart server = reset)
const bookings: unknown[] = [
  {
    id: "1",
    name: "John Doe",
    date: "2024-12-20",
    package: "Essential",
    notes: "Outdoor family session",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Jane Smith",
    date: "2024-12-25",
    package: "Premium",
    notes: "",
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ data: bookings });
  } catch (error) {
    console.error("Admin bookings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Receive new booking from booking API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newBooking = {
      id: `b${Date.now()}`,
      ...body,
      created_at: new Date().toISOString()
    };
    bookings.unshift(newBooking); // Add to front
    return NextResponse.json({ success: true, data: newBooking });
  } catch (error) {
    return NextResponse.json({ error: "Failed to store booking" }, { status: 500 });
  }
}

