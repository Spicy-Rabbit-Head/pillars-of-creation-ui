declare module 'vue' {
  export interface GlobalComponents {
    ZBadge: (typeof import('pillars-of-creation-ui'))['Badge']
  }
}

export {}
