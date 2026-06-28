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

## Development

```bash
npm install
npm run dev        # run with tsx
npm run build      # compile + copy spec
npm run typecheck  # type-check only
```
