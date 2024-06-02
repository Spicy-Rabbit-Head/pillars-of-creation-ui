<script setup lang="ts">
const options = Array.from({ length: 20 }, (_, index) => `选项${index + 1}`)
</script>

<template>
  <poc-wheel arrow :options="options"></poc-wheel>
</template>
