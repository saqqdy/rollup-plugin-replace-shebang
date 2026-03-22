# Options

## shebang

- **Type**: `string`
- **Default**: Original shebang from source file

Custom shebang to prepend to the output bundle.

```js
replaceShebang({
  shebang: '#!/usr/bin/env node'
})
```

### Template Variables

The `shebang` option supports template variables that are automatically replaced:

```js
replaceShebang({
  shebang: '#!/usr/bin/env node # ${name} v${version}'
})
// Output: #!/usr/bin/env node # my-cli v1.0.0
```

| Variable | Description |
|----------|-------------|
| `${name}` | Package name from package.json |
| `${version}` | Package version from package.json |

---

## skipBackslash

- **Type**: `boolean`
- **Default**: `false`

Preserve `\u005c` escape sequences in the output.

```js
replaceShebang({
  skipBackslash: true
})
```

This is useful when your code contains backslash escape sequences that should be preserved.

---

## preserve

- **Type**: `boolean`
- **Default**: `false`

Preserve the original shebang without modification.

```js
replaceShebang({
  preserve: true
})
```

When enabled, the plugin will use the exact shebang from the source file, ignoring any custom `shebang` option.

---

## chmod

- **Type**: `boolean`
- **Default**: `false`

Automatically set executable permission (`chmod +x`) on output files.

```js
replaceShebang({
  chmod: true
})
```

This makes the output file directly executable on Unix-like systems.

---

## include

- **Type**: `string | string[]`
- **Default**: `['**/*.js', '**/*.ts', '**/*.mjs', '**/*.cjs', '**/*.jsx', '**/*.tsx']`

Files to include for shebang processing.

```js
replaceShebang({
  include: ['src/cli.ts', 'src/bin/*.ts']
})
```

Supports glob patterns via [micromatch](https://github.com/micromatch/micromatch).

---

## exclude

- **Type**: `string | string[]`
- **Default**: `['node_modules/**']`

Files to exclude from shebang processing.

```js
replaceShebang({
  exclude: ['node_modules/**', '**/*.test.ts']
})
```

Supports glob patterns via [micromatch](https://github.com/micromatch/micromatch).

---

## warnOnMultiple

- **Type**: `boolean`
- **Default**: `true`

Warn when multiple files have shebangs.

```js
replaceShebang({
  warnOnMultiple: false  // Disable warning
})
```

When building multiple entry points, the plugin will warn if more than one file contains a shebang, as typically only the main entry point should have one.
