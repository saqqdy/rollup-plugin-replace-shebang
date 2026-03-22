# Rollup v4 示例

本示例演示如何与 Rollup 4.x（最新版本）配合使用。

## 测试的功能

- 默认 shebang 保留
- chmod 选项
- include/exclude 模式
- skipBackslash 选项
- warnOnMultiple 选项
- Plugin API

## 配置

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

const plugin = replaceShebang({
  // 使用源文件中的默认 shebang
  chmod: true,
  // 跳过反斜杠处理（适用于 Windows 路径）
  skipBackslash: true,
  // 仅包含源文件
  include: ['src/**/*.js'],
  // 排除测试文件
  exclude: ['src/**/*.test.js'],
  // 多个文件包含 shebang 时警告
  warnOnMultiple: true
})

export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js',
    format: 'es'
  },
  plugins: [plugin]
}
```

## 源代码

::: details src/cli.js
```js
#!/usr/bin/env node

import { greet, getVersion, getPluginInfo, getWindowsPath } from './utils.js'
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
  case 'path':
    console.log('Windows path:', getWindowsPath())
    break
  default:
    console.log(`
Usage: cli <command> [args]

Commands:
  greet <name>    Greet someone
  version         Show version
  info            Show plugin info
  path            Show Windows path (skipBackslash demo)
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
      'skipBackslash',
      'template variables',
      'plugin API'
    ]
  }
}

// 演示 skipBackslash 功能：包含反斜杠的 Windows 路径
export function getWindowsPath() {
  return 'C:\\Users\\test\\file.txt'
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
```
:::

## 运行

```bash
cd examples/rollup-v4
pnpm install
pnpm run build
./dist/cli.js info
./dist/cli.js path    # 演示 skipBackslash
```

## 输出

```
{
  "name": "rollup-plugin-replace-shebang",
  "version": "2.0.0",
  "features": [
    "shebang replacement",
    "include/exclude patterns",
    "chmod support",
    "skipBackslash",
    "template variables",
    "plugin API"
  ]
}

This CLI was built with rollup v4.x
```

## 在线体验

[在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v4)
