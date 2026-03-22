# rollup-plugin-replace-shebang

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

A Rollup plugin that preserves and relocates shebang (`#!`) to the output bundle.

[简体中文](./README_CN.md) | [Documentation](https://saqqdy.github.io/rollup-plugin-replace-shebang/)

## Background

When building CLI tools with Rollup, the shebang (`#!/usr/bin/env node`) at the top of your entry file gets removed during bundling. This plugin ensures your shebang is preserved in the final output.

## Online Examples

Try the plugin online with StackBlitz:

| Example | Description | Link |
|---------|-------------|------|
| rollup-v2 | Rollup 2.x with template variables | [Open in StackBlitz](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2) |
| rollup-v4 | Rollup 4.x multi-file project | [Open in StackBlitz](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v4) |

## Installation

```bash
# pnpm
pnpm add -D rollup-plugin-replace-shebang

# npm
npm install -D rollup-plugin-replace-shebang
```

## Usage

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js',
    format: 'es'
  },
  plugins: [
    replaceShebang({
      shebang: '#!/usr/bin/env node',
      skipBackslash: true,
      chmod: true
    })
  ]
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shebang` | `string` | Original shebang | Custom shebang to prepend. Supports template variables: `${name}`, `${version}` |
| `skipBackslash` | `boolean` | `false` | Preserve `\u005c` escape sequences |
| `preserve` | `boolean` | `false` | Preserve original shebang without modification |
| `chmod` | `boolean` | `false` | Auto set executable permission (chmod +x) on output files |
| `include` | `string \| string[]` | `['**/*.js', '**/*.ts', ...]` | Files to include |
| `exclude` | `string \| string[]` | `['node_modules/**']` | Files to exclude |
| `warnOnMultiple` | `boolean` | `true` | Warn when multiple files have shebangs |

### Template Variables

The `shebang` option supports template variables:

```js
replaceShebang({
  shebang: '#!/usr/bin/env node # ${name} v${version}'
})
// Output: #!/usr/bin/env node # rollup-plugin-replace-shebang v2.0.0
```

### Include/Exclude Patterns

The plugin supports various glob patterns for filtering files:

| Pattern | Example | Matches |
|---------|---------|---------|
| Exact match | `src/cli.ts` | Only `src/cli.ts` |
| Extension match | `**/*.ts` | Any `.ts` file in any directory |
| Prefix match | `src/**` | Any file under `src/` |
| Directory match | `**/node_modules/**` | Any file in `node_modules` anywhere |
| Wildcard match | `src/*.test.ts` | `src/foo.test.ts` but not `src/sub/foo.test.ts` |
| Plain string | `node_modules` | Any path containing `node_modules` |

```js
replaceShebang({
  include: ['src/cli.ts', 'src/bin/*.ts'],
  exclude: ['node_modules/**', '**/*.test.ts']
})
```

## How it works

1. **Transform phase**: Extracts and removes shebang from source files
2. **RenderChunk phase**: Prepends shebang to the output bundle
3. **WriteBundle phase**: Optionally sets executable permissions

## Plugin API

The plugin exposes an API for external access:

```js
const plugin = replaceShebang()

// Get shebang for a specific file
plugin.api.getShebang('/path/to/file.js')

// Get all shebangs
plugin.api.getAllShebangs()
```

## Example

**Input (src/cli.js):**
```js
#!/usr/bin/env node
import { program } from 'commander'

program.parse()
```

**Output (dist/cli.js):**
```js
#!/usr/bin/env node
// bundled code...
```

## Requirements

- Rollup >= 2.0.0
- Node.js >= 12

## Feedback

Feel free to submit an [Issue](https://github.com/saqqdy/rollup-plugin-replace-shebang/issues) for bugs or suggestions.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/rollup-plugin-replace-shebang.svg?style=flat-square
[npm-url]: https://npmjs.org/package/rollup-plugin-replace-shebang
[download-image]: https://img.shields.io/npm/dm/rollup-plugin-replace-shebang.svg?style=flat-square
[download-url]: https://npmjs.org/package/rollup-plugin-replace-shebang
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: LICENSE
