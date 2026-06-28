import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.astro/**", "**/spec/**"],
  },
  {
    files: ["packages/mcp-server/src/**/*.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },
);
