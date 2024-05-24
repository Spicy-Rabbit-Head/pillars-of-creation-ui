<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <poc-radio v-model:value="value" label="radio">
    Radio
  </poc-radio>
  <br />
  <p style="margin: 10px 0">
    value: {{ value }}
  </p>
  <poc-button type="primary" size="small" @click="value = value ? '' : 'radio'">
    {{ value ? 'Cancel' : 'Select' }}
  </poc-button>
</template>
