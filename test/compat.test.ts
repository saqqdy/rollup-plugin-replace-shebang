import { rollup } from 'rollup'
import { describe, expect, it } from 'vitest'
import replaceShebang from '../src/index'

describe('rollup integration', () => {
	it('should work with rollup bundle', async () => {
		const plugin = replaceShebang()

		const bundle = await rollup({
			input: 'test/fixtures/cli.js',
			plugins: [
				{
					name: 'virtual-entry',
					resolveId(id) {
						if (id === 'test/fixtures/cli.js') return id
						return null
					},
					load(id) {
						if (id === 'test/fixtures/cli.js') {
							return '#!/usr/bin/env node\nconsole.log("hello")'
						}
						return null
					}
				},
				plugin
			]
		})

		const { output } = await bundle.generate({ format: 'es' })
		const code = output[0].code

		expect(code).toMatch(/^#!\/usr\/bin\/env node\n/)
		expect(code).toContain('console.log')
	})

	it('should work with custom shebang in rollup bundle', async () => {
		const plugin = replaceShebang({ shebang: '#!/usr/bin/env bun' })

		const bundle = await rollup({
			input: 'test/fixtures/cli.js',
			plugins: [
				{
					name: 'virtual-entry',
					resolveId(id) {
						if (id === 'test/fixtures/cli.js') return id
						return null
					},
					load(id) {
						if (id === 'test/fixtures/cli.js') {
							return '#!/usr/bin/env node\nconsole.log("hello")'
						}
						return null
					}
				},
				plugin
			]
		})

		const { output } = await bundle.generate({ format: 'es' })
		const code = output[0].code

		expect(code).toMatch(/^#!\/usr\/bin\/env bun\n/)
	})
})
