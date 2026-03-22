import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: 'src/index.ts',
	format: ['esm', 'cjs'],
	dts: {
		output: 'dist/index.d.ts'
	},
	clean: true,
	sourcemap: true,
	minify: false
})
