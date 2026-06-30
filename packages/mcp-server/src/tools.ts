import type { Catalog } from "./catalog.js";
import type { SearchIndex } from "./search.js";
import { searchComponents } from "./search.js";
import {
  loadFoundation,
  assembleComponent,
  assembleComponents,
  assembleComposition,
} from "./assembler.js";

export interface ToolContext {
  specDir: string;
  catalog: Catalog;
  searchIndex: SearchIndex;
}

const readOnly = { readOnlyHint: true, openWorldHint: false } as const;

export const toolDefinitions = [
  {
    name: "list_components",
    description:
      "List pudge-ui components — 93 skeuomorphic UI specs across 11 categories (buttons, toggles, dials, sliders, readouts, meters, navigation, forms, overlays, indicators, data). Returns each component's id, name, category, and one-line description. Optionally filter by category id. Use this first to discover what exists, then call get_component for full specs.",
    annotations: { title: "List components", ...readOnly },
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          description:
            "Optional category id to filter by, e.g. 'buttons', 'toggles', 'dials', 'sliders', 'readouts', 'meters', 'navigation', 'forms', 'overlays', 'indicators', 'data'. Omit to list all 93 components.",
        },
      },
    },
  },
  {
    name: "search_components",
    description:
      "Fuzzy-search pudge-ui components by name, description, or tag (e.g. 'volume', 'knob', 'LCD', 'walkman'). Returns ranked matches with id, name, category, and description. Use this when you know what the user wants but not the exact component id; then call get_component with the best match.",
    annotations: { title: "Search components", ...readOnly },
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Free-text search query (matched against name, description, and tags)",
        },
        limit: { type: "number", description: "Max results, 1–50 (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_foundation",
    description:
      "Get the pudge-ui foundation: the design-system rules every component depends on. Core (default) returns 5 docs — philosophy, tokens, materials, depth-model, naming. Set extended=true for all 9 (adds theme, accessibility, layout, canvas). Load this once at the start of a build so the agent applies the depth model, material recipes, and warm-neutral palette correctly.",
    annotations: { title: "Get foundation spec", ...readOnly },
    inputSchema: {
      type: "object" as const,
      properties: {
        extended: {
          type: "boolean",
          description: "Include all 9 foundation docs (default: false → core 5 docs)",
        },
      },
    },
  },
  {
    name: "get_component",
    description:
      "Get the full spec for one pudge-ui component: its physical analog (the real 2000s hardware it imitates), mechanism, exact CSS recipe, and constraints — with the foundation prepended so the result is self-contained. This is the spec you hand to a coding agent to build the component in any stack (CSS, React Native, SwiftUI, Compose, Flutter). Accepts a component id or display name (e.g. 'push-button' or 'Push Button').",
    annotations: { title: "Get component spec", ...readOnly },
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Component id or name, e.g. 'push-button' or 'Push Button'",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get_components",
    description:
      "Get full specs for several pudge-ui components at once, with the shared foundation included a single time (deduplicated) to save context. Use when building a screen that needs multiple components — pass an array of component ids or names.",
    annotations: { title: "Get multiple component specs", ...readOnly },
    inputSchema: {
      type: "object" as const,
      properties: {
        names: {
          type: "array",
          items: { type: "string" },
          description: "Array of component ids or names, e.g. ['volume-slider', 'vu-meter', 'lcd']",
        },
      },
      required: ["names"],
    },
  },
  {
    name: "get_composition",
    description:
      "Get a pudge-ui composition — a pre-assembled multi-component layout (e.g. 'audio-mixer-strip') — with every referenced component spec inlined and the foundation included once. Use to build a complete, cohesive interface in one shot rather than wiring components together yourself.",
    annotations: { title: "Get composition spec", ...readOnly },
    inputSchema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Composition name, e.g. 'audio-mixer-strip'" },
      },
      required: ["name"],
    },
  },
];

function asString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`"${field}" must be a non-empty string`);
  }
  return value;
}

function asStringArray(value: unknown, field: string): string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    !value.every((v) => typeof v === "string" && v.trim() !== "")
  ) {
    throw new Error(`"${field}" must be a non-empty array of strings`);
  }
  return value;
}

function asLimit(value: unknown): number {
  if (value === undefined) return 10;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`"limit" must be a number`);
  }
  return Math.max(1, Math.min(50, Math.floor(value)));
}

export async function handleTool(
  toolName: string,
  args: Record<string, unknown>,
  ctx: ToolContext,
): Promise<string> {
  switch (toolName) {
    case "list_components": {
      const category =
        args.category === undefined ? undefined : asString(args.category, "category");
      const list = category
        ? ctx.catalog.components.filter((c) => c.category === category)
        : ctx.catalog.components;
      return JSON.stringify(
        list.map(({ id, name, category, description }) => ({ id, name, category, description })),
        null,
        2,
      );
    }

    case "search_components": {
      const results = searchComponents(
        ctx.searchIndex,
        asString(args.query, "query"),
        asLimit(args.limit),
      );
      return JSON.stringify(
        results.map(({ id, name, category, description }) => ({ id, name, category, description })),
        null,
        2,
      );
    }

    case "get_foundation":
      return loadFoundation(ctx.specDir, args.extended === true);

    case "get_component":
      return assembleComponent(ctx.specDir, ctx.catalog, asString(args.name, "name"));

    case "get_components":
      return assembleComponents(ctx.specDir, ctx.catalog, asStringArray(args.names, "names"));

    case "get_composition":
      return assembleComposition(ctx.specDir, ctx.catalog, asString(args.name, "name"));

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
