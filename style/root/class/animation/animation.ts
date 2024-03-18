import type { AnimationClass } from '../../../symbol'

const shadowPing: AnimationClass = {
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

export const animation: AnimationClass[] = [shadowPing]
