import type { Plugin, RenderChunkHook, TransformHook } from 'rollup'
import MagicString from 'magic-string'

export interface Options {
	/**
	 * Custom shebang to prepend to the output.
	 * Defaults to the original shebang from the source file.
	 * Supports template variables: ${name}, ${version}
	 */
	shebang?: string
	/**
	 * Whether to skip backslash escape processing.
	 * When true, preserves `\u005c` escape sequences.
	 * @default false
	 */
	skipBackslash?: boolean
	/**
	 * Preserve the original shebang without modification.
	 * @default false
	 */
	preserve?: boolean
	/**
	 * Automatically set executable permission (chmod +x) on output files.
	 * Only works when output is a file, not stdout.
	 * @default false
	 */
	chmod?: boolean
	/**
	 * Include pattern for files to process.
	 * @default ["**\/*.js", "**\/*.mjs", "**\/*.ts", "**\/*.mts", "**\/*.cjs", "**\/*.cts"]
	 */
	include?: string | string[]
	/**
	 * Exclude pattern for files to skip.
	 * @default ['node_modules/**']
	 */
	exclude?: string | string[]
	/**
	 * Warn when multiple entry files have shebangs.
	 * @default true
	 */
	warnOnMultiple?: boolean
}

interface ModuleInfo {
	shebang: string
	id: string
}

interface PluginApi {
	getShebang: (id: string) => string | undefined
	getAllShebangs: () => Map<string, ModuleInfo>
}

// Package info for template variables
declare const __PACKAGE_NAME__: string
declare const __PACKAGE_VERSION__: string

const PACKAGE_NAME = 'rollup-plugin-replace-shebang'
const PACKAGE_VERSION = '2.0.0'

/**
 * Validates if a string is a valid shebang.
 * Valid shebangs start with #! followed by a path.
 */
function validateShebang(shebang: string): boolean {
	return /^#!\/[^\s]*\S/.test(shebang)
}

/**
 * Creates a filter function from include/exclude patterns.
 */
function createFilter(
	include: string | string[] | undefined,
	exclude: string | string[] | undefined
): (id: string) => boolean {
	// If no include/exclude specified, process all files except node_modules
	if (!include && !exclude) {
		return (id: string) => !id.includes('node_modules')
	}

	// Simple string matching for include/exclude
	const includePatterns = include ? (Array.isArray(include) ? include : [include]) : null
	const excludePatterns = exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : null

	/**
	 * Check if a pattern matches the given id
	 */
	function matchPattern(pattern: string, id: string): boolean {
		// Exact match
		if (id === pattern) return true
		// Extension match (e.g., **/*.ts)
		if (pattern.startsWith('**/*.') && id.endsWith(pattern.slice(4))) return true
		// Prefix match (e.g., src/**)
		if (pattern.endsWith('/**') && id.startsWith(pattern.slice(0, -3))) return true
		// Directory contains match (e.g., **/node_modules/**)
		if (pattern.startsWith('**/') && pattern.endsWith('/**')) {
			const segment = pattern.slice(3, -3)
			return id.includes(`/${segment}/`) || id.startsWith(`${segment}/`)
		}
		// Wildcard match
		if (pattern.includes('*')) {
			return patternToRegex(pattern).test(id)
		}
		// Plain string match - check if id contains the pattern as a path segment
		return id.includes(`/${pattern}/`) || id.includes(pattern)
	}

	return (id: string) => {
		// Check exclude first
		if (excludePatterns) {
			for (const pattern of excludePatterns) {
				if (matchPattern(pattern, id)) return false
			}
		}

		// Check include
		if (includePatterns) {
			for (const pattern of includePatterns) {
				if (matchPattern(pattern, id)) return true
			}
			return false
		}

		return true
	}
}

/**
 * Converts a glob pattern to RegExp.
 */
