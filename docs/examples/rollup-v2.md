# Rollup v2 Example

This example demonstrates usage with Rollup 2.x (minimum supported version).

## Features Tested

- Custom shebang with template variables
- chmod option
- include patterns
- warnOnMultiple option

## Configuration

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js',
    format: 'es'
  },
  plugins: [
    // Plugin must run first to remove shebang before parsing
    replaceShebang({
      // Custom shebang with template variables
      shebang: '#!/usr/bin/env node # Built with ${name} v${version}',
      // Enable chmod for executable
      chmod: true
    })
  ]
}
```

## Source Code

::: details src/cli.js
```js
#!/usr/bin/env node

import { greet, getVersion } from './utils.js'

const args = process.argv.slice(2)
const name = args[0] || 'World'

console.log(greet(name))
console.log(`Version: ${getVersion()}`)
console.log('\nThis CLI was built with rollup v2.x')
```
:::

::: details src/utils.js
```js
export function greet(name) {
  return `Hello, ${name}!`
}

export function getVersion() {
  return '1.0.0'
}
```
:::

## Try It

```bash
cd examples/rollup-v2
pnpm install
pnpm run build
./dist/cli.js greet World
```

## Output

```
Hello, World!
Version: 1.0.0

This CLI was built with rollup v2.x
```

## Try Online

[Open in StackBlitz](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2)
