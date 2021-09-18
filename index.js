const  MagicString = require("magic-string");

/**
 * A rollup plugin that preserves shebang/hashbang prefixes in your entry modules.
 * @param {object} [options]
 * @param {string} [options.shebang] A custom shebang/hashbang to use in place of the detected one.
 * @returns {import('rollup').Plugin}
 */
module.exports=function replaceStringPlugin(options = {}) {
	const str = new Map();
	return {
		name: 'replace-string',
		transform(code, mod) {
			let shebang;
			// code = code.replace(/^#![^\n]*/, (match) => ((shebang = match), ''));
			code = code.replace(/^#![^\n]*/, (match) => {
                console.log(20, match)
                shebang = match
                return ''
            });
			console.log(11, code);
			console.log(22, shebang);
			console.log(33, mod);
			if (!shebang) return null;
			str.set(mod, shebang);
			return { code, map: null };
		},
		renderChunk(code, chunk, { sourcemap }) {
			let shebang = str.get(chunk.facadeModuleId);
            console.log(44, shebang);
			if (!shebang) return null;
			const s = new MagicString(code);
			s.prepend(`${options.shebang || shebang}\n`);
			return {
				code: s.toString(),
				map: sourcemap ? s.generateMap({ hires: true }) : null,
			};
		},
	};
}