function patternToRegex(pattern: string): RegExp {
	// Handle **/ at the start (matches zero or more directories)
	// **/*.js should match: test.js, src/test.js, src/dir/test.js
	const regex = pattern
		.replace(/\*\*\//g, '<<DOUBLE_STAR_SLASH>>')
		.replace(/\*\*/g, '<<DOUBLE_STAR>>')
		.replace(/\*/g, '[^/]*')
		.replace(/<<DOUBLE_STAR_SLASH>>/g, '(.*\\/)?')
		.replace(/<<DOUBLE_STAR>>/g, '.*')
		.replace(/\?/g, '[^/]')
		.replace(/\./g, '\\.')
		.replace(/\//g, '\\/')
	return new RegExp(`^${regex}$`)
}

/**
 * Resolves template variables in shebang string.
 */
function resolveTemplateVars(shebang: string, vars: Record<string, string>): string {
	return shebang.replace(/\$\{(\w+)\}/g, (_, key) => vars[key] || '')
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
 *       skipBackslash: true,
 *       chmod: true,
 *       include: ['src/cli.ts'],
 *       exclude: ['node_modules/**']
 *     })
 *   ]
 * }
 * ```
 */
export default function replaceShebangPlugin(options: Options = {}): Plugin & { api: PluginApi } {
	const contextMap = new Map<string, ModuleInfo>()
	const filter = createFilter(options.include, options.exclude)
	let hasWarnedMultiple = false

	const transform: TransformHook = (code, moduleID) => {
		// Skip if not matching filter
		if (!filter(moduleID)) return null

		// Skip if preserve mode
		if (options.preserve) return null

		let shebang: string | undefined,
			newCode = code.replace(/^#![^\n]*/, match => {
				shebang = match
				return ''
			})

		if (options.skipBackslash) {
			newCode = newCode.replace(/(\\u005c|\\\\)/g, () => '__u005c__')
		}

		if (!shebang) return null

		// Validate shebang
		if (!validateShebang(shebang)) {
			console.warn(`[${PACKAGE_NAME}] Invalid shebang format: "${shebang}" in ${moduleID}`)
		}

		// Normalize moduleID by stripping query parameters
		const normalizedID = moduleID.replace(/\?.+$/, '')
		contextMap.set(normalizedID, { shebang, id: normalizedID })

		// Warn on multiple shebangs
		if (options.warnOnMultiple !== false && contextMap.size > 1 && !hasWarnedMultiple) {
			console.warn(
				`[${PACKAGE_NAME}] Multiple files with shebang detected. ` +
					`Only the entry file's shebang will be used in output.`
			)
			hasWarnedMultiple = true
		}

		return { code: newCode, map: null }
	}

	const renderChunk: RenderChunkHook = (code, chunk, { sourcemap }) => {
		const moduleID = chunk.facadeModuleId?.replace(/\?.+$/, '')
		if (!moduleID) return null

		const info = contextMap.get(moduleID)
		if (!info) return null

		let finalCode = code,
			resolvedShebang = options.shebang ?? info.shebang
		if (options.skipBackslash) {
			finalCode = finalCode.replace(/__u005c__/g, () => '\\u005c')
		}
		resolvedShebang = resolveTemplateVars(resolvedShebang, {
			name: PACKAGE_NAME,
			version: PACKAGE_VERSION
		})

		const ms = new MagicString(finalCode)
		ms.prepend(`${resolvedShebang}\n`)

		return {
			code: ms.toString(),
			map: sourcemap ? ms.generateMap({ hires: true }) : null
		}
	}

	const buildEnd = (): void => {
		// Note: Don't clear contextMap here, renderChunk still needs it
		// Clear it in writeBundle instead
	}

	const writeBundle: Plugin['writeBundle'] = async (outputOptions, bundle) => {
		// Clear contextMap after all chunks are written
		contextMap.clear()

		// Handle chmod option
		if (options.chmod) {
			for (const fileName of Object.keys(bundle)) {
				if (fileName.endsWith('.js') || fileName.endsWith('.mjs') || fileName.endsWith('.cjs')) {
					const chunk = bundle[fileName]
					if (chunk && 'code' in chunk) {
						// Check if this file has a shebang
						if (chunk.code.startsWith('#!')) {
							const fs = await import('node:fs/promises')
							const path = await import('node:path')
							const outputPath = outputOptions.file
								? path.resolve(outputOptions.file)
								: path.join(outputOptions.dir || 'dist', fileName)

							try {
								await fs.chmod(outputPath, 0o755)
							} catch {
								// Ignore chmod errors (e.g., on Windows)
							}
						}
					}
				}
			}
		}
	}

	// Plugin API for external access
	const api: PluginApi = {
		getShebang: (id: string) => contextMap.get(id)?.shebang,
		getAllShebangs: () => new Map(contextMap)
	}

	return {
		name: 'replace-shebang',
		version: PACKAGE_VERSION,
		transform,
		renderChunk,
		buildEnd,
		writeBundle,
		api
	}
}

// Export types
export type { PluginApi }
