import { visualizer } from 'rollup-plugin-visualizer'

import type { PluginOption } from 'vite'

/**
 * visualizer
 * @description 开启打包分析
 */
export function ConfigVisualizerConfig(): PluginOption {
  return visualizer({
    // 打包分析结果的输出文件名,通常为 HTML 文件
    filename: 'temp/stats-[format].html',
    // 是否自动打开
    open: false,
    // 是否显示 Gzip 压缩后的文件大小
    gzipSize: true,
    // 是否显示 Brotli 压缩后的文件大小
    brotliSize: true
  }) as any
}
