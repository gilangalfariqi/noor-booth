import { NextRequest, NextResponse } from "next/server";

// Server-side admin password must come from environment variables.
// This file intentionally never hard-codes secrets.
const ADMIN_PASSWORD = process.env.ADMIN_SECRET ?? "";

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

