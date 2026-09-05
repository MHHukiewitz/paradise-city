import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import type { FacebookFeedSnapshot } from "@/lib/facebook-feed";

export const dynamic = "force-dynamic";

async function readSnapshot(): Promise<FacebookFeedSnapshot> {
  const raw = await readFile(join(process.cwd(), "public/feed/index.json"), "utf8");
  return JSON.parse(raw) as FacebookFeedSnapshot;
}

export async function GET() {
  const snapshot = await readSnapshot();
  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}
