export default {
  /**
   * 关键帧
   */
  keyframes: {
    ping: '{0% {box-shadow: 0 0 1px 0; opacity: 1;} 100% {box-shadow: 0 0 1px 6px; opacity: 0;}}'
  },
  /**
   * 时间函数
   */
  timingFns: {
    ping: 'cubic-bezier(0, 0, 0.2, 1)'
  },
  /**
   * 动画次数
   */
  counts: {
    ping: 'infinite'
  }
}
