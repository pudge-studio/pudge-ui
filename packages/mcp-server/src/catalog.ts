import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";

export interface Category {
  id: string;
  label: string;
  prefix: string;
  count: number;
  description: string;
}

export interface Component {
  id: string;
  name: string;
  class: string;
  category: string;
  file: string;
  tags: string[];
  description: string;
}

export interface Catalog {
  categories: Category[];
  components: Component[];
}

export async function loadCatalog(specDir: string): Promise<Catalog> {
  const raw = await readFile(join(specDir, "components", "_index.yaml"), "utf8");
  return parse(raw) as Catalog;
}

export function findComponent(catalog: Catalog, id: string): Component | undefined {
  return catalog.components.find((c) => c.id === id || c.name.toLowerCase() === id.toLowerCase());
}
