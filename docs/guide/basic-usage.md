# Basic Usage

## Default Behavior

By default, the plugin preserves the original shebang from your source file:

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

## Custom Shebang

You can specify a custom shebang:

```js
replaceShebang({
  shebang: '#!/usr/bin/env node'
})
```

## Template Variables

Use template variables in your shebang that are automatically replaced with package info:

```js
replaceShebang({
  shebang: '#!/usr/bin/env node # ${name} v${version}'
})
```

Available variables:
- `${name}` - Package name from package.json
- `${version}` - Package version from package.json

## Making Files Executable

Enable the `chmod` option to automatically set executable permissions:

```js
replaceShebang({
  chmod: true
})
```

This runs `chmod +x` on the output file(s).

## Preserving Original Shebang

Use `preserve: true` to keep the original shebang without modification:

```js
replaceShebang({
  preserve: true
})
```

This is useful when you want to ensure the shebang is preserved but don't want to customize it.

## Handling Backslash Escapes

If your code contains `\u005c` escape sequences, enable `skipBackslash`:

```js
replaceShebang({
  skipBackslash: true
})
```
