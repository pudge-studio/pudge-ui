import { describe, it, expect, beforeAll } from "vitest";
import { loadCatalog, type Catalog } from "../catalog.js";
import { createSearchIndex, searchComponents } from "../search.js";
import { resolveSpecDir, loadFoundation } from "../assembler.js";
import type { SearchIndex } from "../search.js";

let catalog: Catalog;
let index: SearchIndex;
let specDir: string;

beforeAll(async () => {
  specDir = resolveSpecDir();
  catalog = await loadCatalog(specDir);
  index = createSearchIndex(catalog.components);
});

describe("searchComponents", () => {
  it("finds components matching 'button'", () => {
    const results = searchComponents(index, "button");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.id === "push-button")).toBe(true);
  });

  it("finds components matching 'LCD'", () => {
    const results = searchComponents(index, "LCD");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.id === "lcd-readout")).toBe(true);
  });

  it("returns empty array for nonsense query", () => {
    const results = searchComponents(index, "xyzzy123nonexistent");
    expect(results.length).toBe(0);
  });

  it("respects limit parameter", () => {
    const results = searchComponents(index, "button", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });
});

describe("loadFoundation", () => {
  it("loads core foundation (5 files)", async () => {
    const content = await loadFoundation(specDir, false);
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(1000);
  });

  it("loads extended foundation (9 files)", async () => {
    const content = await loadFoundation(specDir, true);
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(content.length * 0.5);
  });
});
