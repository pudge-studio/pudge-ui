import { describe, it, expect, beforeAll } from "vitest";
import { loadCatalog, findComponent, type Catalog } from "../catalog.js";
import { resolveSpecDir } from "../assembler.js";

let catalog: Catalog;
let specDir: string;

beforeAll(async () => {
  specDir = resolveSpecDir();
  catalog = await loadCatalog(specDir);
});

describe("loadCatalog", () => {
  it("loads all 93 components", () => {
    expect(catalog.components.length).toBe(93);
  });

  it("loads all 11 categories", () => {
    expect(catalog.categories.length).toBe(11);
  });

  it("every component has required fields", () => {
    for (const comp of catalog.components) {
      expect(comp.id).toBeTruthy();
      expect(comp.name).toBeTruthy();
      expect(comp.class).toBeTruthy();
      expect(comp.category).toBeTruthy();
      expect(comp.file).toBeTruthy();
      expect(comp.description).toBeTruthy();
    }
  });

  it("every component belongs to a known category", () => {
    const categoryIds = new Set(catalog.categories.map((c) => c.id));
    for (const comp of catalog.components) {
      expect(categoryIds.has(comp.category)).toBe(true);
    }
  });
});

describe("findComponent", () => {
  it("finds a component by id", () => {
    const comp = findComponent(catalog, "push-button");
    expect(comp).toBeDefined();
    expect(comp!.name).toBe("Push Button");
    expect(comp!.class).toBe(".push-btn");
  });

  it("finds a component by name (case-insensitive)", () => {
    const comp = findComponent(catalog, "push button");
    expect(comp).toBeDefined();
    expect(comp!.id).toBe("push-button");
  });

  it("returns undefined for unknown component", () => {
    const comp = findComponent(catalog, "nonexistent-widget");
    expect(comp).toBeUndefined();
  });
});
