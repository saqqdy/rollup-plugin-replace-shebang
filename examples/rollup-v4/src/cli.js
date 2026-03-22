#!/usr/bin/env node

/**
 * Advanced CLI application with multiple features
 * Tests: basic shebang, chmod, include/exclude, skipBackslash
 */

import { greet, getVersion, getPluginInfo, getWindowsPath } from './utils.js'
import { formatOutput } from './formatter.js'

const args = process.argv.slice(2)
const command = args[0]

switch (command) {
	case 'greet':
		console.log(greet(args[1]))
		break
	case 'version':
		console.log(getVersion())
		break
	case 'info':
		console.log(formatOutput(getPluginInfo()))
		break
	case 'path':
		// Demo skipBackslash feature
		console.log('Windows path:', getWindowsPath())
		break
	default:
		console.log(`
Usage: cli <command> [args]

Commands:
  greet <name>    Greet someone
  version         Show version
  info            Show plugin info
  path            Show Windows path (skipBackslash demo)
`)
}

console.log('\nThis CLI was built with rollup v4.x')
