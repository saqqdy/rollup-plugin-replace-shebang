# rollup-plugin-replace-shebang

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

一个 Rollup 插件，用于保留 shebang 并将其添加到输出文件顶部。

[English](./README.md)

## 背景

使用 Rollup 构建 CLI 工具时，入口文件顶部的 shebang（如 `#!/usr/bin/env node`）会在打包过程中被移除。本插件可确保 shebang 正确保留到最终输出中。

## 安装

```bash
# npm
npm install -D rollup-plugin-replace-shebang

# pnpm
pnpm add -D rollup-plugin-replace-shebang
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
      shebang: '#!/usr/bin/env node', // 自定义 shebang（可选）
      skipBackslash: true // 保留反斜杠转义序列
    })
  ]
}
```

## 选项

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `shebang` | `string` | 原始 shebang | 自定义输出文件的 shebang |
| `skipBackslash` | `boolean` | `false` | 保留 `\u005c` 转义序列 |

## 原理

1. **Transform 阶段**：从源文件中提取并移除 shebang
2. **RenderChunk 阶段**：将 shebang 添加到输出文件头部

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
