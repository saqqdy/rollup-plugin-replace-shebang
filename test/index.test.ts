import { describe, expect, it, vi } from 'vitest'
import replaceShebang from '../src/index'

describe('replace-shebang', () => {
	describe('plugin initialization', () => {
		it('should return plugin with correct name', () => {
			const plugin = replaceShebang()
			expect(plugin.name).toBe('replace-shebang')
		})

		it('should have version', () => {
			const plugin = replaceShebang()
			expect(plugin.version).toBe('2.0.0')
		})

		it('should have transform hook', () => {
			const plugin = replaceShebang()
			expect(plugin.transform).toBeDefined()
			expect(typeof plugin.transform).toBe('function')
		})

		it('should have renderChunk hook', () => {
			const plugin = replaceShebang()
			expect(plugin.renderChunk).toBeDefined()
			expect(typeof plugin.renderChunk).toBe('function')
		})

		it('should have buildEnd hook', () => {
			const plugin = replaceShebang()
			expect(plugin.buildEnd).toBeDefined()
			expect(typeof plugin.buildEnd).toBe('function')
		})

		it('should have writeBundle hook', () => {
			const plugin = replaceShebang()
			expect(plugin.writeBundle).toBeDefined()
			expect(typeof plugin.writeBundle).toBe('function')
		})

		it('should expose api', () => {
			const plugin = replaceShebang()
			expect(plugin.api).toBeDefined()
			expect(typeof plugin.api.getShebang).toBe('function')
			expect(typeof plugin.api.getAllShebangs).toBe('function')
		})
	})

	describe('transform hook', () => {
		it('should remove shebang from code', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\nconsole.log("hello")'
			const result = plugin.transform!(code, 'test.js')

			expect(result).not.toBeNull()
			expect(result!.code).toBe('\nconsole.log("hello")')
		})

		it('should return null when no shebang exists', () => {
			const plugin = replaceShebang()
			const code = 'console.log("hello")'
			const result = plugin.transform!(code, 'test.js')

			expect(result).toBeNull()
		})

		it('should handle shebang with arguments', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node --experimental-modules\nconsole.log("hello")'
			const result = plugin.transform!(code, 'test.js')

			expect(result).not.toBeNull()
			expect(result!.code).toBe('\nconsole.log("hello")')
		})

		it('should handle different shebang formats', () => {
			const plugin = replaceShebang()
			const testCases = [
				{ shebang: '#!/usr/bin/node', expected: '#!/usr/bin/node' },
				{ shebang: '#!/usr/bin/env node', expected: '#!/usr/bin/env node' },
				{ shebang: '#!/usr/bin/env bun', expected: '#!/usr/bin/env bun' },
				{ shebang: '#!/bin/bash', expected: '#!/bin/bash' },
				{ shebang: '#!/usr/bin/env python3', expected: '#!/usr/bin/env python3' }
			]

			for (const { shebang } of testCases) {
				const code = `${shebang}\nconsole.log("hello")`
				const result = plugin.transform!(code, 'test.js')
				expect(result).not.toBeNull()
			}
		})

		it('should return null map', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\nconsole.log("hello")'
			const result = plugin.transform!(code, 'test.js')

			expect(result!.map).toBeNull()
		})
	})

	describe('renderChunk hook', () => {
		it('should preserve shebang info for renderChunk', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/path/to/test.js')

			const chunk = { facadeModuleId: '/path/to/test.js' } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: false })

			expect(renderResult!.code).toBe('#!/usr/bin/env node\nconsole.log("hello")')
		})

		it('should use custom shebang when provided', () => {
			const plugin = replaceShebang({ shebang: '#!/usr/bin/env bun' })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/path/to/test.js')

			const chunk = { facadeModuleId: '/path/to/test.js' } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: false })

			expect(renderResult!.code).toBe('#!/usr/bin/env bun\nconsole.log("hello")')
		})

		it('should return null when facadeModuleId is undefined', () => {
			const plugin = replaceShebang()

			const chunk = { facadeModuleId: undefined } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: false })

			expect(renderResult).toBeNull()
		})

		it('should return null when no shebang was found for the module', () => {
			const plugin = replaceShebang()

			const chunk = { facadeModuleId: '/path/to/test.js' } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: false })

			expect(renderResult).toBeNull()
		})

		it('should handle facadeModuleId with query parameters', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/path/to/test.js')

			const chunk = { facadeModuleId: '/path/to/test.js?some=query' } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: false })

			expect(renderResult!.code).toBe('#!/usr/bin/env node\nconsole.log("hello")')
		})
	})

	describe('sourcemap generation', () => {
		it('should generate sourcemap when enabled', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/path/to/test.js')

			const chunk = { facadeModuleId: '/path/to/test.js' } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: true })

			expect(renderResult!.map).not.toBeNull()
			expect(renderResult!.map).toHaveProperty('version')
			expect(renderResult!.map).toHaveProperty('mappings')
		})

		it('should not generate sourcemap when disabled', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/path/to/test.js')

			const chunk = { facadeModuleId: '/path/to/test.js' } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: false })

			expect(renderResult!.map).toBeNull()
		})
	})

	describe('skipBackslash option', () => {
		it('should handle skipBackslash option in transform', () => {
			const plugin = replaceShebang({ skipBackslash: true })
			const code = '#!/usr/bin/env node\nconst path = "\\u005c"'

			const result = plugin.transform!(code, '/path/to/test.js')

			expect(result!.code).toContain('__u005c__')
		})

		it('should restore backslash in renderChunk', () => {
			const plugin = replaceShebang({ skipBackslash: true })
			const code = '#!/usr/bin/env node\nconst path = "\\u005c"'

			plugin.transform!(code, '/path/to/test.js')

			const chunk = { facadeModuleId: '/path/to/test.js' } as any
			const renderResult = plugin.renderChunk!('const path = "__u005c__"', chunk, { sourcemap: false })

			expect(renderResult!.code).toBe('#!/usr/bin/env node\nconst path = "\\u005c"')
		})

		it('should not process backslash when skipBackslash is false', () => {
			const plugin = replaceShebang({ skipBackslash: false })
			const code = '#!/usr/bin/env node\nconst path = "\\u005c"'

			const result = plugin.transform!(code, '/path/to/test.js')

			expect(result!.code).not.toContain('__u005c__')
		})
	})

	describe('preserve option', () => {
		it('should skip transform when preserve is true', () => {
			const plugin = replaceShebang({ preserve: true })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			const result = plugin.transform!(code, 'test.js')

			expect(result).toBeNull()
		})
	})

	describe('include/exclude options', () => {
		it('should only process matching files', () => {
			const plugin = replaceShebang({ include: ['**/*.ts'] })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			const resultIncluded = plugin.transform!(code, 'src/cli.ts')
			const resultExcluded = plugin.transform!(code, 'src/cli.js')

			expect(resultIncluded).not.toBeNull()
			expect(resultExcluded).toBeNull()
		})

		it('should exclude files matching exclude pattern', () => {
			const plugin = replaceShebang({ exclude: ['node_modules'] })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			const resultIncluded = plugin.transform!(code, 'src/cli.ts')
			const resultExcluded = plugin.transform!(code, 'node_modules/pkg/index.js')

			expect(resultIncluded).not.toBeNull()
			expect(resultExcluded).toBeNull()
		})

		it('should handle string include option', () => {
			const plugin = replaceShebang({ include: '**/*.ts' })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			const result = plugin.transform!(code, 'src/cli.ts')

			expect(result).not.toBeNull()
		})
	})

	describe('template variables', () => {
		it('should resolve name template variable', () => {
			// eslint-disable-next-line no-template-curly-in-string
			const plugin = replaceShebang({ shebang: '#!/usr/bin/env node # ${name}' })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/path/to/test.js')

			const chunk = { facadeModuleId: '/path/to/test.js' } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: false })

			expect(renderResult!.code).toContain('rollup-plugin-replace-shebang')
		})

		it('should resolve version template variable', () => {
			// eslint-disable-next-line no-template-curly-in-string
			const plugin = replaceShebang({ shebang: '#!/usr/bin/env node # v${version}' })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/path/to/test.js')

			const chunk = { facadeModuleId: '/path/to/test.js' } as any
			const renderResult = plugin.renderChunk!('console.log("hello")', chunk, { sourcemap: false })

			expect(renderResult!.code).toContain('v2.0.0')
		})
	})

	describe('multiple shebangs warning', () => {
		it('should warn when multiple files have shebangs', () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

			const plugin = replaceShebang({ warnOnMultiple: true })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/a.js')
			plugin.transform!(code, '/b.js')

			expect(warnSpy).toHaveBeenCalled()
			warnSpy.mockRestore()
		})

		it('should not warn when warnOnMultiple is false', () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

			const plugin = replaceShebang({ warnOnMultiple: false })
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/a.js')
			plugin.transform!(code, '/b.js')

			expect(warnSpy).not.toHaveBeenCalled()
			warnSpy.mockRestore()
		})
	})

	describe('plugin api', () => {
		it('should get shebang via api', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/test.js')

			expect(plugin.api.getShebang('/test.js')).toBe('#!/usr/bin/env node')
		})

		it('should return undefined for unknown id', () => {
			const plugin = replaceShebang()

			expect(plugin.api.getShebang('/unknown.js')).toBeUndefined()
		})

		it('should get all shebangs via api', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\nconsole.log("hello")'

			plugin.transform!(code, '/a.js')
			plugin.transform!('#!/usr/bin/env bun\nconsole.log("world")', '/b.js')

			const all = plugin.api.getAllShebangs()

			expect(all.size).toBe(2)
			expect(all.get('/a.js')?.shebang).toBe('#!/usr/bin/env node')
			expect(all.get('/b.js')?.shebang).toBe('#!/usr/bin/env bun')
		})
	})

	describe('buildEnd hook', () => {
		it('should have buildEnd hook defined', () => {
			const plugin = replaceShebang()
			expect(plugin.buildEnd).toBeDefined()
		})
	})

	describe('shebang validation', () => {
		it('should warn on invalid shebang format', () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

			const plugin = replaceShebang()
			// Invalid: doesn't start with #!/
			const code = '#!invalid\nconsole.log("hello")'

			plugin.transform!(code, '/test.js')

			expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid shebang format'))
			warnSpy.mockRestore()
		})
	})

	describe('edge cases', () => {
		it('should handle empty file with shebang', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node\n'

			const result = plugin.transform!(code, 'test.js')

			expect(result).not.toBeNull()
			expect(result!.code).toBe('\n')
		})

		it('should handle file with only shebang', () => {
			const plugin = replaceShebang()
			const code = '#!/usr/bin/env node'

			const result = plugin.transform!(code, 'test.js')

			expect(result).not.toBeNull()
			expect(result!.code).toBe('')
		})

		it('should not treat # in the middle as shebang', () => {
			const plugin = replaceShebang()
			const code = 'const x = 1\n# not a shebang\nconst y = 2'

			const result = plugin.transform!(code, 'test.js')

			expect(result).toBeNull()
		})

		it('should handle multiple modules with different shebangs', () => {
			const plugin = replaceShebang()

			plugin.transform!('#!/usr/bin/env node\nconsole.log("node")', '/a.js')
			plugin.transform!('#!/usr/bin/env bun\nconsole.log("bun")', '/b.js')

			const chunkA = { facadeModuleId: '/a.js' } as any
			const chunkB = { facadeModuleId: '/b.js' } as any

			const resultA = plugin.renderChunk!('console.log("node")', chunkA, { sourcemap: false })
			const resultB = plugin.renderChunk!('console.log("bun")', chunkB, { sourcemap: false })

			expect(resultA!.code).toBe('#!/usr/bin/env node\nconsole.log("node")')
			expect(resultB!.code).toBe('#!/usr/bin/env bun\nconsole.log("bun")')
		})
	})
})
