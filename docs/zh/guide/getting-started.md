# 快速上手

## 安装

将插件作为开发依赖安装：

```bash
# pnpm
pnpm add -D rollup-plugin-replace-shebang

# npm
npm install -D rollup-plugin-replace-shebang
```

## 基础配置

将插件添加到你的 Rollup 配置中：

```js
import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
  input: 'src/cli.js',
  output: {
    file: 'dist/cli.js',
    format: 'es'
  },
  plugins: [
    replaceShebang()
  ]
}
```

::: tip 插件顺序
插件应该放在插件数组的**第一位**，尤其是在使用 Rollup 2.x 时。这确保 shebang 在解析之前被移除，防止语法错误。
:::

## 工作原理

使用 Rollup 构建 CLI 工具时，入口文件顶部的 shebang（`#!/usr/bin/env node`）可能会引起问题：

1. **Rollup 2.x**：无法解析 shebang，导致语法错误
2. **Rollup 3.x/4.x**：可以解析 shebang，但在打包过程中会丢失

本插件解决了这两个问题：

1. **Transform 阶段**：从源文件中提取并移除 shebang
2. **RenderChunk 阶段**：将 shebang 添加到输出文件头部
3. **WriteBundle 阶段**：可选设置可执行权限（chmod +x）

## 系统要求

- Rollup >= 2.0.0
- Node.js >= 18

## 下一步

- [基础用法](/zh/guide/basic-usage) - 学习基础使用模式
- [进阶用法](/zh/guide/advanced-usage) - 探索高级功能
- [API 参考](/zh/api/) - 完整 API 文档
