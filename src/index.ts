import MagicString from 'magic-string'

/**
 * A rollup plugin that preserves shebang/hashbang prefixes in your entry modules.
 * @param {object} [options]
 * @param {string} [options.shebang] A custom shebang/hashbang to use in place of the detected one.
 * @returns {import('rollup').Plugin}
 */
export default function replaceStringPlugin(options = {}) {
	const contextMap = new Map()
	return {
		name: 'replace-string',
		transform(code, moduld) {
			let shebang
			code = code.replace(/^#![^\n]*/, match => ((shebang = match), ''))
			if (!shebang) return null
			contextMap.set(moduld, shebang)
			return { code, map: null }
		},
		renderChunk(code, chunk, { sourcemap }) {
			let shebang = contextMap.get(chunk.facadeModuleId)
			console.log(44, shebang)
			if (!shebang) return null
			const s = new MagicString(code)
			s.prepend(`${options.shebang || shebang}\n`)
			return {
				code: s.toString(),
				map: sourcemap ? s.generateMap({ hires: true }) : null
			}
		}
	}
}
