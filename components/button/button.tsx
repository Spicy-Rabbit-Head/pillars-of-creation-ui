import { computed, defineComponent, inject, onBeforeUnmount, reactive, ref } from 'vue'

import { createSizeProp, emitEvent, useNameHelper, useProps } from '@pillars-of-creation-ui/config'

import { adjustAlpha, parseColorToRgba } from '@pillars-of-creation-ui/utils'

import { buttonProps } from './props'

import { GROUP_STATE, buttonTypes } from './symbol'

import type { ComponentSize, ComponentState } from '@pillars-of-creation-ui/config'

import type { EventEmitter } from '@pillars-of-creation-ui/utils'

import type { ComputedRef, InjectionKey, Ref, SlotsType } from 'vue'

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
  slots: Object as SlotsType<{
    default: void,
    icon: void,
    loading: void
  }>,
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
      noPulse: false
    })
    const nh = useNameHelper('button')
    const groupState = inject(GROUP_STATE, null)
    const pulsing = ref(false)
    const index = ref(0)
    const isLast = ref(false)
    const isIconOnly = computed(() => {
      return !slots.default
    })
    const type = computed(() => {
      return props.type ?? groupState?.type ?? 'default'
    })
    const size = computed(() => {
      return groupState?.size ?? props.size
    })
    const sizeCardinality = computed(() => {
      return size.value !== 'default' ? (size.value === 'small' ? 6 : 10) : 8
    })
    const groupClassName = computed(() => {
      return type.value !== 'default'
        ? {
            'border-x-white/80': index.value > 1 && !isLast.value,
            'border-r-white/80': index.value === 1,
            'border-l-white/80': isLast.value
          }
        : {}
    })
    const className = computed(() => {
      return {
        'after:animate-button-ping': pulsing.value && !props.text,
        'cursor-not-allowed': props.disabled,
        'border-none': props.text,
        'border-dashed': props.dashed,
        [`size-${sizeCardinality.value}`]: isIconOnly.value,
        '!p-0': isIconOnly.value,
        [`h-${sizeCardinality.value}`]: true,
        'rounded-full': props.circle || groupState?.circle,
        'rounded-none': index.value > 1 && !isLast.value,
        'rounded-r-none': index.value === 1,
        'rounded-l-none': isLast.value,
        '-mr-px': !isLast.value,
        ...groupClassName.value
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
          'bg-color': 'WhiteSmoke',
          'hover-bg-color': 'WhiteSmoke'
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

      if (props.text || props.dashed) {
        style.color = hoverColor as string
        style['bg-color'] = 'initial'
        style['hover-color'] = bgColor
        style['hover-bg-color'] = 'initial'
      }

      return cvm(style)
    })

    if (groupState) {
      const state = reactive({
        index,
        isLast
      })

      groupState.increaseItem(state)

      onBeforeUnmount(() => {
        groupState.decreaseItem(state)
      })
    }

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

    function renderLoadingIcon() {
      return (
        <div>
          {slots.loading
            ? (
                slots.loading()
              )
            : props.loadingIcon
              ? (
                <div class={props.loadingIcon}></div>
                )
              : (
                <div class='i-svg-spinners-12-dots-scale-rotate'></div>
                )}
        </div>
      )
    }

    function renderSingleIcon() {
      return props.loading
        ? (
            renderLoadingIcon()
          )
        : (
          <div>{slots.icon ? slots.icon() : props.icon ? <div class={props.icon}></div> : null}</div>
          )
    }

    function renderCollapseIcon() {
      if (props.icon || slots.icon) {
        return props.loading
          ? (
              renderLoadingIcon()
            )
          : (
            <div>{slots.icon ? slots.icon() : <div class={props.icon}></div>}</div>
            )
      }

      return null
    }

    return () => {
      const Button = (props.tag || 'button') as any

      return (
        <Button
          poc='base-family padding-base ping-content font-size-base'
          relative
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
          z-1
          hover:z-2
          type={props.buttonType}
          class={className.value}
          role='button'
          poc-role='button'
          style={style.value}
          onClick={handleClick}
        >
          {isIconOnly.value ? renderSingleIcon() : renderCollapseIcon()}
          {!isIconOnly.value && slots.default ? slots.default() : null}
        </Button>
      )
    }
  }
})
