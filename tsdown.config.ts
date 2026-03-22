import { readFileSync } from 'node:fs'
import { defineConfig } from 'tsdown'

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))

export default defineConfig({
	entry: 'src/index.ts',
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	sourcemap: true,
	minify: false,
	target: 'es2019',
	banner: {
		js: `/*!
 * ${pkg.name} v${pkg.version}
 * (c) 2021-present ${pkg.author}
 * Released under the MIT License.
 */`
	}
})
