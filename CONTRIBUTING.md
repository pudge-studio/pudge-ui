# Contributing to pudge-ui

Thank you for your interest in contributing to pudge-ui.

## What you can contribute

### New component specs

The most valuable contribution is a new component spec following the [extension guide](spec/guides/extension.md). Every component must:

- Have a real 2000s-era physical analog
- Include the mechanical working principle
- Provide exact CSS recipes (not prose descriptions)
- List constraints with physical reasoning
- Follow the spec file template format

### Improvements to existing specs

If an LLM consistently misinterprets a spec, the spec needs tightening. File an issue describing what went wrong and propose a fix to the constraints or CSS recipe.

### Documentation

Improvements to guides, prompt templates, and the docs site are welcome.

## How to contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Spec file format

All component spec files use YAML frontmatter and follow the template in [spec/guides/extension.md](spec/guides/extension.md). Please maintain the consistent structure — it's critical for LLM parsing.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
