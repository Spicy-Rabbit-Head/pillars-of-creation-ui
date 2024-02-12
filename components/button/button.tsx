import { Badge } from '@/components'

import { computed, defineComponent, inject, ref } from 'vue'

import { createSizeProp, emitEvent, useNameHelper, useProps } from '@pillars-of-creation-ui/config'

import { adjustAlpha, parseColorToRgba } from '@pillars-of-creation-ui/utils'

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
    const nh = useNameHelper('button')
    const pulsing = ref(false)
    const index = ref(0)
    const isLast = ref(false)
    const isIconOnly = computed(() => {
      return !slots.default
    })
    const type = computed(() => {
      return props.type ?? 'default'
    })
    const className = computed(() => {
      return {
        'after:animate-button-ping': pulsing.value && !props.text,
        'cursor-not-allowed': props.disabled,
        'border-none': props.text,
        'border-dashed': props.dashed
      }
    })
    const colorMap = computed(() => {
      if (type.value === 'default' && !props.color) return null
      if (!props.color) {
        return {
          color: 'var(--poc-text-light-color)',
          bgColor: `rgb(var(--poc-color-${type.value}))`,
          hoverColor: `var(--poc-color-${type.value}-opacity-2)`,
          simpleBgColor: `var(--poc-color-${type.value}-opacity-8)`,
          simpleHoverColor: `var(--poc-color-${type.value}-opacity-7)`
        }
      }

      return {
        color: 'var(--poc-text-light-color)',
        bgColor: parseColorToRgba(props.color),
        hoverColor: adjustAlpha(parseColorToRgba(props.color), 0.8),
        simpleBgColor: adjustAlpha(parseColorToRgba(props.color), 0.2),
        simpleHoverColor: adjustAlpha(parseColorToRgba(props.color), 0.3)
      }
    })

    const style = computed<Record<string, string>>(() => {
      const { cvm } = nh
      if (props.disabled) {
        return cvm({
          color: 'rgb(var(--poc-color-default))',
          'bg-color': 'rgb(var(--poc-color-disabled))',
          'hover-bg-color': 'rgb(var(--poc-color-disabled))'
        })
      }
      if (!colorMap.value) return {}
      const { color, bgColor, hoverColor, simpleBgColor, simpleHoverColor } = colorMap.value ?? {}

      const style = {
        color,
        'bg-color': bgColor,
        'border-color': bgColor,
        'hover-bg-color': hoverColor
      }
      if (props.simple) {
        style.color = bgColor as string
        style['bg-color'] = simpleBgColor
        style['hover-bg-color'] = simpleHoverColor
      }

      if (props.text) {
        style.color = hoverColor as string
        style['bg-color'] = 'initial'
        style['hover-color'] = bgColor
        style['hover-bg-color'] = 'initial'
      }

      if (props.dashed) {
        style.color = hoverColor as string
        style['bg-color'] = 'initial'
        style['hover-color'] = bgColor
        style['hover-bg-color'] = 'initial'
      }

      return cvm(style)
    })

    function handleClick(event: MouseEvent) {
      if (props.disabled || props.loading || event.button) return

      if (!props.noPulse) {
        pulsing.value = false
        requestAnimationFrame(() => {
          pulsing.value = true
        })
      }

      emitEvent(props.onClick, event)
    }

    function renderBadge() {
      const badgeType = props.disabled ? 'disabled' : props.type === 'default' ? 'error' : props.type

      return <Badge content={props.badge} type={badgeType}></Badge>
    }

    return () => {
      const Button = (props.tag || 'button') as any

      return (
        <Button
          poc='base-family padding-base ping-content'
          relative
          h-8
          leading-none
          tabular-nums
          inline-flex
          items-center
          gap-1
          justify-center
          whitespace-nowrap
          vertical-middle
          cursor-pointer
          select-none
          rounded
          type={props.buttonType}
          class={className.value}
          role='button'
          poc-role='button'
          style={style.value}
          onClick={handleClick}
        >
          {!isIconOnly.value && slots.default ? slots.default() : null}
          {!isIconOnly.value && (props.badge || props.badge === 0) ? renderBadge() : null}
        </Button>
      )
    }
  }
})
