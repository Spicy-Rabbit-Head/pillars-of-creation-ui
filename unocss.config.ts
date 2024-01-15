// 指令
import transformerDirectives from '@unocss/transformer-directives'
// 分组
import transformerVariantGroup from '@unocss/transformer-variant-group'
// jsx归因
import transformerAttributifyJsx from 'transformer-attributify-jsx-sg'
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { getCSSPreflights } from './style/preflights'
import { componentClassRules, safelistClassRules } from './style/rules'
import animation from './style/animation'

export default defineConfig({
  content: {
    pipeline: {
      // 排除不需要处理的文件
      exclude: [
        'node_modules',
        '.git',
        '.github',
        '.husky',
        '.vscode',
        'build',
        'dist',
        'public',
        'temp/stats-[format].html',
        'common/*',
        'playground',
        'style'
      ]
    }
  },
  // 预设的配置
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerVariantGroup(), transformerDirectives(), transformerAttributifyJsx()],
  theme: {
    animation: {
      ...animation
    }
  },
  // 自定义 CSS 快捷方式
  shortcuts: [],
  // 自定义 CSS 规则
  rules: [...componentClassRules()],
  // 安全列表
  safelist: [...safelistClassRules()],
  // 印前检查
  preflights: [
    {
      layer: 'base',
      getCSS: () => `
    :root {
      ${getCSSPreflights()}
    }

    html{
    font-family: var(--poc-base-family);
    }
    `
    }
  ]
})
