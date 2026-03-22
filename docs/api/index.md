# API Reference

This section provides detailed documentation for all plugin options and APIs.

## Quick Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shebang` | `string` | Original shebang | Custom shebang to prepend |
| `skipBackslash` | `boolean` | `false` | Preserve `\u005c` escape sequences |
| `preserve` | `boolean` | `false` | Preserve original shebang |
| `chmod` | `boolean` | `false` | Auto set executable permission |
| `include` | `string \| string[]` | `['**/*.js', ...]` | Files to include |
| `exclude` | `string \| string[]` | `['node_modules/**']` | Files to exclude |
| `warnOnMultiple` | `boolean` | `true` | Warn on multiple shebangs |

## Sections

- [Options](/api/options) - Detailed options documentation
- [Plugin API](/api/plugin-api) - Exposed plugin API for external access
