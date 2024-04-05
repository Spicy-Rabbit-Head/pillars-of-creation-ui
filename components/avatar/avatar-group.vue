<script setup lang="ts">
import { Avatar } from '@/components/avatar'
import { Tooltip } from '@/components/tooltip'

import { computed, provide, ref, watchEffect } from 'vue'

import { useNameHelper, useProps } from '@pillars-of-creation-ui/config'

import { avatarGroupProps } from './props'

import { GROUP_STATE } from './symbol'

import type { AvatarOption } from './symbol'

defineOptions({ name: 'AvatarGroup' })

const _props = defineProps(avatarGroupProps)
const props = useProps('avatarGroup', _props, {
  size: 'default',
  options: {
    default: () => [],
    static: true
  },
  circle: false,
  max: null,
  showTip: false,
  tipTrigger: 'hover',
  vertical: false,
  offset: null,
  restColor: null,
  restBackground: null
})

defineSlots<{
  default: (params: { option: AvatarOption, index: number }) => any,
  rest: (params: { options: AvatarOption[], count: number }) => any,
  tip: (params: { options: AvatarOption[], count: number }) => any
}>()

const nh = useNameHelper('avatar-group')

const renderAvatars = ref<AvatarOption[]>([])
const restAvatars = ref<AvatarOption[]>([])

watchEffect(() => {
  const size = props.options.length

  if (props.max > 0 && size > props.max) {
    renderAvatars.value = props.options.slice(0, props.max - 1)
    restAvatars.value = props.options.slice(props.max - 1)
  } else {
    renderAvatars.value = Array.from(props.options)
    restAvatars.value = []
  }
})

provide(GROUP_STATE, props)

const style = computed(() => {
  const style: Record<string, string> = {}

  if (typeof props.offset === 'number') {
    style[nh.cv('offset')] = `${props.offset}px`
  }

  return style
})
</script>

<template>
  <div
    :class="[
      'poc-(base-family content-color-base) text-3.5 tabular-nums leading-normal inline-flex',
      {
        'flex-col': props.vertical
      }
    ]"
    poc-vars="avatar"
    role="group"
    :style="style"
  >
    <div
      v-for="(option, index) in renderAvatars"
      :key="index"
      :poc-role="props.vertical ? '' : 'avatar-group-item'"
      :class="['relative', { 'rounded-1/2': props.circle, ' ml-0': props.vertical }]"
      style="background-color: var(--poc-bg-color-base)"
    >
      <slot :option="option" :index="index">
        <Avatar
          :src="option.src"
          :icon="option.icon"
          :alt="option.alt"
          :circle="props.circle"
          :fit="option.fit"
          :src-set="option.srcSet"
          :gap="option.gap"
          :icon-scale="option.iconScale"
          :fallback-src="option.fallbackSrc"
        >
          {{ option.text }}
        </Avatar>
      </slot>
    </div>
    <div
      v-if="restAvatars.length"
      poc-role="avatar-group-item"
      :class="['relative cursor-pointer', { 'rounded-1/2': props.circle }]"
      style="background-color: var(--poc-bg-color-base)"
    >
      <Tooltip
        v-if="props.showTip"
        inherit
        :trigger="props.tipTrigger"
        tip-class="cursor-pointer inline-flex items-center justify-center "
      >
        <template #trigger>
          <slot name="rest" :options="restAvatars" :count="restAvatars.length">
            <Avatar
              inherit
              :color="props.restColor"
              :circle="props.circle"
              :background="props.restBackground"
            >
              {{ `+${restAvatars.length}` }}
            </Avatar>
          </slot>
        </template>
        <slot name="tip" :options="restAvatars" :count="restAvatars.length">
          <Avatar
            v-for="(option, index) in restAvatars"
            :key="index"
            :src="option.src"
            :circle="props.circle"
            :icon="option.icon"
            :alt="option.alt"
            :fit="option.fit"
            :src-set="option.srcSet"
            :gap="option.gap"
            :icon-scale="option.iconScale"
            :fallback-src="option.fallbackSrc"
          >
            {{ option.text }}
          </Avatar>
        </slot>
      </Tooltip>
      <slot
        v-else
        name="rest"
        :options="restAvatars"
        :count="restAvatars.length"
      >
        <Avatar :circle="props.circle" :color="props.restColor" :background="props.restBackground">
          {{ `+${restAvatars.length}` }}
        </Avatar>
      </slot>
    </div>
  </div>
</template>
