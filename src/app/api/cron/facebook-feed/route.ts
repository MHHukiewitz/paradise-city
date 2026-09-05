import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import type { FacebookFeedSnapshot } from "@/lib/facebook-feed";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function runRefresh() {
  const script = [process.cwd(), "scripts", "refresh-facebook-feed.mjs"].join("/");
  return new Promise<{ code: number; stdout: string }>((resolve) => {
    const child = spawn(process.execPath, [script], {
      cwd: process.cwd(),
      env: process.env,
    });
    let stdout = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.on("close", (code) => {
      resolve({ code: code ?? 1, stdout });
    });
  });
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = await runRefresh();
  const raw = await readFile(join(process.cwd(), "public/feed/index.json"), "utf8");
  const snapshot = JSON.parse(raw) as FacebookFeedSnapshot;

  return NextResponse.json({
    ok: result.code === 0,
    log: result.stdout.trim(),
    updatedAt: snapshot.updatedAt,
    count: snapshot.items.length,
  });
}
