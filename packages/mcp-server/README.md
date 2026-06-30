# @pudge-ui/mcp-server

MCP server for the pudge-ui design system. Lets coding agents query component specs programmatically.

## Installation

Add to your MCP client config (e.g. Claude Desktop, Claude Code):

```json
{
  "mcpServers": {
    "pudge-ui": {
      "command": "npx",
      "args": ["-y", "@pudge-ui/mcp-server"]
    }
  }
}
```

For local development:

```json
{
  "mcpServers": {
    "pudge-ui": {
      "command": "npx",
      "args": ["tsx", "src/index.ts"],
      "cwd": "/path/to/pudge-ui/packages/mcp-server"
    }
  }
}
```

## Available Tools

| Tool                | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `list_components`   | List all components, optionally filtered by category         |
| `search_components` | Fuzzy search components by name, description, or tags        |
| `get_foundation`    | Get foundation spec docs (core 5 or extended 9)              |
| `get_component`     | Get full spec for a single component (foundation + spec)     |
| `get_components`    | Get specs for multiple components (foundation included once) |
| `get_composition`   | Get a composition spec with all referenced component specs   |

## Examples

```
list_components({ category: "buttons" })
search_components({ query: "volume slider audio" })
get_component({ name: "push-button" })
get_components({ names: ["rotary-encoder", "vu-meter", "vertical-fader"] })
get_composition({ name: "audio-mixer-strip" })
get_foundation({ extended: true })
```

All tools are read-only (annotated with `readOnlyHint`) — the server never writes to your filesystem or makes network calls. Specs are bundled in the package.

## Development

```bash
npm install
npm run dev        # run with tsx
npm run build      # compile + copy spec
npm run typecheck  # type-check only
npm test           # run the test suite
```

## Versioning & stability

This server tracks pudge-ui's versioning and is pre-1.0. The component catalog grows
between releases, but tool **names and input shapes are stable** — any change to a tool
signature will come with a minor/major version bump and a CHANGELOG entry. Pin a version
if you need byte-for-byte reproducibility.
