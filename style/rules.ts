import { toKebabCase } from '@pillars-of-creation-ui/utils'

import { typeClass } from './symbol'

import type { Rule } from 'unocss'

export function componentClassRules(): Rule[] {
  return [
    ...[
      ['poc-badge-text-color', { color: 'var(--poc-badge-color)' }],
      ['poc-font-size', { fontSize: 'var(--poc-font-size)' }],
      ['poc-text-content-color', { color: 'var(--poc-text-content-color)' }],
      ['poc-text-base-color', { color: 'var(--poc-text-base-color)' }],
      ['poc-badge-font-size', { fontSize: 'var(--poc-badge-font-size)' }],
      ['poc-base-family', { fontFamily: 'var(--poc-base-family)' }],
      ['poc-num-family', { fontFamily: 'var(--poc-num-family)' }],
      ['poc-border', { border: 'var(--poc-border)' }],
      ['poc-padding', { padding: 'var(--poc-padding)' }],
      ...typeClass.map(type => [`poc-bg-${type}`, { background: `var(--poc-color-${type})` }]),
      ...typeClass.map(type => [`poc-b-color-${type}`, { borderColor: `var(--poc-color-${type})` }])
    ].flatMap(([key, value]) =>
      Object.entries(value).map(([property, propValue]) => [key, { [toKebabCase(property)]: propValue }])
    )
  ] as Rule[]
}

export function safelistClassRules() {
  return componentClassRules().map(rule => {
    return rule[0]
  }) as string[]
}
