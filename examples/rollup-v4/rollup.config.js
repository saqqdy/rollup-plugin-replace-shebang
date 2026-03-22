import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
	input: 'src/cli.js',
	output: {
		file: 'dist/cli.js',
		format: 'es'
	},
	plugins: [
		replaceShebang({
			// Use default shebang from source
			// shebang: '#!/usr/bin/env node',

			// Enable chmod for executable permission
			chmod: true,

			// Skip backslash processing (useful for Windows paths)
			skipBackslash: false,

			// Include only source files
			include: ['src/**/*.js'],

			// Exclude test files
			exclude: ['src/**/*.test.js'],

			// Warn when multiple files have shebangs
			warnOnMultiple: true
		})
	]
}
