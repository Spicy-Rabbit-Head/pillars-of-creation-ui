import { toKebabCase } from '@pillars-of-creation-ui/utils'

import type { Rule } from 'unocss'

export const typeClass = ['primary', 'success', 'warning', 'info', 'error', 'disabled']

export function componentClassRules(): Rule[] {
  return [
    ...[
      ['poc-badge-text-color', { color: 'var(--poc-badge-color)' }],
      ['poc-badge-font-size', { fontSize: 'var(--poc-badge-font-size)' }],
      ['poc-base-family', { fontFamily: 'var(--poc-base-family)' }],
      ['poc-num-family', { fontFamily: 'var(--poc-num-family)' }],
      ...typeClass.map(type => [`poc-bg-${type}`, { background: `var(--poc-color-${type})` }])
    ].flatMap(([key, value]) =>
      Object.entries(value).map(([property, propValue]) => [
        key,
        { [toKebabCase(property)]: propValue }
      ])
    )
  ] as Rule[]
}

export function safelistClassRules() {
  return componentClassRules().map(rule => {
    return rule[0]
  }) as string[]
}
