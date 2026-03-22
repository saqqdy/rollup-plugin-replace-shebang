# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-03-22

### Changed

- **BREAKING**: Dropped support for Node.js < 18
- **BREAKING**: Changed output file paths:
  - ESM: `es/index.mjs` → `dist/index.mjs`
  - CJS: `lib/index.js` → `dist/index.cjs`
  - Types: `typings/index.d.ts` → `dist/index.d.mts` / `dist/index.d.cts`
- Migrated build system from Rollup to [tsdown](https://github.com/rolldown/tsdown)
- Upgraded dependencies:
  - `rollup`: ^2.78.1 → ^4.35.0
  - `typescript`: ^4.7.4 → ^5.8.2
  - `magic-string`: ^0.26.2 → ^0.30.17
- Added `sideEffects: false` to package.json for better tree-shaking
- Improved TypeScript configuration with strict mode and modern targets
- Converted source code comments to English

### Added

- Unit tests with Vitest (20+ test cases)
- Type-safe exports in package.json with conditional types
- Comprehensive bilingual README (English & Chinese)

### Removed

- Removed Babel and related plugins
- Removed `@microsoft/api-extractor`
- Removed `typedoc` and related documentation tools
- Removed legacy Rollup plugins (`rollup-plugin-typescript2`, `rollup-plugin-terser`, etc.)
- Removed obsolete directories (`es/`, `lib/`, `typings/`)

### Fixed

- Improved source map generation accuracy
- Better handling of edge cases (empty files, multiple modules)

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
