<script setup lang="ts">
const items = Array.from({ length: 15 }, (_, index) => ({ index: index + 1 }))
</script>

<template>
  <div class="max-w-80 border border-solid p-2.5">
    <poc-overflow :items="items">
      <template #default="{ item }">
        <div class="item">
          元素 {{ item.index }}
        </div>
      </template>
      <template #counter="{ count }">
        <div class="item">
          {{ `+${count}` }}
        </div>
      </template>
    </poc-overflow>
  </div>
</template>

<style scoped>
.item {
  padding: 4px 10px;
  margin-inline-end: 4px;
  white-space: nowrap;
  border: #7db1e0 1px solid;
  border-radius: 4px;
}
</style>
