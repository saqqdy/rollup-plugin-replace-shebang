---
layout: home

hero:
  name: rollup-plugin-replace-shebang
  text: Preserve Shebang in Your Bundle
  tagline: A Rollup plugin that preserves and relocates shebang (#!) to the output bundle
  image:
    src: /logo.svg
    alt: rollup-plugin-replace-shebang
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/saqqdy/rollup-plugin-replace-shebang

features:
  - icon: 🔧
    title: Simple Integration
    details: Works seamlessly with Rollup 2.x, 3.x, and 4.x with zero configuration
  - icon: 📦
    title: CLI Ready
    details: Automatically preserves shebang for CLI tools built with Rollup
  - icon: 🎯
    title: Flexible Options
    details: Custom shebang, template variables, include/exclude patterns, and chmod support
  - icon: 🔌
    title: Plugin API
    details: Exposes API for external access to shebang information
  - icon: ⚡
    title: TypeScript First
    details: Full TypeScript support with comprehensive type definitions
  - icon: 🛡️
    title: Validation
    details: Built-in shebang validation and multiple shebang detection
---

## Quick Start

### Install

```bash
# pnpm
pnpm add -D rollup-plugin-replace-shebang

# npm
npm install -D rollup-plugin-replace-shebang
```

### Usage

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
      chmod: true  // Make output executable
    })
  ]
}
```

## Why rollup-plugin-replace-shebang?

- **Automatic Preservation**: No need to manually add shebang to output files
- **Works with All Rollup Versions**: Compatible with Rollup 2.x, 3.x, and 4.x
- **Template Variables**: Use `${name}` and `${version}` in custom shebangs
- **File Pattern Support**: Include/exclude specific files with glob patterns
- **Executable Permissions**: Optionally set chmod +x on output files
