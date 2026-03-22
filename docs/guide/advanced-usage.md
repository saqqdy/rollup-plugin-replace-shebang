# Advanced Usage

## Include/Exclude Patterns

Control which files are processed using glob patterns:

```js
replaceShebang({
  include: ['src/cli.ts', 'src/bin/*.ts'],
  exclude: ['node_modules/**', '**/*.test.ts']
})
```

### Default Patterns

::: details Default include patterns
```js
[
  '**/*.js',
  '**/*.ts',
  '**/*.mjs',
  '**/*.cjs',
  '**/*.jsx',
  '**/*.tsx'
]
```
:::

::: details Default exclude patterns
```js
['node_modules/**']
```
:::

## Multiple Entry Points

When your project has multiple entry points with shebangs:

```js
export default {
  input: ['src/cli.js', 'src/bin.js'],
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    replaceShebang({
      warnOnMultiple: true,  // Warn when multiple files have shebangs
      chmod: true
    })
  ]
}
```

## Plugin API

The plugin exposes an API for external access:

```js
const plugin = replaceShebang()

export default {
  // ... config
  plugins: [plugin]
}

// After build, access shebang information
plugin.api.getShebang('/path/to/file.js')
plugin.api.getAllShebangs()  // Returns Map<string, string>
```

This is useful for:
- Build scripts that need to know which files have shebangs
- Integration with other tools
- Debugging build issues

## Integration with Other Plugins

### CommonJS Plugin

```js
import commonjs from '@rollup/plugin-commonjs'
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  plugins: [
    replaceShebang(),  // Must come first
    commonjs()
  ]
}
```

### TypeScript Plugin

```js
import typescript from '@rollup/plugin-typescript'
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  plugins: [
    replaceShebang(),  // Must come first
    typescript()
  ]
}
```

### Node Resolve Plugin

```js
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  plugins: [
    replaceShebang(),  // Must come first
    nodeResolve()
  ]
}
```

## Programmatic Usage

You can use the plugin programmatically:

```js
import { rollup } from 'rollup'
import replaceShebang from 'rollup-plugin-replace-shebang'

const bundle = await rollup({
  input: 'src/cli.js',
  plugins: [
    replaceShebang({ chmod: true })
  ]
})

await bundle.write({
  file: 'dist/cli.js',
  format: 'es'
})
```
