<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>()
</script>

<template>
  <poc-space vertical>
    <poc-number-input max-w-75></poc-number-input>
    <poc-number-input control-type="left" max-w-75></poc-number-input>
    <poc-number-input control-type="right-fade" max-w-75></poc-number-input>
    <poc-number-input control-type="left-fade" max-w-75></poc-number-input>
    <poc-number-input control-type="none" max-w-75></poc-number-input>
  </poc-space>
</template>
