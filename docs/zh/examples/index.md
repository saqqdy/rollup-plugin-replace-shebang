# 示例

本节包含演示如何在不同 Rollup 版本中使用 `rollup-plugin-replace-shebang` 的示例项目。

## 在线示例

通过 StackBlitz 在线体验：

| 示例 | 说明 | 链接 |
|------|------|------|
| Rollup v2 | Rollup 2.x 自定义 shebang 和模板变量 | [在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2) |
| Rollup v4 | Rollup 4.x 多文件项目 | [在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v4) |

## 本地示例

克隆仓库并在本地体验示例：

```bash
git clone https://github.com/saqqdy/rollup-plugin-replace-shebang.git
cd rollup-plugin-replace-shebang/examples/rollup-v4
pnpm install
pnpm run build
./dist/cli.js info
```

## 功能矩阵

| 功能 | rollup-v2 | rollup-v4 |
|------|-----------|-----------|
| 基础 shebang | ✓ | ✓ |
| 自定义 shebang | ✓ | - |
| 模板变量 | ✓ | - |
| chmod | ✓ | ✓ |
| include/exclude | ✓ | ✓ |
| warnOnMultiple | ✓ | ✓ |
| skipBackslash | - | ✓ (配置) |
| 多文件 | ✓ | ✓ |
