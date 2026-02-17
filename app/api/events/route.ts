import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  console.log("event", body);
  return NextResponse.json({ ok: true });
}
