import { NextRequest, NextResponse } from "next/server";

// Dummy route to satisfy TypeScript - actual Socket.IO is handled in server.js
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: "Socket.IO is handled by custom server" 
  });
}