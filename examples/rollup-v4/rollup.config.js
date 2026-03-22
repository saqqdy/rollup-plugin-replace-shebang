import replaceShebang from 'rollup-plugin-replace-shebang'

const plugin = replaceShebang({
	// Use default shebang from source
	// shebang: '#!/usr/bin/env node',

	// Enable chmod for executable permission
	chmod: true,

	// Skip backslash processing (useful for Windows paths)
	// When true, preserves \u005c escape sequences
	skipBackslash: true,

	// Include only source files
	include: ['src/**/*.js'],

	// Exclude test files
	exclude: ['src/**/*.test.js'],

	// Warn when multiple files have shebangs
	warnOnMultiple: true
})

// Plugin API demo - access shebang info after build
// plugin.api.getShebang('/path/to/file.js')
// plugin.api.getAllShebangs()

export default {
	input: 'src/cli.js',
	output: {
		file: 'dist/cli.js',
		format: 'es'
	},
	plugins: [plugin]
}
