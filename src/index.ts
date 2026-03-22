import type { Plugin, RenderChunkHook, TransformHook } from 'rollup'
import MagicString from 'magic-string'

export interface Options {
	/**
	 * Custom shebang to prepend to the output.
	 * Defaults to the original shebang from the source file.
	 */
	shebang?: string
	/**
	 * Whether to skip backslash escape processing.
	 * When true, preserves `\u005c` escape sequences.
	 * @default false
	 */
	skipBackslash?: boolean
}

interface ModuleInfo {
	shebang: string
}

/**
 * A Rollup plugin that preserves and relocates shebang (#!) to the output bundle.
 *
 * During the build process, shebangs are removed from individual modules and
 * re-added to the final bundle, ensuring CLI tools work correctly.
 *
 * @param options - Plugin configuration options
 * @returns A Rollup plugin instance
 *
 * @example
 * ```js
 * import replaceShebang from 'rollup-plugin-replace-shebang'
 *
 * export default {
 *   plugins: [
 *     replaceShebang({
 *       shebang: '#!/usr/bin/env node',
 *       skipBackslash: true
 *     })
 *   ]
 * }
 * ```
 */
export default function replaceShebangPlugin(options: Options = {}): Plugin {
	const contextMap = new Map<string, ModuleInfo>()

	const transform: TransformHook = (code, moduleID) => {
		let shebang: string | undefined,
			newCode = code.replace(/^#![^\n]*/, match => {
				shebang = match
				return ''
			})

		if (options.skipBackslash) {
			newCode = newCode.replace(/(\\u005c|\\\\)/g, () => '__u005c__')
		}

		if (!shebang) return null

		contextMap.set(moduleID, { shebang })
		return { code: newCode, map: null }
	}

	const renderChunk: RenderChunkHook = (code, chunk, { sourcemap }) => {
		const moduleID = chunk.facadeModuleId?.replace(/\?.+$/, '')
		if (!moduleID) return null

		const info = contextMap.get(moduleID)
		if (!info) return null

		let finalCode = code
		if (options.skipBackslash) {
			finalCode = finalCode.replace(/__u005c__/g, () => '\\u005c')
		}

		const ms = new MagicString(finalCode)
		ms.prepend(`${options.shebang ?? info.shebang}\n`)

		return {
			code: ms.toString(),
			map: sourcemap ? ms.generateMap({ hires: true }) : null
		}
	}

	return {
		name: 'replace-shebang',
		transform,
		renderChunk
	}
}
