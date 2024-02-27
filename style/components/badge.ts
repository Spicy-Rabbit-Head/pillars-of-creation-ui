import type { CSSVariables, ComponentRoleClass, DynamicCSS } from '../symbol'

/**
 * 徽章变量
 */
export const badgeVariables: CSSVariables = {
  '--poc-badge-color': 'var(--poc-text-light-color)',
  '--poc-badge-bg-color': 'rgb(var(--poc-color-error))',
  '--poc-badge-b-color': 'var(--poc-color-error-opacity-8)'
}

/**
 * 徽章样式
 */
export const badgeStyle: DynamicCSS = {
  color: 'var(--poc-badge-color)',
  backgroundColor: 'var(--poc-badge-bg-color)',
  boxShadow: 'var(--poc-shadow-border) var(--poc-badge-b-color)'
}

export const badge: ComponentRoleClass = {
  name: 'badge',
  variables: badgeVariables,
  styles: badgeStyle
}
