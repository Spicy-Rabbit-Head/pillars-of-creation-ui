// 此配置用于构建库,请勿用于创建服务

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import { createVitePlugins } from './build/vite/plugins'

import type { LogLevel } from 'vite'

// 从 package.json 中读取相关信息
interface Manifest {
  dependencies?: Record<string, string>,

  peerDependencies?: Record<string, string>,

  version?: string
}

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest

// 从环境变量中获取日志级别
const logLevel = process.env.LOG_LEVEL

const outDir = 'dist'

export default defineConfig(async () => {
  return {
    logLevel: (logLevel || 'info') as LogLevel,
    publicDir: false,
    define: {
      // 定义一个全局变量，表示包的版本号
      __VERSION__: JSON.stringify(pkg.version)
    },
    resolve: {
      alias: [
        // 别名配置，用于解析路径
        {
          find: /^@\/(.+)/,
          replacement: resolve(__dirname, '$1')
        },
        {
          find: /^@pillars-of-creation-ui\/(utils|hooks|config)/,
          // 针对特定模块的路径别名
          replacement: resolve(__dirname, 'common/$1/src')
        }
      ]
    },
    esbuild: {
      // 删除代码中的 debugger 语句
      drop: ['debugger'],
      // 删除代码中的 debugger 语句
      pure: ['console.log']
    },
    build: {
      outDir,
      sourcemap: true,
      lib: {
        // 库的入口文件路径
        entry: resolve(__dirname, 'full-lib.ts'),
        // 输出的模块格式
        formats: ['es', 'cjs', 'iife'],
        // 库的名称
        name: 'PillarsOfCreationUI',
        // 输出文件的命名格式
        fileName: format =>
          `pillars-of-creation-ui.${format === 'es' ? 'mjs' : format === 'cjs' ? 'cjs' : 'js'}`
      },
      rollupOptions: {
        // 告知 rollup 哪些模块是外部依赖，不会被打包
        external: ['vue'],
        output: {
          globals: {
            // 全局变量引用 Vue
            vue: 'Vue'
          }
        }
      },
      commonjsOptions: {
        sourceMap: false
      },
      // 打包时的警告限制
      chunkSizeWarningLimit: 10000
    },
    plugins: [createVitePlugins('fullEntrance')]
  }
})
