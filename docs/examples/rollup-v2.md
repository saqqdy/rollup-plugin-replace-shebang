# Rollup v2 Example

This example demonstrates usage with Rollup 2.x (minimum supported version).

## Features Tested

- Custom shebang with template variables (`${name}`, `${version}`)
- chmod option
- preserve option (commented in config)
- Plugin API

## Configuration

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

// Create plugin instance to access API
const plugin = replaceShebang({
  // Custom shebang with template variables
  shebang: '#!/usr/bin/env node # Built with ${name} v${version}',
  // Enable chmod for executable
  chmod: true,
  // Alternative: use preserve to keep original shebang
  // preserve: true,
})

// Plugin API - access shebang info
// plugin.api.getShebang('/path/to/file.js')
// plugin.api.getAllShebangs()

export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js',
    format: 'es'
  },
  plugins: [plugin]
}
```

## Source Code

::: details src/cli.js
```js
#!/usr/bin/env node

import { greet } from './utils.js'

const args = process.argv.slice(2)
const name = args[0] || 'World'

console.log(greet(name))
console.log('This CLI was built with rollup v2.x')
```
:::

::: details src/utils.js
```js
export function greet(name) {
  return `Hello, ${name}!`
}
```
:::

## Try It

```bash
cd examples/rollup-v2
pnpm install
pnpm run build           # Standard build
pnpm run build:api       # Build with Plugin API demo
./dist/cli.js greet World
```

## Plugin API Demo

Run `pnpm run build:api` to see the Plugin API in action:

```
=== Plugin API Demo ===
Shebang from src/cli.js: #!/usr/bin/env node
All shebangs:
  /path/to/examples/rollup-v2/src/cli.js: #!/usr/bin/env node

Build complete!
```

## Try Online

[Open in StackBlitz](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2)
