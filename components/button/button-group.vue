<script setup lang="ts">
import { buttonGroupProps } from '@/components'

import { computed, provide, reactive, toRef } from 'vue'

import { useProps } from '@pillars-of-creation-ui/config'
import { debounceMinor } from '@pillars-of-creation-ui/utils'

import { GROUP_STATE, buttonTypes } from './symbol.ts'

import type { ButtonState, ButtonType } from './symbol.ts'

defineOptions({ name: 'ButtonGroup' })

const _props = defineProps(buttonGroupProps)
const props = useProps('buttonGroup', _props, {
  size: null,
  type: {
    default: 'default' as ButtonType,
    validator: (value: ButtonType) => buttonTypes.includes(value)
  },
  circle: false
})

defineSlots<{ default: () => any }>()

const itemStates = reactive(new Set<ButtonState>())
const size = toRef(props, 'size')
const type = toRef(props, 'type')
const circle = toRef(props, 'circle')

const itemList = computed(() => Array.from(itemStates))

const refreshIndexes = debounceMinor(() => {
  for (let i = 0, len = itemList.value.length; i < len; ++i) {
    const item = itemList.value[i]

    item.index = i + 1
    item.isLast = i === len - 1
  }
})

provide(
  GROUP_STATE,
  reactive({
    size,
    type,
    circle,
    increaseItem,
    decreaseItem,
    refreshIndexes
  })
)

function increaseItem(item: ButtonState) {
  itemStates.add(item)
  refreshIndexes()
}

function decreaseItem(item: ButtonState) {
  itemStates.delete(item)
  refreshIndexes()
}
</script>

<template>
  <div
    role="group"
    poc="base-family"
    tabular-nums
    inline-flex
    items-center
  >
    <slot></slot>
  </div>
</template>
