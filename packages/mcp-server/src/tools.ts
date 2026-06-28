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

export const toolDefinitions = [
  {
    name: "list_components",
    description: "List all pudge-ui components, optionally filtered by category.",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          description: "Filter by category id (e.g. 'buttons', 'toggles')",
        },
      },
    },
  },
  {
    name: "search_components",
    description: "Fuzzy search pudge-ui components by name, description, or tags.",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "Search query" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_foundation",
    description:
      "Get pudge-ui foundation spec (philosophy, tokens, materials, depth, naming). Set extended=true for all 9 docs.",
    inputSchema: {
      type: "object" as const,
      properties: {
        extended: {
          type: "boolean",
          description: "Include all 9 foundation docs (default: core 5)",
        },
      },
    },
  },
  {
    name: "get_component",
    description: "Get full spec for a single pudge-ui component (foundation + component spec).",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Component id or name (e.g. 'push-button' or 'Push Button')",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get_components",
    description: "Get full specs for multiple pudge-ui components (foundation included once).",
    inputSchema: {
      type: "object" as const,
      properties: {
        names: {
          type: "array",
          items: { type: "string" },
          description: "Array of component ids or names",
        },
      },
      required: ["names"],
    },
  },
  {
    name: "get_composition",
    description: "Get a pudge-ui composition spec with all referenced component specs.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Composition name (e.g. 'audio-mixer-strip')" },
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
