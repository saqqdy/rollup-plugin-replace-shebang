# Examples

This directory contains example projects demonstrating how to use `rollup-plugin-replace-shebang` with different Rollup versions.

## Online Examples

Try the plugin online with StackBlitz:

| Example | Description | Link |
|---------|-------------|------|
| Rollup v2 | Rollup 2.x with custom shebang, template variables, and Plugin API | [Open in StackBlitz](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2) |
| Rollup v4 | Rollup 4.x with all features including skipBackslash | [Open in StackBlitz](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v4) |

## Local Examples

Clone the repository and try the examples locally:

```bash
git clone https://github.com/saqqdy/rollup-plugin-replace-shebang.git
cd rollup-plugin-replace-shebang/examples/rollup-v4
pnpm install
pnpm run build
./dist/cli.js info
```

## Feature Coverage

| Feature | rollup-v2 | rollup-v4 |
|---------|-----------|-----------|
| Basic shebang | ✓ | ✓ |
| Custom shebang | ✓ | - |
| Template variables (`${name}`, `${version}`) | ✓ | - |
| chmod | ✓ | ✓ |
| include | - | ✓ |
| exclude | - | ✓ |
| warnOnMultiple | - | ✓ |
| skipBackslash | - | ✓ |
| preserve | ✓ (commented) | - |
| Plugin API | ✓ | ✓ |

## Feature Details

### rollup-v2

- **Custom shebang with template variables**: Demonstrates `shebang` option with `${name}` and `${version}`
- **chmod**: Auto-set executable permission
- **preserve option**: Shown in comments - keeps original shebang when enabled
- **Plugin API**: Run `pnpm run build:api` to see API demo

```bash
cd rollup-v2
pnpm install
pnpm run build           # Standard build
pnpm run build:api       # Build with Plugin API demo
./dist/cli.js greet World
```

### rollup-v4

- **Default shebang preservation**: Uses original shebang from source
- **chmod**: Auto-set executable permission
- **include/exclude patterns**: Filter files with glob patterns
- **skipBackslash**: Preserves backslash escape sequences (Windows paths)
- **warnOnMultiple**: Warn when multiple files have shebangs
- **Plugin API**: Configuration shows how to access plugin instance

```bash
cd rollup-v4
pnpm install
pnpm run build
./dist/cli.js path       # Demo skipBackslash feature
./dist/cli.js info       # Show plugin info
```

## Pattern Matching

The plugin supports various glob patterns for `include` and `exclude`:

| Pattern | Example | Matches |
|---------|---------|---------|
| Exact match | `src/cli.ts` | Only `src/cli.ts` |
| Extension match | `**/*.ts` | Any `.ts` file |
| Prefix match | `src/**` | Any file under `src/` |
| Directory match | `**/node_modules/**` | Any file in `node_modules` |
| Wildcard match | `src/*.test.ts` | `src/foo.test.ts` only |
| Plain string | `node_modules` | Any path containing `node_modules` |

## Plugin API Usage

The plugin exposes an API for accessing shebang information:

```js
const plugin = replaceShebang({ /* options */ })

// After transform phase, access shebang info
plugin.api.getShebang('/path/to/file.js')  // Returns shebang string or undefined
plugin.api.getAllShebangs()                  // Returns Map<string, ModuleInfo>

// ModuleInfo structure:
// { shebang: '#!/usr/bin/env node', id: '/path/to/file.js' }
```

Use cases:
- Build scripts that need to know which files have shebangs
- Integration with other tools
- Debugging build issues
