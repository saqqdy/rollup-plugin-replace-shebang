/**
 * Utility functions
 */

export function greet(name) {
	return `Hello, ${name || 'World'}!`
}

export function getVersion() {
	return '1.0.0'
}

export function getPluginInfo() {
	return {
		name: 'rollup-plugin-replace-shebang',
		version: '2.0.0',
		features: [
			'shebang replacement',
			'include/exclude patterns',
			'chmod support',
			'template variables',
			'plugin API'
		]
	}
}

// Test skipBackslash feature: Windows path with backslash
// When skipBackslash: true, \u005c will be preserved
export function getWindowsPath() {
	// eslint-disable-next-line no-useless-escape
	return 'C:\\Users\\test\\file.txt'
}
