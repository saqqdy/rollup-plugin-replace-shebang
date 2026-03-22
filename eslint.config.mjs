import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	ignores: ['examples/**'],
	markdown: false,
	rules: {
		'n/no-unsupported-features/es-syntax': 'off',
		'n/no-unsupported-features/node-builtins': 'off',
		'perfectionist/sort-interfaces': 'off',
		'perfectionist/sort-named-exports': 'off',
		'perfectionist/sort-objects': 'off',
		'jsonc/sort-keys': 'off',
		'yml/no-empty-mapping-value': 'off',
	},
	stylistic: false,
	type: 'lib',
	typescript: true,
})
