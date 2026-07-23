#!/usr/bin/env node
/**
 * Push site/out/ to the gh-pages branch (GitHub Pages live site).
 * Usage: npm run build:pages && node scripts/deploy-gh-pages.mjs
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");
const REMOTE = "https://github.com/israelvaday/bhdrywallmetrodetroit.com.git";

if (!fs.existsSync(OUT)) {
  console.error("[deploy-gh-pages] out/ missing — run: npm run build:pages");
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bh-drywall-gh-pages-"));
const repo = path.join(tmp, "repo");

function run(cmd, opts = {}) {
  console.log("[deploy-gh-pages]", cmd);
  execSync(cmd, { stdio: "inherit", ...opts });
}

try {
  run(`git clone --depth 1 --branch gh-pages ${REMOTE} "${repo}"`, {
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  });
} catch {
  fs.mkdirSync(repo, { recursive: true });
  run("git init", { cwd: repo });
  run(`git remote add origin ${REMOTE}`, { cwd: repo });
  run("git checkout -b gh-pages", { cwd: repo });
}

for (const entry of fs.readdirSync(repo)) {
  if (entry === ".git") continue;
  fs.rmSync(path.join(repo, entry), { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    if (fs.statSync(from).isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

copyDir(OUT, repo);

const gitEnv = {
  ...process.env,
  GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME || "israelvaday",
  GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL || "israelvaday97@gmail.com",
  GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME || "israelvaday",
  GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL || "israelvaday97@gmail.com",
};

run("git add -A", { cwd: repo, env: gitEnv });
try {
  run('git diff --staged --quiet', { cwd: repo, env: gitEnv });
  console.log("[deploy-gh-pages] No changes to deploy.");
} catch {
  run('git commit -m "Deploy: update live site and sitemap"', { cwd: repo, env: gitEnv });
  run("git push origin gh-pages", { cwd: repo, env: gitEnv });
  console.log("[deploy-gh-pages] Live site updated on gh-pages.");
}

fs.rmSync(tmp, { recursive: true, force: true });
