import type { Plugin as Plugin_2 } from 'rollup';

export declare interface Options {
    shebang?: string;
    skipBackslash?: boolean;
}

/**
 * 一个自动替换shebang的rollup插件
 *
 * @param options - 配置参数
 * @returns Plugin - 插件
 */
declare function replaceStringPlugin(options?: Options): Plugin_2;
export default replaceStringPlugin;

export { }
