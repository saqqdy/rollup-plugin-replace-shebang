# 进阶用法

## Include/Exclude 模式

使用 glob 模式控制哪些文件需要处理：

```js
replaceShebang({
  include: ['src/cli.ts', 'src/bin/*.ts'],
  exclude: ['node_modules/**', '**/*.test.ts']
})
```

### 支持的模式类型

| 模式 | 示例 | 匹配 |
|------|------|------|
| 精确匹配 | `src/cli.ts` | 仅 `src/cli.ts` |
| 扩展名匹配 | `**/*.ts` | 任意目录下的 `.ts` 文件 |
| 前缀匹配 | `src/**` | `src/` 下的所有文件 |
| 目录匹配 | `**/node_modules/**` | 任意位置的 `node_modules` 目录 |
| 通配符匹配 | `src/*.test.ts` | `src/foo.test.ts` 但不包括 `src/sub/foo.test.ts` |
| 纯字符串 | `node_modules` | 任何包含 `node_modules` 的路径 |

### 默认模式

::: details 默认 include 模式
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

::: details 默认 exclude 模式
```js
['node_modules/**']
```
:::

## 多入口点

当项目有多个包含 shebang 的入口点时：

```js
export default {
  input: ['src/cli.js', 'src/bin.js'],
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    replaceShebang({
      warnOnMultiple: true,  // 当多个文件包含 shebang 时警告
      chmod: true
    })
  ]
}
```

## 插件 API

插件暴露 API 供外部访问：

```js
const plugin = replaceShebang()

export default {
  // ... 配置
  plugins: [plugin]
}

// 构建后访问 shebang 信息
plugin.api.getShebang('/path/to/file.js')
plugin.api.getAllShebangs()  // 返回 Map<string, string>
```

这对以下场景有用：
- 需要知道哪些文件有 shebang 的构建脚本
- 与其他工具集成
- 调试构建问题

## 与其他插件集成

### CommonJS 插件

```js
import commonjs from '@rollup/plugin-commonjs'
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  plugins: [
    replaceShebang(),  // 必须放在第一位
    commonjs()
  ]
}
```

### TypeScript 插件

```js
import typescript from '@rollup/plugin-typescript'
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  plugins: [
    replaceShebang(),  // 必须放在第一位
    typescript()
  ]
}
```

### Node Resolve 插件

```js
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  plugins: [
    replaceShebang(),  // 必须放在第一位
    nodeResolve()
  ]
}
```

## 编程式使用

可以编程式地使用插件：

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
