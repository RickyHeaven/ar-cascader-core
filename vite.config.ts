import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./examples', import.meta.url))
		}
	},
	build: {
		lib: {
			entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
			name: 'ArCascader',
			fileName: `ar-cascader`
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue', 'view-ui-plus', '@zhangqingcq/china-area-data', 'lodash-es'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
					'view-ui-plus': 'ViewUIPlus'
				}
			}
		},
		copyPublicDir: false
	}
})
