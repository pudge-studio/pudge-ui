# Security Policy

## Supported versions

pudge-ui is pre-1.0. Security fixes are applied to the latest published version
(`@pudge-ui/mcp-server` on npm and the `main` branch). Older versions are not patched.

## Reporting a vulnerability

Please report security issues **privately** — do not open a public issue or PR.

- Preferred: GitHub Security Advisories — go to the **Security** tab of
  [pudgestudio/pudge-ui](https://github.com/pudgestudio/pudge-ui/security/advisories/new)
  and choose "Report a vulnerability".
- Alternatively: email **security@pudgestudio.com**.

Please include:

- a description of the issue and its impact,
- steps to reproduce (or a proof of concept),
- affected component/version (e.g. `@pudge-ui/mcp-server@0.1.0`).

We aim to acknowledge reports within **72 hours** and to ship a fix or mitigation as
quickly as the severity warrants. We'll credit reporters who wish to be named.

## Scope notes

The `@pudge-ui/mcp-server` package is a **local stdio** tool that reads bundled spec
files. Tool inputs are validated (composition/component names are restricted to
catalog slugs) to prevent path traversal. If you find a way to read or write files
outside the bundled `spec/` directory, or to otherwise escape the intended sandbox,
that is in scope — please report it.
