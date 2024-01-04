// 此配置用于构建库,请勿用于创建服务
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import glob from 'fast-glob'

import { defineConfig } from 'vite'
import { createVitePlugins } from './build/vite/plugins'

import type { LogLevel, UserConfig } from 'vite'

// 从 package.json 中读取相关信息
interface Manifest {
  dependencies?: Record<string, string>,

  peerDependencies?: Record<string, string>,

  version?: string
}

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest
const logLevel = process.env.LOG_LEVEL
// 外部依赖
const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {})
)
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))
// https://vitejs.dev/config/
export default defineConfig(async (): Promise<UserConfig> => {
  const input = await glob('components/**/*.{ts,vue}', {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true
  })

  input.push(resolve(__dirname, 'index.ts'))

  return {
    logLevel: (logLevel || 'info') as LogLevel,
    publicDir: false,
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    // 别名
    resolve: {
      // 别名配置
      alias: [
        // @ 代表 src 目录
        {
          find: /^@\/components/,
          replacement: resolve(__dirname, 'components')
        }
      ]
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log']
    },
    build: {
      outDir: 'es',
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'index.ts'),
        name: 'PillarsOfCreationUI'
      },
      rollupOptions: {
        input,
        external,
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'lib',
            entryFileNames: '[name].cjs'
          },
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'es',
            entryFileNames: '[name].mjs'
          }
        ],
        treeshake: false
      },
      commonjsOptions: {
        sourceMap: false
      },
      chunkSizeWarningLimit: 10000
    },
    // 插件
    plugins: [createVitePlugins('entrance')]
  }
})
