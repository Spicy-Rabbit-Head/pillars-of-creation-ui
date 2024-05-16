<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <poc-switch v-model:value="checked"></poc-switch>
  <poc-switch disabled></poc-switch>
  <br />
  <p style="margin-top: 10px">
    checked: {{ checked }}
  </p>
</template>

<style scoped></style>
