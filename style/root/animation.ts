import { objectToKeyframes } from '../utils'

import type { Rule } from 'unocss'
import type { AnimationClass } from '../symbol'

const duration = {
  '--poc-transition-duration': '0.5s'
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

const shadowPoc: AnimationClass = {
  key: 'shadow-ping',
  keyframes: [
    {
      frames: '0%',
      values: {
        'box-shadow': '0 0 1px 0 var(--poc-shadow-color)',
        opacity: 1
      }
    },
    {
      frames: '100%',
      values: {
        'box-shadow': '0 0 1px 6px var(--poc-shadow-color)',
        opacity: 0
      }
    }
  ],
  duration: '1s',
  timingFns: 'cubic-bezier(0, 0, 0.2, 1)',
  counts: 1
}

const animation: AnimationClass[] = [shadowPoc]

export const animationClass: Rule[] = [
  ...animation.reduce((acc, { key, duration, timingFns, counts }) => {
    acc.push([`poc-animate-${key}`, { animation: `poc-${key} ${duration} ${timingFns} ${counts};` }])
    return acc as Rule[]
  }, [] as Rule[])
]

export const keyframesClass = animation.map(objectToKeyframes).join('\n')
