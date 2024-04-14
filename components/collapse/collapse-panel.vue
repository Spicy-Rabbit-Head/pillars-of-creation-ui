<script lang="ts">
import { collapsePanelProps } from '@/components'
import { CollapseTransition } from '@/components/collapse-transition'

import { computed, defineComponent, inject, onBeforeUnmount, reactive, ref, watch } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@pillars-of-creation-ui/config'

import { COLLAPSE_STATE } from './symbol'

import type { CollapseArrowType, PanelState } from './symbol'

let idCount = 0

export default defineComponent({
  name: 'CollapsePanel',
  components: { CollapseTransition },
  props: collapsePanelProps,
  emits: ['update:expanded'],
  setup(_props, { emit }) {
    const props = useProps('collapsePanel', _props, {
      label: {
        default: null,
        static: true
      },
      title: '',
      disabled: false,
      contentStyle: null,
      expanded: false,
      card: false,
      arrowType: {
        default: 'right' as CollapseArrowType,
        validator: (value: CollapseArrowType) => ['right', 'left', 'none'].includes(value)
      },
      icon: null,
      ghost: false
    })

    const collapseState = inject(COLLAPSE_STATE, null)

    const nh = useNameHelper('collapse')
    const currentExpanded = ref(props.expanded)
    const currentLabel = ref(props.label)
    const isLast = ref(false)
    const tab = ref<HTMLElement>()

    const id = idCount++

    const tabId = computed(() => `${nh.be('tab')}-${id}`)
    const bodyId = computed(() => `${nh.be('body')}-${id}`)
    const useCard = computed(() => {
      if (!collapseState) {
        return props.card
      }

      return false
    })
    const useArrowType = computed(() => {
      if (collapseState) {
        return collapseState.arrowType
      }

      return props.arrowType
    })
    const panelClassName = computed(() => {
      return [
        {
          'border-b-0': isLast.value,
          'border rounded': useCard.value
        }
      ]
    })

    const headerClassName = computed(() => {
      return [
        'border-y-0',
        'border-x-0',
        useCard.value ? 'bg-gray-50' : 'bg-transparent',
        {
          'border-b': currentExpanded.value
        }
      ]
    })

    if (collapseState) {
      const state: PanelState = reactive({
        tab,
        isLast,
        label: currentLabel,
        expanded: currentExpanded,
        setExpanded
      })

      watch(
        () => props.label,
        value => {
          const prevValue = currentLabel.value
          currentLabel.value = value || value === 0 ? value : prevValue
        }
      )

      collapseState.registerPanel(state)

      onBeforeUnmount(() => {
        collapseState.unregisterPanel(state)
      })
    } else {
      watch(
        () => props.expanded,
        value => {
          currentExpanded.value = value
        }
      )
    }

    function setExpanded(expanded: boolean) {
      currentExpanded.value = expanded

      emit('update:expanded', expanded)
      emitEvent(props.onToggle, expanded)
    }

    function handleToggle(expanded = !currentExpanded.value) {
      if (props.disabled) return

      if (collapseState) {
        // 由父级进行管理
        collapseState.expandPanel(currentLabel.value, expanded)
      } else {
        setExpanded(expanded)
      }
    }

    return {
      props,
      nh,
      currentExpanded,
      tab,
      tabId,
      bodyId,
      panelClassName,
      handleToggle,
      headerClassName,
      useArrowType
    }
  }
})
</script>

<template>
  <section
    poc="base-family font-size-base content-color-base"
    class="tabular-nums leading-normal list-none box-border overflow-hidden"
    :class="panelClassName"
    poc-role="collapse-panel"
  >
    <button
      :id="tabId"
      ref="tab"
      poc-role="collapse-header"
      class="relative flex items-center w-full py-2 px-4 leading-initial cursor-pointer outline-0 hover:text-sky-500 focus:text-sky-500 transition-all"
      poc="content-color-base"
      :class="headerClassName"
      type="button"
      role="tab"
      :aria-expanded="currentExpanded"
      :aria-controls="bodyId"
      :aria-describedby="bodyId"
      @click="handleToggle()"
    >
      <span
        v-if="useArrowType !== 'none'"
        class="i-ep-arrow-right-bold flex-none transition-transform mr-1"
        :class="{ 'order-last': useArrowType === 'right', 'rotate-90': currentExpanded }"
      ></span>
      <slot name="title">
        <div class="flex-auto flex items-center gap-1 text-left">
          <span v-if="props.icon" class="inline-block" :class="props.icon"></span>
          {{ props.title }}
        </div>
      </slot>
    </button>
    <CollapseTransition>
      <div
        v-if="currentExpanded"
        :id="bodyId"
        class="px-4 bg-white"
        role="tabpanel"
        tabindex="0"
        :aria-labelledby="tabId"
      >
        <div class="flex flex-col" :style="props.contentStyle">
          <slot></slot>
        </div>
      </div>
    </CollapseTransition>
  </section>
</template>
