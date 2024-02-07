import { typeClass } from '../symbol'

import type { Rule } from 'unocss'

export const backgrounds = [
  ...typeClass().reduce((acc, type) => {
    acc.push([`poc-bg-${type}`, { background: `rgb(var(--poc-color-${type}))` }])
    return acc as Rule[]
  }, [] as Rule[])
]
