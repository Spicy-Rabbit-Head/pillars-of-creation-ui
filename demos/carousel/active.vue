<template>
  <poc-carousel loop :active-offset="1" style="max-width: 1000px">
    <poc-carousel-item v-for="n in 5" :key="n">
      <template #default="{ active }">
        <div class="demo-pane" :style="{ backgroundColor: active ? 'var(--poc-color-warning-base)' : undefined }">
          内容{{ n }}
        </div>
      </template>
    </poc-carousel-item>
  </poc-carousel>
</template>

<script setup lang="ts"></script>

<style scoped>
.demo-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 240px;
  font-size: 30px;
  color: #fff;
  background-color: var(--poc-color-primary-base);
  transition: var(--poc-transition-transform);
}
</style>
