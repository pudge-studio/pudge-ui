// Keeps every package.json version in sync with the root VERSION file.
//   node scripts/version.mjs check   -> fail if any package.json drifts from VERSION
//   node scripts/version.mjs write   -> rewrite package.json versions to match VERSION
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const version = readFileSync(join(root, "VERSION"), "utf8").trim();

if (!/^\d+\.\d+\.\d+(?:-[\w.]+)?$/.test(version)) {
  console.error(`VERSION is not valid semver: "${version}"`);
  process.exit(1);
}

const targets = ["package.json", "docs/package.json"];
const pkgsDir = join(root, "packages");
if (existsSync(pkgsDir)) {
  for (const entry of readdirSync(pkgsDir)) {
    const rel = join("packages", entry, "package.json");
    if (existsSync(join(root, rel))) targets.push(rel);
  }
}

const write = process.argv[2] === "write";
const drift = [];

for (const rel of targets) {
  const file = join(root, rel);
  const text = readFileSync(file, "utf8");
  const match = text.match(/"version":\s*"([^"]*)"/);
  if (!match) {
    console.error(`No "version" field in ${rel}`);
    process.exit(1);
  }
  if (match[1] === version) continue;
  if (write) {
    writeFileSync(file, text.replace(/("version":\s*)"[^"]*"/, `$1"${version}"`));
    console.log(`updated ${rel}: ${match[1]} -> ${version}`);
  } else {
    drift.push(`${rel} (${match[1]})`);
  }
}

if (!write && drift.length) {
  console.error(
    `Version drift from VERSION (${version}):\n  ${drift.join("\n  ")}\nRun "npm run version:sync".`,
  );
  process.exit(1);
}

console.log(
  write ? `Synced all packages to ${version}.` : `All packages match VERSION (${version}).`,
);
