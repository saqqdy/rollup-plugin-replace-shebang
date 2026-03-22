#!/usr/bin/env node

/**
 * Advanced CLI application with multiple features
 * Tests: basic shebang, chmod, include/exclude
 */

import { greet, getVersion, getPluginInfo } from './utils.js'
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
	default:
		console.log(`
Usage: cli <command> [args]

Commands:
  greet <name>    Greet someone
  version         Show version
  info            Show plugin info
`)
}

console.log('\nThis CLI was built with rollup v4.x')
