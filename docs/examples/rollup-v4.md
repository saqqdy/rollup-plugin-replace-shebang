# Rollup v4 Example

This example demonstrates usage with Rollup 4.x (latest version).

## Features Tested

- Default shebang preservation
- chmod option
- include/exclude patterns
- Multi-file projects

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
    replaceShebang({
      chmod: true
    })
  ]
}
```

## Source Code

::: details src/cli.js
```js
#!/usr/bin/env node

import { greet, getVersion, getPluginInfo } from './utils.js'
import { formatOutput } from './formatter.js'

const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case 'greet':
    console.log(greet(args[1]))
    break
  case 'version':
    console.log(getVersion())
    break
  case 'info':
    console.log(formatOutput(getPluginInfo()))
    break
  default:
    console.log(`
Usage: cli <command> [args]

Commands:
  greet <name>    Greet someone
  version         Show version
  info            Show plugin info
`)
}

console.log('\nThis CLI was built with rollup v4.x')
```
:::

::: details src/utils.js
```js
export function greet(name) {
  return `Hello, ${name || 'World'}!`
}

export function getVersion() {
  return '1.0.0'
}

export function getPluginInfo() {
  return {
    name: 'rollup-plugin-replace-shebang',
    version: '2.0.0',
    features: [
      'shebang replacement',
      'include/exclude patterns',
      'chmod support',
      'template variables',
      'plugin API'
    ]
  }
}
```
:::

::: details src/formatter.js
```js
export function formatOutput(data) {
  if (typeof data === 'object') {
    return JSON.stringify(data, null, 2)
  }
  return String(data)
}

export function formatError(message) {
  return `Error: ${message}`
}
```
:::

## Try It

```bash
cd examples/rollup-v4
pnpm install
pnpm run build
./dist/cli.js info
```

## Output

```
{
  "name": "rollup-plugin-replace-shebang",
  "version": "2.0.0",
  "features": [
    "shebang replacement",
    "include/exclude patterns",
    "chmod support",
    "template variables",
    "plugin API"
  ]
}

This CLI was built with rollup v4.x
```

## Try Online

[Open in StackBlitz](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v4)
