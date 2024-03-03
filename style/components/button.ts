import type { CSSPseudoClass, CSSVariables, ComponentRoleClass, DynamicCSS } from '../symbol'

/**
 * 按钮变量
 */
export const buttonVariables: CSSVariables = {
  '--poc-button-color': 'var(--poc-text-dark-color)',
  '--poc-button-bg-color': 'transparent',
  '--poc-button-hover-color': 'var(--poc-button-color)',
  '--poc-button-border-color': 'rgb(var(--poc-color-default))',
  '--poc-button-hover-bg-color': 'var(--poc-color-default-opacity-5)',
  '--poc-shadow-color': 'rgb(var(--poc-color-default))'
}

/**
 * 按钮样式
 */
export const buttonStyle: DynamicCSS = {
  color: 'var(--poc-button-color)',
  backgroundColor: 'var(--poc-button-bg-color)',
  border: 'var(--poc-border-width) var(--poc-border-style) var(--poc-button-border-color)',
  transition: 'var(--poc-transition-color), var(--poc-transition-background)'
}

export const buttonPseudoClass: CSSPseudoClass[] = [
  {
    key: 'hover',
    value: {
      backgroundColor: 'var(--poc-button-hover-bg-color)',
      color: 'var(--poc-button-hover-color)'
    }
  }
]

export const button: ComponentRoleClass = {
  name: 'button',
  variables: buttonVariables,
  styles: buttonStyle,
  pseudoClass: buttonPseudoClass
}
