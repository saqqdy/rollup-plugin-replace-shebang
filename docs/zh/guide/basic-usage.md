# 基础用法

## 默认行为

默认情况下，插件保留源文件中的原始 shebang：

**输入 (src/cli.js):**
```js
#!/usr/bin/env node

import { program } from 'commander'

program.parse()
```

**输出 (dist/cli.js):**
```js
#!/usr/bin/env node
// 打包后的代码...
```

## 自定义 Shebang

你可以指定自定义 shebang：

```js
replaceShebang({
  shebang: '#!/usr/bin/env node'
})
```

## 模板变量

在 shebang 中使用模板变量，会自动替换为包信息：

```js
replaceShebang({
  shebang: '#!/usr/bin/env node # ${name} v${version}'
})
```

可用变量：
- `${name}` - package.json 中的包名
- `${version}` - package.json 中的版本号

## 设置可执行权限

启用 `chmod` 选项自动设置可执行权限：

```js
replaceShebang({
  chmod: true
})
```

这会对输出文件执行 `chmod +x`。

## 保留原始 Shebang

使用 `preserve: true` 保持原始 shebang 不做修改：

```js
replaceShebang({
  preserve: true
})
```

当你想确保 shebang 被保留但不想自定义它时，这很有用。

## 处理反斜杠转义

如果你的代码包含 `\u005c` 转义序列，启用 `skipBackslash`：

```js
replaceShebang({
  skipBackslash: true
})
```
