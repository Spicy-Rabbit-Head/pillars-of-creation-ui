import type { Rule } from 'unocss'

const duration = {
  '--poc-transition-duration': '0.25s'
}

const timing = {
  '--poc-transition-timing': 'ease'
}

const mode = {
  '--poc-transition-base': 'var(--poc-transition-duration) var(--poc-transition-timing)'
}

const transition = {
  '--poc-transition-color': 'color var(--poc-transition-base)',
  '--poc-transition-background': 'background-color var(--poc-transition-base)',
  '--poc-transition-border': 'border-color var(--poc-transition-base)',
  '--poc-transition-shadow': 'box-shadow var(--poc-transition-base)'
}

export const transitionVariable = {
  ...duration,
  ...timing,
  ...mode,
  ...transition
}

export const transitionClass: Rule[] = [
  ['poc-transition-color', { transition: 'var(--poc-transition-color)' }],
  ['poc-transition-background', { transition: 'var(--poc-transition-background)' }],
  ['poc-transition-border', { transition: 'var(--poc-transition-border)' }],
  ['poc-transition-shadow', { transition: 'var(--poc-transition-shadow)' }]
]

export const animation = {
  /**
   * 关键帧
   */
  keyframes: {
    'button-ping':
      '{0% {box-shadow: 0 0 1px 0 var(--poc-button-border-color); opacity: 1;} 100% {box-shadow: 0 0 1px 6px var(--poc-button-border-color); opacity: 0;}}'
  },
  /**
   * 动画属性
   */
  property: {},
  /**
   * 时间函数
   */
  timingFns: {
    'button-ping': 'cubic-bezier(0, 0, 0.2, 1)'
  },
  /**
   * 动画次数
   */
  counts: {
    'button-ping': 1
  }
}
