# Examples

This directory contains example projects demonstrating how to use `rollup-plugin-replace-shebang` with different Rollup versions.

## Projects

### rollup-v2

Demonstrates usage with Rollup 2.x (minimum supported version).

Features tested:
- Custom shebang with template variables
- chmod option
- include patterns
- warnOnMultiple option

```bash
cd rollup-v2
pnpm install
pnpm run build
./dist/cli.js greet World
```

### rollup-v4

Demonstrates usage with Rollup 4.x (latest version).

Features tested:
- Default shebang preservation
- chmod option
- include/exclude patterns
- Multi-file projects

```bash
cd rollup-v4
pnpm install
pnpm run build
./dist/cli.js info
```

## Testing All Features

| Feature | rollup-v2 | rollup-v4 |
|---------|-----------|-----------|
| Basic shebang | ✓ | ✓ |
| Custom shebang | ✓ | - |
| Template variables | ✓ | - |
| chmod | ✓ | ✓ |
| include/exclude | ✓ | ✓ |
| warnOnMultiple | ✓ | ✓ |
| skipBackslash | - | ✓ (config) |
| Multi-file | ✓ | ✓ |
