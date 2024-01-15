import { computed, defineComponent, inject, ref } from 'vue'

import { createSizeProp, useProps } from '@pillars-of-creation-ui/config'

import { buttonProps } from './props'

import { buttonTypes } from './symbol'

import type { ComponentSize, ComponentState } from '@pillars-of-creation-ui/config'
import type { EventEmitter } from '@pillars-of-creation-ui/utils'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

interface FieldOptions {
  prop: ComputedRef<string>,

  idFor: ComputedRef<string>,

  state: ComputedRef<ComponentState>,

  disabled: ComputedRef<boolean>,

  loading: ComputedRef<boolean>,

  size: ComputedRef<ComponentSize>,

  emitter: EventEmitter,

  labelWidth: Ref<number>,

  validate: () => Promise<string[] | null>,

  reset: () => boolean,

  clearError: () => void,

  getValue: (defaultValue?: unknown) => unknown,

  setValue: (value: unknown, strict?: boolean) => void,

  sync: (instance: any) => void,

  unSync: (instance: any) => void
}

const FIELD_OPTIONS: InjectionKey<FieldOptions> = Symbol('FIELD_OPTIONS')

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  emits: [],
  setup(_props, { slots }) {
    const fieldActions = inject(FIELD_OPTIONS, null)
    const props = useProps('button', _props, {
      size: createSizeProp(fieldActions ? fieldActions.size : undefined),
      type: {
        default: null,
        validator: value => buttonTypes.includes(value)
      },
      dashed: false,
      text: false,
      simple: false,
      ghost: false,
      disabled: () => (fieldActions ? fieldActions.disabled.value : false),
      loading: () => (fieldActions ? fieldActions.loading.value : false),
      circle: false,
      loadingIcon: null,
      icon: null,
      color: null,
      buttonType: {
        default: 'button',
        validator: value => ['button', 'submit', 'reset'].includes(value)
      },
      block: false,
      tag: 'button',
      noPulse: false,
      badge: null
    })
    const pulsing = ref(false)
    const index = ref(0)
    const isLast = ref(false)
    const isIconOnly = computed(() => {
      return !slots.default
    })
    const type = computed(() => {
      return props.type ?? 'default'
    })
    const textColor = computed(() => {
      return type.value === 'default' ? 'poc-text-dark-color' : 'poc-text-light-color'
    })
    const backgroundColor = computed(() => {
      return type.value === 'default' ? 'bg-white' : `poc-bg-${type.value}`
    })
    const className = computed(() => {
      return {
        [textColor.value]: true,
        [backgroundColor.value]: true,
        [`poc-b-color-${type.value}`]: true
      }
    })

    return () => {
      const Button = (props.tag || 'button') as any

      return (
        <Button
          poc='base-family border font-size padding'
          h-8
          animate-ping
          tabular-nums
          leading-normal
          inline-flex
          items-center
          justify-center
          leading-none
          whitespace-nowrap
          vertical-middle
          cursor-pointer
          select-none
          outline-0
          rounded
          type={props.buttonType}
          class={className.value}
          role='button'
        >
          {!isIconOnly.value && slots.default ? slots.default() : null}
        </Button>
      )
    }
  }
})
