import { typeClass } from './symbol'

import type { Rule } from 'unocss'

export const background = [
  ...typeClass.reduce((acc, type) => {
    if (type === 'default' || type === 'disabled') return acc
    acc.push([`poc-bg-${type}`, { background: `var(--poc-color-${type})` }])
    return acc
  }, [] as Rule[])
]
