<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>

<template>
  <poc-button type="primary" @click="active = !active">
    打开
  </poc-button>
  <poc-drawer
    v-model:active="active"
    transfer
    title="标题"
    footer
    confirm-type="success"
    cancel-type="error"
    action-size="default"
  >
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </poc-drawer>
</template>
