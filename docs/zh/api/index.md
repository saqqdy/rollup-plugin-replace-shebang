# API 参考

本节提供所有插件选项和 API 的详细文档。

## 快速参考

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `shebang` | `string` | 原始 shebang | 自定义 shebang |
| `skipBackslash` | `boolean` | `false` | 保留 `\u005c` 转义序列 |
| `preserve` | `boolean` | `false` | 保留原始 shebang |
| `chmod` | `boolean` | `false` | 自动设置可执行权限 |
| `include` | `string \| string[]` | `['**/*.js', ...]` | 包含的文件 |
| `exclude` | `string \| string[]` | `['node_modules/**']` | 排除的文件 |
| `warnOnMultiple` | `boolean` | `true` | 多个 shebang 时警告 |

## 章节

- [选项](/zh/api/options) - 详细选项文档
- [插件 API](/zh/api/plugin-api) - 暴露的插件 API 供外部访问
