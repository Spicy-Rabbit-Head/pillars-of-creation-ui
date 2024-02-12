/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { ConfigDtsPlugin } from './dts'

import { ConfigRestartPlugin } from './restart'
import { RouterPlugin } from './router'

import { ConfigUnocssPlugin } from './unocss'
import { ConfigVisualizerConfig } from './visualizer'

import type { PluginOption } from 'vite'

type BuildForm = 'fullEntrance' | 'entrance' | 'playground'

export function createVitePlugins(buildForm: BuildForm) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // JSX支持
    vueJsx(),
    ConfigUnocssPlugin()
  ]
  if (buildForm === 'entrance') {
    // 打包分析
    vitePlugins.push(ConfigVisualizerConfig())
  }

  if (buildForm === 'playground') {
    // 自动路由生成
    vitePlugins.push(RouterPlugin())
    // 监听配置文件改动重启.
    vitePlugins.push(ConfigRestartPlugin())
  }

  if (buildForm === 'fullEntrance') {
    // dts
    vitePlugins.push(ConfigDtsPlugin())
  }
  // vue支持
  vitePlugins.push(vue())

  // 返回配置的 Vite 插件数组
  return vitePlugins
}
