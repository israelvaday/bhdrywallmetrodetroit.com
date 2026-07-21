/**
 * Final BH Drywall copy fixes across app shell.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx|ts)$/.test(e.name)) files.push(p);
  }
}
walk(path.join(ROOT, "app"));
walk(path.join(ROOT, "components"));

const RE = [
  [/subject="OC [^"]+"/g, 'subject="Metro Detroit Drywall"'],
  [/714-757-7574/g, "(313) 236-4558"],
  [/Licensed · 8663/g, "Licensed & insured"],
  [/8663/g, ""],
  [/BSIS 8663/g, "Licensed contractor"],
  [/BSIS Licensed/g, "Licensed & Insured"],
  [/BSIS-verified/g, "Licensed"],
  [/OC-wide/g, "Metro Detroit"],
  [/OC drywall contractor/gi, "Metro Detroit drywall"],
  [/Licensed OC/g, "Licensed Metro Detroit"],
  [/every OC city/g, "Wayne, Oakland & Macomb counties"],
  [/all of OC/g, "Metro Detroit"],
  [/hero-drywall contractor/g, "hero-locksmith"],
];

let n = 0;
for (const f of files) {
  let t = fs.readFileSync(f, "utf8");
  const b = t;
  for (const [a, c] of RE) t = t.replace(a, c);
  if (t !== b) {
    fs.writeFileSync(f, t);
    n++;
  }
}
console.log("Patched", n, "files");
