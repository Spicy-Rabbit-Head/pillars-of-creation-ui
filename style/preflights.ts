const color = [245, 108, 108]
const opacities = Array.from({ length: 9 }, (_, index) => index + 1) // 生成透明度列表

// css变量
const cssVariables = {
  '--poc-badge-color': '#fff',
  '--poc-color-base': '#fff',
  '--poc-color-primary': '#409eff',
  '--poc-color-success': '#67c23a',
  '--poc-color-warning': '#e6a23c',
  '--poc-color-info': '#909399',
  '--poc-color-error': '#f56c6c',
  '--poc-color-disabled': '#c0c4cc',
  '--poc-badge-font-size': '12px',
  '--poc-base-family':
    '-apple-system, BlinkMacSystemFont,ui-sans-serif, system-ui, Segoe UI, Roboto, Fira Sans, Droid Sans,Arial, Helvetica Neue, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  '--poc-num-family':
    'Helvetica,Arial,Helvetica Neue,Noto Sans,ui-monospace,Inter, SFMono-Regular, Menlo, Monaco, Consolas,Microsoft YaHei, SimSun, sans-serif'
}

export function getCSSPreflights() {
  return Object.entries(cssVariables)
    .map(([key, value]: [string, any]) => `${key}:${value}`)
    .join(';')
}
