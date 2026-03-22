---
layout: home

hero:
  name: rollup-plugin-replace-shebang
  text: 在打包文件中保留 Shebang
  tagline: 一个 Rollup 插件，用于保留 shebang 并将其添加到输出文件顶部
  image:
    src: /logo.svg
    alt: rollup-plugin-replace-shebang
  actions:
    - theme: brand
      text: 快速上手
      link: /zh/guide/getting-started
    - theme: alt
      text: GitHub 仓库
      link: https://github.com/saqqdy/rollup-plugin-replace-shebang

features:
  - icon: 🔧
    title: 简单集成
    details: 与 Rollup 2.x、3.x 和 4.x 无缝配合，零配置即可使用
  - icon: 📦
    title: CLI 就绪
    details: 自动为 Rollup 构建的 CLI 工具保留 shebang
  - icon: 🎯
    title: 灵活配置
    details: 支持自定义 shebang、模板变量、include/exclude 模式和 chmod
  - icon: 🔌
    title: 插件 API
    details: 暴露 API 供外部访问 shebang 信息
  - icon: ⚡
    title: TypeScript 优先
    details: 完整的 TypeScript 支持和类型定义
  - icon: 🛡️
    title: 验证功能
    details: 内置 shebang 验证和多文件 shebang 检测
---

## 快速开始

### 安装

```bash
# pnpm
pnpm add -D rollup-plugin-replace-shebang

# npm
npm install -D rollup-plugin-replace-shebang
```

### 使用

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
      chmod: true  // 设置输出文件可执行权限
    })
  ]
}
```

## 为什么选择 rollup-plugin-replace-shebang？

- **自动保留**：无需手动添加 shebang 到输出文件
- **全版本兼容**：支持 Rollup 2.x、3.x 和 4.x
- **模板变量**：在自定义 shebang 中使用 `${name}` 和 `${version}`
- **文件模式支持**：使用 glob 模式包含/排除特定文件
- **可执行权限**：可选设置 chmod +x 到输出文件
