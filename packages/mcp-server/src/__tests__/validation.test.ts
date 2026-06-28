import { describe, it, expect, beforeAll } from "vitest";
import { resolveSpecDir, assembleComposition } from "../assembler.js";
import { loadCatalog, type Catalog } from "../catalog.js";
import { createSearchIndex } from "../search.js";
import { handleTool, type ToolContext } from "../tools.js";

let ctx: ToolContext;

beforeAll(async () => {
  const specDir = resolveSpecDir();
  const catalog: Catalog = await loadCatalog(specDir);
  ctx = { specDir, catalog, searchIndex: createSearchIndex(catalog.components) };
});

describe("assembleComposition rejects path traversal", () => {
  it("throws on traversal / non-slug names before touching the filesystem", async () => {
    for (const bad of ["../../../etc/passwd", "../secret", "a/b", "foo..bar", "UPPER"]) {
      await expect(assembleComposition(ctx.specDir, ctx.catalog, bad)).rejects.toThrow(
        /Invalid composition name/,
      );
    }
  });

  it("accepts a valid composition slug", async () => {
    const out = await assembleComposition(ctx.specDir, ctx.catalog, "audio-mixer-strip");
    expect(out).toContain("COMPOSITION: audio-mixer-strip");
  });
});

describe("handleTool validates inputs", () => {
  it("rejects missing or malformed required args", async () => {
    await expect(handleTool("get_component", {}, ctx)).rejects.toThrow(/non-empty string/);
    await expect(handleTool("search_components", { query: "" }, ctx)).rejects.toThrow(
      /non-empty string/,
    );
    await expect(handleTool("get_components", { names: [] }, ctx)).rejects.toThrow(
      /non-empty array/,
    );
    await expect(handleTool("get_composition", { name: "../x" }, ctx)).rejects.toThrow(
      /Invalid composition name/,
    );
  });

  it("clamps an out-of-range search limit", async () => {
    const out = await handleTool("search_components", { query: "button", limit: 999 }, ctx);
    expect(JSON.parse(out).length).toBeLessThanOrEqual(50);
  });
});
