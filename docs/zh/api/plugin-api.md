# 插件 API

插件暴露 API 供外部访问 shebang 信息。

## 访问 API

```js
const plugin = replaceShebang()

// 在 Rollup 配置中使用
export default {
  plugins: [plugin]
}

// 访问 API
plugin.api.getShebang('/path/to/file.js')
```

## 方法

### getShebang(id)

获取指定文件的 shebang。

- **参数**:
  - `id` (string): 文件路径/ID
- **返回值**: `string | undefined` - shebang 或未找到时返回 undefined

```js
const shebang = plugin.api.getShebang('/project/src/cli.js')
// 返回: '#!/usr/bin/env node'
```

### getAllShebangs()

获取构建期间收集的所有 shebang。

- **返回值**: `Map<string, string>` - 文件路径到 shebang 的映射

```js
const allShebangs = plugin.api.getAllShebangs()
// 返回: Map { '/path/to/cli.js' => '#!/usr/bin/env node' }

for (const [file, shebang] of allShebangs) {
  console.log(`${file}: ${shebang}`)
}
```

## 使用场景

### 构建脚本

在构建脚本中访问 shebang 信息：

```js
import { rollup } from 'rollup'
import replaceShebang from 'rollup-plugin-replace-shebang'

const plugin = replaceShebang({ chmod: true })

const bundle = await rollup({
  input: 'src/cli.js',
  plugins: [plugin]
})

await bundle.write({ file: 'dist/cli.js', format: 'es' })

// 检查哪些文件有 shebang
const shebangs = plugin.api.getAllShebangs()
console.log('处理的 shebang 数量:', shebangs.size)
```

### 与其他工具集成

与其他工具共享 shebang 信息：

```js
const plugin = replaceShebang()

export default {
  plugins: [
    plugin,
    {
      name: 'post-build',
      writeBundle(options, bundle) {
        const shebangs = plugin.api.getAllShebangs()
        // 对 shebang 信息进行处理
      }
    }
  ]
}
```

### 调试

调试 shebang 处理：

```js
const plugin = replaceShebang()

export default {
  plugins: [
    plugin,
    {
      name: 'debug-shebangs',
      buildEnd() {
        const shebangs = plugin.api.getAllShebangs()
        console.log('包含 shebang 的文件:')
        for (const [file, shebang] of shebangs) {
          console.log(`  ${file}: ${shebang}`)
        }
      }
    }
  ]
}
```

## TypeScript 类型

```typescript
interface PluginApi {
  getShebang(id: string): string | undefined
  getAllShebangs(): Map<string, string>
}
```
