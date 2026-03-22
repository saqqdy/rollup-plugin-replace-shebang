# Getting Started

## Installation

Install the plugin as a development dependency:

```bash
# pnpm
pnpm add -D rollup-plugin-replace-shebang

# npm
npm install -D rollup-plugin-replace-shebang
```

## Basic Setup

Add the plugin to your Rollup configuration:

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js',
    format: 'es'
  },
  plugins: [
    replaceShebang()
  ]
}
```

::: tip Plugin Order
The plugin should be placed **first** in your plugins array, especially when using Rollup 2.x. This ensures the shebang is removed before parsing, preventing syntax errors.
:::

## How It Works

When building CLI tools with Rollup, the shebang (`#!/usr/bin/env node`) at the top of your entry file can cause issues:

1. **Rollup 2.x**: Cannot parse shebang, causing a syntax error
2. **Rollup 3.x/4.x**: Parses shebang but it gets lost during bundling

This plugin solves both problems:

1. **Transform phase**: Extracts and removes shebang from source files
2. **RenderChunk phase**: Prepends shebang to the output bundle
3. **WriteBundle phase**: Optionally sets executable permissions (chmod +x)

## Requirements

- Rollup >= 2.0.0
- Node.js >= 18

## Next Steps

- [Basic Usage](/guide/basic-usage) - Learn the basic usage patterns
- [Advanced Usage](/guide/advanced-usage) - Explore advanced features
- [API Reference](/api/) - Full API documentation
