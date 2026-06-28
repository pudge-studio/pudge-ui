## What & why

<!-- Brief description. Link the issue this closes, e.g. "Closes #123". -->

## Type of change

- [ ] New component spec
- [ ] Spec fix / tightening (an agent misinterpreted a spec)
- [ ] Docs site
- [ ] MCP server
- [ ] Tooling / CI

## Checklist

- [ ] Spec changes follow the format in [spec/guides/extension.md](../spec/guides/extension.md) (YAML frontmatter, real physical analog, mechanical principle, exact CSS recipe, constraints)
- [ ] `npm run version:check` passes (package versions match the `VERSION` file)
- [ ] MCP server: `npm test -w @pudge-ui/mcp-server` passes (if the package changed)
- [ ] Docs build succeeds: `npm run build:docs` (if the docs changed)
- [ ] No unrelated reformatting or changes
