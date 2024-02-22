import ButtonGroup from './button-group.vue'

import type { ComponentPublicInstance } from 'vue'

export { ButtonGroup }
export { buttonGroupProps } from '../button/props'

export type ButtonGroupExposed = ComponentPublicInstance & InstanceType<typeof ButtonGroup>

export type { ButtonGroupProps, ButtonGroupCProps } from '../button/props'
