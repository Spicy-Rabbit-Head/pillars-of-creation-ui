<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <poc-checkbox v-model:checked="checked">
    Checkbox
  </poc-checkbox>
  <br />
  <p style="margin-top: 10px">
    checked: {{ checked }}
  </p>
</template>

<style scoped></style>
