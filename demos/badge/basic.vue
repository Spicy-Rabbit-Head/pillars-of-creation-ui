<script setup lang="ts"></script>

<template>
  <poc-space>
    <poc-badge :content="34"></poc-badge>
    <poc-badge :content="34" type="primary"></poc-badge>
    <poc-badge :content="34" type="success"></poc-badge>
    <poc-badge :content="34" type="warning"></poc-badge>
    <poc-badge :content="34" type="info"></poc-badge>
    <poc-badge :content="34" type="disabled"></poc-badge>
    <div style="width: 10px; height: 10px; background: var(--color)" class="aaa"></div>
  </poc-space>
</template>

<style scoped>
.aaa {
  --color: #41d1ff;
}
</style>
