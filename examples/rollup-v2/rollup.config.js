import replaceShebang from 'rollup-plugin-replace-shebang'

export default {
	input: 'src/cli.js',
	output: {
		file: 'dist/cli.js',
		format: 'es'
	},
	plugins: [
		// Plugin must run first to remove shebang before parsing
		replaceShebang({
			// Custom shebang with template variables
			shebang: '#!/usr/bin/env node # Built with ${name} v${version}',
			// Enable chmod for executable
			chmod: true
		})
	]
}
