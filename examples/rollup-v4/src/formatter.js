/**
 * Output formatter
 * This file has no shebang - tests that non-entry files work correctly
 */

export function formatOutput(data) {
	if (typeof data === 'object') {
		return JSON.stringify(data, null, 2)
	}
	return String(data)
}

export function formatError(message) {
	return `Error: ${message}`
}
