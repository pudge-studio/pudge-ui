import { marked } from "marked";

/** Render spec markdown to HTML, wrapping tables so they scroll on narrow screens. */
export async function renderSpec(raw: string): Promise<string> {
  const html = await marked.parse(raw);
  return html
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");
}
