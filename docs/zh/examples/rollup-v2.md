# Rollup v2 示例

本示例演示如何与 Rollup 2.x（最低支持版本）配合使用。

## 测试的功能

- 自定义 shebang 与模板变量（`${name}`、`${version}`）
- chmod 选项
- preserve 选项（配置中注释演示）
- Plugin API

## 配置

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

// 创建插件实例以访问 API
const plugin = replaceShebang({
  // 自定义 shebang 与模板变量
  shebang: '#!/usr/bin/env node # Built with ${name} v${version}',
  // 启用 chmod 设置可执行权限
  chmod: true,
  // 替代方案：使用 preserve 保留原始 shebang
  // preserve: true,
})

// Plugin API - 访问 shebang 信息
// plugin.api.getShebang('/path/to/file.js')
// plugin.api.getAllShebangs()

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

import { greet } from './utils.js'

const args = process.argv.slice(2)
const name = args[0] || 'World'

console.log(greet(name))
console.log('This CLI was built with rollup v2.x')
```
:::

::: details src/utils.js
```js
export function greet(name) {
  return `Hello, ${name}!`
}
```
:::

## 运行

```bash
cd examples/rollup-v2
pnpm install
pnpm run build           # 标准构建
pnpm run build:api       # 带 Plugin API 演示的构建
./dist/cli.js greet World
```

## Plugin API 演示

运行 `pnpm run build:api` 查看 Plugin API 实际效果：

```
=== Plugin API Demo ===
Shebang from src/cli.js: #!/usr/bin/env node
All shebangs:
  /path/to/examples/rollup-v2/src/cli.js: #!/usr/bin/env node

Build complete!
```

## 在线体验

[在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2)
