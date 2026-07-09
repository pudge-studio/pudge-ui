export interface ChangelogSection {
  added?: string[];
  changed?: string[];
  fixed?: string[];
  removed?: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  label?: string;
  sections: ChangelogSection;
}

export const BANNER_VERSION = "0.2.1";

export const changelog: ChangelogEntry[] = [
  {
    version: "0.2.1",
    date: "2025-07",
    label: "Latest",
    sections: {
      added: [
        "5 new hardware compositions: Walkman Deck (Sony WM-D6C), Game Boy (Nintendo DMG-01), DJ Controller Deck (Pioneer DDJ), Synthesizer Panel (Roland SH-101 / Moog Minimoog)",
        "Changelog page at /changelog with full version history",
        "Animated NEW badge on recently added specs and compositions",
        "LCD-style version update banner with per-version dismiss",
      ],
    },
  },
  {
    version: "0.2.0",
    date: "2025-06",
    sections: {
      added: [
        "Initial public release — 93 component specs across 11 categories",
        "MCP server (@pudge-ui/mcp-server) for direct LLM agent access",
        "11 spec categories: Buttons, Toggles, Dials, Sliders, Readouts, Meters, Navigation, Forms, Overlays, Indicators, Data",
        "Foundation specs: design tokens, materials, depth model, accessibility, naming, layout, theme, canvas",
        "3 starter compositions: Audio Mixer Strip, Camera Viewfinder HUD, DJ Controller Deck",
        "For LLMs page with MCP integration guide and stack selector",
        "Component gallery with search, category filter, grid/list toggle",
        "Interactive component playground with variant controls and code export",
      ],
    },
  },
];
