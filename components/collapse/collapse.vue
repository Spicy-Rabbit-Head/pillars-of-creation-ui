<script lang="ts" setup>
import { computed, nextTick, onMounted, provide, reactive, ref, toRef, watchEffect } from 'vue'

import { emitEvent, useProps } from '@pillars-of-creation-ui/config'
import { useModifier } from '@pillars-of-creation-ui/hooks'
import { debounceMinor, isNull, removeArrayItem } from '@pillars-of-creation-ui/utils'
import { collapseProps } from './props'

import { COLLAPSE_STATE } from './symbol'

import type { CollapseArrowType, PanelState } from './symbol'

defineOptions({ name: 'Collapse' })

const emits = defineEmits(['update:expanded'])

const _props = defineProps(collapseProps)
const props = useProps('collapse', _props, {
  expanded: {
    default: null,
    static: true
  },
  card: false,
  accordion: false,
  arrowType: {
    default: 'right' as CollapseArrowType,
    validator: (value: CollapseArrowType) => ['right', 'left', 'none'].includes(value)
  },
  ghost: false
})

// const nh = useNameHelper('collapse')
const panelStates = reactive(new Set<PanelState>())
const currentExpanded = ref<(string | number)[]>([])

const { target: wrapper } = useModifier({
  passive: false,
  onKeyDown: (event, modifier) => {
    if (modifier.left || modifier.right) {
      if (!wrapper.value) return

      const tabs = Array.from(wrapper.value.querySelectorAll('[poc-role="collapse-header"]')) as HTMLElement[]

      if (tabs.length < 1) return

      event.preventDefault()
      event.stopPropagation()

      const index = document.activeElement ? tabs.findIndex(panel => panel === document.activeElement) : -1

      if (~index) {
        const target = tabs[(index + (modifier.left ? -1 : 1) + tabs.length) % tabs.length]

        target?.focus()
      }
    } else if (modifier.escape) {
      event.preventDefault()
      event.stopPropagation()

      clearExpanded()
    }
  }
})

const className = computed(() => {
  return {
    'border-x-0': !props.card,
    'rounded bg-gray-50': props.card
  }
})

const refreshLabels = debounceMinor(() => {
  Array.from(panelStates.values()).forEach((item, index) => {
    if (isNull(item.label)) {
      item.label = index + 1
    }
    item.isLast = index === panelStates.size - 1
  })

  if (panelStates.size) {
    for (const panel of panelStates) {
      if (currentExpanded.value.includes(panel.label)) {
        panel.expanded = true
      } else if (panel.expanded) {
        expandPanel(panel.label, true)
      }
    }
  }
})

provide(
  COLLAPSE_STATE,
  reactive({
    arrowType: toRef(props, 'arrowType'),
    registerPanel,
    unregisterPanel,
    expandPanel,
    refreshLabels
  })
)

watchEffect(() => {
  const rawExpanded = props.expanded
  const expanded =
    props.accordion && Array.isArray(rawExpanded) ? rawExpanded[0] : rawExpanded || rawExpanded === 0 ? rawExpanded : []

  currentExpanded.value = Array.isArray(expanded) ? Array.from(expanded) : [expanded]
})

onMounted(() => {
  nextTick(updateItemExpanded)
})

function registerPanel(panel: PanelState) {
  panelStates.add(panel)

  refreshLabels()
}

function unregisterPanel(panel: PanelState) {
  panelStates.delete(panel)
  expandPanel(panel.label, false)
  refreshLabels()
}

function expandPanel(label: string | number, expanded: boolean) {
  if (!label && label !== 0) return

  if (props.accordion) {
    currentExpanded.value = expanded ? [label] : []
  } else {
    if (expanded) {
      currentExpanded.value.push(label)
    } else {
      removeArrayItem(currentExpanded.value, label)
    }
  }

  emitChangeEvent()
  updateItemExpanded()
}

function clearExpanded() {
  if (!currentExpanded.value.length) return

  currentExpanded.value = []

  emitChangeEvent()
  updateItemExpanded()
}

function emitChangeEvent() {
  emits('update:expanded', currentExpanded.value)
  emitEvent(props.onChange, currentExpanded.value)
}

function updateItemExpanded() {
  panelStates.forEach(panel => {
    panel.setExpanded(currentExpanded.value.includes(panel.label))
  })
}
</script>

<template>
  <div
    ref="wrapper"
    class="tabular-nums leading-normal flex flex-col overflow-hidden"
    poc="base-family"
    poc-role="collapse"
    poc-vars="collapse"
    :class="className"
    role="tablist"
    tabindex="-1"
  >
    <slot></slot>
  </div>
</template>
