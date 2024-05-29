<script setup lang="ts">
import { ref } from 'vue'

import type { Color } from 'pillars-of-creation-ui'

const color = ref<Color>('rgba(51, 154, 240, 0.6)')
</script>

<template>
  <poc-color-picker v-model:value="color" class="ml-25" alpha></poc-color-picker>
</template>
