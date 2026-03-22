# 选项

## shebang

- **类型**: `string`
- **默认值**: 源文件中的原始 shebang

自定义添加到输出文件顶部的 shebang。

```js
replaceShebang({
  shebang: '#!/usr/bin/env node'
})
```

### 模板变量

`shebang` 选项支持自动替换的模板变量：

```js
replaceShebang({
  shebang: '#!/usr/bin/env node # ${name} v${version}'
})
// 输出: #!/usr/bin/env node # my-cli v1.0.0
```

| 变量 | 说明 |
|------|------|
| `${name}` | package.json 中的包名 |
| `${version}` | package.json 中的版本号 |

---

## skipBackslash

- **类型**: `boolean`
- **默认值**: `false`

保留输出中的 `\u005c` 转义序列。

```js
replaceShebang({
  skipBackslash: true
})
```

当你的代码包含需要保留的反斜杠转义序列时很有用。

---

## preserve

- **类型**: `boolean`
- **默认值**: `false`

保留原始 shebang 不做修改。

```js
replaceShebang({
  preserve: true
})
```

启用后，插件将使用源文件中的原始 shebang，忽略任何自定义 `shebang` 选项。

---

## chmod

- **类型**: `boolean`
- **默认值**: `false`

自动设置输出文件的可执行权限（`chmod +x`）。

```js
replaceShebang({
  chmod: true
})
```

使输出文件在类 Unix 系统上可以直接执行。

---

## include

- **类型**: `string | string[]`
- **默认值**: `['**/*.js', '**/*.ts', '**/*.mjs', '**/*.cjs', '**/*.jsx', '**/*.tsx']`

需要处理 shebang 的文件。

```js
replaceShebang({
  include: ['src/cli.ts', 'src/bin/*.ts']
})
```

通过 [micromatch](https://github.com/micromatch/micromatch) 支持 glob 模式。

---

## exclude

- **类型**: `string | string[]`
- **默认值**: `['node_modules/**']`

不需要处理 shebang 的文件。

```js
replaceShebang({
  exclude: ['node_modules/**', '**/*.test.ts']
})
```

通过 [micromatch](https://github.com/micromatch/micromatch) 支持 glob 模式。

---

## warnOnMultiple

- **类型**: `boolean`
- **默认值**: `true`

当多个文件包含 shebang 时发出警告。

```js
replaceShebang({
  warnOnMultiple: false  // 禁用警告
})
```

构建多个入口点时，如果有多个文件包含 shebang，插件会发出警告，因为通常只有主入口点应该有 shebang。
