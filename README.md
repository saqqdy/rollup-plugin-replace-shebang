# rollup-plugin-replace-shebang

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

A Rollup plugin that preserves and relocates shebang (`#!`) to the output bundle.

[简体中文](./README_CN.md)

## Background

When building CLI tools with Rollup, the shebang (`#!/usr/bin/env node`) at the top of your entry file gets removed during bundling. This plugin ensures your shebang is preserved in the final output.

## Installation

```bash
# npm
npm install -D rollup-plugin-replace-shebang

# pnpm
pnpm add -D rollup-plugin-replace-shebang
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
      shebang: '#!/usr/bin/env node', // Custom shebang (optional)
      skipBackslash: true // Preserve backslash escape sequences
    })
  ]
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shebang` | `string` | Original shebang | Custom shebang to prepend to output |
| `skipBackslash` | `boolean` | `false` | Preserve `\u005c` escape sequences |

## How it works

1. **Transform phase**: Extracts and removes shebang from source files
2. **RenderChunk phase**: Prepends shebang to the output bundle

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
- Node.js >= 18

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
