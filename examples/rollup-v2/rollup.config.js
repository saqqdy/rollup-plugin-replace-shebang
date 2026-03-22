import replaceShebang from 'rollup-plugin-replace-shebang'

// Create plugin instance to access API
const plugin = replaceShebang({
	// Custom shebang with template variables
	shebang: '#!/usr/bin/env node # Built with ${name} v${version}',

	// Enable chmod for executable
	chmod: true,

	// Alternative: use preserve to keep original shebang
	// preserve: true,
	// When preserve is true, the shebang option is ignored
	// and the original shebang from source file is used
})

// Plugin API - access shebang info
// After transform phase, you can:
// plugin.api.getShebang('/path/to/file.js') - Get shebang for specific file
// plugin.api.getAllShebangs() - Get all shebangs as Map<string, ModuleInfo>

export default {
	input: 'src/cli.js',
	output: {
		file: 'dist/cli.js',
		format: 'es'
	},
	plugins: [plugin]
}
