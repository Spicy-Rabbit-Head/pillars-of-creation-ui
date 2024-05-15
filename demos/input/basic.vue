<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <poc-input v-model:value="value" placeholder="基础用法" style="max-width: 300px"></poc-input>
  <p>Input Value: {{ value }}</p>
</template>

<style scoped></style>
