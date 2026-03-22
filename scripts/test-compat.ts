#!/usr/bin/env node
/**
 * Rollup compatibility test script
 *
 * Usage:
 *   pnpm run test:compat
 *
 * This script tests the plugin against multiple Rollup versions
 */

import { execSync } from 'node:child_process'

const ROLLUP_VERSIONS = ['2.78.1', '3.29.5', '4.35.0']

console.log('🧪 Testing Rollup compatibility...\n')

for (const version of ROLLUP_VERSIONS) {
	console.log(`📦 Testing with Rollup v${version}`)

	try {
		// Install specific rollup version
		execSync(`pnpm add -D rollup@${version}`, { stdio: 'inherit' })

		// Run tests
		execSync('pnpm test', { stdio: 'inherit' })

		console.log(`✅ Rollup v${version} - PASSED\n`)
	} catch {
		console.log(`❌ Rollup v${version} - FAILED\n`)
	}
}

// Restore original package.json
execSync('pnpm install', { stdio: 'inherit' })

console.log('✨ Compatibility test complete!')
