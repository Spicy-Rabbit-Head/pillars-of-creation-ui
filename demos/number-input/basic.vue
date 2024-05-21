<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>()
</script>

<template>
  <poc-number-input v-model:value="value" style="max-width: 300px"></poc-number-input>
  <p>Number Input Value: {{ value }}</p>
</template>

<style scoped></style>
