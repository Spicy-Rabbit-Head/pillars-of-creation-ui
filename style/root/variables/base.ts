import { opacities } from '../../symbol'

import type { CSSVariables } from '../../symbol'

const color: CSSVariables = {
  '--poc-color-default': '192,196,204',
  '--poc-color-primary': '64,158,255',
  '--poc-color-success': '103,194,58',
  '--poc-color-warning': '230,162,60',
  '--poc-color-info': '32,201,151',
  '--poc-color-error': '245,108,108',
  '--poc-color-disabled': '173,181,189'
}

export const base: CSSVariables = {
  '--poc-color-white': '#fff',
  '--poc-color-black': '#000',
  ...color,
  ...colorOpacity()
}

/**
 * 计算不同透明度的颜色
 */
function colorOpacity(): CSSVariables {
  return opacities.reduce((acc, opacity) => {
    const keys = Object.keys(color)
    const alpha = (1 - opacity * 0.1).toFixed(1) // 计算透明度
    keys.forEach(type => {
      acc[`${type}-opacity-${opacity}`] = `rgba(var(${type}),${alpha})`
    })
    return acc
  }, {})
}
