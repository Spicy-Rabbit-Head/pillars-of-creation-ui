<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <poc-input v-model:value="value" clearable style="max-width: 300px"></poc-input>
</template>

<style scoped></style>
