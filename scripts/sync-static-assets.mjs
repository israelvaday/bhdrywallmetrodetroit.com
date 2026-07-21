#!/usr/bin/env node
/**
 * After static export: normalize icon/OG files for GitHub Pages + social crawlers.
 * - Browsers request /favicon.ico (stale ICO was winning over /icon.png)
 * - Facebook/Twitter prefer /opengraph-image.png with a .png extension
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");

if (!fs.existsSync(OUT)) {
  console.warn("[sync-static-assets] out/ missing — skip");
  process.exit(0);
}

function readIfExists(rel) {
  const p = path.join(OUT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p) : null;
}

/** PNG-in-ICO (Vista+); works in modern browsers when /favicon.ico is requested first. */
function pngToIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry[0] = 0; // 256 = 0 means 256px; our PNG defines actual size
  entry[1] = 0;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}

function write(rel, buf) {
  const p = path.join(OUT, rel);
  fs.writeFileSync(p, buf);
  console.log("[sync-static-assets] wrote", rel, `(${buf.length} bytes)`);
}

const icon = readIfExists("icon");
const apple = readIfExists("apple-icon");
const og = readIfExists("opengraph-image");

if (icon) {
  write("icon.png", icon);
  write("favicon.ico", pngToIco(icon));
}

if (apple) {
  write("apple-icon.png", apple);
}

if (og) {
  write("opengraph-image.png", og);
}
