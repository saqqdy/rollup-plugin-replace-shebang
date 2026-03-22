# rollup-plugin-replace-shebang

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

一个 Rollup 插件，用于保留 shebang 并将其添加到输出文件顶部。

[English](./README.md) | [文档](https://saqqdy.github.io/rollup-plugin-replace-shebang/zh/)

## 背景

使用 Rollup 构建 CLI 工具时，入口文件顶部的 shebang（如 `#!/usr/bin/env node`）会在打包过程中被移除。本插件可确保 shebang 正确保留到最终输出中。

## 在线示例

通过 StackBlitz 在线体验：

| 示例 | 说明 | 链接 |
|------|------|------|
| rollup-v2 | Rollup 2.x 模板变量示例 | [在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2) |
| rollup-v4 | Rollup 4.x 多文件项目 | [在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v4) |

## 安装

```bash
# pnpm
pnpm add -D rollup-plugin-replace-shebang

# npm
npm install -D rollup-plugin-replace-shebang
```

## 用法

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js',
    format: 'es'
  },
  plugins: [
    replaceShebang({
      shebang: '#!/usr/bin/env node',
      skipBackslash: true,
      chmod: true
    })
  ]
}
```

## 选项

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `shebang` | `string` | 原始 shebang | 自定义 shebang。支持模板变量：`${name}`, `${version}` |
| `skipBackslash` | `boolean` | `false` | 保留 `\u005c` 转义序列 |
| `preserve` | `boolean` | `false` | 保留原始 shebang 不做修改 |
| `chmod` | `boolean` | `false` | 自动设置可执行权限（chmod +x） |
| `include` | `string \| string[]` | `['**/*.js', '**/*.ts', ...]` | 包含的文件 |
| `exclude` | `string \| string[]` | `['node_modules/**']` | 排除的文件 |
| `warnOnMultiple` | `boolean` | `true` | 多个文件包含 shebang 时警告 |

### 模板变量

`shebang` 选项支持模板变量：

```js
replaceShebang({
  shebang: '#!/usr/bin/env node # ${name} v${version}'
})
// 输出: #!/usr/bin/env node # rollup-plugin-replace-shebang v2.0.0
```

### Include/Exclude 模式

插件支持多种 glob 模式进行文件过滤：

| 模式 | 示例 | 匹配 |
|------|------|------|
| 精确匹配 | `src/cli.ts` | 仅 `src/cli.ts` |
| 扩展名匹配 | `**/*.ts` | 任意目录下的 `.ts` 文件 |
| 前缀匹配 | `src/**` | `src/` 下的所有文件 |
| 目录匹配 | `**/node_modules/**` | 任意位置的 `node_modules` 目录 |
| 通配符匹配 | `src/*.test.ts` | `src/foo.test.ts` 但不包括 `src/sub/foo.test.ts` |
| 纯字符串 | `node_modules` | 任何包含 `node_modules` 的路径 |

```js
replaceShebang({
  include: ['src/cli.ts', 'src/bin/*.ts'],
  exclude: ['node_modules/**', '**/*.test.ts']
})
```

## 原理

1. **Transform 阶段**：从源文件中提取并移除 shebang
2. **RenderChunk 阶段**：将 shebang 添加到输出文件头部
3. **WriteBundle 阶段**：可选设置可执行权限

## 插件 API

插件对外暴露 API 供外部访问：

```js
const plugin = replaceShebang()

// 获取指定文件的 shebang
plugin.api.getShebang('/path/to/file.js')

// 获取所有 shebang
plugin.api.getAllShebangs()
```

## 示例

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

## 要求

- Rollup >= 2.0.0
- Node.js >= 18

## 反馈

如有问题或建议，欢迎提交 [Issue](https://github.com/saqqdy/rollup-plugin-replace-shebang/issues)。

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/rollup-plugin-replace-shebang.svg?style=flat-square
[npm-url]: https://npmjs.org/package/rollup-plugin-replace-shebang
[download-image]: https://img.shields.io/npm/dm/rollup-plugin-replace-shebang.svg?style=flat-square
[download-url]: https://npmjs.org/package/rollup-plugin-replace-shebang
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: LICENSE
