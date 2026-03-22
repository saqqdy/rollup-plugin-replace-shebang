# Rollup v2 示例

本示例演示如何与 Rollup 2.x（最低支持版本）配合使用。

## 测试的功能

- 自定义 shebang 与模板变量
- chmod 选项
- include 模式
- warnOnMultiple 选项

## 配置

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js',
    format: 'es'
  },
  plugins: [
    // 插件必须放在第一位，在解析前移除 shebang
    replaceShebang({
      // 自定义 shebang 与模板变量
      shebang: '#!/usr/bin/env node # Built with ${name} v${version}',
      // 启用 chmod 设置可执行权限
      chmod: true
    })
  ]
}
```

## 源代码

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

## 运行

```bash
cd examples/rollup-v2
pnpm install
pnpm run build
./dist/cli.js greet World
```

## 输出

```
Hello, World!
Version: 1.0.0

This CLI was built with rollup v2.x
```

## 在线体验

[在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2)
