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
