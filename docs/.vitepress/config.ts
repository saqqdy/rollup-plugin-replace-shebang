import { defineConfig } from 'vitepress'

export default defineConfig({
	base: '/rollup-plugin-replace-shebang/',
	title: 'rollup-plugin-replace-shebang',
	description: 'A Rollup plugin that preserves and relocates shebang to the output bundle',
	lang: 'en-US',

	head: [
		['meta', { name: 'theme-color', content: '#f59e0b' }],
		['meta', { name: 'og:type', content: 'website' }],
		['meta', { name: 'og:title', content: 'rollup-plugin-replace-shebang' }],
		['meta', { name: 'og:description', content: 'A Rollup plugin that preserves and relocates shebang to the output bundle' }],
	],

	locales: {
		root: {
			label: 'English',
			lang: 'en',
			themeConfig: {
				darkModeSwitchLabel: 'Theme',
				darkModeSwitchTitle: 'Switch to dark theme',
				lightModeSwitchTitle: 'Switch to light theme',
				langMenuLabel: 'Language',
				sidebarMenuLabel: 'Menu',
				returnToTopLabel: 'Return to top',
				outline: { label: 'On this page' },
				docFooter: { prev: 'Previous', next: 'Next' },
				lastUpdated: {
					text: 'Last updated',
					formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
				},
				editLink: {
					pattern: 'https://github.com/saqqdy/rollup-plugin-replace-shebang/edit/master/docs/:path',
					text: 'Edit this page on GitHub',
				},
				footer: {
					message: 'Released under the MIT License.',
					copyright: 'Copyright © 2023-present saqqdy',
				},
				nav: [
					{ text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
					{ text: 'API', link: '/api/', activeMatch: '/api/' },
					{ text: 'Examples', link: '/examples/', activeMatch: '/examples/' },
					{
						text: 'Links',
						items: [
							{ text: 'GitHub', link: 'https://github.com/saqqdy/rollup-plugin-replace-shebang' },
							{ text: 'NPM', link: 'https://www.npmjs.com/package/rollup-plugin-replace-shebang' },
							{ text: 'Changelog', link: 'https://github.com/saqqdy/rollup-plugin-replace-shebang/blob/master/CHANGELOG.md' },
						],
					},
				],
				sidebar: {
					'/guide/': [
						{
							text: 'Guide',
							items: [
								{ text: 'Getting Started', link: '/guide/getting-started' },
								{ text: 'Basic Usage', link: '/guide/basic-usage' },
								{ text: 'Advanced Usage', link: '/guide/advanced-usage' },
							],
						},
					],
					'/api/': [
						{
							text: 'API Reference',
							items: [
								{ text: 'Overview', link: '/api/' },
								{ text: 'Options', link: '/api/options' },
								{ text: 'Plugin API', link: '/api/plugin-api' },
							],
						},
					],
					'/examples/': [
						{
							text: 'Examples',
							items: [
								{ text: 'Overview', link: '/examples/' },
								{ text: 'Rollup v2', link: '/examples/rollup-v2' },
								{ text: 'Rollup v4', link: '/examples/rollup-v4' },
							],
						},
					],
				},
			},
		},
		zh: {
			label: '简体中文',
			lang: 'zh-CN',
			link: '/zh/',
			title: 'rollup-plugin-replace-shebang',
			description: '一个 Rollup 插件，用于保留 shebang 并将其添加到输出文件顶部',
			themeConfig: {
				darkModeSwitchLabel: '主题',
				darkModeSwitchTitle: '切换到深色模式',
				lightModeSwitchTitle: '切换到浅色模式',
				langMenuLabel: '语言',
				sidebarMenuLabel: '菜单',
				returnToTopLabel: '回到顶部',
				outline: { label: '页面导航' },
				docFooter: { prev: '上一页', next: '下一页' },
				lastUpdated: {
					text: '最后更新于',
					formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
				},
				editLink: {
					pattern: 'https://github.com/saqqdy/rollup-plugin-replace-shebang/edit/master/docs/:path',
					text: '在 GitHub 上编辑此页',
				},
				footer: {
					message: '基于 MIT 许可发布',
					copyright: '版权所有 © 2023-present saqqdy',
				},
				nav: [
					{ text: '指南', link: '/zh/guide/getting-started', activeMatch: '/zh/guide/' },
					{ text: 'API', link: '/zh/api/', activeMatch: '/zh/api/' },
					{ text: '示例', link: '/zh/examples/', activeMatch: '/zh/examples/' },
					{
						text: '链接',
						items: [
							{ text: 'GitHub', link: 'https://github.com/saqqdy/rollup-plugin-replace-shebang' },
							{ text: 'NPM', link: 'https://www.npmjs.com/package/rollup-plugin-replace-shebang' },
							{ text: '更新日志', link: 'https://github.com/saqqdy/rollup-plugin-replace-shebang/blob/master/CHANGELOG.md' },
						],
					},
				],
				sidebar: {
					'/zh/guide/': [
						{
							text: '指南',
							items: [
								{ text: '快速上手', link: '/zh/guide/getting-started' },
								{ text: '基础用法', link: '/zh/guide/basic-usage' },
								{ text: '进阶用法', link: '/zh/guide/advanced-usage' },
							],
						},
					],
					'/zh/api/': [
						{
							text: 'API 参考',
							items: [
								{ text: '概览', link: '/zh/api/' },
								{ text: '选项', link: '/zh/api/options' },
								{ text: '插件 API', link: '/zh/api/plugin-api' },
							],
						},
					],
					'/zh/examples/': [
						{
							text: '示例',
							items: [
								{ text: '概览', link: '/zh/examples/' },
								{ text: 'Rollup v2', link: '/zh/examples/rollup-v2' },
								{ text: 'Rollup v4', link: '/zh/examples/rollup-v4' },
							],
						},
					],
				},
			},
		},
	},

	themeConfig: {
		logo: '/logo.svg',
		siteTitle: 'rollup-plugin-replace-shebang',
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/saqqdy/rollup-plugin-replace-shebang' },
		],
		search: {
			provider: 'local',
		},
	},
})
