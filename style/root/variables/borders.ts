import type { CSSVariables } from '../../symbol'

export const borders: CSSVariables = {
  '--poc-border-color-base': '#ced4da',
  '--poc-border-color-light-1': '#dee2e6',
  '--poc-border-color-light-2': '#e9ecef',
  '--poc-border-color-dark-1': '#adb5bd',
  '--poc-border-color-dark-2': '#868e96',
  '--poc-border-width': '1px',
  '--poc-border-style': 'solid',
  '--poc-border-shape': 'var(--poc-border-width) var(--poc-border-style)',
  '--poc-border-base': 'var(--poc-border-shape) var(--poc-border-color-base)',
  '--poc-border-light-1': 'var(--poc-border-shape) var(--poc-border-color-light-1)',
  '--poc-border-light-2': 'var(--poc-border-shape) var(--poc-border-color-light-2)',
  '--poc-border-dark-1': 'var(--poc-border-shape) var(--poc-border-color-dark-1)',
  '--poc-border-dark-2': 'var(--poc-border-shape) var(--poc-border-color-dark-2)'
}
