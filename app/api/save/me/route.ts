import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      message: "未启用登录，暂无云端存档。"
    },
    { status: 401 }
  );
}
