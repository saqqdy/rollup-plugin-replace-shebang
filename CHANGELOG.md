# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-03-22

### Breaking Changes

- Dropped support for Node.js < 18
- Changed output file paths:
  - ESM: `es/index.mjs` → `dist/index.mjs`
  - CJS: `lib/index.js` → `dist/index.cjs`
  - Types: `typings/index.d.ts` → `dist/index.d.mts` / `dist/index.d.cts`

### Features

- **include/exclude patterns**: Filter files with glob patterns
- **chmod option**: Auto set executable permission on output files
- **Template variables**: Use `${name}` and `${version}` in custom shebangs
- **preserve mode**: Keep original shebang without modification
- **warnOnMultiple**: Warn when multiple files have shebangs
- **Plugin API**: Expose `getShebang()` and `getAllShebangs()` for external access
- **shebang validation**: Validate shebang format with helpful error messages

### Improvements

- Migrated build system from Rollup to [tsdown](https://github.com/rolldown/tsdown)
- Upgraded dependencies:
  - `rollup`: ^2.78.1 → ^4.35.0
  - `typescript`: ^4.7.4 → ^5.8.2
  - `magic-string`: ^0.26.2 → ^0.30.17
- Added `sideEffects: false` for better tree-shaking
- Improved TypeScript configuration with strict mode
- Converted source code comments to English

### Documentation

- Added VitePress documentation site with bilingual support
- Added example projects for Rollup v2 and v4
- Added StackBlitz online playground links
- Added comprehensive README (English & Chinese)

### Testing

- Added unit tests with Vitest (39 test cases)
- Added test coverage reporting
- Added CI/CD with GitHub Actions (matrix: Node 18/20/22 × Rollup 2/3/4)

### Removed

- Removed Babel and related plugins
- Removed `@microsoft/api-extractor`
- Removed `typedoc` and related documentation tools
- Removed legacy Rollup plugins (`rollup-plugin-typescript2`, `rollup-plugin-terser`, etc.)
- Removed obsolete directories (`es/`, `lib/`, `typings/`)

---

## [1.2.0] - 2022-08-25

### Changed

- Updated dependency versions
- Optimized build process

## [1.1.1] - 2022-05-05

### Fixed

- Fixed `facadeModuleId` parsing when it contains query parameters

## [1.1.0] - 2022-05-02

### Changed

- Renamed type to `Options`
- Upgraded dependencies
- Adjusted build configuration

## [1.0.0] - 2021-10-22

### Added

- Initial release
- Support for `shebang` and `skipBackslash` options
- Basic documentation
