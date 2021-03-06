import MagicString from 'magic-string'
import type { Plugin } from 'rollup'

export interface Options {
	shebang?: string
	skipBackslash?: boolean
}

/**
 * 一个自动替换shebang的rollup插件
 *
 * @param options - 配置参数
 * @returns Plugin - 插件
 */
export default function replaceStringPlugin(options: Options = {}): Plugin {
	const contextMap = new Map()
	return {
		name: 'replace-shebang',
		transform(code, moduleID) {
			let shebang
			code = code.replace(/^#![^\n]*/, match => ((shebang = match), ''))
			if (options.skipBackslash) {
				code = code.replace(/(\\u005c|\\\\)/g, () => '__u005c__')
			}
			if (!shebang) return null
			contextMap.set(moduleID, { shebang })
			return { code, map: null }
		},
		renderChunk(code, chunk, { sourcemap }) {
			const moduleID = chunk.facadeModuleId!.replace(/\?.+$/, '')
			const { shebang } = contextMap.get(moduleID) || {}
			if (!shebang) return null
			if (options.skipBackslash) {
				code = code.replace(/__u005c__/g, () => '\\u005c')
			}
			const ms = new MagicString(code)
			ms.prepend(`${options.shebang || shebang}\n`)
			return {
				code: ms.toString(),
				map: sourcemap ? ms.generateMap({ hires: true }) : null
			}
		}
	}
}
