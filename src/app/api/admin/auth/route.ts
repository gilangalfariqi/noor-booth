import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = "admin123"; // Change this in production

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: "Authenticated" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

