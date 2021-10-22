# rollup-plugin-replace-shebang

一个自动替换`shebang`的`rollup`插件

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

[npm-image]: https://img.shields.io/npm/v/rollup-plugin-replace-shebang.svg?style=flat-square
[npm-url]: https://npmjs.org/package/rollup-plugin-replace-shebang
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/rollup-plugin-replace-shebang/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/rollup-plugin-replace-shebang&utm_campaign=Badge_Grade
[travis-image]: https://travis-ci.com/saqqdy/rollup-plugin-replace-shebang.svg?branch=master
[travis-url]: https://travis-ci.com/saqqdy/rollup-plugin-replace-shebang
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/rollup-plugin-replace-shebang.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/rollup-plugin-replace-shebang?branch=master
[snyk-image]: https://snyk.io/test/npm/rollup-plugin-replace-shebang/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/rollup-plugin-replace-shebang
[download-image]: https://img.shields.io/npm/dm/rollup-plugin-replace-shebang.svg?style=flat-square
[download-url]: https://npmjs.org/package/rollup-plugin-replace-shebang
[gzip-image]: http://img.badgesize.io/https://unpkg.com/rollup-plugin-replace-shebang/dist/index.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/rollup-plugin-replace-shebang/dist/index.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_rollup-plugin-replace-shebang
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_rollup-plugin-replace-shebang

## 安装

```bash
# 使用npm
$ npm install -D rollup-plugin-replace-shebang

# 使用yarn
$ yarn add -D rollup-plugin-replace-shebang
```

## 使用

```js
import shebang from 'rollup-plugin-replace-shebang'

plugins: [
	shebang({
		shebang: '#!/usr/bin/env node',
		skipBackslash: true // 跳过\u005c 反斜杠
	})
]
```

## 问题和支持

Please open an issue [here](https://github.com/saqqdy/rollup-plugin-replace-shebang/issues).

## License

[MIT](LICENSE)
