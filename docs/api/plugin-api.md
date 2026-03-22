# Plugin API

The plugin exposes an API for external access to shebang information.

## Accessing the API

```js
const plugin = replaceShebang()

// Use in your Rollup config
export default {
  plugins: [plugin]
}

// Access the API
plugin.api.getShebang('/path/to/file.js')
```

## Methods

### getShebang(id)

Get the shebang for a specific file.

- **Parameters**:
  - `id` (string): The file path/ID
- **Returns**: `string | undefined` - The shebang or undefined if not found

```js
const shebang = plugin.api.getShebang('/project/src/cli.js')
// Returns: '#!/usr/bin/env node'
```

### getAllShebangs()

Get all shebangs collected during the build.

- **Returns**: `Map<string, string>` - Map of file paths to shebangs

```js
const allShebangs = plugin.api.getAllShebangs()
// Returns: Map { '/path/to/cli.js' => '#!/usr/bin/env node' }

for (const [file, shebang] of allShebangs) {
  console.log(`${file}: ${shebang}`)
}
```

## Use Cases

### Build Scripts

Access shebang information in build scripts:

```js
import { rollup } from 'rollup'
import replaceShebang from 'rollup-plugin-replace-shebang'

const plugin = replaceShebang({ chmod: true })

const bundle = await rollup({
  input: 'src/cli.js',
  plugins: [plugin]
})

await bundle.write({ file: 'dist/cli.js', format: 'es' })

// Check which files had shebangs
const shebangs = plugin.api.getAllShebangs()
console.log('Processed shebangs:', shebangs.size)
```

### Integration with Other Tools

Share shebang information with other tools:

```js
const plugin = replaceShebang()

export default {
  plugins: [
    plugin,
    {
      name: 'post-build',
      writeBundle(options, bundle) {
        const shebangs = plugin.api.getAllShebangs()
        // Do something with shebang information
      }
    }
  ]
}
```

### Debugging

Debug shebang processing:

```js
const plugin = replaceShebang()

export default {
  plugins: [
    plugin,
    {
      name: 'debug-shebangs',
      buildEnd() {
        const shebangs = plugin.api.getAllShebangs()
        console.log('Files with shebangs:')
        for (const [file, shebang] of shebangs) {
          console.log(`  ${file}: ${shebang}`)
        }
      }
    }
  ]
}
```

## TypeScript Types

```typescript
interface PluginApi {
  getShebang(id: string): string | undefined
  getAllShebangs(): Map<string, string>
}
```
