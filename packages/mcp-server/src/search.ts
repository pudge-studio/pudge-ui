import Fuse from "fuse.js";
import type { Component } from "./catalog.js";

export type SearchIndex = Fuse<Component>;

export function createSearchIndex(components: Component[]): SearchIndex {
  return new Fuse(components, {
    keys: [
      { name: "name", weight: 2 },
      { name: "description", weight: 1.5 },
      { name: "tagsJoined", weight: 1 },
      { name: "category", weight: 0.5 },
    ],
    threshold: 0.4,
    getFn: (obj, path) => {
      const key = Array.isArray(path) ? path[0] : path;
      if (key === "tagsJoined") return (obj as Component).tags.join(" ");
      return (obj as unknown as Record<string, unknown>)[key as string] as string;
    },
  });
}

export function searchComponents(index: SearchIndex, query: string, limit = 10): Component[] {
  return index.search(query, { limit }).map((r) => r.item);
}
