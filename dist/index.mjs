import MagicString from 'magic-string';

/**
 * 一个自动替换shebang的rollup插件
 *
 * @param options - 配置参数
 * @returns Plugin - 插件
 */

function replaceStringPlugin(options = {}) {
  const contextMap = new Map();
  return {
    name: 'replace-shebang',

    transform(code, moduleID) {
      let shebang;
      code = code.replace(/^#![^\n]*/, match => (shebang = match, ''));

      if (options.skipBackslash) {
        code = code.replace(/(\\u005c|\\\\)/g, () => '__u005c__');
      }

      if (!shebang) return null;
      contextMap.set(moduleID, {
        shebang
      });
      return {
        code,
        map: null
      };
    },

    renderChunk(code, chunk, {
      sourcemap
    }) {
      const {
        shebang
      } = contextMap.get(chunk.facadeModuleId) || {};
      if (!shebang) return null;

      if (options.skipBackslash) {
        code = code.replace(/__u005c__/g, () => '\\u005c');
      }

      const ms = new MagicString(code);
      ms.prepend(`${options.shebang || shebang}\n`);
      return {
        code: ms.toString(),
        map: sourcemap ? ms.generateMap({
          hires: true
        }) : null
      };
    }

  };
}

export { replaceStringPlugin as default };
