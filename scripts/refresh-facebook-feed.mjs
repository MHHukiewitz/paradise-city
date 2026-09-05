#!/usr/bin/env node
/**
 * Pull public photos from the Paradise City Facebook pages.
 * Chrome dumps the public HTML. The site then stores the images locally
 * so visitors never load Facebook (no Facebook cookies).
 *
 * Run: npm run feed:refresh
 * Cron: curl http://127.0.0.1:43421/api/cron/facebook-feed
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const feedDir = join(root, "public", "feed");
const indexPath = join(feedDir, "index.json");

const PAGES = [
  { id: "saloon", href: "https://www.facebook.com/ParadiseCitySaloon", label: "Paradise City Saloon" },
  { id: "paraguay", href: "https://www.facebook.com/paradisecity.paraguay", label: "Paradise-City Paraguay" },
];

const URLS = [
  { source: "saloon", url: "https://www.facebook.com/ParadiseCitySaloon" },
  { source: "saloon", url: "https://www.facebook.com/ParadiseCitySaloon/photos" },
  { source: "paraguay", url: "https://www.facebook.com/paradisecity.paraguay" },
  { source: "paraguay", url: "https://www.facebook.com/paradisecity.paraguay/photos" },
];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/snap/bin/chromium",
].filter(Boolean);

const MAX_ITEMS = 40;

function findChrome() {
  return CHROME_CANDIDATES.find((path) => existsSync(path)) ?? null;
}

function dumpDom(chrome, url) {
  const result = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--virtual-time-budget=18000",
      "--dump-dom",
      url,
    ],
    { encoding: "utf8", maxBuffer: 25 * 1024 * 1024, timeout: 50000 },
  );
  if (result.status !== 0 || !result.stdout) {
    return "";
  }
  return result.stdout;
}

function photoKey(url) {
  const match = url.match(/\/(\d+_\d+_\d+_n)\.(jpg|png|webp)/i);
  return match ? match[1] : null;
}

function score(url) {
  let value = 0;
  if (/s40x40|s100x100|s160x160|s200x200/.test(url)) value -= 80;
  if (/s320x320/.test(url)) value -= 10;
  if (/s960x960|s720x720/.test(url)) value += 15;
  if (/t39\.30808-1|t1\.30497-1/.test(url)) value -= 40;
  const mx = url.match(/mx(\d+)x(\d+)/);
  if (mx) value += Number(mx[1]) / 40;
  return value;
}

function extractPhotos(html, source) {
  const normalized = html.replaceAll("\\u002F", "/").replaceAll("\\/", "/");
  const raw = normalized.match(/https:\/\/scontent[^"'\\\s< ]+/g) ?? [];
  const best = new Map();
  for (const dirty of raw) {
    const url = dirty.split("\\")[0];
    if (!/\.(jpg|png|webp)/i.test(url)) continue;
    if (/t39\.30808-1|t1\.30497-1/.test(url)) continue;
    const id = photoKey(url);
    if (!id) continue;
    const prev = best.get(id);
    if (!prev || score(url) > score(prev.src)) {
      const page = PAGES.find((item) => item.id === source);
      best.set(id, {
        id,
        remote: url,
        source,
        page: page?.href ?? PAGES[0].href,
        alt: page?.label ?? "Paradise City",
      });
    }
  }
  return [...best.values()];
}

function download(remote, dest) {
  const result = spawnSync(
    "curl",
    ["-sL", "-A", "Mozilla/5.0", "-o", dest, "--max-time", "25", remote],
    { encoding: "utf8" },
  );
  return result.status === 0 && existsSync(dest);
}

function isJpeg(path) {
  if (!existsSync(path)) return false;
  const fd = readFileSync(path);
  return fd.length > 4000 && fd[0] === 0xff && fd[1] === 0xd8;
}

function readIndex() {
  if (!existsSync(indexPath)) {
    return { updatedAt: "", pages: PAGES.map((p) => p.href), items: [] };
  }
  return JSON.parse(readFileSync(indexPath, "utf8"));
}

function main() {
  mkdirSync(feedDir, { recursive: true });
  const chrome = findChrome();
  const previous = readIndex();
  if (!chrome) {
    const payload = {
      ...previous,
      refreshed: false,
      reason: "chrome-missing",
    };
    writeFileSync(indexPath, JSON.stringify({ updatedAt: previous.updatedAt, pages: previous.pages, items: previous.items }, null, 2) + "\n");
    process.stdout.write(JSON.stringify(payload) + "\n");
    process.exitCode = 0;
    return;
  }

  const found = new Map();
  for (const item of previous.items ?? []) {
    found.set(item.id, item);
  }

  for (const target of URLS) {
    const html = dumpDom(chrome, target.url);
    for (const photo of extractPhotos(html, target.source)) {
      const dest = join(feedDir, `${photo.id}.jpg`);
      const already = existsSync(dest) && isJpeg(dest);
      if (!already) {
        const ok = download(photo.remote, dest);
        if (!ok || !isJpeg(dest)) {
          if (existsSync(dest)) {
            spawnSync("rm", ["-f", dest]);
          }
          continue;
        }
      }
      found.set(photo.id, {
        id: photo.id,
        src: `/feed/${photo.id}.jpg`,
        source: photo.source,
        page: photo.page,
        alt: photo.alt,
      });
    }
  }

  const items = [...found.values()]
    .filter((item) => existsSync(join(feedDir, `${item.id}.jpg`)))
    .sort((a, b) => {
      const aId = Number((a.id.match(/^\d+/) ?? ["0"])[0]);
      const bId = Number((b.id.match(/^\d+/) ?? ["0"])[0]);
      return bId - aId;
    })
    .slice(0, MAX_ITEMS);

  const snapshot = {
    updatedAt: new Date().toISOString(),
    pages: PAGES.map((p) => p.href),
    items,
  };
  writeFileSync(indexPath, JSON.stringify(snapshot, null, 2) + "\n");

  const known = new Set(items.map((item) => `${item.id}.jpg`));
  known.add("index.json");
  for (const name of readdirSync(feedDir)) {
    if (!known.has(name) && name.endsWith(".jpg")) {
      spawnSync("rm", ["-f", join(feedDir, name)]);
    }
  }

  process.stdout.write(
    JSON.stringify({ refreshed: true, added: items.length, updatedAt: snapshot.updatedAt }) + "\n",
  );
}

main();
