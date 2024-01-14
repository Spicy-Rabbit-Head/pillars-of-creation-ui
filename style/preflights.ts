import { baseColor, opacities, typeClass } from './symbol'

export function colorOpacity(type: string[], originalColor: number[][]) {
  return opacities.reduce((acc, opacity) => {
    const alpha = (opacity / 10).toFixed(1) // 计算透明度
    type.forEach((type, index) => {
      acc[`--poc-color-${type}-opacity-${opacity}`] = `rgba(${originalColor[index].join(', ')}, ${alpha})`
    })
    return acc
  }, {})
}

// css变量
export const cssVariables = {
  '--poc-badge-color': '#fff',
  '--poc-color-base': '#fff',
  '--poc-color-primary': '#409eff',
  '--poc-color-success': '#67c23a',
  '--poc-color-warning': '#e6a23c',
  '--poc-color-info': '#909399',
  '--poc-color-error': '#f56c6c',
  '--poc-color-disabled': '#c0c4cc',
  '--poc-text-content-color': '#ffffff',
  '--poc-text-base-color': '#000000',
  '--poc-border-color-base': '#ced4da',
  '--poc-font-size': '0.875rem',
  '--poc-badge-font-size': '0.75rem',
  '--poc-shadow-border': '0 0 0 1px',
  '--poc-radius-base': '0.25rem',
  '--poc-y-padding': '0',
  '--poc-x-padding': '0.875rem',
  '--poc-padding': 'var(--poc-y-padding) var(--poc-x-padding)',
  '--poc-b-color': 'var(--poc-border-color-base)',
  '--poc-border': 'var(--poc-border-shape)',
  '--poc-border-width': '1px',
  '--poc-border-style': 'solid',
  '--poc-border-shape': 'var(--poc-border-width) var(--poc-border-style)',
  '--poc-base-family':
    '-apple-system, BlinkMacSystemFont,ui-sans-serif, system-ui, Segoe UI, Roboto, Fira Sans, Droid Sans,Arial, Helvetica Neue, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  '--poc-num-family':
    'Helvetica,Arial,Helvetica Neue,Noto Sans,ui-monospace,Inter, SFMono-Regular, Menlo, Monaco, Consolas,Microsoft YaHei, SimSun, sans-serif',
  ...colorOpacity(typeClass, baseColor)
}

export function getCSSPreflights() {
  return Object.entries(cssVariables)
    .map(([key, value]: [string, any]) => `${key}:${value}`)
    .join(';')
}
