#!/usr/bin/env node
/** Static export for GitHub Pages (stash API routes during build). */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const API = path.join(ROOT, "app", "api");
// Repo-unique: bh-air-duct's build used the same "../_api_stash_build" folder, so two builds at once
// could delete or swap each other's app/api.
const STASH = path.join(ROOT, "..", "_api_stash_build_bh-drywall");

// The static export has no API route, so without this the contact form fell back to mailto: and
// leads were lost. The live endpoint answers on the site's own domain (it emailed the owner in
// August 2026). It parses JSON only, so QuoteWizard posts JSON on this path. Owner decision
// 2026-09-30: contact forms only.
const QUOTE_API_URL = "https://bhdrywallmetrodetroit.com/api/quote";

function run(cmd) {
  console.log("[build:pages]", cmd);
  execSync(cmd, { stdio: "inherit", env: { ...process.env, NEXT_EXPORT: "1", NEXT_PUBLIC_GH_PAGES: "1", NEXT_PUBLIC_QUOTE_API_URL: QUOTE_API_URL } });
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
