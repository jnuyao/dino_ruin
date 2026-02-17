import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: true,
      message: "MVP阶段本地存档优先，云同步接口已预留。"
    },
    { status: 202 }
  );
}
