<script setup lang="ts">
import { ref } from 'vue'

const activated = ref(true)
</script>

<template>
  激活状态：
  <poc-switch v-model:value="activated"></poc-switch>
  <br />
  <br />
  <poc-skeleton :activated="activated" width="33%" :spread="14"></poc-skeleton>
  <poc-skeleton :activated="activated" :repeat="4"></poc-skeleton>
  <poc-skeleton :activated="activated" width="67%"></poc-skeleton>
</template>
