#!/usr/bin/env node

/**
 * Example CLI application
 * This shebang will be replaced with custom one from config
 */

import { greet } from './utils.js'

const args = process.argv.slice(2)
const name = args[0] || 'World'

console.log(greet(name))
console.log('This CLI was built with rollup v2.x')
