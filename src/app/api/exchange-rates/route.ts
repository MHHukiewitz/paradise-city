import { NextResponse } from "next/server";
import { getRates } from "@/lib/rates";

export const revalidate = 86400;

export async function GET() {
  const rates = await getRates();
  if (!rates) {
    return NextResponse.json(
      { ok: false },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  }

  return NextResponse.json(
    { ok: true, ...rates },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
