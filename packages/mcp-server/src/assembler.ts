import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { parse } from "yaml";
import type { Catalog, Component } from "./catalog.js";
import { findComponent } from "./catalog.js";

const CORE_FOUNDATIONS = ["philosophy", "tokens", "materials", "depth-model", "naming"];
const ALL_FOUNDATIONS = [...CORE_FOUNDATIONS, "theme", "accessibility", "layout", "canvas"];

export function resolveSpecDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  // Monorepo: src/ or dist/ -> package root -> ../../spec
  const monorepo = join(here, "..", "..", "..", "spec");
  if (existsSync(monorepo)) return monorepo;
  // npm package: dist/ -> package root -> ./spec
  const bundled = join(here, "..", "spec");
  if (existsSync(bundled)) return bundled;
  throw new Error("Could not find spec directory");
}

export async function loadFoundation(specDir: string, extended = false): Promise<string> {
  const files = extended ? ALL_FOUNDATIONS : CORE_FOUNDATIONS;
  const contents = await Promise.all(
    files.map((f) => readFile(join(specDir, "foundation", `${f}.md`), "utf8")),
  );
  return contents.join("\n\n");
}

export async function assembleComponent(
  specDir: string,
  catalog: Catalog,
  name: string,
): Promise<string> {
  const comp = findComponent(catalog, name);
  if (!comp) throw new Error(`Component not found: ${name}`);

  const [foundation, spec] = await Promise.all([
    loadFoundation(specDir),
    readFile(join(specDir, "components", comp.file), "utf8"),
  ]);

  return [
    `<!-- ═══ PUDGE-UI FOUNDATION ═══ -->`,
    foundation,
    "",
    `<!-- ═══ COMPONENT: ${comp.name} ═══ -->`,
    spec,
  ].join("\n");
}

export async function assembleComponents(
  specDir: string,
  catalog: Catalog,
  names: string[],
): Promise<string> {
  const comps: Component[] = names.map((n) => {
    const c = findComponent(catalog, n);
    if (!c) throw new Error(`Component not found: ${n}`);
    return c;
  });

  const [foundation, ...specs] = await Promise.all([
    loadFoundation(specDir),
    ...comps.map((c) => readFile(join(specDir, "components", c.file), "utf8")),
  ]);

  const parts = [`<!-- ═══ PUDGE-UI FOUNDATION ═══ -->`, foundation, ""];
  comps.forEach((c, i) => {
    parts.push(`<!-- ═══ COMPONENT: ${c.name} ═══ -->`);
    parts.push(specs[i]);
    parts.push("");
  });

  return parts.join("\n");
}

export async function assembleComposition(
  specDir: string,
  catalog: Catalog,
  name: string,
): Promise<string> {
  if (!/^[a-z0-9-]+$/.test(name)) {
    throw new Error(`Invalid composition name: ${name}`);
  }

  const compPath = join(specDir, "compositions", `${name}.md`);
  const raw = await readFile(compPath, "utf8");

  // Parse frontmatter for component IDs
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  const fm = fmMatch ? (parse(fmMatch[1]) as { components?: string[] }) : {};
  const componentIds = fm.components ?? [];

  const comps: Component[] = componentIds.map((id) => {
    const c = findComponent(catalog, id);
    if (!c) throw new Error(`Component not found: ${id}`);
    return c;
  });

  const [foundation, ...specs] = await Promise.all([
    loadFoundation(specDir),
    ...comps.map((c) => readFile(join(specDir, "components", c.file), "utf8")),
  ]);

  const parts = [
    `<!-- ═══ PUDGE-UI FOUNDATION ═══ -->`,
    foundation,
    "",
    `<!-- ═══ COMPOSITION: ${name} ═══ -->`,
    raw,
    "",
  ];

  comps.forEach((c, i) => {
    parts.push(`<!-- ═══ COMPONENT: ${c.name} ═══ -->`);
    parts.push(specs[i]);
    parts.push("");
  });

  return parts.join("\n");
}
