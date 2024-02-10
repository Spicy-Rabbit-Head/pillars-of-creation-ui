import { typeClass } from '../symbol'

import type { Rule } from 'unocss'

/**
 * 边框宽度
 */
const borderWidth = {
  '--poc-border-width': '1px'
}

/**
 * 边框样式
 */
const borderStyle = {
  '--poc-border-style': 'solid'
}

/**
 * 边框颜色
 */
const borderColor = {
  '--poc-border-color': '#ced4da'
}

/**
 * 边框圆角
 */
const borderRadius = {
  '--poc-border-radius': '0.25rem'
}

/**
 * 边框
 */
const border = {
  '--poc-border-base': 'var(--poc-border-width) var(--poc-border-style) var(--poc-border-color)'
}

export const bordersVariable = {
  ...borderWidth,
  ...borderStyle,
  ...borderColor,
  ...borderRadius,
  ...border
}

export const bordersClass: Rule[] = [
  ['poc-border-base', { border: 'var(--poc-border-base)' }],
  ...typeClass('default').reduce((acc, type) => {
    acc.push([`poc-border-${type}`, { borderColor: `rgb(var(--poc-color-${type}))` }])
    return acc as Rule[]
  }, [] as Rule[])
]
