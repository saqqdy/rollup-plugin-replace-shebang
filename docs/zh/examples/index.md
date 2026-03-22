# 示例

本节包含演示如何在不同 Rollup 版本中使用 `rollup-plugin-replace-shebang` 的示例项目。

## 在线示例

通过 StackBlitz 在线体验：

| 示例 | 说明 | 链接 |
|------|------|------|
| Rollup v2 | Rollup 2.x 自定义 shebang、模板变量和 Plugin API | [在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v2) |
| Rollup v4 | Rollup 4.x 所有功能包括 skipBackslash | [在 StackBlitz 中打开](https://stackblitz.com/github/saqqdy/rollup-plugin-replace-shebang/tree/master/examples/rollup-v4) |

## 本地示例

克隆仓库并在本地体验示例：

```bash
git clone https://github.com/saqqdy/rollup-plugin-replace-shebang.git
cd rollup-plugin-replace-shebang/examples/rollup-v4
pnpm install
pnpm run build
./dist/cli.js info
```

## 功能覆盖

| 功能 | rollup-v2 | rollup-v4 |
|------|-----------|-----------|
| 基础 shebang | ✓ | ✓ |
| 自定义 shebang | ✓ | - |
| 模板变量 (`${name}`, `${version}`) | ✓ | - |
| chmod | ✓ | ✓ |
| include | - | ✓ |
| exclude | - | ✓ |
| warnOnMultiple | - | ✓ |
| skipBackslash | - | ✓ |
| preserve | ✓ (注释演示) | - |
| Plugin API | ✓ | ✓ |

## 模式匹配

插件支持多种 glob 模式用于 `include` 和 `exclude`：

| 模式 | 示例 | 匹配 |
|------|------|------|
| 精确匹配 | `src/cli.ts` | 仅 `src/cli.ts` |
| 扩展名匹配 | `**/*.ts` | 任意 `.ts` 文件 |
| 前缀匹配 | `src/**` | `src/` 下所有文件 |
| 目录匹配 | `**/node_modules/**` | 任意位置的 `node_modules` |
| 通配符匹配 | `src/*.test.ts` | 仅 `src/foo.test.ts` |
| 纯字符串 | `node_modules` | 任何包含 `node_modules` 的路径 |

## 插件 API 用法

插件暴露 API 用于访问 shebang 信息：

```js
const plugin = replaceShebang({ /* 选项 */ })

// 在 transform 阶段后访问 shebang 信息
plugin.api.getShebang('/path/to/file.js')  // 返回 shebang 字符串或 undefined
plugin.api.getAllShebangs()                  // 返回 Map<string, ModuleInfo>
```
