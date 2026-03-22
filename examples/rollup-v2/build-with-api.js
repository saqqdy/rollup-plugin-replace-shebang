#!/usr/bin/env node
/**
 * Build script demonstrating Plugin API usage
 * This shows how to access shebang information after build
 */

import { rollup } from 'rollup'
import { resolve } from 'path'
import replaceShebang from 'rollup-plugin-replace-shebang'

async function build() {
	// Create plugin instance
	const plugin = replaceShebang({
		shebang: '#!/usr/bin/env node # ${name} v${version}',
		chmod: true
	})

	// Create bundle
	const bundle = await rollup({
		input: 'src/cli.js',
		plugins: [plugin]
	})

	// Access Plugin API after transform phase
	console.log('\n=== Plugin API Demo ===')

	// Get shebang for a specific file (use absolute path)
	const absolutePath = resolve('src/cli.js')
	const shebang = plugin.api.getShebang(absolutePath)
	console.log('Shebang from src/cli.js:', shebang)

	// Get all shebangs
	const allShebangs = plugin.api.getAllShebangs()
	console.log('All shebangs:')
	for (const [id, info] of allShebangs) {
		console.log(`  ${id}: ${info.shebang}`)
	}

	// Write output
	await bundle.write({
		file: 'dist/cli.js',
		format: 'es'
	})

	await bundle.close()
	console.log('\nBuild complete!')
}

build().catch(console.error)
