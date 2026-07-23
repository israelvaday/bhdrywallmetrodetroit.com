#!/usr/bin/env node
/** Static export for GitHub Pages (stash API routes during build). */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const API = path.join(ROOT, "app", "api");
const STASH = path.join(ROOT, "..", "_api_stash_build");

function run(cmd) {
  console.log("[build:pages]", cmd);
  execSync(cmd, { stdio: "inherit", env: { ...process.env, NEXT_EXPORT: "1", NEXT_PUBLIC_GH_PAGES: "1" } });
}

if (fs.existsSync(API)) {
  if (fs.existsSync(STASH)) fs.rmSync(STASH, { recursive: true, force: true });
  fs.renameSync(API, STASH);
}

try {
  run("npx next build");
  run("node scripts/sync-static-assets.mjs");
} finally {
  if (fs.existsSync(STASH) && !fs.existsSync(API)) {
    fs.renameSync(STASH, API);
  }
}
